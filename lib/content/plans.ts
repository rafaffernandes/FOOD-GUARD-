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
      { label: "Visitas presenciais para blindar sua cozinha", value: "1/semana" },
      { label: "Seu nutricionista responsável (RT)", value: "Sim" },
      { label: "Documentação obrigatória (Manual + POPs)", value: "Inclusa" },
      { label: "Controle de perigos (APPCC)", value: "Sob demanda" },
      { label: "Treinamento da sua equipe", value: "1×/semestre" },
      { label: "WhatsApp direto com seu nutricionista", value: "Comercial" },
      { label: "Auditorias de blindagem", value: "1×/ano" },
    ],
  },
  {
    id: "conformidade",
    name: "Conformidade",
    price: 2700,
    positioning: "Pra crescer com segurança.",
    highlighted: true,
    features: [
      { label: "Visitas presenciais para blindar sua cozinha", value: "2/semana" },
      { label: "Seu nutricionista responsável (RT)", value: "Sim" },
      { label: "Documentação obrigatória (Manual + POPs)", value: "Inclusa" },
      { label: "Controle de perigos (APPCC)", value: "Incluso" },
      { label: "Treinamento da sua equipe", value: "1×/trimestre" },
      { label: "WhatsApp direto com seu nutricionista", value: "Estendido" },
      { label: "Auditorias de blindagem", value: "2×/ano" },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 3800,
    positioning: "Pra redes e operações complexas.",
    features: [
      { label: "Visitas presenciais para blindar sua cozinha", value: "3/semana" },
      { label: "Seu nutricionista responsável (RT)", value: "Sênior · Renan" },
      { label: "Documentação obrigatória (Manual + POPs)", value: "Inclusa" },
      { label: "Controle de perigos (APPCC)", value: "Completo" },
      { label: "Treinamento da sua equipe", value: "1×/mês" },
      { label: "WhatsApp direto com seu nutricionista", value: "24/7" },
      { label: "Auditorias de blindagem", value: "Trimestral" },
    ],
  },
];

export const planById = (id: PlanId): Plan =>
  plans.find((p) => p.id === id) as Plan;

export const comparisonRows = [
  "Visitas presenciais para blindar sua cozinha",
  "Seu nutricionista responsável (RT)",
  "Documentação obrigatória (Manual + POPs)",
  "Controle de perigos (APPCC)",
  "Treinamento da sua equipe",
  "WhatsApp direto com seu nutricionista",
  "Auditorias de blindagem",
] as const;
