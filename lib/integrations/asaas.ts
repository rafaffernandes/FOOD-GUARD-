import { plans, type PlanId } from "@/lib/content/plans";

/**
 * Lê a configuração a cada chamada, e não uma vez no carregamento do módulo.
 * Assim o valor vem sempre do ambiente em execução — trocar uma variável na
 * Vercel passa a valer no próximo deploy sem depender de rebuild do bundle.
 */
function readConfig() {
  const apiKey = process.env.ASAAS_API_KEY?.trim() || undefined;
  const production = process.env.ASAAS_ENV?.trim().toLowerCase() === "production";
  return {
    apiKey,
    production,
    apiBase: production
      ? "https://api.asaas.com/v3"
      : "https://api-sandbox.asaas.com/v3",
    staticLinks: {
      basico: process.env.ASAAS_PAYMENT_LINK_BASICO?.trim() || undefined,
      essencial: process.env.ASAAS_PAYMENT_LINK_ESSENCIAL?.trim() || undefined,
      premium: process.env.ASAAS_PAYMENT_LINK_PREMIUM?.trim() || undefined,
    } as Record<PlanId, string | undefined>,
  };
}

export interface CheckoutResult {
  ok: boolean;
  url?: string;
  devMode?: boolean;
  error?: string;
}

/**
 * Resolve a URL de checkout para um plano.
 * Ordem: link estático (env) → API Asaas → fallback dev (#).
 */
export async function createCheckout(planId: PlanId): Promise<CheckoutResult> {
  const plan = plans.find((p) => p.id === planId);
  if (!plan) return { ok: false, error: "Plano inválido" };

  const { apiKey, production, apiBase, staticLinks } = readConfig();

  // 1. Link de pagamento estático configurado por env.
  const staticLink = staticLinks[planId];
  if (staticLink) return { ok: true, url: staticLink };

  // 2. API Asaas (cria um payment link recorrente).
  if (apiKey) {
    console.info(
      `[asaas] criando cobrança p/ ${plan.name} — ambiente ${production ? "producao" : "sandbox"}`,
    );
    try {
      const res = await fetch(`${apiBase}/paymentLinks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: apiKey,
        },
        body: JSON.stringify({
          name: `Food Guard — Plano ${plan.name}`,
          billingType: "UNDEFINED",
          chargeType: "RECURRENT",
          subscriptionCycle: "MONTHLY",
          value: plan.price,
          description: `Assinatura mensal do plano ${plan.name}.`,
        }),
      });
      const data = (await res.json()) as { url?: string; errors?: unknown };
      if (res.ok && data.url) return { ok: true, url: data.url };
      console.error("[asaas] resposta inesperada:", data);
      return { ok: false, error: "Falha ao criar checkout no Asaas" };
    } catch (err) {
      const message = err instanceof Error ? err.message : "erro desconhecido";
      console.error("[asaas] exceção:", message);
      return { ok: false, error: message };
    }
  }

  // 3. Degradação graciosa (modo dev).
  console.info(
    `[dev] ASAAS_API_KEY ausente no ambiente — checkout simulado p/ ${plan.name}`,
  );
  return { ok: true, url: "#", devMode: true };
}
