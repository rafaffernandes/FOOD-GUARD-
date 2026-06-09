import { site } from "@/lib/content/site";
import { MODELS, draftStructured } from "./client";
import { type ContentDraft, ContentDraftSchema } from "./schemas";

/**
 * Agente de Conteúdo — rascunha posts para LinkedIn/Instagram e artigos de blog,
 * sempre puxando para o diagnóstico no site. Human-in-the-loop: só rascunha;
 * a publicação é manual após aprovação. Calendário e pautas em
 * docs/fase-3/plano-conteudo-social.md e docs/marketing/calendario-editorial.md.
 */

export type ContentPlatform = "linkedin" | "instagram" | "blog";

export interface ContentBrief {
  platform: ContentPlatform;
  /** Tema/pauta (ex.: "5 itens que a vigilância cobra primeiro"). */
  topic: string;
  /** Público/segmento alvo (ex.: "donos de dark kitchen na Zona Leste"). */
  audience?: string;
}

export interface ContentResult extends ContentDraft {
  aiGenerated: boolean;
}

const FORMAT_HINT: Record<ContentPlatform, string> = {
  linkedin:
    "Post de LinkedIn (B2B): autoridade do nutricionista responsável; 120-200 palavras; quebra de linha entre ideias; 3-5 hashtags.",
  instagram:
    "Legenda de Instagram/Reel: gancho forte na 1ª linha; escaneável; ideia visual concreta (antes/depois de cozinha, bastidor); 5-8 hashtags.",
  blog: "Trecho de artigo de blog otimizado para SEO: título com a palavra-chave, abertura que nomeia a dor; markdown leve.",
};

export async function draftContent(
  brief: ContentBrief,
): Promise<ContentResult> {
  const task = `Rascunhe conteúdo para ${brief.platform}.

Tema: ${brief.topic}
Público: ${brief.audience ?? "donos e gestores de food service na Grande SP"}
Formato: ${FORMAT_HINT[brief.platform]}

Diretrizes:
- CTA sempre leva ao diagnóstico gratuito no site (${site.url}/diagnostico).
- Conteúdo educativo que tira o medo da fiscalização, não venda agressiva.
- "imageIdea": descreva uma imagem/Reel quando fizer sentido (null para blog).`;

  const ai = await draftStructured({
    model: MODELS.conteudo,
    schema: ContentDraftSchema,
    task,
    effort: "medium",
    maxTokens: 6000,
  });

  if (ai) return { ...ai, aiGenerated: true };

  // Fallback determinístico (sem ANTHROPIC_API_KEY).
  return {
    platform: brief.platform,
    hook: brief.topic,
    body: `Rascunho automático indisponível (IA não configurada). Tema sugerido: "${brief.topic}". Configure ANTHROPIC_API_KEY para gerar o conteúdo completo na voz da marca.`,
    hashtags: ["#vigilanciasanitaria", "#foodservice", "#rdc216"],
    cta: `Faça o diagnóstico gratuito: ${site.url}/diagnostico`,
    imageIdea: brief.platform === "blog" ? null : "Cozinha profissional organizada e em conformidade.",
    aiGenerated: false,
  };
}
