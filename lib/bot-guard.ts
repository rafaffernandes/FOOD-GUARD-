import { z } from "zod";

/**
 * Primeira camada contra robôs nos formulários públicos, sem serviço externo: um
 * campo isca invisível (website) e o tempo entre o formulário aparecer e ser enviado
 * (fillMs, medido no próprio navegador para não depender do relógio de quem preenche).
 * Pega robô simples, que posta direto na rota ou preenche tudo de uma vez.
 * Não pega robô que imita navegador: para isso, um desafio como o Turnstile.
 */
export const sinaisDeBotSchema = z.object({
  website: z.string().max(200).optional(),
  fillMs: z.number().int().nonnegative().optional(),
});

/** Ninguém preenche nome, e-mail, telefone, empresa e cargo em menos de 3 segundos. */
const TEMPO_MINIMO_MS = 3_000;

export function pareceBot(corpo: unknown): boolean {
  const sinais = sinaisDeBotSchema.safeParse(corpo);
  if (!sinais.success) return true;
  const { website, fillMs } = sinais.data;
  if (website && website.trim() !== "") return true;
  if (fillMs === undefined || fillMs < TEMPO_MINIMO_MS) return true;
  return false;
}
