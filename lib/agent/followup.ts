import type { LeadPayload } from "@/lib/integrations/types";
import { MODELS, draftStructured } from "./client";
import { draftFirstMessage } from "./playbook";
import { type QualifiedLead, qualify } from "./qualify";
import { type FollowUpDraft, FollowUpDraftSchema } from "./schemas";

/**
 * Camada de IA do Agente de Qualificação: pega o lead do diagnóstico, qualifica
 * com a regra pura (`qualify`) e rascunha o follow-up. A regra de tier/SLA
 * permanece determinística e auditável — a IA só redige a mensagem. Sem
 * ANTHROPIC_API_KEY, cai no template do playbook.
 */

export interface LeadFollowUp {
  qualified: QualifiedLead;
  draft: FollowUpDraft & { aiGenerated: boolean };
}

export async function draftLeadFollowUp(
  lead: LeadPayload,
): Promise<LeadFollowUp> {
  const q = qualify(lead);

  const task = `Rascunhe a primeira mensagem de follow-up para um lead que acabou de fazer o diagnóstico.

Lead: ${JSON.stringify(
    {
      nome: lead.name,
      empresa: lead.company,
      cargo: lead.role,
      score: lead.score,
      banda: lead.band,
      planoRecomendado: lead.recommendedPlan,
      respostas: lead.answers,
    },
    null,
    2,
  )}

Classificação (determinística): tier ${q.tier}, urgência ${q.urgency}, canal ${q.channel}.
Motivos: ${q.reasons.join("; ")}.

Diretrizes:
- Use o canal "${q.channel}". Tom adequado ao tier (A = toque pessoal do nutricionista; C = nutrição leve).
- Cite o gap principal do lead sem alarmismo. CTA proporcional (A/B: convidar para conversa; C: oferecer conteúdo).
- Curto e humano. "rationale": 1 frase do porquê para quem aprova.`;

  const ai = await draftStructured({
    model: MODELS.qualificacao,
    schema: FollowUpDraftSchema,
    task,
    effort: "low",
  });

  if (ai) return { qualified: q, draft: { ...ai, aiGenerated: true } };

  return {
    qualified: q,
    draft: {
      channel: q.channel,
      message: draftFirstMessage(lead, q),
      rationale: "Fallback playbook (IA não configurada).",
      aiGenerated: false,
    },
  };
}
