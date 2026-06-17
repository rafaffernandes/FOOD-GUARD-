import { site } from "@/lib/content/site";
import type { Prospect } from "../../prospeccao";
import type { AgentAction, AgentEvent, Especialista } from "../types";

/**
 * Especialista nº 1 do Maestro — PROSPECÇÃO de food service RECÉM-ABERTO na
 * Zona Leste de SP. Tudo TRAVADO e determinístico:
 *  - textos fixos (aprovados pelo cliente) — o agente só preenche {empresa}/{link};
 *  - roteamento por regra (Zona Leste + aberto há <= 90 dias);
 *  - árvore de resposta: qualquer resposta -> auto-confirma e passa pro nutricionista responsável;
 *    "SAIR" e afins -> opt-out. NUNCA responde dúvida técnica sozinho.
 *
 * IMPORTANTE: este agente NÃO qualifica lead. Ele só abre a conversa e leva ao
 * site/diagnóstico. A qualificação (tier A/B/C) acontece depois, quando a pessoa
 * faz o diagnóstico e vira lead (agente de Qualificação).
 */

const LINK_DIAGNOSTICO = `${site.url}/diagnostico?utm_source=prospeccao&utm_medium=whatsapp&utm_campaign=recem-aberto-zl`;

/** Bairros da Zona Leste no foco inicial (normalizados: minúsculo, sem acento). */
export const ZONA_LESTE = [
  "tatuape", "mooca", "penha", "itaquera", "aricanduva", "vila prudente",
  "sao miguel", "itaim paulista", "guaianases", "cidade tiradentes",
  "artur alvim", "carrao", "vila formosa", "ermelino matarazzo",
  "sao mateus", "sapopemba", "cangaiba", "vila matilde", "vila carrao",
];

const norm = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

export function ehZonaLeste(bairro: string): boolean {
  const b = norm(bairro);
  return ZONA_LESTE.some((z) => b.includes(z));
}

export type Passo = "d0_ate30" | "d0_31a90" | "d3" | "d7";

/** Textos TRAVADOS. Só {empresa} e {link} são preenchidos — nada é gerado por IA. */
export const TEMPLATES: Record<Passo, (empresa: string) => string> = {
  d0_ate30: (empresa) =>
`Oi, tudo bem?

Aqui é da Food Guard - Assessoria em nutrição👋

Vimos que a ${empresa} iniciou as atividades recentemente e gostaríamos de parabenizar pela abertura do negócio! 🎉

Sabemos que os primeiros meses são uma correria, e muita gente acaba descobrindo só depois que algumas exigências da Vigilância Sanitária já deveriam estar organizadas desde o início.

Somos especialistas em regularização e segurança dos alimentos para estabelecimentos de food service. Se surgir qualquer dúvida sobre documentação, alvarás, manual de boas práticas ou exigências da fiscalização, pode nos chamar. Ficaremos felizes em ajudar, sem compromisso.

👉 Se quiser, preparamos um diagnóstico gratuito que mostra em 2 minutos os principais pontos que a fiscalização avaliaria na sua cozinha: ${LINK_DIAGNOSTICO}`,

  d0_31a90: (empresa) =>
`Olá! Tudo bem?

Aqui é da Food Guard - Assessoria em nutrição 👋

Identificamos que a ${empresa} iniciou suas atividades há pouco tempo e gostaríamos de deixar nosso contato à disposição.

Os primeiros meses de operação costumam ser o período em que surgem mais dúvidas sobre Vigilância Sanitária, licenciamento e adequação da cozinha às exigências legais.

Caso queira entender quais são os principais pontos avaliados pelos fiscais e como evitar problemas futuros, estamos à disposição para orientar.`,

  d3: () =>
`Oi! Passando rapidamente porque sei que a rotina deve estar corrida 😅

Preparamos um diagnóstico gratuito que mostra os principais pontos que normalmente são avaliados pela Vigilância Sanitária em estabelecimentos de alimentação.

👉 ${LINK_DIAGNOSTICO}

Leva menos de 2 minutos para responder e pode ajudar a identificar oportunidades de melhoria antes de uma fiscalização.

Quando fizer o teste, podemos comentar os resultados juntos!`,

  d7: (empresa) =>
`Prometo que esta é a última mensagem 😊

Antes de encerrar, deixo uma informação importante: os problemas mais comuns encontrados em fiscalizações costumam estar relacionados a:

📄 Documentação obrigatória atualizada
🌡️ Controle e registro de temperaturas
👥 Treinamento da equipe em boas práticas

Vale a pena revisar esses três pontos periodicamente.

Desejamos muito sucesso para a ${empresa}! 🚀

E se em algum momento precisar de apoio com Vigilância Sanitária, documentação ou adequação da operação, pode contar com a Food Guard.`,
};

/** Resposta automática quando o prospect responde algo (qualquer coisa != opt-out). */
export const AUTO_CONFIRMACAO =
  "Que bom que respondeu! 😊 Vou encaminhar sua mensagem para o nosso nutricionista responsável — ele entra em contato ainda hoje, em horário comercial. Qualquer coisa, estamos por aqui!";

/** Confirmação de opt-out. */
export const OPTOUT_MSG = (empresa: string) =>
  `Sem problemas! Não enviaremos mais mensagens. Desejamos muito sucesso para a ${empresa}! 🙌`;

/** Palavras que disparam opt-out imediato. */
const OPTOUT_KEYWORDS = [
  "sair", "parar", "pare", "para de", "nao quero", "nao tenho interesse",
  "sem interesse", "descadastr", "remover", "remova", "stop", "cancelar", "nao perturbe",
];

export type ClasseResposta = "optout" | "humano";

