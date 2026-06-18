import { site } from "@/lib/content/site";
import { MODELS, draftStructured } from "./client";
import { PROSPECCAO_PERSONA } from "./personas";
import { type OutreachDraft, OutreachDraftSchema } from "./schemas";

/**
 * Agente de Prospecção — foco em food service RECÉM-ABERTO na Grande SP
 * (Zona Leste no primeiro momento). Recebe um prospect já enriquecido (a
 * ingestão de dados — Receita/CNPJ, JUCESP, APIs — é descrita em
 * docs/fase-3/agente-prospeccao.md) e rascunha a 1ª abordagem.
 *
 * Human-in-the-loop: este módulo só RASCUNHA. O envio (WhatsApp/e-mail) é feito
 * após aprovação humana. Toda mensagem inclui opt-out (LGPD/anti-spam).
 */

export interface Prospect {
  companyName: string;
  /** CNAE principal (ex.: "5611-2/01"). */
  cnae: string;
  /** Segmento inferido do CNAE (restaurante, padaria, dark kitchen...). */
  segment: string;
  /** Bairro (foco inicial: Zona Leste de SP). */
  neighborhood: string;
  /** Data de abertura (ISO). */
  openedAt: string;
  /** Dias desde a abertura — quanto menor, mais quente. */
  ageDays: number;
  /** Telefone de contato (WhatsApp), quando disponível. */
  phone?: string;
}

export interface ProspectOutreach extends OutreachDraft {
  aiGenerated: boolean;
}

export async function draftProspectOutreach(
  p: Prospect,
): Promise<ProspectOutreach> {
  const task = `Rascunhe a PRIMEIRA mensagem de prospecção por WhatsApp para uma empresa de food service RECÉM-ABERTA.

Dados do prospect:
${JSON.stringify(p, null, 2)}

Diretrizes:
- Gancho central: a empresa abriu há pouco (${p.ageDays} dias) e, nos primeiros meses, a vigilância sanitária costuma visitar/notificar.
- Personalize com o segmento (${p.segment}) e o bairro (${p.neighborhood}).
- CTA único: fazer o diagnóstico gratuito (2 min) no site.
- Inclua opt-out claro ao final (ex.: "Se preferir não receber, responda SAIR").
- Máximo 4 frases curtas. Não cite preço. Não prometa nutricionista responsável de graça.
- "rationale": explique em 1 frase por que esse ângulo, para quem vai aprovar.`;

  const ai = await draftStructured({
    model: MODELS.prospeccao,
    schema: OutreachDraftSchema,
    system: PROSPECCAO_PERSONA,
    task,
    effort: "medium",
  });

  if (ai) return { ...ai, aiGenerated: true };

  // Fallback determinístico (sem ANTHROPIC_API_KEY).
  return {
    channel: "whatsapp",
    subject: null,
    message: `Olá! Vi que a ${p.companyName} abriu há pouco em ${p.neighborhood}. Nos primeiros meses a vigilância sanitária costuma passar — e a RDC 216/2004 já se aplica. Faça um diagnóstico gratuito (2 min) e veja se sua operação passaria numa fiscalização: ${site.url}/diagnostico. Se preferir não receber, responda SAIR.`,
    rationale:
      "Fallback determinístico (IA não configurada). Gancho: recém-aberta + vigilância nos primeiros meses.",
    aiGenerated: false,
  };
}
