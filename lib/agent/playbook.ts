import type { RiskBand } from "@/lib/diagnostic/engine";
import type { LeadPayload } from "@/lib/integrations/types";
import type { Channel, QualifiedLead } from "./qualify";

/**
 * Playbook de follow-up por tier. Gera a 1ª mensagem e a sequência de toques.
 *
 * Os textos respeitam a voz da marca (nunca "RT"; RDC 216/2004 + Portaria
 * 2.619/2011; sem "carência"/"dinheiro de volta"). `draftFirstMessage` é o ponto
 * onde a camada de IA (Claude) pode entrar pra personalizar — com fallback neste
 * template determinístico se não houver `ANTHROPIC_API_KEY`.
 */

export interface FollowUpStep {
  channel: Channel;
  /** Quando enviar, em horas a partir da captura do lead. */
  afterHours: number;
  message: string;
}

const BAND_LABEL: Record<RiskBand, string> = {
  critico: "alto",
  medio: "médio",
  baixo: "baixo",
};

const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;

export function draftFirstMessage(lead: LeadPayload, q: QualifiedLead): string {
  const nome = firstName(lead.name);
  const banda = BAND_LABEL[lead.band];
  const autuado = lead.answers.fiscalizacao === "fisc_auto";
  const semNutri = lead.answers.nutri === "nutri_nenhum";

  if (q.tier === "A") {
    const gancho = autuado
      ? "e que houve uma autuação ou notificação recente"
      : semNutri
        ? "e que a operação ainda está sem nutricionista designado"
        : "e que há itens que costumam ser os primeiros cobrados em fiscalização";
    return (
      `Oi ${nome}, aqui é o Renan, nutricionista responsável da Food Guard. ` +
      `Vi que a ${lead.company} saiu com risco ${banda} no diagnóstico ${gancho}. ` +
      `Esse é exatamente o tipo de situação que a gente resolve com documentação ` +
      `em dia (RDC 216 e Portaria 2.619) e acompanhamento presencial. ` +
      `Consegue falar 10 minutos hoje?`
    );
  }

  if (q.tier === "B") {
    return (
      `Oi ${nome}, aqui é a Food Guard — nutricionista responsável pra food service. ` +
      `Seu diagnóstico apontou risco ${banda} na ${lead.company}. ` +
      `Posso te mostrar em 10 min como deixar a operação pronta pra qualquer ` +
      `fiscalização. Qual o melhor horário pra uma conversa rápida?`
    );
  }

  return (
    `Olá ${nome}, obrigado por fazer o diagnóstico da Food Guard. ` +
    `Sua operação está bem encaminhada (risco ${banda}) — o segredo agora é ` +
    `manter tudo auditável. Nos próximos dias te envio um material prático de ` +
    `boas práticas; qualquer dúvida, é só responder este e-mail.`
  );
}

export function playbook(lead: LeadPayload, q: QualifiedLead): FollowUpStep[] {
  const soft: Channel = lead.whatsappOptin ? "whatsapp" : "email";
  const first: FollowUpStep = {
    channel: q.channel,
    afterHours: 0,
    message: draftFirstMessage(lead, q),
  };

  if (q.tier === "A") {
    return [
      first,
      {
        channel: soft,
        afterHours: 4,
        message: `Passando aqui de novo, ${firstName(lead.name)} — consigo te ligar ainda hoje ou amanhã cedo. Qual prefere?`,
      },
      {
        channel: "email",
        afterHours: 24,
        message:
          "Segue o relatório completo do seu diagnóstico em anexo, com o checklist do que priorizar. Quando quiser, marcamos a conversa.",
      },
    ];
  }

  if (q.tier === "B") {
    return [
      first,
      {
        channel: soft,
        afterHours: 24,
        message: `${firstName(lead.name)}, ficou alguma dúvida do diagnóstico? Te explico rapidinho o que mais pesa na sua nota.`,
      },
      {
        channel: "email",
        afterHours: 72,
        message:
          "Separei um artigo sobre o que a vigilância cobra primeiro numa fiscalização. Se quiser, agendamos uma avaliação sem compromisso.",
      },
    ];
  }

  return [
    first,
    {
      channel: "email",
      afterHours: 72,
      message:
        "Como manter seu Manual de Boas Práticas e POPs sempre auditáveis: um guia rápido pra não perder a conformidade ao longo do tempo.",
    },
    {
      channel: "email",
      afterHours: 168,
      message:
        "Se a operação crescer ou abrir novo ponto, a régua da vigilância muda. Quando fizer sentido, a Food Guard te dá esse suporte recorrente.",
    },
  ];
}
