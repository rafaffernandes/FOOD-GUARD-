"use client";

import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Download,
  FileWarning,
  MessageCircle,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LogoMark } from "@/components/ui/Logo";
import { planById } from "@/lib/content/plans";
import { whatsappLink } from "@/lib/content/site";
import type { DiagnosticResult } from "@/lib/diagnostic/engine";
import type { Answers } from "@/lib/diagnostic/questions";
import {
  getActionPlan,
  getCategoryBars,
  getNonConformities,
  getRiskTier,
  maskEmail,
  type Severity,
  type Deadline,
} from "@/lib/diagnostic/report";
import { formatBRL } from "@/lib/utils";

export interface ReportLead {
  name: string;
  email: string;
  phone: string;
  role: string;
  company: string;
}

const TIER_BG: Record<string, string> = {
  danger: "bg-danger-500/15 text-danger-300 ring-danger-500/30",
  warn: "bg-warn-500/15 text-warn-500 ring-warn-500/30",
  warnSoft: "bg-warn-500/10 text-warn-500 ring-warn-500/20",
  brand: "bg-brand-500/15 text-brand-300 ring-brand-500/30",
  brandStrong: "bg-brand-500/20 text-brand-200 ring-brand-500/40",
};

const TIER_STROKE: Record<string, string> = {
  danger: "#dc2626",
  warn: "#d97706",
  warnSoft: "#f59e0b",
  brand: "#74b43c",
  brandStrong: "#446e22",
};

const SEVERITY: Record<Severity, { label: string; cls: string }> = {
  alta: { label: "Alta", cls: "bg-danger-50 text-danger-700 ring-danger-100" },
  media: { label: "Média", cls: "bg-warn-50 text-warn-600 ring-warn-100" },
  baixa: { label: "Baixa", cls: "bg-brand-50 text-brand-700 ring-brand-100" },
};

const DEADLINE: Record<Deadline, { label: string; cls: string }> = {
  imediato: { label: "Imediato", cls: "bg-danger-50 text-danger-700 ring-danger-100" },
  "7dias": { label: "7 dias", cls: "bg-warn-50 text-warn-600 ring-warn-100" },
  "30dias": { label: "30 dias", cls: "bg-blue-50 text-blue-700 ring-blue-100" },
};

function barColor(pct: number): string {
  if (pct >= 80) return "bg-brand-500";
  if (pct >= 60) return "bg-warn-500";
  return "bg-danger-500";
}

