export type PlanId = "basico" | "essencial" | "premium";

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
    id: "basico",
    name: "Básico",
    price: 700,
    positioning: "Pra colocar o essencial em ordem.",
    features: [
      { label: "Visitas presenciais na sua operação", value: "Quinzenais" },
      { label: "Nutricionista responsável (assina pela operação)", value: "Não" },
      { label: "Documentação ANVISA + POPs", value: "Inclusa" },
      { label: "Manual de Boas Práticas", value: "Não" },
      { label: "WhatsApp com o nutricionista", value: "Comercial" },
      { label: "Análise de cardápio", value: "Não" },
      { label: "Criação de ficha técnica", value: "Não" },
    ],
  },
  {
    id: "essencial",
    name: "Essencial",
    price: 1200,
    positioning: "Pra operar com segurança no dia a dia.",
    features: [
      { label: "Visitas presenciais na sua operação", value: "1x/semana" },
      { label: "Nutricionista responsável (assina pela operação)", value: "Não" },
      { label: "Documentação ANVISA + POPs", value: "Inclusa" },
      { label: "Manual de Boas Práticas", value: "Padrão" },
      { label: "WhatsApp com o nutricionista", value: "Estendido" },
      { label: "Análise de cardápio", value: "Revisão" },
      { label: "Criação de ficha técnica", value: "À parte" },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 1999,
    positioning: "Tudo incluso, com nutricionista responsável.",
    highlighted: true,
    features: [
      { label: "Visitas presenciais na sua operação", value: "2x/semana" },
      { label: "Nutricionista responsável (assina pela operação)", value: "Sim · Renan" },
      { label: "Documentação ANVISA + POPs", value: "Inclusa" },
      { label: "Manual de Boas Práticas", value: "Personalizado" },
      { label: "WhatsApp com o nutricionista", value: "Prioritário" },
      { label: "Análise de cardápio", value: "Completa (criação)" },
      { label: "Criação de ficha técnica", value: "Sim" },
    ],
  },
];

export const planById = (id: PlanId): Plan =>
  plans.find((p) => p.id === id) as Plan;

export const comparisonRows = [
  "Visitas presenciais na sua operação",
  "Nutricionista responsável (assina pela operação)",
  "Documentação ANVISA + POPs",
  "Manual de Boas Práticas",
  "WhatsApp com o nutricionista",
  "Análise de cardápio",
  "Criação de ficha técnica",
] as const;
