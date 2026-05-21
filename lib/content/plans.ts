export type PlanId = "essencial" | "conformidade" | "premium";

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  positioning: string;
  highlighted?: boolean;
  features: { label: string; value: string }[];
}

export const plans: Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    price: 1500,
    positioning: "Pra começar com tudo em dia.",
    features: [
      { label: "Visitas por semana", value: "1" },
      { label: "RT nutricionista", value: "Sim" },
      { label: "Manual + POPs", value: "Inclusos" },
      { label: "APPCC", value: "Sob demanda" },
      { label: "Treinamento", value: "1×/semestre" },
      { label: "WhatsApp", value: "Comercial" },
      { label: "Auditoria", value: "1×/ano" },
    ],
  },
  {
    id: "conformidade",
    name: "Conformidade",
    price: 2700,
    positioning: "Pra crescer com segurança.",
    highlighted: true,
    features: [
      { label: "Visitas por semana", value: "2" },
      { label: "RT nutricionista", value: "Sim" },
      { label: "Manual + POPs", value: "Inclusos" },
      { label: "APPCC", value: "Inclui" },
      { label: "Treinamento", value: "1×/trimestre" },
      { label: "WhatsApp", value: "Estendido" },
      { label: "Auditoria", value: "2×/ano" },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 3800,
    positioning: "Pra redes e operações complexas.",
    features: [
      { label: "Visitas por semana", value: "3" },
      { label: "RT nutricionista", value: "Sênior · Renan" },
      { label: "Manual + POPs", value: "Inclusos" },
      { label: "APPCC", value: "Completo" },
      { label: "Treinamento", value: "1×/mês" },
      { label: "WhatsApp", value: "24/7" },
      { label: "Auditoria", value: "Trimestral" },
    ],
  },
];

export const planById = (id: PlanId): Plan =>
  plans.find((p) => p.id === id) as Plan;

export const comparisonRows = [
  "Visitas por semana",
  "RT nutricionista",
  "Manual + POPs",
  "APPCC",
  "Treinamento",
  "WhatsApp",
  "Auditoria",
] as const;
