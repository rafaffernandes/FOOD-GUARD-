"use client";

import { CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import type { PlanId } from "@/lib/content/plans";
import { funnelEvents, track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const base =
  "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

/** Botão "Assinar {plano}" que dispara o checkout (Asaas) e redireciona. */
export function PlanCheckoutButton({
  planId,
  planName,
  variant = "primary",
}: {
  planId: PlanId;
  planName: string;
  variant?: "primary" | "outline";
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    track(funnelEvents.checkoutClicked, { plan: planId });
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = (await res.json()) as { url?: string };
      if (data.url && data.url !== "#") {
        window.location.href = data.url;
      } else {
        alert(
          "Checkout em modo demonstração. Conecte o Asaas (.env) para ativar o pagamento real.",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={cn(
        base,
        variant === "primary"
          ? "bg-brand-600 text-white shadow-soft hover:bg-brand-700 hover:shadow-lift"
          : "border border-brand-200 bg-white text-brand-700 hover:border-brand-300 hover:bg-brand-50",
      )}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <CreditCard className="h-5 w-5" />
      )}
      Assinar {planName}
    </button>
  );
}