/** Classifica a resposta do prospect (determinístico, sem IA). */
export function classificarResposta(texto: string): ClasseResposta {
  const t = norm(texto);
  return OPTOUT_KEYWORDS.some((k) => t.includes(k)) ? "optout" : "humano";
}

function mensagem(passo: Passo, prospect: Prospect): AgentAction {
  return {
    kind: "mensagem",
    canal: "whatsapp",
    para: prospect.phone ?? "(telefone do prospect)",
    templateId: passo,
    texto: TEMPLATES[passo](prospect.companyName),
  };
}

/** Mensagem de abertura (D0) — escolhe o ângulo pela idade da empresa. */
export function mensagemDeAbertura(prospect: Prospect): AgentAction {
  return mensagem(prospect.ageDays <= 30 ? "d0_ate30" : "d0_31a90", prospect);
}

/** Mensagem de um passo específico da cadência (usado pelo agendador e nos testes). */
export function mensagemDoPasso(passo: Passo, prospect: Prospect): AgentAction {
  return mensagem(passo, prospect);
}

/**
 * Trata uma resposta recebida do prospect. Regra: qualquer resposta encerra a
 * sequência. Opt-out -> confirma e descadastra. Caso contrário -> auto-confirma
 * e ALERTA o nutricionista responsável pra assumir (humano sempre; IA nunca negocia/responde dúvida).
 */
export function tratarResposta(texto: string, prospect: Prospect): AgentAction[] {
  if (classificarResposta(texto) === "optout") {
    return [
      {
        kind: "mensagem",
        canal: "whatsapp",
        para: prospect.phone ?? "(telefone do prospect)",
        templateId: "optout",
        texto: OPTOUT_MSG(prospect.companyName),
      },
    ];
  }
  return [
    {
      kind: "mensagem",
      canal: "whatsapp",
      para: prospect.phone ?? "(telefone do prospect)",
      templateId: "auto_confirmacao",
      texto: AUTO_CONFIRMACAO,
    },
    {
      kind: "notificar",
      assunto: `Prospect respondeu: ${prospect.companyName}`,
      texto: `${prospect.companyName} respondeu: "${texto}". Encerrei a sequência — o nutricionista responsável deve assumir a conversa em horário comercial.`,
    },
  ];
}

export const prospeccaoRecemAbertoZL: Especialista = {
  id: "prospeccao-recem-aberto-zl",
  evento: "empresa_nova",
  aplica(event: AgentEvent): boolean {
    if (event.type !== "empresa_nova") return false;
    const p = event.prospect;
    return p.ageDays <= 90 && ehZonaLeste(p.neighborhood);
  },
  async decidir(event: AgentEvent): Promise<AgentAction[]> {
    if (event.type !== "empresa_nova") return [];
    return [mensagemDeAbertura(event.prospect)];
  },
};

// ---------------------------------------------------------------------------
// Bateria de testes (cenários de mercado). Determinística — mesma entrada,
// mesma saída. Usada pela rota /api/agents/teste-prospeccao pra você validar.
// ---------------------------------------------------------------------------

export interface CenarioTeste {
  nome: string;
  dispara: boolean;
  acoes: AgentAction[];
}

const base = (over: Partial<Prospect>): Prospect => ({
  companyName: "Cantina da Maria",
  cnae: "5611-2/01",
  segment: "restaurante",
  neighborhood: "Tatuapé",
  openedAt: "2026-05-20",
  ageDays: 20,
  phone: "5511999999999",
  ...over,
});

export function cenariosDeTeste(): CenarioTeste[] {
  const ev = (p: Prospect): AgentEvent => ({ type: "empresa_nova", prospect: p });
  const recem = base({ ageDays: 12 });
  const meio = base({ companyName: "Padaria Pão Quente", ageDays: 65, neighborhood: "Penha" });
  const foraZL = base({ companyName: "Bar do Centro", neighborhood: "República" });
  const antiga = base({ companyName: "Restaurante Antigo", ageDays: 400 });

  return [
    { nome: "Recém-aberta ZL (12 dias) → D0 comercial com link", dispara: prospeccaoRecemAbertoZL.aplica(ev(recem)), acoes: [mensagemDeAbertura(recem)] },
    { nome: "ZL 65 dias → D0 leve (sem link)", dispara: prospeccaoRecemAbertoZL.aplica(ev(meio)), acoes: [mensagemDeAbertura(meio)] },
    { nome: "Fora da Zona Leste → NÃO dispara", dispara: prospeccaoRecemAbertoZL.aplica(ev(foraZL)), acoes: [] },
    { nome: "Aberta há 400 dias → NÃO dispara", dispara: prospeccaoRecemAbertoZL.aplica(ev(antiga)), acoes: [] },
    { nome: "Cadência: D3 (sem resposta)", dispara: true, acoes: [mensagemDoPasso("d3", recem)] },
    { nome: "Cadência: D7 (despedida)", dispara: true, acoes: [mensagemDoPasso("d7", recem)] },
    { nome: 'Resposta "Quero falar com alguém" → auto-confirma + humano', dispara: true, acoes: tratarResposta("Quero falar com alguém", recem) },
    { nome: 'Resposta "Quanto custa?" → auto-confirma + humano (não responde preço)', dispara: true, acoes: tratarResposta("Quanto custa?", recem) },
    { nome: 'Resposta "me manda mais info" → auto-confirma + humano', dispara: true, acoes: tratarResposta("me manda mais info", recem) },
    { nome: 'Resposta "SAIR" → opt-out', dispara: true, acoes: tratarResposta("SAIR", recem) },
    { nome: 'Resposta "não tenho interesse" → opt-out', dispara: true, acoes: tratarResposta("não tenho interesse, obrigado", recem) },
  ];
}
