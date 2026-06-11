import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { notifyTeam } from "@/lib/integrations/resend";

const WEBHOOK_TOKEN = process.env.ASAAS_WEBHOOK_TOKEN;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Eventos que significam dinheiro confirmado na conta. */
const CONFIRMED = new Set(["PAYMENT_CONFIRMED", "PAYMENT_RECEIVED"]);
/** Eventos de problema que merecem atenção humana. */
const ATTENTION = new Set([
  "PAYMENT_OVERDUE",
  "PAYMENT_REFUNDED",
  "PAYMENT_CHARGEBACK_REQUESTED",
]);

interface AsaasEvent {
  event?: string;
  payment?: {
    id?: string;
    status?: string;
    value?: number;
    customer?: string;
    billingType?: string;
    description?: string;
    invoiceUrl?: string;
  };
}

/**
 * Webhook de pagamento do Asaas (sandbox e produção).
 * 1. Valida o token (`asaas-access-token`).
 * 2. Persiste o evento em `public.payments` (degradação graciosa sem Supabase).
 * 3. Notifica a equipe em confirmações e problemas.
 * Sempre responde 200 rápido (o Asaas re-tenta em caso de erro).
 */
export async function POST(request: Request) {
  if (WEBHOOK_TOKEN) {
    const token = request.headers.get("asaas-access-token");
    if (token !== WEBHOOK_TOKEN) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  let event: AsaasEvent;
  try {
    event = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const name = event.event ?? "DESCONHECIDO";
  const p = event.payment ?? {};
  console.info("[asaas:webhook]", name, p.id, p.status, p.value);

  // Persistência (graciosa: sem Supabase, só loga).
  if (SUPABASE_URL && SERVICE_KEY) {
    try {
      const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
        auth: { persistSession: false },
      });
      const { error } = await supabase.from("payments").insert({
        asaas_payment_id: p.id ?? null,
        event: name,
        status: p.status ?? null,
        value: p.value ?? null,
        customer: p.customer ?? null,
        billing_type: p.billingType ?? null,
        description: p.description ?? null,
        raw: event,
      });
      if (error) console.error("[asaas:webhook] persistência:", error.message);
    } catch (err) {
      console.error("[asaas:webhook] persistência:", err);
    }
  } else {
    console.info("[dev] Supabase não configurado — evento não persistido.");
  }

  // Notificações internas (não bloqueiam a resposta em caso de falha).
  try {
    if (CONFIRMED.has(name)) {
      await notifyTeam(
        `💰 Pagamento confirmado${p.value ? `: R$ ${p.value}` : ""}`,
        `Evento ${name} · pagamento ${p.id ?? "?"} · ${p.description ?? "sem descrição"}. Iniciar onboarding do cliente (boas-vindas + agendar 1ª visita).`,
      );
    } else if (ATTENTION.has(name)) {
      await notifyTeam(
        `⚠️ Pagamento requer atenção: ${name}`,
        `Pagamento ${p.id ?? "?"} (${p.description ?? "sem descrição"}) está em ${p.status ?? name}. Verificar no painel do Asaas.`,
      );
    }
  } catch (err) {
    console.error("[asaas:webhook] notificação:", err);
  }

  return NextResponse.json({ ok: true });
}
