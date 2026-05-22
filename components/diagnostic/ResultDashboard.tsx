"use client";

import {
  AlertTriangle,
  CalendarCheck,
  CheckCircle2,
  CircleAlert,
  CreditCard,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { planById } from "@/lib/content/plans";
import type { DiagnosticResult } from "@/lib/diagnostic/engine";
import { funnelEvents, track } from "@/lib/analytics";
import { cn, formatBRL } from "@/lib/utils";
import { ScoreGauge } from "./ScoreGauge";
import { CalendlyEmbed } from "./CalendlyEmbed";

const BAND_TONE = {
  critico: { tone: "danger" as const, label: "Risco Crítico" },
  medio: { tone: "warn" as const, label: "Risco Médio" },
  baixo: { tone: "brand" as const, label: "Risco Baixo" },
};

export function ResultDashboard({
  result,
  firstName,
  company,
}: {
  result: DiagnosticResult;
  firstName: string;
  company: string;
}) {
  const plan = planById(result.recommendedPlan);
  const bandInfo = BAND_TONE[result.band];
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  async function handleCheckout() {
    track(funnelEvents.checkoutClicked, { plan: plan.id });
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
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
      setCheckoutLoading(false);
    }
  }

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Cabeçalho com score */}
      <div className="grid items-center gap-8 rounded-3xl border border-surface-sunken bg-white p-8 shadow-soft sm:grid-cols-[auto,1fr]">
        <div className="flex justify-center">
          <ScoreGauge score={result.score} band={result.band} />
        </div>
        <div>
          <Badge tone={bandInfo.tone}>{bandInfo.label}</Badge>
          <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
            {firstName}, seu risco é{" "}
            <span
              className={cn(
                result.band === "critico" && "text-danger-600",
                result.band === "medio" && "text-warn-600",
                result.band === "baixo" && "text-brand-600",
              )}
            >
              {result.bandLabel.toLowerCase()}
            </span>
            .
          </h2>
          <p className="mt-2 text-ink-soft">
            Diagnóstico de <strong>{company}</strong> com base na RDC 216/2004 e
            na CFN nº 600/2018. Identificamos{" "}
            <strong>{result.gapsCount}</strong>{" "}
            {result.gapsCount === 1 ? "área que precisa" : "áreas que precisam"}{" "}
            de adequação.
          </p>
        </div>
      </div>

      {/* Dinheiro em risco */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-ink">
          <AlertTriangle className="h-5 w-5 text-danger-500" />
          Dinheiro em risco
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <RiskStat
            label="Multa sanitária estimada"
            value={result.moneyAtRisk.fineRange}
          />
          <RiskStat
            label="Custo de adequação tardia"
            value={formatBRL(result.moneyAtRisk.lateAdequationCost)}
          />
          <RiskStat
            label="Chance de autuação"
            value={result.moneyAtRisk.autuacaoChance}
          />
        </div>
      </div>

      {/* Checklist técnico */}
      <div>
        <h3 className="mb-3 font-display text-lg font-bold text-ink">
          Checklist técnico
        </h3>
        <div className="divide-y divide-surface-sunken rounded-2xl border border-surface-sunken bg-white">
          {result.checklist.map((item) => (
            <div key={item.area} className="flex items-start gap-3 px-5 py-4">
              {item.done ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              ) : (
                <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-danger-500" />
              )}
              <div>
                <p className="font-medium text-ink">{item.area}</p>
                {!item.done && item.gap && (
                  <p className="text-sm text-ink-muted">{item.gap}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plano recomendado + duplo CTA */}
      <div className="overflow-hidden rounded-3xl bg-ink text-white">
        <div className="grid gap-6 p-8 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">
              Plano recomendado para você
            </p>
            <h3 className="mt-1 font-display text-3xl font-bold">{plan.name}</h3>
            <p className="mt-1 text-white/70">{plan.positioning}</p>
            <p className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-4xl font-bold">
                {formatBRL(plan.price)}
              </span>
              <span className="text-white/60">/mês</span>
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-brand-200">
              <ShieldCheck className="h-4 w-4" />
              {/* garantia */}
              Adequação em 90 dias ou devolução.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              href="#agendar"
              className="w-full"
              onClick={() => track(funnelEvents.scheduleClicked, { plan: plan.id })}
            >
              <CalendarCheck className="h-5 w-5" />
              Agendar avaliação gratuita com o nutricionista
            </Button>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-60"
            >
              {checkoutLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <CreditCard className="h-5 w-5" />
              )}
              Estou com urgência e quero assinar agora
            </button>
            <p className="text-center text-xs text-white/50">
              Recomendamos a avaliação gratuita com o RT antes de assinar.
            </p>
          </div>
        </div>
      </div>

      {/* Agenda Calendly */}
      <div id="agendar" className="scroll-mt-24">
        <h3 className="mb-3 font-display text-lg font-bold text-ink">
          Agende sua avaliação com o Renan (RT · CRN-3)
        </h3>
        <CalendlyEmbed />
      </div>
    </div>
  );
}

function RiskStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-danger-100 bg-danger-50/60 p-5">
      <p className="text-sm text-ink-muted">{label}</p>
      <p className="mt-1 font-display text-xl font-bold text-danger-700">
        {value}
      </p>
    </div>
  );
}
