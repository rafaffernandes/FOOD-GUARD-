import type { PlanId } from "@/lib/content/plans";
import { type Answers, questions } from "./questions";

export type RiskBand = "critico" | "medio" | "baixo";

export interface ChecklistEntry {
  area: string;
  done: boolean;
  gap?: string;
}

export interface MoneyAtRisk {
  /** Faixa estimada de multa sanitária. */
  fineRange: string;
  /** Custo médio estimado de adequação tardia (após autuação). */
  lateAdequationCost: number;
  /** Chance estimada de autuação na próxima fiscalização. */
  autuacaoChance: string;
}

export interface DiagnosticResult {
  score: number;
  band: RiskBand;
  bandLabel: string;
  recommendedPlan: PlanId;
  /** Frase única para a revelação parcial (antes do gating). */
  insight: string;
  moneyAtRisk: MoneyAtRisk;
  checklist: ChecklistEntry[];
  /** Quantas áreas técnicas ainda precisam de adequação. */
  gapsCount: number;
}

const BAND_CONFIG: Record<
  RiskBand,
  {
    label: string;
    plan: PlanId;
    money: MoneyAtRisk;
    insight: string;
  }
> = {
  critico: {
    label: "Crítico",
    plan: "premium",
    money: {
      fineRange: "R$ 20.000 a R$ 1.500.000",
      lateAdequationCost: 28000,
      autuacaoChance: "até 78%",
    },
    insight:
      "Sua operação está exposta: faltam itens que costumam ser os primeiros cobrados em fiscalização.",
  },
  medio: {
    label: "Médio",
    plan: "conformidade",
    money: {
      fineRange: "R$ 5.000 a R$ 200.000",
      lateAdequationCost: 14000,
      autuacaoChance: "cerca de 45%",
    },
    insight:
      "Você tem uma base, mas há lacunas que viram pendência na hora da fiscalização.",
  },
  baixo: {
    label: "Baixo",
    plan: "essencial",
    money: {
      fineRange: "R$ 2.000 a R$ 50.000",
      lateAdequationCost: 6000,
      autuacaoChance: "cerca de 12%",
    },
    insight:
      "Você está bem encaminhado — falta manter a conformidade viva e auditável ao longo do tempo.",
  },
};

function bandFromScore(score: number): RiskBand {
  if (score <= 30) return "critico";
  if (score <= 65) return "medio";
  return "baixo";
}

export function computeDiagnostic(answers: Answers): DiagnosticResult {
  let score = 0;
  const checklist: ChecklistEntry[] = [];

  for (const q of questions) {
    const optionId = answers[q.id];
    const option = q.options.find((o) => o.id === optionId);
    const points = option?.points ?? 0;
    score += points;

    // O perfil de risco (Q1) não vira item de checklist técnico.
    if (q.id === "tipo") continue;

    checklist.push({
      area: q.area,
      done: option?.compliant ?? false,
      gap: option?.compliant ? undefined : q.gap,
    });
  }

  score = Math.max(0, Math.min(100, score));
  const band = bandFromScore(score);
  const cfg = BAND_CONFIG[band];

  // Insight prioriza o gap mais grave, com fallback por banda.
  const priorityOrder = [
    "Responsável Técnico nutricionista (CRN ativo)",
    "Documentação técnica (Manual, POPs, APPCC, fichas)",
    "Situação regular junto à fiscalização sanitária",
    "Treinamento de manipuladores documentado",
  ];
  const topGap = priorityOrder
    .map((area) => checklist.find((c) => c.area === area && !c.done))
    .find(Boolean);

  const insight = topGap?.gap
    ? `${cfg.insight} Prioridade nº 1: ${topGap.gap.toLowerCase()}`
    : cfg.insight;

  return {
    score,
    band,
    bandLabel: cfg.label,
    recommendedPlan: cfg.plan,
    insight,
    moneyAtRisk: cfg.money,
    checklist,
    gapsCount: checklist.filter((c) => !c.done).length,
  };
}
