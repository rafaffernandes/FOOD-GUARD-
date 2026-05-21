import { NextResponse } from "next/server";

const WEBHOOK_TOKEN = process.env.ASAAS_WEBHOOK_TOKEN;

/**
 * Webhook de confirmação de pagamento do Asaas.
 * Valida o token enviado no header `asaas-access-token`.
 */
export async function POST(request: Request) {
  if (WEBHOOK_TOKEN) {
    const token = request.headers.get("asaas-access-token");
    if (token !== WEBHOOK_TOKEN) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  let event: { event?: string; payment?: { id?: string; status?: string } };
  try {
    event = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  // TODO: persistir o status do pagamento / ativar assinatura no Supabase.
  console.info("[asaas:webhook]", event.event, event.payment?.status);

  return NextResponse.json({ ok: true });
}
