import { NextResponse } from "next/server";

/**
 * Guardas das rotas internas (crons e webhooks).
 *
 * A regra é falhar FECHANDO: sem o segredo configurado, a rota responde 503 e
 * não executa nada. O contrário — liberar quando falta configuração — deixaria
 * endpoints que escrevem no banco e gastam cota de IA abertos a qualquer um
 * exatamente no ambiente onde alguém esqueceu de configurar.
 *
 * É a mesma postura do middleware que protege /admin.
 */

function naoConfigurado(qual: string): NextResponse {
  console.error(`[auth] ${qual} ausente — rota bloqueada por segurança.`);
  return NextResponse.json(
    { ok: false, error: "Rota não configurada." },
    { status: 503 },
  );
}

function naoAutorizado(): NextResponse {
  return NextResponse.json({ ok: false, error: "Não autorizado." }, { status: 401 });
}

/**
 * Exige `Authorization: Bearer <CRON_SECRET>` — cabeçalho que a Vercel envia
 * nos crons agendados. Devolve null quando a chamada é legítima.
 */
export function requireCronSecret(request: Request): NextResponse | null {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return naoConfigurado("CRON_SECRET");

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) return naoAutorizado();

  return null;
}

/**
 * Exige o cabeçalho `asaas-access-token` com o valor de ASAAS_WEBHOOK_TOKEN.
 * Sem essa checagem, qualquer um poderia forjar um "pagamento confirmado".
 */
export function requireAsaasToken(request: Request): NextResponse | null {
  const token = process.env.ASAAS_WEBHOOK_TOKEN?.trim();
  if (!token) return naoConfigurado("ASAAS_WEBHOOK_TOKEN");

  if (request.headers.get("asaas-access-token") !== token) return naoAutorizado();

  return null;
}
