import { after, NextResponse } from "next/server";
import { z } from "zod";
import { draftLeadFollowUp } from "@/lib/agent/followup";
import { saveLeadActivity } from "@/lib/agent/store";
import { computeDiagnostic } from "@/lib/diagnostic/engine";
import { notifyTeam, sendDiagnosticEmail } from "@/lib/integrations/resend";
import { saveLead } from "@/lib/integrations/supabase";
import type { LeadPayload } from "@/lib/integrations/types";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  company: z.string().min(2),
  role: z.enum(["Diretor", "Gestor", "Gerente", "Supervisor", "Outro"]),
  consent: z.literal(true),
  whatsappOptin: z.boolean().optional(),
  answers: z.record(z.string()),
  utm: z.record(z.string()).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Dados inválidos", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  // Recalcula o resultado no servidor (não confia no score do cliente).
  const result = computeDiagnostic(parsed.data.answers);

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
