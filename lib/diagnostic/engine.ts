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
    label: "Alto",
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
  if (score < 45) return "critico"; // Alto
  if (score < 70) return "medio";
  return "baixo";
}

export function computeDiagnostic(answers: Answers): DiagnosticResult {
  let riskTotal = 0;
  const checklist: ChecklistEntry[] = [];

  for (const q of questions) {
    const optionId = answers[q.id];
    const option = q.options.find((o) => o.id === optionId);
    const risk = option?.risk ?? 0;
    riskTotal += risk;

    // Perguntas de perfil (tipo) não viram item de checklist técnico.
    if (PROFILE_QUESTIONS.includes(q.id)) continue;

    const done = risk === 0;
    checklist.push({
      area: q.area,
      done,
      gap: done ? undefined : q.gap,
    });
  }

  // score = 100 − soma dos pontos de risco · piso 15 · teto 100
  const score = Math.max(15, Math.min(100, 100 - riskTotal));
  const band = bandFromScore(score);
  const cfg = BAND_CONFIG[band];

  // Insight prioriza o gap mais grave, com fallback por banda.
  const priorityOrder = [
    "Nutricionista responsável no CNPJ",
    "Manual de Boas Práticas e POPs",
    "Situação junto à vigilância sanitária",
    "Treinamento de boas práticas da equipe",
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
