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
 * Modelo por agente. Default = Opus 4.8 (mais capaz).
 * Para alto volume/custo, troque o drafting por "claude-sonnet-4-6" e tarefas
 * simples por "claude-haiku-4-5" — é decisão de custo do negócio.
 */
export const MODELS = {
  prospeccao: "claude-opus-4-8",
  qualificacao: "claude-opus-4-8",
  conteudo: "claude-opus-4-8",
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
- Planos (não cite preço a menos que pedido): Básico, Essencial, Premium — nutricionista responsável é exclusivo do Premium.`;

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
  effort?: "low" | "medium" | "high" | "max";
  maxTokens?: number;
}): Promise<z.infer<T> | null> {
  const anthropic = getAnthropic();
  if (!anthropic) return null;

  const message = await anthropic.messages.parse({
    model: opts.model,
    max_tokens: opts.maxTokens ?? 4000,
    thinking: { type: "adaptive" },
    system: [
      {
        type: "text",
        text: BRAND_VOICE,
        cache_control: { type: "ephemeral" },
      },
    ],
    output_config: {
      effort: opts.effort ?? "medium",
      format: zodOutputFormat(opts.schema),
    },
    messages: [{ role: "user", content: opts.task }],
  });

  return message.parsed_output;
}
