import type { PlanId } from "@/lib/content/plans";
import type { DiagnosticResult } from "./engine";
import type { Answers } from "./questions";

/* ---------- 5 bandas de risco (visual) ----------------------------- */

export type RiskTierId =
  | "alto"
  | "moderadoAlto"
  | "moderado"
  | "baixo"
  | "conformidade";

export interface RiskTier {
  id: RiskTierId;
  label: string;
  /** Cor semântica usada nos badges / barras. */
  color: "danger" | "warn" | "warnSoft" | "brand" | "brandStrong";
  /** Plano sugerido na faixa. */
  plan: PlanId;
  /** Multa estimada máxima na faixa. */
  maxFine: number;
  /** Headline dinâmica curta. */
  headline: string;
}

/** Régua visual em 5 faixas, conforme brief do relatório. */
export function getRiskTier(score: number): RiskTier {
  if (score < 40)
    return {
      id: "alto",
      label: "Risco Alto",
      color: "danger",
      plan: "premium",
      maxFine: 30000,
      headline:
        "Sua operação está exposta. A próxima fiscalização vai cobrar caro.",
    };
  if (score < 65)
    return {
      id: "moderadoAlto",
      label: "Risco Moderado-Alto",
      color: "warn",
      plan: "premium",
      maxFine: 22400,
      headline:
        "Há pontos críticos que pesam em uma fiscalização. Dá para resolver antes.",
    };
  if (score < 80)
    return {
      id: "moderado",
      label: "Risco Moderado",
      color: "warnSoft",
      plan: "essencial",
      maxFine: 12000,
      headline:
        "Você tem uma base, mas falta consistência para chegar na conformidade total.",
    };
  if (score < 95)
    return {
      id: "baixo",
      label: "Risco Baixo",
      color: "brand",
      plan: "essencial",
      maxFine: 5000,
      headline:
        "Sua operação está próxima do ideal. Falta pouco para o 100%.",
    };
  return {
    id: "conformidade",
    label: "Em Conformidade",
    color: "brandStrong",
    plan: "basico",
    maxFine: 2000,
    headline:
      "Sua operação está em dia. Agora é manter a conformidade viva ao longo do tempo.",
  };
}

/* ---------- Categorias técnicas (7 barras) ------------------------- */

export interface CategoryScore {
  name: string;
  percent: number;
  // 'green' | 'amber' | 'red'
}

const Q_RISK_NORMALIZED: Record<string, (a: Answers) => number> = {
  // 0..1, onde 1 = pior risco
  doc: (a) =>
    ({ doc_ok: 0, doc_desatualizado: 8 / 18, doc_parcial: 12 / 18, doc_nenhum: 1 })[
      a.documentacao
    ] ?? 0.5,
  trein: (a) =>
    ({ trein_ok: 0, trein_parcial: 6 / 15, trein_antigo: 10 / 15, trein_nunca: 1 })[
      a.treinamento
    ] ?? 0.5,
  fisc: (a) =>
    ({ fisc_ok: 0, fisc_2anos: 6 / 15, fisc_nunca: 10 / 15, fisc_auto: 1 })[
      a.fiscalizacao
    ] ?? 0.5,
  nutri: (a) =>
    ({ nutri_ativo: 0, nutri_fantasma: 10 / 20, nutri_naosei: 15 / 20, nutri_nenhum: 1 })[
      a.nutri
    ] ?? 0.5,
};

function pctFromRisk(r: number) {
  return Math.round(Math.max(0, Math.min(100, (1 - r) * 100)));
}

export function getCategoryBars(answers: Answers): CategoryScore[] {
  const r = {
    doc: Q_RISK_NORMALIZED.doc(answers),
    trein: Q_RISK_NORMALIZED.trein(answers),
    fisc: Q_RISK_NORMALIZED.fisc(answers),
    nutri: Q_RISK_NORMALIZED.nutri(answers),
  };
  // Cada categoria combina sinais relevantes (proxy).
  return [
    {
      name: "Higiene pessoal",
      percent: pctFromRisk(0.65 * r.trein + 0.35 * r.nutri),
    },
    {
      name: "Controle de temperatura",
      percent: pctFromRisk(0.55 * r.doc + 0.45 * r.trein),
    },
    {
      name: "Limpeza e sanitização",
      percent: pctFromRisk(0.6 * r.doc + 0.4 * r.trein),
    },
    {
      name: "Armazenamento",
      percent: pctFromRisk(0.7 * r.doc + 0.3 * r.trein),
    },
    {
      name: "Documentação obrigatória",
      percent: pctFromRisk(0.7 * r.doc + 0.3 * r.nutri),
    },
    {
      name: "Controle de pragas",
      percent: pctFromRisk(0.6 * r.doc + 0.2 * r.fisc + 0.2 * r.trein),
    },
    {
      name: "Manipulação de alimentos",
      percent: pctFromRisk(0.7 * r.trein + 0.3 * r.nutri),
    },
  ];
}

