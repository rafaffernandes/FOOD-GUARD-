import { NextResponse } from "next/server";
import { requireCronSecret } from "@/lib/api-auth";
import { cenariosDeTeste } from "@/lib/agent/maestro/especialistas/prospeccao-recem-aberto-zl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Bateria de testes do especialista de prospecção (recém-aberto Zona Leste).
 * Retorna, para cada cenário de mercado, o que o agente FARIA — sem enviar nada
 * (simulação). Serve pra você validar todos os comportamentos antes de produção.
 *
 * Exige CRON_SECRET: expõe a estratégia comercial e o modo de operação.
 */
export function GET(request: Request) {
  const bloqueio = requireCronSecret(request);
  if (bloqueio) return bloqueio;

  return NextResponse.json({
    ok: true,
    modo: process.env.AGENTS_MODE === "real" ? "real" : "simulacao",
    aviso: "Simulação — nenhuma mensagem é enviada. Apenas demonstra o comportamento.",
    cenarios: cenariosDeTeste(),
  });
}
