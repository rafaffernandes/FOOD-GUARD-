import type { Canal, Modo } from "./types";

/**
 * Travas globais do maestro — valem para TODOS os especialistas.
 * Determinístico, sem IA. Lê do ambiente com defaults seguros.
 */

export interface GuardrailConfig {
  /** "simulacao" = registra e não envia (padrão). "real" = libera execução. */
  modo: Modo;
  /** Botão de pânico: desliga todo o processamento na hora. */
  killSwitch: boolean;
  /** Máx. de toques por contato numa sequência (aplicado na execução, com estado). */
  maxToques: number;
  /** Teto de envios ativos por dia (aplicado na execução, com estado). */
  limiteDia: number;
  /** Janela de horário comercial (hora local). */
  horario: { inicio: number; fim: number };
  /** Fuso em relação ao UTC (BRT = -3). */
  fusoOffset: number;
}

export const guardrails: GuardrailConfig = {
  modo: process.env.AGENTS_MODE === "real" ? "real" : "simulacao",
  killSwitch: process.env.AGENTS_KILL_SWITCH === "on",
  maxToques: 3,
  limiteDia: 50,
  horario: { inicio: 9, fim: 18 },
  fusoOffset: -3,
};

export function killSwitchAtivo(): boolean {
  return guardrails.killSwitch;
}

export function modoAtual(): Modo {
  return guardrails.modo;
}

/**
 * Está dentro do horário comercial? Seg–sex, 9h–18h em BRT — exatamente como o
 * Master Prompt do Maestro define. Converte para o horário local antes de checar
 * (dia e hora juntos, pra acertar a virada de meia-noite no fuso).
 */
export function dentroDoHorario(now: Date = new Date()): boolean {
  const local = new Date(now.getTime() + guardrails.fusoOffset * 3_600_000);
  const dia = local.getUTCDay(); // 0=domingo … 6=sábado, já em BRT
  const hora = local.getUTCHours();
  const diaUtil = dia >= 1 && dia <= 5; // seg–sex
  return (
    diaUtil && hora >= guardrails.horario.inicio && hora < guardrails.horario.fim
  );
}

/** Canais de contato ativo (sujeitos a horário/limites). Conteúdo/interno não. */
export function canalAtivo(canal: Canal): boolean {
  return canal === "whatsapp" || canal === "email" || canal === "ligacao";
}
