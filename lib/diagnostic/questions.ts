export interface QuestionOption {
  id: string;
  label: string;
  /** Pontos de risco da opção (quanto maior, pior). */
  risk: number;
}

export interface Question {
  id: string;
  /** Área avaliada (usada no checklist). */
  area: string;
  title: string;
  help?: string;
  /** Frase de gap quando a área não está em ordem (risco > 0). */
  gap: string;
  options: QuestionOption[];
}

/** Perguntas só de perfil (não viram item de checklist técnico). */
export const PROFILE_QUESTIONS = ["tipo"];

export const questions: Question[] = [
  {
    id: "tipo",
    area: "Perfil de risco da operação",
    title: "Qual o tipo da sua operação?",
    help: "A categoria define quais normas se aplicam (RDC 216/2004, Portaria 2.619/2011).",
    gap: "Operação com perfil de risco elevado para fiscalização.",
    options: [
      { id: "escola", label: "Escola, creche ou refeição coletiva", risk: 20 },
      { id: "restaurante", label: "Restaurante, bar ou dark kitchen", risk: 15 },
      { id: "padaria", label: "Padaria, confeitaria ou produção", risk: 12 },
      { id: "hotel", label: "Hotel, buffet ou eventos", risk: 18 },
      { id: "industria", label: "Indústria de alimentos ou outro", risk: 22 },
    ],
  },
  {
    id: "nutri",
    area: "Nutricionista responsável no CNPJ",
    title: "Você tem nutricionista responsável no CNPJ hoje?",
    help: "O nutricionista responsável registrado no CRN-3 é exigido pela vigilância em quase todas as operações de alimento.",
    gap: "Designar um nutricionista responsável (CRN ativo) que acompanhe a operação.",
    options: [
      { id: "nutri_ativo", label: "Sim, nutricionista ativo e com visitas regulares", risk: 0 },
      { id: "nutri_fantasma", label: "Sim, no papel — mas não acompanha", risk: 10 },
      { id: "nutri_nenhum", label: "Não tenho nutricionista designado", risk: 20 },
      { id: "nutri_naosei", label: "Não sei dizer", risk: 15 },
    ],
  },
  {
    id: "documentacao",
    area: "Manual de Boas Práticas e POPs",
    title: "Manual de Boas Práticas e POPs estão em dia?",
    help: "A fiscalização pede o Manual de Boas Práticas impresso. Sem ele, autuação imediata.",
    gap: "Elaborar ou atualizar o Manual de Boas Práticas e os POPs.",
    options: [
      { id: "doc_ok", label: "Sim, atualizados nos últimos 12 meses", risk: 0 },
      { id: "doc_desatualizado", label: "Existem, mas estão desatualizados", risk: 8 },
      { id: "doc_parcial", label: "Tenho alguns, mas não todos", risk: 12 },
      { id: "doc_nenhum", label: "Não tenho / nunca foram feitos", risk: 18 },
    ],
  },
  {
    id: "fiscalizacao",
    area: "Situação junto à vigilância sanitária",
    title: "Quando foi a última visita da vigilância?",
    help: "A vigilância opera por amostragem. Quem nunca foi fiscalizado pode ser o próximo da fila.",
    gap: "Plano de adequação para a próxima visita da vigilância.",
    options: [
      { id: "fisc_ok", label: "Nos últimos 12 meses, sem ressalvas", risk: 0 },
      { id: "fisc_auto", label: "Nos últimos 12 meses, com auto ou notificação", risk: 15 },
      { id: "fisc_2anos", label: "Há mais de 2 anos", risk: 6 },
      { id: "fisc_nunca", label: "Nunca recebi fiscalização", risk: 10 },
    ],
  },
  {
    id: "treinamento",
    area: "Treinamento de boas práticas da equipe",
    title: "Sua equipe recebeu treinamento de boas práticas nos últimos 12 meses?",
    help: "Treinamento registrado em ata é exigência da maioria das vigilâncias municipais.",
    gap: "Treinar a equipe em boas práticas e registrar em ata.",
    options: [
      { id: "trein_ok", label: "Sim, toda a equipe, com ata", risk: 0 },
      { id: "trein_parcial", label: "Sim, parcial, sem registro formal", risk: 6 },
      { id: "trein_antigo", label: "Houve treinamento há mais de 12 meses", risk: 10 },
      { id: "trein_nunca", label: "Nunca foi feito", risk: 15 },
    ],
  },
];

export type Answers = Record<string, string>; // questionId -> optionId
