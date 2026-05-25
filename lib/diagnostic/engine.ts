import type { PlanId } from "@/lib/content/plans";
import { type Answers, PROFILE_QUESTIONS, questions } from "./questions";

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
      fineRange: "R$ 10.000 a R$ 30.000",
      lateAdequationCost: 12000,
      autuacaoChance: "até 78%",
    },
    insight:
      "Sua operação está exposta: faltam itens que costumam ser os primeiros cobrados em fiscalização.",
  },
  medio: {
    label: "Médio",
    plan: "essencial",
    money: {
      fineRange: "R$ 5.000 a R$ 15.000",
      lateAdequationCost: 7000,
      autuacaoChance: "cerca de 45%",
    },
    insight:
      "Você tem uma base, mas há lacunas que viram pendência na hora da fiscalização.",
  },
  baixo: {
    label: "Baixo",
    plan: "basico",
    money: {
      fineRange: "R$ 2.000 a R$ 8.000",
      lateAdequationCost: 3000,
      autuacaoChance: "cerca de 12%",
    },
    insight:
      "Você está bem encaminhado — falta manter tudo em ordem e auditável ao longo do tempo.",
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

    // Perguntas de perfil (tipo/porte) não viram item de checklist técnico.
    if (PROFILE_QUESTIONS.includes(q.id)) continue;

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
    "Nutricionista responsável pela operação",
    "Documentação técnica (POPs, doc. ANVISA, Manual)",
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
