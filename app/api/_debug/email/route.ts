import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Endpoint TEMPORÁRIO de diagnóstico do e-mail (Resend).
 * Envia um e-mail de teste e devolve o resultado/erro EXATO como JSON,
 * pra descobrir por que o e-mail do diagnóstico não sai.
 * Uso: /api/_debug/email?to=seuemail@gmail.com
 * Remover antes de ir pra produção.
 */
export async function GET(request: Request) {
  const to = new URL(request.url).searchParams.get("to");
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "Food Guard <onboarding@resend.dev>";

  const info = {
    resendConfigured: Boolean(apiKey),
    apiKeyPrefix: apiKey ? `${apiKey.slice(0, 3)}…(${apiKey.length} chars)` : null,
    from,
    to,
  };

  if (!apiKey) {
    return NextResponse.json({
      ...info,
      ok: false,
      motivo: "RESEND_API_KEY não está chegando no ambiente (variável ausente ou deploy sem recarregar).",
    });
  }
  if (!to) {
    return NextResponse.json({
      ...info,
      ok: false,
      motivo: "Faltou o destinatário. Acrescente ?to=seuemail@gmail.com na URL.",
    });
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: "Teste Food Guard ✅",
      text: "Se você recebeu este e-mail, o envio do diagnóstico está funcionando.",
    });
    if (error) {
      return NextResponse.json({ ...info, ok: false, erroResend: error });
    }
    return NextResponse.json({ ...info, ok: true, emailId: data?.id });
  } catch (err) {
    return NextResponse.json({
      ...info,
      ok: false,
      excecao: err instanceof Error ? err.message : String(err),
    });
  }
}
