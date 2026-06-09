// Alinhado ao zod/v4 (subpath do zod 3.25+) que o helper zodOutputFormat do
// Anthropic SDK usa. Independente dos schemas de formulário do projeto (zod v3).
import { z } from "zod/v4";

/**
 * Schemas de saída dos agentes (Zod). Usados com structured outputs do Claude
 * (`zodOutputFormat`) e como contrato do que é gravado no Supabase para
 * aprovação humana. Mantidos simples (enums/strings/arrays) — sem restrições
 * numéricas/min-max, que structured outputs não suporta.
 */

/** Rascunho de abordagem outbound (agente de prospecção). */
export const OutreachDraftSchema = z.object({
  channel: z.enum(["whatsapp", "email"]),
  /** Assunto (somente e-mail; null no WhatsApp). */
  subject: z.string().nullable(),
  /** Mensagem pronta para revisão humana — já com CTA e opt-out. */
  message: z.string(),
  /** Por que este ângulo — contexto para quem aprova. */
  rationale: z.string(),
});
export type OutreachDraft = z.infer<typeof OutreachDraftSchema>;

/** Rascunho de follow-up para lead que veio do diagnóstico (qualificação). */
export const FollowUpDraftSchema = z.object({
  channel: z.enum(["whatsapp", "email", "ligacao"]),
  message: z.string(),
  rationale: z.string(),
});
export type FollowUpDraft = z.infer<typeof FollowUpDraftSchema>;

/** Rascunho de conteúdo (agente de conteúdo) para LinkedIn, Instagram ou blog. */
export const ContentDraftSchema = z.object({
  platform: z.enum(["linkedin", "instagram", "blog"]),
  /** Primeira linha que prende a atenção. */
  hook: z.string(),
  /** Corpo do post/artigo. */
  body: z.string(),
  hashtags: z.array(z.string()),
  /** Chamada para ação — sempre puxando pro diagnóstico no site. */
  cta: z.string(),
  /** Sugestão de imagem/Reel (null se não aplicável). */
  imageIdea: z.string().nullable(),
});
export type ContentDraft = z.infer<typeof ContentDraftSchema>;
