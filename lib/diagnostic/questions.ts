export interface QuestionOption {
  id: string;
  label: string;
  points: number; // pontos da opção; mais pontos = menor risco
  /** Se a área é considerada em ordem ao escolher esta opção. */
  compliant: boolean;
}

export interface Question {
  id: string;
  /** Área avaliada (usada no checklist). */
  area: string;
  title: string;
  help?: string;
  /** Frase de gap quando a área não está em ordem. */
  gap: string;
  options: QuestionOption[];
}

export const MAX_SCORE = 100;

/** Perguntas só de perfil (não viram item de checklist técnico). */
export const PROFILE_QUESTIONS = ["tipo", "porte"];

export const questions: Question[] = [
  {
    id: "tipo",
    area: "Perfil de risco da operação",
    title: "Qual o tipo da sua operação?",
    help: "Operações com produção própria têm exigências sanitárias mais rígidas.",
    gap: "Operação com perfil de risco elevado para fiscalização.",
    options: [
      { id: "padaria_pequena", label: "Padaria, lanchonete ou café", points: 15, compliant: true },
      { id: "restaurante_medio", label: "Restaurante ou buffet", points: 11, compliant: true },
      { id: "rede_coletiva", label: "Rede de unidades ou refeição coletiva", points: 6, compliant: false },
      { id: "dark_kitchen", label: "Dark kitchen ou cozinha industrial", points: 4, compliant: false },
    ],
  },
  {
    id: "porte",
    area: "Porte da operação",
    title: "Qual o porte da sua operação?",
    help: "Quanto mais colaboradores, maior a complexidade e o risco sanitário.",
    gap: "Operação de grande porte exige controle sanitário mais rigoroso.",
    options: [
      { id: "p_menos10", label: "Menos de 10 colaboradores", points: 15, compliant: true },
      { id: "p_ate10", label: "Até 10 colaboradores", points: 13, compliant: true },
      { id: "p_10_30", label: "Entre 10 e 30 colaboradores", points: 10, compliant: true },
      { id: "p_30_50", label: "Entre 30 e 50 colaboradores", points: 6, compliant: false },
      { id: "p_mais50", label: "Mais de 50 colaboradores", points: 3, compliant: false },
    ],
  },
  {
    id: "nutri",
    area: "Nutricionista responsável pela operação",
    title: "Você tem nutricionista no seu estabelecimento?",
    help: "A Portaria 2.619/2011 e a RDC 216/2004 tratam das exigências de segurança alimentar para operações de food service.",
    gap: "Contar com um nutricionista responsável que assine pela operação.",
    options: [
      {
        id: "nutri_rt",
        label: "Sim, com responsabilidade técnica (assina pela operação)",
        points: 25,
        compliant: true,
      },
      {
        id: "nutri_sem_rt",
        label: "Sim, mas sem responsabilidade técnica",
        points: 10,
        compliant: false,
      },
      {
        id: "nutri_nenhum",
        label: "Não tenho nutricionista",
        points: 0,
        compliant: false,
      },
    ],
  },
  {
    id: "documentacao",
    area: "Documentação técnica (POPs, doc. ANVISA, Manual)",
    title: "A documentação do seu estabelecimento está em dia?",
    help: "POPs, documentação ANVISA, Manual de Boas Práticas e fichas técnicas (RDC 216/2004).",
    gap: "Elaborar ou atualizar POPs, documentação ANVISA e Manual de Boas Práticas.",
    options: [
      { id: "doc_completa", label: "Sim, tudo em dia e revisado no último ano", points: 20, compliant: true },
      { id: "doc_parcial", label: "Tenho parte da documentação", points: 10, compliant: false },
      { id: "doc_desatualizada", label: "Está desatualizada ou não sei dizer", points: 4, compliant: false },
      { id: "doc_nenhuma", label: "Não tenho documentação", points: 0, compliant: false },
    ],
  },
  {
    id: "fiscalizacao",
    area: "Situação regular junto à fiscalização sanitária",
    title: "Como foi sua última fiscalização sanitária?",
    gap: "Plano de adequação para regularizar pendências com a vigilância.",
    options: [
      { id: "fisc_ok", label: "Passei sem nenhuma pendência", points: 15, compliant: true },
      { id: "fisc_nunca", label: "Nunca fui fiscalizado ou não lembro", points: 8, compliant: false },
      { id: "fisc_pendencia", label: "Passei, mas com pendências ou notificação", points: 4, compliant: false },
      { id: "fisc_autuacao", label: "Estou com autuação ou interdição em curso", points: 0, compliant: false },
    ],
  },
  {
    id: "treinamento",
    area: "Treinamento de manipuladores documentado",
    title: "Seus manipuladores têm treinamento em boas práticas?",
    help: "A capacitação de manipuladores precisa ser periódica e registrada.",
    gap: "Realizar treinamento de manipuladores de alimentos com registro.",
    options: [
      { id: "trein_ok", label: "Sim, documentado e recente", points: 10, compliant: true },
      { id: "trein_informal", label: "Treinamento informal ou antigo", points: 4, compliant: false },
      { id: "trein_nenhum", label: "Sem treinamento", points: 0, compliant: false },
    ],
  },
];

export type Answers = Record<string, string>; // questionId -> optionId
