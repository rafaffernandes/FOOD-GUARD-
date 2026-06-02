export type PlanId = "basico" | "essencial" | "premium";

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  positioning: string;
  highlighted?: boolean;
  ctaLabel: string;
  featuresList: string[];
  footnote?: string;
  features: { label: string; value: string }[];
}

export const plans: Plan[] = [
  {
    id: "basico",
    name: "Básico",
    price: 1200,
    positioning: "Pra sair do zero e deixar a documentação em dia.",
    ctaLabel: "Quero sair da vulnerabilidade",
    featuresList: [
      "Visitas presenciais quinzenais",
      "Documentação ANVISA completa e POPs",
      "WhatsApp com nutricionista — horário comercial (seg-sex, 9h-18h)",
    ],
    footnote: "Manual de Boas Práticas e fichas técnicas disponíveis à parte.",
    features: [
      { label: "Visitas presenciais na sua operação", value: "Quinzenais" },
      { label: "Nutricionista responsável técnico", value: "Não" },
      { label: "Documentação ANVISA e POPs", value: "Inclusa" },
      { label: "Manual de Boas Práticas", value: "À parte" },
      { label: "WhatsApp com o nutricionista", value: "Comercial" },
      { label: "Análise de cardápio", value: "Não" },
      { label: "Criação de ficha técnica", value: "À parte" },
    ],
  },
  {
    id: "essencial",
    name: "Essencial",
    price: 2200,
    positioning: "Pra operar com confiança e passar qualquer fiscalização.",
    ctaLabel: "Quero parar de apagar incêndio",
    featuresList: [
      "Visitas presenciais semanais (1x/semana)",
      "Documentação ANVISA completa e POPs",
      "Manual de Boas Práticas padrão",
      "WhatsApp com nutricionista — horário estendido (até 20h e sábados)",
      "Revisão de cardápio",
    ],
    footnote: "Criação de fichas técnicas disponível à parte.",
    features: [
      { label: "Visitas presenciais na sua operação", value: "1x/semana" },
      { label: "Nutricionista responsável técnico", value: "Não" },
      { label: "Documentação ANVISA e POPs", value: "Inclusa" },
      { label: "Manual de Boas Práticas", value: "Padrão" },
      { label: "WhatsApp com o nutricionista", value: "Estendido" },
      { label: "Análise de cardápio", value: "Revisão" },
      { label: "Criação de ficha técnica", value: "À parte" },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 3200,
    positioning: "Pra quem quer um nutricionista como sócio da conformidade.",
    highlighted: true,
    ctaLabel: "Quero um nutricionista no meu negócio",
    featuresList: [
      "Visitas presenciais 2x por semana",
      "Nutricionista Responsável Técnico (RT)",
      "Documentação ANVISA completa e POPs",
      "Manual de Boas Práticas personalizado para sua operação",
      "WhatsApp prioritário — resposta em até 2h",
      "Criação e análise de cardápio completa",
      "Fichas técnicas incluídas",
    ],
    footnote: "Possibilidade de estagiário contratado à parte.",
    features: [
      { label: "Visitas presenciais na sua operação", value: "2x/semana" },
      { label: "Nutricionista responsável técnico", value: "Sim" },
      { label: "Documentação ANVISA e POPs", value: "Inclusa" },
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
  "Nutricionista responsável técnico",
  "Documentação ANVISA e POPs",
  "Manual de Boas Práticas",
  "WhatsApp com o nutricionista",
  "Análise de cardápio",
  "Criação de ficha técnica",
] as const;
