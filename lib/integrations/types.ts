import type { PlanId } from "@/lib/content/plans";
import type { RiskBand } from "@/lib/diagnostic/engine";

export type LeadRole = "Dono" | "CEO" | "Diretor" | "Gerente" | "Outro";

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
