import type { PlanId } from "@/lib/content/plans";
import type { RiskBand } from "@/lib/diagnostic/engine";

export type LeadRole =
  | "Diretor"
  | "Gestor"
  | "Gerente"
  | "Supervisor"
  | "Outro";

/** Dados de contato — a parte comum a qualquer origem de lead. */
export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  role: LeadRole;
  company: string;
  consent: boolean;
  whatsappOptin: boolean;
  utm?: Record<string, string>;
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
  utm?: Record<string, string>;
}
