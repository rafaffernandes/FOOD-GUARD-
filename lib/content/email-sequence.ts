import { site } from "./site";

/**
 * Sequência de e-mails que roda depois do relatório do diagnóstico.
 *
 * O e-mail zero (o relatório em si) já existe em `lib/integrations/report.ts`
 * e sai na hora. Os cinco abaixo vêm depois e ainda não estão ligados a
 * nenhum agendador — o `vercel.json` segue sem o bloco `crons` de propósito.
 * Enquanto não houver automação, o conteúdo serve para envio manual.
 *
 * Os trechos entre colchetes são preenchidos com dados do lead antes do envio.
 */

export type SequenceEmail = {
  /** Identificador estável — usado para marcar o que já foi enviado. */
  id: string;
  /** Dias após o diagnóstico. */
  delayDays: number;
  subject: string;
  /** Primeira linha que aparece na caixa de entrada, ao lado do assunto. */
  preheader: string;
  /** Parágrafos do corpo, na ordem. */
  body: string[];
  cta?: { label: string; href: string };
  /** Quando este e-mail NÃO deve ser enviado. */
  skipWhen?: string;
};

export const emailSequence: SequenceEmail[] = [
  {
    id: "erros-comuns",
    delayDays: 1,
    subject: "Os 3 erros que mais derrubam uma cozinha na fiscalização",
    preheader:
      "Nenhum deles tem a ver com sujeira. Os três são de registro.",
    body: [
      "Oi, [nome].",
      "Ontem você fez o diagnóstico da [nome do estabelecimento]. Hoje queria te contar uma coisa que surpreende quase todo mundo: os três motivos mais comuns de autuação não têm nada a ver com a cozinha estar suja.",
      "<b>1. Falta registro de temperatura.</b> O equipamento está funcionando, a comida está na temperatura certa, mas ninguém anota. Para a fiscalização, o que não foi registrado não aconteceu. É a não conformidade mais frequente que existe.",
      "<b>2. O Manual de Boas Práticas existe, mas não está assinado.</b> Muita casa tem um manual genérico baixado da internet, sem data e sem assinatura do responsável. Nesse estado ele não vale nada — e ainda mostra ao fiscal que ninguém cuida do assunto.",
      "<b>3. A capacitação da equipe não tem comprovante.</b> O treinamento até aconteceu, mas não há lista de presença, carga horária nem conteúdo registrado. Sem papel, não houve treinamento.",
      "Os três se resolvem com organização, não com obra. É por isso que adequação sanitária quase sempre custa menos do que o dono imagina.",
      "Qualquer dúvida, é só responder este e-mail.",
    ],
  },
  {
    id: "artigo-do-risco",
    delayDays: 3,
    subject: "Sobre o ponto que mais pesou no seu diagnóstico",
    preheader: "Escrevi um material sobre exatamente isso.",
    body: [
      "Oi, [nome].",
      "No seu diagnóstico, o item que mais pesou foi <b>[maior lacuna]</b>. Não é incomum — aparece na maioria das operações que avaliamos.",
      "Separei um material que explica esse ponto com calma: o que a norma exige, o que a fiscalização costuma pedir para ver e o que dá para resolver sem parar a operação.",
      "Não tem nada para comprar nessa leitura. É informação mesmo.",
      "Se depois de ler sobrar dúvida sobre o seu caso específico, responde aqui que eu te explico.",
    ],
    cta: { label: "Ler o material", href: `${site.url}/blog` },
  },
  {
    id: "visita-diagnostica",
    delayDays: 7,
    subject: "Dá para mapear sua cozinha inteira em duas horas",
    preheader: "Checklist de 80 itens, com relatório fotografado em 48h.",
    body: [
      "Oi, [nome].",
      "O diagnóstico online dá um retrato geral, mas ele tem um limite: responde cinco perguntas e não entra na sua cozinha.",
      "A <b>Visita Diagnóstica</b> resolve isso. São duas horas na operação, com checklist de 80 itens da RDC 216/2004 e da Portaria 2.619/2011. Em 48 horas você recebe um relatório com cada não conformidade fotografada e um plano de ação na ordem em que deve ser resolvido — do que te expõe mais para o que pode esperar.",
      "<b>São R$ 490, pagamento único.</b> Se você decidir seguir com um dos planos mensais em até 30 dias, esse valor é creditado na primeira mensalidade.",
      "O relatório é seu de qualquer forma, com ou sem contratação depois.",
      "Se quiser marcar, é só responder com o melhor dia da semana e o horário em que a cozinha está mais tranquila.",
    ],
    cta: { label: "Falar no WhatsApp", href: `https://wa.me/${site.whatsapp}` },
  },
  {
    id: "prova-social",
    delayDays: 14,
    subject: "O que encontramos numa cozinha parecida com a sua",
    preheader: "Trinta e uma não conformidades. Vinte e duas resolvidas na semana seguinte.",
    body: [
      "Oi, [nome].",
      "[CASO REAL — preencher com uma visita já realizada: tipo de operação, quantas não conformidades foram encontradas, quais eram as três mais graves, o que foi resolvido e em quanto tempo.]",
      "[Incluir a autorização do cliente para citar o caso, ainda que sem o nome da casa.]",
      "Se quiser o mesmo mapeamento na [nome do estabelecimento], responde aqui.",
    ],
    cta: { label: "Falar no WhatsApp", href: `https://wa.me/${site.whatsapp}` },
    skipWhen:
      "Não enviar enquanto não houver uma visita real concluída. Caso inventado destrói a confiança que os quatro e-mails anteriores construíram.",
  },
  {
    id: "newsletter",
    delayDays: 21,
    subject: "[Assunto do artigo da quinzena]",
    preheader: "O conteúdo novo do blog, sem oferta.",
    body: [
      "Oi, [nome].",
      "[Duas ou três frases sobre o artigo da quinzena — o problema que ele resolve, não o que ele contém.]",
      "Se não quiser mais receber, o link de descadastro está no rodapé. Sem ressentimento.",
    ],
    cta: { label: "Ler no blog", href: `${site.url}/blog` },
    skipWhen: "A partir daqui repete a cada 15 dias, sempre com o artigo mais recente.",
  },
];
