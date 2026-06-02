import type { LeadPayload } from "@/lib/integrations/types";
import { type FollowUpStep, playbook } from "./playbook";
import { type QualifiedLead, qualify } from "./qualify";

/**
 * Agente de qualificação de leads (Fase 1 — inbound, determinístico).
 *
 * Ponto de entrada: dado um `LeadPayload` do diagnóstico, devolve o tier
 * comercial + a sequência de follow-up. Puro e sem dependências externas —
 * pode rodar no servidor (ex.: dentro de `app/api/leads`) sem quebrar nada.
 *
 * Fase 2 (quando o Supabase estiver no ar): persistir o status do lead e
 * notificar o nutricionista nos casos tier A. Ver `docs/agente/ARQUITETURA.md`.
 */

export * from "./qualify";
export * from "./playbook";

export interface LeadAgentResult {
  qualified: QualifiedLead;
  followUps: FollowUpStep[];
}

export function processLead(lead: LeadPayload): LeadAgentResult {
  const qualified = qualify(lead);
  return { qualified, followUps: playbook(lead, qualified) };
}
