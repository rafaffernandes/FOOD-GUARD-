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

/**
 * Com o autopreenchimento do navegador, quem é rápido envia em uns 2 s; robô de formulário
 * envia em menos de 1 s. 1,5 s separa os dois sem descartar lead real.
 */
const TEMPO_MINIMO_MS = 1_500;

/**
 * Quem estava com a página aberta na hora do deploy envia com o JavaScript antigo, que não
 * manda fillMs. Até esta data, a falta de fillMs não marca robô (o campo isca continua valendo).
 */
const FIM_DA_TRANSICAO = Date.parse("2026-11-07T00:00:00-03:00");

export function pareceBot(corpo: unknown): boolean {
  const sinais = sinaisDeBotSchema.safeParse(corpo);
  if (!sinais.success) return true;
  const { website, fillMs } = sinais.data;
  if (website && website.trim() !== "") return true;
  if (fillMs === undefined) return Date.now() > FIM_DA_TRANSICAO;
  return fillMs < TEMPO_MINIMO_MS;
}

/** Tempo de preenchimento informado, só para o log (nunca dado pessoal). */
export function tempoInformado(corpo: unknown): number | undefined {
  const sinais = sinaisDeBotSchema.safeParse(corpo);
  return sinais.success ? sinais.data.fillMs : undefined;
}

/**
 * Descarte de robô com a mesma cara de um envio real: a resposta real espera a gravação
 * no banco, então o descarte espera um tempo parecido antes de responder.
 */
export function esperarComoEnvioReal(): Promise<void> {
  return new Promise((r) => setTimeout(r, 150 + Math.random() * 250));
}
