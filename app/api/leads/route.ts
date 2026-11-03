import { after, NextResponse } from "next/server";
import { z } from "zod";
import { draftLeadFollowUp } from "@/lib/agent/followup";
import { saveLeadActivity } from "@/lib/agent/store";
import { computeDiagnostic } from "@/lib/diagnostic/engine";
import { questions } from "@/lib/diagnostic/questions";
import { notifyTeam, sendDiagnosticEmail } from "@/lib/integrations/resend";
import { saveLead } from "@/lib/integrations/supabase";
import type { LeadPayload } from "@/lib/integrations/types";
import { esperarComoEnvioReal, pareceBot, tempoInformado } from "@/lib/bot-guard";
import { getIp, rateLimit } from "@/lib/rate-limit";
import { lerCorpoJson } from "@/lib/validation/corpo";
import { contatoSchema } from "@/lib/validation/lead";

/**
 * Respostas: toda pergunta precisa vir com um id de opção que existe.
 * O motor trata resposta desconhecida como risco 0, então sem esta validação
 * um payload incompleto viraria "score 100 / risco baixo" — o falso negativo
 * mais caro possível num diagnóstico de conformidade.
 * Chave que não é pergunta do diagnóstico é recusada: as respostas vão inteiras para
 * o banco e para o prompt do follow-up.
 */
const idsDasPerguntas = new Set(questions.map((q) => q.id));
const answersSchema = z
  .record(z.string(), z.string().max(40))
  .superRefine((answers, ctx) => {
    for (const chave of Object.keys(answers)) {
      if (!idsDasPerguntas.has(chave)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Pergunta desconhecida: "${chave.slice(0, 40)}"`,
          path: [chave],
        });
      }
    }
    for (const q of questions) {
      const optionId = answers[q.id];
      if (!optionId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Resposta ausente para "${q.id}"`,
          path: [q.id],
        });
      } else if (!q.options.some((o) => o.id === optionId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Opção inválida para "${q.id}": ${optionId}`,
          path: [q.id],
        });
      }
    }
  });

const schema = contatoSchema.extend({ answers: answersSchema });

// O after() gera o PDF, manda o e-mail e chama a IA do follow-up depois da resposta:
// 60 s dá folga para isso terminar na Vercel.
export const maxDuration = 60;

export async function POST(request: Request) {
  const { allowed } = rateLimit(getIp(request), 5, 10 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "Muitas tentativas. Tente novamente em alguns minutos." },
      { status: 429 },
    );
  }

  const leitura = await lerCorpoJson(request);
  if (!leitura.ok) return leitura.response;

  const parsed = schema.safeParse(leitura.body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Dados inválidos" },
      { status: 422 },
    );
  }

  // Recalcula o resultado no servidor (não confia no score do cliente).
  const result = computeDiagnostic(parsed.data.answers);

  // Robô: responde como sucesso (não ensina o que barrou), mas não grava, não manda
  // e-mail e não chama a IA.
  if (pareceBot(leitura.body)) {
    console.warn("[bot] submissão descartada: diagnóstico", { fillMs: tempoInformado(leitura.body) });
    await esperarComoEnvioReal();
    return NextResponse.json({
      ok: true,
      devMode: false,
      score: result.score,
      band: result.band,
      recommendedPlan: result.recommendedPlan,
    });
  }

  const lead: LeadPayload = {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    company: parsed.data.company,
    role: parsed.data.role,
    consent: parsed.data.consent,
    whatsappOptin: parsed.data.whatsappOptin ?? false,
    score: result.score,
    band: result.band,
    recommendedPlan: result.recommendedPlan,
    answers: parsed.data.answers,
    utm: parsed.data.utm,
  };

  const saved = await saveLead(lead);

  // Trabalho pós-resposta (não bloqueia o usuário): e-mail do relatório +
  // qualificação por IA → rascunho de follow-up na fila + alerta nos tier A.
  after(async () => {
    try {
      await sendDiagnosticEmail(lead, result);
    } catch (err) {
      console.error("[after] e-mail do diagnóstico:", err);
    }
    try {
      const { qualified, draft } = await draftLeadFollowUp(lead);
      await saveLeadActivity(
        saved.id,
        qualified.tier,
        draft.channel,
        draft.message,
        draft.rationale,
        draft.aiGenerated,
      );
      if (qualified.tier === "A") {
        await notifyTeam(
          `Lead tier A: ${lead.company}`,
          `${lead.name} (${lead.company}) — risco ${lead.band}, score ${lead.score}/100. SLA de 15 min. Rascunho de follow-up na fila: /admin/aprovacoes`,
        );
      }
    } catch (err) {
      console.error("[after] qualificação do lead:", err);
    }
  });

  return NextResponse.json({
    ok: saved.ok,
    devMode: saved.devMode ?? false,
    score: result.score,
    band: result.band,
    recommendedPlan: result.recommendedPlan,
  });
}
