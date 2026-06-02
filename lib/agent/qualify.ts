import type { PlanId } from "@/lib/content/plans";
import type { RiskBand } from "@/lib/diagnostic/engine";
import type { LeadPayload, LeadRole } from "@/lib/integrations/types";

/**
 * Qualificação de leads do diagnóstico — função PURA e auditável.
 *
 * Recebe o `LeadPayload` que o diagnóstico já produz (com score, banda e plano
 * recomendado) e devolve o tier comercial + plano de ação. Não faz IO nem
 * depende de IA: a regra de negócio é determinística e testável, igual ao motor
 * de diagnóstico (`lib/diagnostic/engine.ts`).
 */

export type LeadTier = "A" | "B" | "C";
export type Urgency = "imediata" | "alta" | "media" | "baixa";
export type Channel = "ligacao" | "whatsapp" | "email";

export interface QualifiedLead {
  tier: LeadTier;
  /** 0–100; quanto maior, mais cedo atacar este lead. */
  priorityScore: number;
  urgency: Urgency;
  /** Tempo-alvo pro primeiro contato, em minutos. */
  slaMinutes: number;
  channel: Channel;
  /** Motivos legíveis da classificação (auditabilidade). */
  reasons: string[];
  nextAction: string;
}

// Pesos do score de prioridade. Dor regulatória (banda) domina, porque é o que
// mais correlaciona com propensão a fechar; poder de decisão e ticket ajustam.
const BAND_WEIGHT: Record<RiskBand, number> = {
  critico: 40,
  medio: 22,
  baixo: 8,
};

const ROLE_WEIGHT: Record<LeadRole, number> = {
  Diretor: 18,
  Gestor: 16,
  Gerente: 8,
  Supervisor: 5,
  Outro: 2,
};

const PLAN_WEIGHT: Record<PlanId, number> = {
  premium: 12,
  essencial: 7,
  basico: 3,
};

const DECISORES: ReadonlySet<LeadRole> = new Set<LeadRole>(["Diretor", "Gestor"]);

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export function qualify(lead: LeadPayload): QualifiedLead {
  // Sinais quentes vindos das respostas do diagnóstico.
  const autuadoRecente = lead.answers.fiscalizacao === "fisc_auto";
  const semNutricionista = lead.answers.nutri === "nutri_nenhum";
  const semDocumentacao = lead.answers.documentacao === "doc_nenhum";
  const isDecisor = DECISORES.has(lead.role);

  const priorityScore = clamp(
    BAND_WEIGHT[lead.band] +
      ROLE_WEIGHT[lead.role] +
      PLAN_WEIGHT[lead.recommendedPlan] +
      (autuadoRecente ? 20 : 0) +
      (semNutricionista ? 12 : 0) +
      (semDocumentacao ? 6 : 0),
    0,
    100,
  );

  const reasons: string[] = [];
  reasons.push(`Risco ${lead.band} (score ${lead.score}/100)`);
  if (autuadoRecente) reasons.push("Autuação/notificação nos últimos 12 meses");
  if (semNutricionista) reasons.push("Sem nutricionista designado");
  if (semDocumentacao) reasons.push("Sem documentação ANVISA");
  reasons.push(isDecisor ? `Decisor (${lead.role})` : `Influenciador (${lead.role})`);
  reasons.push(`Plano recomendado: ${lead.recommendedPlan}`);

  const tier: LeadTier =
    priorityScore >= 60 || (autuadoRecente && isDecisor)
      ? "A"
      : priorityScore >= 35
        ? "B"
        : "C";

  const urgency: Urgency = autuadoRecente
    ? "imediata"
    : tier === "A"
      ? "alta"
      : tier === "B"
        ? "media"
        : "baixa";

  const slaMinutes =
    urgency === "imediata" || tier === "A" ? 15 : tier === "B" ? 120 : 1440;

  const channel: Channel =
    tier === "A"
      ? "ligacao"
      : tier === "B"
        ? lead.whatsappOptin
          ? "whatsapp"
          : "email"
        : "email";

  const nextAction =
    tier === "A"
      ? "Nutricionista contata pessoalmente (ligação/WhatsApp) e oferece o plano recomendado."
      : tier === "B"
        ? "Mensagem no WhatsApp com o gap principal e proposta de call de 10 min."
        : "Sequência de nutrição por e-mail com conteúdo do blog e convite ao diagnóstico.";

  return { tier, priorityScore, urgency, slaMinutes, channel, reasons, nextAction };
}
