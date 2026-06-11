/**
 * Maestro dos agentes (orquestrador determinístico) — ponto de entrada.
 *
 * Uso:
 *   import { despachar } from "@/lib/agent/maestro";
 *   await despachar({ type: "empresa_nova", prospect });
 *
 * Os especialistas são registrados aqui no boot. Hoje, ativo:
 *  - prospeccao-recem-aberto-zl (prospecção recém-aberto Zona Leste).
 * Tudo roda em modo simulação (AGENTS_MODE) até liberação.
 */

import { prospeccaoRecemAbertoZL } from "./especialistas/prospeccao-recem-aberto-zl";
import { registrarEspecialista } from "./maestro";

export * from "./types";
export * from "./guardrails";
export * from "./maestro";
export * from "./especialistas/prospeccao-recem-aberto-zl";

// Registro dos especialistas (no carregamento do módulo).
registrarEspecialista(prospeccaoRecemAbertoZL);
