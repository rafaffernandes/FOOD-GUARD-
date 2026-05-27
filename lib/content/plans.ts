export type PlanId = "basico" | "essencial" | "premium";

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  positioning: string;
  highlighted?: boolean;
  /** Texto do botão de assinar (CTA persona-orientado). */
  ctaLabel: string;
  /** Bullets que aparecem no card do plano (linguagem comercial). */
  featuresList: string[];
  /** Texto fino que aparece sob a lista (ex.: "à parte"). */
  footnote?: string;
  /** Estrutura para a tabela comparativa em /planos. */
  features: { label: string; value: string }[];
}

export const plans: Plan[] = [
  {
    id: "basico",
    name: "Básico",
    price: 700,
    positioning: "Pra sair do zero e deixar a documentação em dia.",
    ctaLabel: "Quero sair da vulnerabilidade",
    featuresList: [
      "Visitas presenciais quinzenais",
      "Documentação ANVISA completa + POPs",
      "WhatsApp com nutricionista — horário comercial (seg–sex, 9h–18h)",
    ],
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
    positioning: "Pra operar com confiança e passar qualquer fiscalização.",
    ctaLabel: "Quero parar de apagar incêndio",
    featuresList: [
      "Visitas presenciais semanais (1x/semana)",
      "Documentação ANVISA completa + POPs",
      "Manual de Boas Práticas padrão",
      "WhatsApp com nutricionista — horário estendido (até 20h + sábados)",
      "Revisão de cardápio",
    ],
    footnote: "Criação de fichas técnicas disponível à parte.",
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
    positioning: "Pra quem quer um nutricionista como sócio da conformidade.",
    highlighted: true,
    ctaLabel: "Quero um nutricionista no meu negócio",
    featuresList: [
      "Visitas presenciais 2x por semana",
      "Nutricionista Responsável Técnico (Renan Muniz · CRN ativo)",
      "Documentação ANVISA completa + POPs",
      "Manual de Boas Práticas personalizado para sua operação",
      "WhatsApp prioritário — resposta em até 2h",
      "Criação e análise de cardápio completa",
      "Fichas técnicas incluídas",
    ],
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
