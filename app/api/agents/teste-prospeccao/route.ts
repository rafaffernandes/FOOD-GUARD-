import { NextResponse } from "next/server";
import { cenariosDeTeste } from "@/lib/agent/maestro/especialistas/prospeccao-recem-aberto-zl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CRON_SECRET = process.env.CRON_SECRET;

/**
 * Bateria de testes do especialista de prospecção (recém-aberto Zona Leste).
 * Retorna, para cada cenário de mercado, o que o agente FARIA — sem enviar nada
 * (simulação). Serve pra você validar todos os comportamentos antes de produção.
 *
 * Se CRON_SECRET estiver setado, exige Authorization: Bearer <secret>.
 */
export function GET(request: Request) {
  if (CRON_SECRET) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }
  return NextResponse.json({
    ok: true,
    modo: process.env.AGENTS_MODE === "real" ? "real" : "simulacao",
    aviso: "Simulação — nenhuma mensagem é enviada. Apenas demonstra o comportamento.",
    cenarios: cenariosDeTeste(),
  });
}
