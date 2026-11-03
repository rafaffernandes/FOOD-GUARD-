import type { PlanId } from "@/lib/content/plans";
import type { RiskBand } from "@/lib/diagnostic/engine";

export type LeadRole =
  | "Diretor"
  | "Gestor"
  | "Gerente"
  | "Supervisor"
  | "Outro";

/** UTMs aceitas pelos formulários (as outras chaves são recusadas na validação). */
export type Utm = Partial<
  Record<"utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term", string>
>;

/** Dados de contato — a parte comum a qualquer origem de lead. */
export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  role: LeadRole;
  company: string;
  consent: boolean;
  whatsappOptin: boolean;
  utm?: Utm;
}

export interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  role: LeadRole;
  company: string;
  consent: boolean;
  whatsappOptin: boolean;
  score: number;
  band: RiskBand;
  recommendedPlan: PlanId;
  answers: Record<string, string>;
  utm?: Utm;
}
