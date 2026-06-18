import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import type { z } from "zod/v4";

/**
 * Cliente Claude compartilhado pelos agentes da Fase 3 (Prospecção,
 * Qualificação, Conteúdo). Segue o padrão de degradação graciosa do projeto:
 * sem ANTHROPIC_API_KEY, `getAnthropic()` devolve null e cada agente cai num
 * rascunho determinístico (template), sem quebrar build/dev.
 *
 * Arquitetura: Claude API + tool use rodando no próprio Next/Vercel (não
 * Managed Agents) — encaixa na stack, no fluxo human-in-the-loop (agente
 * rascunha → grava no Supabase → humano aprova → envia) e nas integrações que
 * já existem. Ver docs/fase-3/estrategia-agentes.md.
 */

/**
 * Modelo por agente. Decisão do Renan: Sonnet 4.6 — um agente que PENSA antes
 * de responder (adaptive thinking), com bom equilíbrio custo×qualidade
 * (US$3/US$15 por 1M). O cliente abaixo envia thinking adaptive + effort para
 * Sonnet/Opus/Fable; se um dia trocar algum por "claude-haiku-4-5" (US$1/US$5,
 * sem raciocínio) ele se adapta sozinho.
 */
export const MODELS = {
  prospeccao: "claude-sonnet-4-6",
  qualificacao: "claude-sonnet-4-6",
  conteudo: "claude-sonnet-4-6",
} as const;

export const anthropicConfigured = Boolean(process.env.ANTHROPIC_API_KEY);

let client: Anthropic | null = null;

/** Cliente singleton. null em modo dev (sem chave). Use só no servidor. */
export function getAnthropic(): Anthropic | null {
  if (!anthropicConfigured) return null;
  if (!client) client = new Anthropic();
  return client;
}

/**
 * Voz da marca — bloco estável de system prompt. Fica no início do prompt e
 * recebe cache_control para aproveitar prompt caching entre chamadas (vários
 * leads/posts compartilham este prefixo).
 */
export const BRAND_VOICE = `Você escreve pela Food Guard, consultoria nutricional para food service na Grande São Paulo.

REGRAS DE VOZ (obrigatórias):
- Diga "nutricionista responsável", NUNCA "RT" ou "responsável técnico" abreviado.
- Legislação: cite "RDC 216/2004 (Anvisa)" e "Portaria 2.619/2011" quando fizer sentido. NUNCA invente normas (nada de "CFN 600").
- NUNCA use "carência" nem "dinheiro de volta".
- Tom: especialista que tira o medo da fiscalização — direto, acolhedor, sem juridiquês e sem ser alarmista barato.
- Sempre que houver CTA, direcione ao diagnóstico gratuito (2 minutos) no site.
- Português do Brasil. Sem emojis em excesso (no máximo 1, e só quando couber).
- Planos: Básico, Essencial, Premium — nutricionista responsável é exclusivo do Premium. Se você pode ou não citar preço depende da sua persona específica (bloco abaixo).`;

/**
 * Faz uma chamada com saída estruturada (Zod) usando a voz da marca cacheada.
 * Retorna o objeto validado ou null se a IA não estiver configurada (o chamador
 * deve então usar um fallback determinístico).
 */
export async function draftStructured<T extends z.ZodType>(opts: {
  model: string;
  schema: T;
  /** Instrução específica da tarefa (vai no turno do usuário). */
  task: string;
  /**
   * Persona/constituição do agente (system prompt específico). Entra como 2º
   * bloco de system, depois do BRAND_VOICE. Fonte: lib/agent/personas.ts.
   */
  system?: string;
  effort?: "low" | "medium" | "high" | "max";
  maxTokens?: number;
}): Promise<z.infer<T> | null> {
  const anthropic = getAnthropic();
  if (!anthropic) return null;

  // BRAND_VOICE primeiro (cacheia entre todos os agentes); persona depois
  // (cacheia entre chamadas do mesmo agente). Ambos com cache_control.
  const system: Anthropic.TextBlockParam[] = [
    { type: "text", text: BRAND_VOICE, cache_control: { type: "ephemeral" } },
  ];
  if (opts.system) {
    system.push({
      type: "text",
      text: opts.system,
      cache_control: { type: "ephemeral" },
    });
  }

  // Haiku 4.5 (o mais barato) NÃO aceita thinking adaptive nem output_config.effort
  // — enviá-los retorna 400. Só Opus 4.6+ / Sonnet 4.6 / Fable aceitam. Detecta
  // pelo id e monta os parâmetros conforme o modelo configurado em MODELS.
  const aceitaAdaptiveEffort = !opts.model.includes("haiku");

  const message = await anthropic.messages.parse({
    model: opts.model,
    max_tokens: opts.maxTokens ?? 4000,
    system,
    ...(aceitaAdaptiveEffort
      ? { thinking: { type: "adaptive" as const } }
      : {}),
    output_config: {
      format: zodOutputFormat(opts.schema),
      ...(aceitaAdaptiveEffort ? { effort: opts.effort ?? "medium" } : {}),
    },
    messages: [{ role: "user", content: opts.task }],
  });

  return message.parsed_output;
}