export function ResultReport({
  result,
  answers,
  lead,
}: {
  result: DiagnosticResult;
  answers: Answers;
  lead: ReportLead;
}) {
  const tier = getRiskTier(result.score);
  const plan = planById(tier.plan);
  const categories = getCategoryBars(answers);
  const nonConformities = getNonConformities(result, answers);
  const actionPlan = getActionPlan(nonConformities);
  const criticalCount = nonConformities.filter((n) => n.severity === "alta").length;
  const urgentCount = nonConformities.filter((n) => n.deadline === "imediato").length;
  const distanceToFull = 100 - result.score;
  const generatedAt = new Date();
  const firstName = lead.name.split(" ")[0];

  // Animação do score (0 → score em ~1.4s)
  const [displayScore, setDisplayScore] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayScore(Math.round(eased * result.score));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [result.score]);

  const stroke = TIER_STROKE[tier.color];
  const circumference = 2 * Math.PI * 84;
  const offset = circumference - (displayScore / 100) * circumference;

  const waMessage = [
    "Olá! Acabei de fazer o diagnóstico no site da Food Guard e gostaria de falar com um especialista.",
    "",
    `Nome: ${lead.name}`,
    `Empresa: ${lead.company}`,
    `Cargo: ${lead.role}`,
    `Telefone: ${lead.phone}`,
    "",
    `Resultado:`,
    `• Score: ${result.score}/100 (${tier.label})`,
    `• Multa estimada: até ${formatBRL(tier.maxFine)}`,
    `• Pontos críticos: ${criticalCount}`,
    `• Plano recomendado: ${plan.name}`,
  ].join("\n");
  const scheduleHref = whatsappLink(waMessage);

  return (
    <>
      {/* 8a · Sticky notification bar */}
      <div className="sticky top-0 z-40 bg-[#0c2318] text-white/90 print:hidden">
        <Container className="flex flex-col items-center justify-between gap-2 py-2 text-xs sm:flex-row sm:py-2.5 sm:text-sm">
          <p className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-brand-400" />
            Relatório completo enviado para{" "}
            <strong className="font-semibold text-white">
              {maskEmail(lead.email)}
            </strong>{" "}
            · Válido por 7 dias
          </p>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#22C55E] px-3 py-1.5 text-xs font-semibold text-[#0c2318] hover:bg-[#1ea84d]"
          >
            <Download className="h-3.5 w-3.5" />
            Baixar PDF
          </button>
        </Container>
      </div>

      <Container className="max-w-5xl py-10 print:py-0">
        {/* 8b · Header do relatório */}
        <header className="flex flex-col items-center text-center">
          <LogoMark className="h-12 w-12" />
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Diagnóstico de Conformidade Sanitária
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            Gerado em{" "}
            {generatedAt.toLocaleDateString("pt-BR")} às{" "}
            {generatedAt.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            · normas verificadas: RDC 216/2004 · Portaria 2.619/2011
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Operação avaliada: <strong>{lead.company}</strong>
          </p>
        </header>

        {/* 8c · Hero do score */}
        <section className="mt-10 overflow-hidden rounded-3xl bg-[#0c2318] p-8 text-center text-white sm:p-12">
          <div className="mx-auto inline-flex">
            <div className="relative h-48 w-48">
              <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r="84"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="14"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="84"
                  fill="none"
                  stroke={stroke}
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="font-display text-6xl font-bold leading-none"
                  style={{ color: stroke }}
                >
                  {displayScore}
                </span>
                <span className="mt-1 text-sm text-white/60">de 100</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ring-1 ring-inset ${TIER_BG[tier.color]}`}
            >
              {tier.label}
            </span>
          </div>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl font-bold text-white sm:text-3xl">
            {firstName}, {tier.headline}
          </h2>

          <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-wide text-white/50">
                Multa estimada
              </p>
              <p className="mt-1 font-display text-xl font-bold text-white">
                até {formatBRL(tier.maxFine)}
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-wide text-white/50">
                Pontos críticos
              </p>
              <p className="mt-1 font-display text-xl font-bold text-white">
                {nonConformities.length}
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-wide text-white/50">
                Itens urgentes
              </p>
              <p className="mt-1 font-display text-xl font-bold text-white">
                {urgentCount}
              </p>
            </div>
          </div>
        </section>

        {/* 8d · 4 KPI cards */}
        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            icon={ShieldCheck}
            label="Nível de risco"
            value={tier.label}
            tone={tier.color}
          />
          <KpiCard
            icon={Wallet}
            label="Multa máxima estimada"
            value={`até ${formatBRL(tier.maxFine)}`}
            tone="danger"
          />
          <KpiCard
            icon={FileWarning}
            label="Pontos críticos"
            value={`${nonConformities.length} ${nonConformities.length === 1 ? "item" : "itens"}`}
            tone="warn"
          />
          <Link
            href="/planos"
            className="group rounded-2xl border border-brand-200 bg-brand-50/50 p-5 text-left transition hover:-translate-y-1 hover:shadow-soft"
          >
            <p className="text-xs uppercase tracking-wide text-brand-700">
              Plano recomendado
            </p>
            <p className="mt-1 font-display text-xl font-bold text-ink">
              {plan.name}
            </p>
            <p className="mt-1 text-sm font-semibold text-brand-700">
              {formatBRL(plan.price)}/mês{" "}
              <ArrowRight className="inline h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </p>
          </Link>
        </section>

        {/* 8e · Barras de conformidade por categoria */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">
            Conformidade por categoria
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Estimativas preliminares com base nas suas respostas.
          </p>
          <div className="mt-6 space-y-3">
            {categories.map((c) => (
              <div key={c.name}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium text-ink">{c.name}</span>
                  <span className="font-display font-semibold text-ink-soft">
                    {c.percent}%
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-sunken">
                  <div
                    className={`h-full rounded-full ${barColor(c.percent)}`}
                    style={{ width: `${c.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8f · Tabela de não-conformidades */}
        {nonConformities.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-ink">
              Não-conformidades identificadas
            </h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-surface-sunken">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead className="bg-surface-soft">
                  <tr>
                    <th className="px-5 py-3 font-semibold text-ink-muted">Item</th>
                    <th className="px-5 py-3 font-semibold text-ink-muted">Norma</th>
                    <th className="px-5 py-3 font-semibold text-ink-muted">Severidade</th>
                    <th className="px-5 py-3 font-semibold text-ink-muted">Prazo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-sunken">
                  {nonConformities.map((n, i) => (
                    <tr key={`${n.item}-${i}`} className="bg-white">
                      <td className="px-5 py-4 align-top">
                        <p className="font-medium text-ink">{n.item}</p>
                        <p className="mt-1 text-xs text-ink-muted">{n.description}</p>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span className="font-mono text-xs text-ink-soft">
                          {n.norma}
                        </span>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${SEVERITY[n.severity].cls}`}
                        >
                          {SEVERITY[n.severity].label}
                        </span>
                      </td>
                      <td className="px-5 py-4 align-top">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${DEADLINE[n.deadline].cls}`}
                        >
                          {DEADLINE[n.deadline].label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 8g · Plano de ação */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">
            Plano de ação recomendado
          </h2>
          <ol className="mt-6 space-y-6">
            {actionPlan.map((phase, i) => (
              <li key={phase.label} className="flex gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-base font-bold ${
                    i === 0
                      ? "bg-danger-500/15 text-danger-700"
                      : i === 1
                        ? "bg-warn-500/15 text-warn-600"
                        : "bg-brand-500/15 text-brand-700"
                  }`}
                >
                  {i + 1}
                </div>
                <div className="flex-1 rounded-2xl border border-surface-sunken bg-white p-5">
                  <p className="font-display text-lg font-bold text-ink">{phase.label}</p>
                  <p className="mt-1 text-sm text-ink-soft">{phase.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {phase.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full bg-surface-sunken px-3 py-1 text-xs font-medium text-ink-soft"
                      >
                        <ClipboardList className="h-3 w-3" />
                        {item}
                      </span>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 8h · CTA final */}
        <section className="mt-12 overflow-hidden rounded-3xl bg-[#0c2318] p-8 text-white sm:p-12 print:hidden">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
            Próximo passo
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold leading-tight sm:text-3xl">
            Sua operação está a{" "}
            <span className="text-brand-300">{distanceToFull} pontos</span> da
            conformidade total.
          </h2>
          <p className="mt-3 max-w-2xl text-white/75">
            Isso se resolve com um nutricionista especializado acompanhando de
            perto. Um profissional que conhece sua operação e assume a
            responsabilidade pela documentação.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href="/planos">
              Quero minha operação protegida <ArrowRight className="h-5 w-5" />
            </Button>
            <Button href={scheduleHref} external variant="secondary">
              <MessageCircle className="h-5 w-5" />
              Falar com especialista
            </Button>
          </div>
        </section>

        {/* 8i · Footer */}
        <footer className="mt-12 border-t border-surface-sunken pt-6 text-center text-xs text-ink-muted">
          <p>
            Diagnóstico gerado em{" "}
            {generatedAt.toLocaleDateString("pt-BR")} às{" "}
            {generatedAt.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            · Food Guard · Segurança alimentar inteligente
          </p>
          <p className="mt-2 max-w-2xl mx-auto">
            Este diagnóstico é uma avaliação preliminar baseada nas suas
            respostas e não substitui uma auditoria técnica presencial.
          </p>
          <p className="mt-2">
            Nutricionista responsável: <strong>Renan Muniz · CRN ativo</strong>
          </p>
        </footer>
      </Container>
    </>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone: string;
}) {
  const toneCls: Record<string, string> = {
    danger: "bg-danger-50 text-danger-700",
    warn: "bg-warn-50 text-warn-600",
    warnSoft: "bg-warn-50 text-warn-600",
    brand: "bg-brand-50 text-brand-700",
    brandStrong: "bg-brand-100 text-brand-800",
  };
  return (
    <div className="rounded-2xl border border-surface-sunken bg-white p-5 shadow-soft">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneCls[tone] ?? "bg-surface-sunken text-ink"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3 text-xs uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-1 font-display text-lg font-bold text-ink">{value}</p>
    </div>
  );
}
