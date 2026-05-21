export interface QuestionOption {
  id: string;
  label: string;
  points: number; // 0-20 — mais pontos = mais conformidade = menor risco
  /** Se a área é considerada em conformidade ao escolher esta opção. */
  compliant: boolean;
}

export interface Question {
  id: string;
  /** Área técnica que a pergunta avalia (usada no checklist). */
  area: string;
  title: string;
  help?: string;
  /** Frase de gap quando a área não está em conformidade. */
  gap: string;
  options: QuestionOption[];
}

export const MAX_SCORE = 100;

export const questions: Question[] = [
  {
    id: "tipo",
    area: "Perfil de risco da operação",
    title: "Qual o tipo e porte da sua operação?",
    help: "Operações maiores ou com produção própria têm exigências sanitárias mais rígidas.",
    gap: "Operação com perfil de risco elevado para fiscalização.",
    options: [
      {
        id: "padaria_pequena",
        label: "Padaria, lanchonete ou café pequeno (até 10 colaboradores)",
        points: 20,
        compliant: true,
      },
      {
        id: "restaurante_medio",
        label: "Restaurante ou buffet médio (11 a 50 colaboradores)",
        points: 14,
        compliant: true,
      },
      {
        id: "rede_coletiva",
        label: "Rede com múltiplas unidades ou refeição coletiva (51 a 200)",
        points: 8,
        compliant: false,
      },
      {
        id: "dark_kitchen",
        label: "Dark kitchen ou cozinha industrial",
        points: 6,
        compliant: false,
      },
    ],
  },
  {
    id: "rt",
    area: "Responsável Técnico nutricionista (CRN ativo)",
    title: "Você tem Responsável Técnico nutricionista hoje?",
    help: "A Resolução CFN nº 600/2018 exige um RT nutricionista para operações de food service.",
    gap: "Designar um Responsável Técnico nutricionista com CRN ativo.",
    options: [
      {
        id: "rt_formal",
        label: "Sim — RT nutricionista com CRN ativo e contrato",
        points: 20,
        compliant: true,
      },
      {
        id: "rt_informal",
        label: "Tenho um RT informal, sem contrato ou que aparece pouco",
        points: 8,
        compliant: false,
      },
      {
        id: "rt_nenhum",
        label: "Não tenho Responsável Técnico",
        points: 0,
        compliant: false,
      },
    ],
  },
  {
    id: "documentacao",
    area: "Documentação técnica (Manual, POPs, APPCC, fichas)",
    title: "Como está sua documentação técnica?",
    help: "Manual de Boas Práticas, POPs, APPCC e fichas técnicas (RDC 216/2004).",
    gap: "Elaborar ou atualizar Manual de Boas Práticas, POPs e fichas técnicas.",
    options: [
      {
        id: "doc_completa",
        label: "Tudo em dia e revisado no último ano",
        points: 20,
        compliant: true,
      },
      {
        id: "doc_parcial",
        label: "Tenho parte da documentação",
        points: 10,
        compliant: false,
      },
      {
        id: "doc_desatualizada",
        label: "Está desatualizada ou não sei dizer",
        points: 4,
        compliant: false,
      },
      {
        id: "doc_nenhuma",
        label: "Não tenho nenhum documento técnico",
        points: 0,
        compliant: false,
      },
    ],
  },
  {
    id: "fiscalizacao",
    area: "Situação regular junto à fiscalização sanitária",
    title: "Como foi sua última fiscalização sanitária?",
    gap: "Plano de adequação para regularizar pendências com a vigilância sanitária.",
    options: [
      {
        id: "fisc_ok",
        label: "Passei sem nenhuma pendência",
        points: 20,
        compliant: true,
      },
      {
        id: "fisc_nunca",
        label: "Nunca fui fiscalizado ou não lembro",
        points: 10,
        compliant: false,
      },
      {
        id: "fisc_pendencia",
        label: "Passei, mas com pendências ou notificação",
        points: 6,
        compliant: false,
      },
      {
        id: "fisc_autuacao",
        label: "Estou com autuação ou interdição em curso",
        points: 0,
        compliant: false,
      },
    ],
  },
  {
    id: "treinamento",
    area: "Treinamento de manipuladores documentado",
    title: "Seus manipuladores têm treinamento em boas práticas?",
    help: "A capacitação de manipuladores precisa ser periódica e registrada.",
    gap: "Realizar treinamento de manipuladores de alimentos com registro.",
    options: [
      {
        id: "trein_ok",
        label: "Sim — treinamento documentado e recente",
        points: 20,
        compliant: true,
      },
      {
        id: "trein_informal",
        label: "Treinamento informal ou antigo",
        points: 8,
        compliant: false,
      },
      {
        id: "trein_nenhum",
        label: "Sem treinamento",
        points: 0,
        compliant: false,
      },
    ],
  },
];

export type Answers = Record<string, string>; // questionId -> optionId
