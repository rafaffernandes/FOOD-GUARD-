import type { LeadPayload } from "@/lib/integrations/types";
import type { Prospect } from "../prospeccao";

/**
 * Contratos do maestro (orquestrador determinístico). Define os eventos que ele
 * escuta, o que um "especialista" precisa implementar e as ações que um
 * especialista pode pedir. Nada aqui usa IA nem envia mensagem — é só estrutura.
 */

/** Os 3 acontecimentos que o maestro sabe rotear. */
export type AgentEventType = "lead_novo" | "empresa_nova" | "hora_de_publicar";

export type AgentEvent =
  | { type: "lead_novo"; leadId?: string; lead: LeadPayload }
  | { type: "empresa_nova"; prospectId?: string; prospect: Prospect }
  | {
      type: "hora_de_publicar";
      platform: "linkedin" | "instagram" | "blog";
      topic?: string;
    };

export type Canal =
  | "whatsapp"
  | "email"
  | "ligacao"
  | "linkedin"
  | "instagram"
  | "blog"
  | "interno";

/** O que um especialista PEDE pra fazer. O maestro decide se executa. */
export type AgentAction =
  | { kind: "mensagem"; canal: Canal; para: string; templateId: string; texto: string }
  | { kind: "conteudo"; canal: Canal; texto: string }
  | { kind: "notificar"; assunto: string; texto: string }
  | { kind: "nenhuma"; motivo: string };

/**
 * Contrato de um especialista. Cada um trata UM tipo de evento e, dentro dele,
 * decide se se aplica (roteamento por segmento/canal). NUNCA envia — só devolve
 * as ações pretendidas; a execução (e as travas) são do maestro.
 */
export interface Especialista {
  /** Id único, ex.: "prospeccao-recem-aberto-zl". */
  id: string;
  /** Tipo de evento que este especialista trata. */
  evento: AgentEventType;
  /** Roteamento: este especialista se aplica a este evento? */
  aplica(event: AgentEvent): boolean;
  /** Produz as ações pretendidas (pode usar IA nas pontas, sempre travada). */
  decidir(event: AgentEvent): Promise<AgentAction[]>;
}

export type Modo = "simulacao" | "real";

export type DispatchResultado =
  | "sem_especialista"
  | "pausado_kill_switch"
  | "simulado"
  | "executado";

export interface DispatchResult {
  evento: AgentEventType;
  modo: Modo;
  especialista?: string;
  acoes: AgentAction[];
  resultado: DispatchResultado;
  observacoes: string[];
}
