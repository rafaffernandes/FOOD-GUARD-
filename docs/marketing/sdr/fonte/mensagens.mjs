// Fonte única das mensagens do SDR. O conteúdo comercial (proposta de valor,
// segmentação, funil, mensagens e objeções) vem de estrategia.json; aqui ficam
// as constantes da marca, o agendamento e as mensagens depois de marcada.
// WhatsApp e e-mail saem daqui com o mesmo texto; no e-mail entram assunto,
// assinatura com logo e rodapé.
//
// Campos entre colchetes são preenchidos à mão, lead a lead:
//   [Nome]              só se o nome do dono estiver confirmado; sem nome, abra sem vocativo
//   [Estabelecimento]   nome limpo, como o dono fala ("Sabor da Vila"). Ajuste o
//                       artigo em toda mensagem: do/da, no/na, o/a, ao/à
//   [dia] [hora]        o dia e o horário combinados com a pessoa
//   [endereço]          endereço da operação, confirmado com a pessoa na mensagem 5

import fs from "node:fs";

export const WA_NUMERO = "5511976466553";
export const WA_EXIBICAO = "(11) 97646-6553";
export const SITE = "foodguardassessoria.com.br";
export const CNPJ = "60.833.961/0001-73";

// Quem a Food Guard é. Consultoria nutricional para serviços de alimentação
// (food service). Nunca "empresa de nutricionistas" nem "assessoria de
// nutricionistas": o gerar.mjs recusa gerar se alguma dessas aparecer.
export const QUEM_SOMOS = "Food Guard, consultoria nutricional para serviços de alimentação";

// Fechamento padrão: pergunta aberta pelo melhor dia e horário, nunca duas
// opções prontas. Se a mensagem anterior da mesma conversa já fechou com ela,
// use uma das variações, para não repetir a frase palavra por palavra.
const CTA_VOCE = "Que dia e horário ficam melhores para você?";
export const CTA_VARIACOES = [
  "Que dia e horário ficam melhores para a visita?",
  CTA_VOCE,
  "Qual dia da semana costuma ser mais tranquilo para receber o nutricionista?",
  "Quando fica bom para você receber a visita?",
];

export const estrategia = JSON.parse(fs.readFileSync(new URL("./estrategia.json", import.meta.url), "utf8"));
const M = estrategia.mensagens;

const VAZIAS = new Set(["e", "com", "ou", "de", "da", "do", "dos", "das", "em"]);
const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/^\d+\.\s*/, "").replace(/\(.*?\)/g, "").split(/[^a-z0-9]+/)
  .filter((w) => w && !VAZIAS.has(w)).slice(0, 3).join("-");

const ASSUNTO = "[Estabelecimento]: rotina sanitária e fiscalização";

// ---- Cadência: no máximo três mensagens sem resposta -----------------------
// A primeira tem uma versão por segmento; a segunda e a terceira são iguais para todos.
export const primeiras = M.primeiro_contato_por_segmento.map((p, i) => ({
  id: `1-${slug(p.segmento)}`,
  segmento: p.segmento,
  porque: p.por_que,
  texto: p.texto,
  email: { assunto: ASSUNTO, fio: "novo" },
}));

export const cadencia = [
  ...primeiras.map((p) => ({ ...p, numero: 1, nome: "Primeiro contato" })),
  {
    id: "2-segundo-contato", numero: 2, nome: "Segundo contato", quando: "Sexta · só se não respondeu",
    regra: M.segundo_contato.por_que, texto: M.segundo_contato.texto,
    email: { assunto: `Re: ${ASSUNTO}`, fio: "resposta" },
  },
  {
    id: "3-ultima-tentativa", numero: 3, nome: "Encerramento", quando: "Terça seguinte · só se não respondeu",
    regra: M.ultima_tentativa.por_que, texto: M.ultima_tentativa.texto,
    email: { assunto: `Re: ${ASSUNTO}`, fio: "resposta" },
  },
];

// ---- Respondeu: descoberta e oferta da visita ------------------------------
export const descoberta = M.descoberta.map((d, i) => ({ id: `d${i + 1}`, ...d }));
export const ofertaVisita = M.oferta_visita;

export const agendamento = [
  {
    id: "5-marcando",
    letra: "5",
    nome: "Escolheu o dia",
    quando: "Assim que a pessoa escolher",
    texto:
      "Combinado! Fica [dia], às [hora].\n\n" +
      "O nutricionista chega identificado como Food Guard, e na véspera a gente manda um lembrete por aqui.\n\n" +
      "Só para confirmar: o endereço é [endereço], e é você mesmo quem vai receber?",
    nota: "Antes de mandar, confira a agenda. Se o horário pedido estiver ocupado: \"Nesse horário a agenda do nutricionista já está ocupada, [Nome]. Tenho [dia] às [hora] livre, serve para você? Se não, me diz outro que eu confiro.\" Se quem recebe for outra pessoa, anotar o nome na planilha e usar na confirmação.",
  },
];

// ---- Depois de marcada -----------------------------------------------------
export const posAgendamento = [
  {
    id: "confirmacao",
    nome: "Confirmação",
    quando: "Assim que o endereço for confirmado",
    texto:
      "Visita agendada, [Nome]!\n\n" +
      "Data: [dia], às [hora]\nEndereço: [endereço]\nQuem vai: um nutricionista da Food Guard\n\n" +
      "Se precisar remarcar, é só avisar por aqui. Até lá!\n\nEquipe Food Guard",
    semNome: "Visita agendada!",
  },
  {
    id: "lembrete",
    nome: "Lembrete",
    quando: "Véspera da visita, de manhã",
    texto:
      "Oi, [Nome]! Passando para lembrar da visita do nutricionista da Food Guard amanhã, [dia] às [hora], no [Estabelecimento].\n\n" +
      "Está tudo certo? Se surgir algum imprevisto, é só avisar que a gente remarca.\n\nEquipe Food Guard",
    semNome: "Oi! Passando para lembrar da visita do nutricionista da Food Guard amanhã, [dia] às [hora], no [Estabelecimento].",
    nota: "Sem resposta até o fim do dia: na manhã da visita, mandar \"Bom dia, [Nome]! O nutricionista da Food Guard passa hoje às [hora] no [Estabelecimento]. Segue de pé?\". Sem resposta até duas horas antes, ligar para o estabelecimento antes de o nutricionista sair.",
  },
  {
    id: "nao-aconteceu",
    nome: "A visita não aconteceu",
    quando: "No mesmo dia",
    texto:
      "Oi, [Nome]! O nutricionista da Food Guard passou hoje às [hora] no [Estabelecimento], mas não deu para fazer a visita. Imagino que tenha surgido algum imprevisto.\n\n" +
      `Vamos remarcar? ${CTA_VOCE}\n\nEquipe Food Guard`,
    nota: "Sem resposta, uma retomada em 30 dias. Segunda falta: encerrar.",
  },
];

// ---- Roteiro de objeções ---------------------------------------------------
export const respostas = M.objecoes.map((o) => ({ gatilho: o.gatilho, texto: o.texto, nota: o.nota }));

// Mensagem automática do WhatsApp Business (saudação, cardápio) não conta
// como resposta: o lead segue na cadência. Áudio do lead conta: ouvir,
// responder por texto começando pelo que a pessoa disse e anotar na planilha.
// O SDR não manda áudio.
