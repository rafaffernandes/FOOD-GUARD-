import { plans, type PlanId } from "@/lib/content/plans";

const apiKey = process.env.ASAAS_API_KEY;
const env = process.env.ASAAS_ENV === "production" ? "production" : "sandbox";

const STATIC_LINKS: Record<PlanId, string | undefined> = {
  basico: process.env.ASAAS_PAYMENT_LINK_BASICO,
  essencial: process.env.ASAAS_PAYMENT_LINK_ESSENCIAL,
  premium: process.env.ASAAS_PAYMENT_LINK_PREMIUM,
};

const API_BASE =
  env === "production"
    ? "https://api.asaas.com/v3"
    : "https://api-sandbox.asaas.com/v3";

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

  // 1. Link de pagamento estático configurado por env.
  const staticLink = STATIC_LINKS[planId];
  if (staticLink) return { ok: true, url: staticLink };

  // 2. API Asaas (cria um payment link recorrente).
  if (apiKey) {
    try {
      const res = await fetch(`${API_BASE}/paymentLinks`, {
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
  console.info(`[dev] Asaas não configurado — checkout simulado p/ ${plan.name}`);
  return { ok: true, url: "#", devMode: true };
}
