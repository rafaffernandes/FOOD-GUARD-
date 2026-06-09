import {
  canalAtivo,
  dentroDoHorario,
  killSwitchAtivo,
  modoAtual,
} from "./guardrails";
import type { AgentEvent, DispatchResult, Especialista } from "./types";

/**
 * Maestro — orquestrador DETERMINÍSTICO. Recebe um evento, acha o especialista
 * certo (regra fixa), pega as ações pretendidas e aplica as travas globais.
 * Em modo simulação (padrão) nada é enviado: só registra. Sem IA decidindo.
 */

const registro: Especialista[] = [];

/** Registra um especialista (idempotente por id). Chamado no boot, não em runtime. */
export function registrarEspecialista(e: Especialista): void {
  if (!registro.some((x) => x.id === e.id)) registro.push(e);
}

/** Lista os especialistas registrados (transparência/debug). */
export function especialistasRegistrados(): { id: string; evento: string }[] {
  return registro.map((e) => ({ id: e.id, evento: e.evento }));
}

function logar(r: DispatchResult): void {
  console.info(
    "[maestro]",
    JSON.stringify({
      evento: r.evento,
      modo: r.modo,
      especialista: r.especialista ?? null,
      resultado: r.resultado,
      acoes: r.acoes.length,
      obs: r.observacoes,
    }),
  );
}

/** Roteia um evento pelo especialista certo e aplica as travas. Nunca lança. */
export async function despachar(event: AgentEvent): Promise<DispatchResult> {
  const modo = modoAtual();
  const observacoes: string[] = [];

  // Trava 1 — botão de pânico.
  if (killSwitchAtivo()) {
    const r: DispatchResult = {
      evento: event.type,
      modo,
      acoes: [],
      resultado: "pausado_kill_switch",
      observacoes: ["AGENTS_KILL_SWITCH ligado — nada é processado."],
    };
    logar(r);
    return r;
  }

  // Roteamento determinístico: primeiro especialista que trata o evento e se aplica.
  const especialista = registro.find(
    (e) => e.evento === event.type && e.aplica(event),
  );
  if (!especialista) {
    const r: DispatchResult = {
      evento: event.type,
      modo,
      acoes: [],
      resultado: "sem_especialista",
      observacoes: ["Nenhum especialista registrado para este evento."],
    };
    logar(r);
    return r;
  }

  let acoes;
  try {
    acoes = await especialista.decidir(event);
  } catch (err) {
    const r: DispatchResult = {
      evento: event.type,
      modo,
      especialista: especialista.id,
      acoes: [],
      resultado: "simulado",
      observacoes: [
        `Especialista falhou: ${err instanceof Error ? err.message : "erro"}. Nada enviado.`,
      ],
    };
    logar(r);
    return r;
  }

  // Trava 2 — horário comercial (só para canais de contato ativo).
  const horarioOk = dentroDoHorario();
  const acoesFiltradas = acoes.filter((a) => {
    if (a.kind === "mensagem" && canalAtivo(a.canal) && !horarioOk) {
      observacoes.push(`Ação adiada: fora do horário comercial (${a.canal}).`);
      return false;
    }
    return true;
  });

  // Execução: em simulação NUNCA envia; em real, executores ainda não plugados
  // → também não envia (seguro por design). maxToques/limiteDia entram com a
  // execução real (precisam do estado/registro de envios).
  let resultado: DispatchResult["resultado"];
  if (modo === "simulacao") {
    resultado = "simulado";
    observacoes.push("Modo simulação: ações registradas, nada enviado.");
  } else {
    resultado = "executado";
    observacoes.push(
      "Modo real: executores de envio ainda não plugados — nada enviado.",
    );
  }

  const r: DispatchResult = {
    evento: event.type,
    modo,
    especialista: especialista.id,
    acoes: acoesFiltradas,
    resultado,
    observacoes,
  };
  logar(r);
  return r;
}
