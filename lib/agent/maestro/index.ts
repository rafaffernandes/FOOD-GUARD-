/**
 * Maestro dos agentes (orquestrador determinístico) — ponto de entrada.
 *
 * Uso:
 *   import { despachar, registrarEspecialista } from "@/lib/agent/maestro";
 *   registrarEspecialista(prospeccaoRecemAbertoZL); // no boot
 *   await despachar({ type: "empresa_nova", prospect });
 *
 * Os especialistas (com seu conteúdo/árvore travados) são registrados aqui
 * conforme forem montados e aprovados. Hoje: nenhum — o próximo passo é o
 * especialista de prospecção "recém-aberto Zona Leste".
 */

export * from "./types";
export * from "./guardrails";
export * from "./maestro";

// Próximo passo (após aprovar o conteúdo):
// import { prospeccaoRecemAbertoZL } from "./especialistas/prospeccao-recem-aberto-zl";
// registrarEspecialista(prospeccaoRecemAbertoZL);