/* ---------- Não-conformidades (derivadas dos gaps) ------------------ */

export type Severity = "alta" | "media" | "baixa";
export type Deadline = "imediato" | "7dias" | "30dias";

export interface NonConformity {
  item: string;
  description: string;
  norma: string;
  severity: Severity;
  deadline: Deadline;
}

const NC_LIBRARY: Record<string, NonConformity[]> = {
  nutri: [
    {
      item: "Sem nutricionista responsável",
      description:
        "Operação sem profissional nutricionista no CRN assumindo a responsabilidade técnica.",
      norma: "Portaria 2.619/2011 · Art. 5",
      severity: "alta",
      deadline: "imediato",
    },
  ],
  documentacao: [
    {
      item: "Manual de Boas Práticas ausente ou desatualizado",
      description:
        "Documento obrigatório que descreve os procedimentos sanitários da operação.",
      norma: "RDC 216/2004 · Art. 4.11",
      severity: "alta",
      deadline: "7dias",
    },
    {
      item: "POPs incompletos",
      description:
        "Procedimentos Operacionais Padronizados de higienização, controle de pragas e saúde dos manipuladores.",
      norma: "RDC 216/2004 · Art. 4.11",
      severity: "media",
      deadline: "7dias",
    },
  ],
  fiscalizacao: [
    {
      item: "Pendências com a vigilância sem plano de adequação",
      description: "Auto ou notificação em aberto, sem trilha de resposta documentada.",
      norma: "Portaria 2.619/2011 · Art. 7",
      severity: "alta",
      deadline: "imediato",
    },
  ],
  treinamento: [
    {
      item: "Treinamento de manipuladores sem registro",
      description:
        "A capacitação dos manipuladores precisa ser periódica e registrada em ata.",
      norma: "RDC 216/2004 · Art. 4.10",
      severity: "media",
      deadline: "30dias",
    },
  ],
};

export function getNonConformities(
  result: DiagnosticResult,
  answers: Answers,
): NonConformity[] {
  const list: NonConformity[] = [];
  const map: Record<string, string> = {
    "Nutricionista responsável no CNPJ": "nutri",
    "Manual de Boas Práticas e POPs": "documentacao",
    "Situação junto à vigilância sanitária": "fiscalizacao",
    "Treinamento de boas práticas da equipe": "treinamento",
  };
  for (const item of result.checklist) {
    if (item.done) continue;
    const key = map[item.area];
    if (key && NC_LIBRARY[key]) list.push(...NC_LIBRARY[key]);
  }
  // Sinaliza fiscalização específica quando autuação em curso.
  if (answers.fiscalizacao === "fisc_auto") {
    list.unshift({
      item: "Autuação ou interdição em curso",
      description:
        "Há um processo aberto que exige resposta imediata e plano de adequação.",
      norma: "Portaria 2.619/2011 · Art. 7",
      severity: "alta",
      deadline: "imediato",
    });
  }
  return list;
}

/* ---------- Plano de ação em 3 etapas ------------------------------ */

export interface ActionPhase {
  label: string;
  description: string;
  items: string[];
}

export function getActionPlan(nc: NonConformity[]): ActionPhase[] {
  const immediate = nc.filter((n) => n.deadline === "imediato").map((n) => n.item);
  const week = nc.filter((n) => n.deadline === "7dias").map((n) => n.item);
  const month = nc.filter((n) => n.deadline === "30dias").map((n) => n.item);

  return [
    {
      label: "Esta semana",
      description: "Itens críticos que não podem esperar a próxima fiscalização.",
      items: immediate.length
        ? immediate
        : ["Revisar pontos críticos junto ao nutricionista."],
    },
    {
      label: "Até 15 dias",
      description: "Documentos e processos que sustentam a conformidade.",
      items: week.length
        ? week
        : ["Atualizar a documentação técnica relevante para a sua operação."],
    },
    {
      label: "Até 30 dias",
      description: "Consolidação e cultura de boas práticas no time.",
      items: month.length
        ? month
        : ["Reforçar treinamento e registros internos da equipe."],
    },
  ];
}

/* ---------- Helpers de formatação ---------------------------------- */

/** Mascara um e-mail para exibir no banner sticky: ra****@gmail.com */
export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  const visible = user.slice(0, 2);
  return `${visible}${"*".repeat(Math.max(2, user.length - 2))}@${domain}`;
}
