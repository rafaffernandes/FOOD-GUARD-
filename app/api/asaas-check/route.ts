import { NextResponse } from "next/server";

/**
 * TEMPORÁRIO — diagnóstico das variáveis do Asaas configuradas na Vercel.
 * Não expõe segredos: chave e token aparecem só como booleano; os links de
 * pagamento aparecem só pelo host (sandbox.asaas.com x www.asaas.com), pra
 * distinguir sandbox de produção. Remover após confirmar a configuração.
 */
export const dynamic = "force-dynamic";

function host(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return "(url inválida)";
  }
}

export function GET() {
  return NextResponse.json({
    env: process.env.ASAAS_ENV ?? "(não definido — assume sandbox)",
    apiKeySet: Boolean(process.env.ASAAS_API_KEY),
    webhookTokenSet: Boolean(process.env.ASAAS_WEBHOOK_TOKEN),
    links: {
      basico: {
        set: Boolean(process.env.ASAAS_PAYMENT_LINK_BASICO),
        host: host(process.env.ASAAS_PAYMENT_LINK_BASICO),
      },
      essencial: {
        set: Boolean(process.env.ASAAS_PAYMENT_LINK_ESSENCIAL),
        host: host(process.env.ASAAS_PAYMENT_LINK_ESSENCIAL),
      },
      premium: {
        set: Boolean(process.env.ASAAS_PAYMENT_LINK_PREMIUM),
        host: host(process.env.ASAAS_PAYMENT_LINK_PREMIUM),
      },
    },
  });
}
