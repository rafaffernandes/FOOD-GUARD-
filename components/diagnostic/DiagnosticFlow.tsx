"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Lock,
  Sparkles,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { funnelEvents, track } from "@/lib/analytics";
import {
  computeDiagnostic,
  type DiagnosticResult,
  type RiskBand,
} from "@/lib/diagnostic/engine";
import { type Answers, questions } from "@/lib/diagnostic/questions";
import { cn } from "@/lib/utils";
import { GatingForm, type GatingValues } from "./GatingForm";
import { ResultReport } from "./ResultReport";
import { ScoreGauge } from "./ScoreGauge";

type Phase = "quiz" | "gating" | "result";

const BAND_TONE: Record<RiskBand, "danger" | "warn" | "brand"> = {
  critico: "danger",
  medio: "warn",
  baixo: "brand",
};

export function DiagnosticFlow() {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [lead, setLead] = useState<{
    name: string;
    email: string;
    phone: string;
    role: string;
    company: string;
  } | null>(null);
  const [started, setStarted] = useState(false);

  const question = questions[step];
  const progress = Math.round(
    ((step + (phase === "quiz" ? 0 : 1)) / questions.length) * 100,
  );

  function selectOption(optionId: string) {
    if (pending) return; // evita duplo clique durante o feedback
    if (!started) {
      track(funnelEvents.diagnosticStarted);
      setStarted(true);
    }
    const next = { ...answers, [question.id]: optionId };
    setAnswers(next);
    setPending(optionId); // destaca a opção escolhida antes de avançar

    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep((s) => s + 1);
      } else {
        const computed = computeDiagnostic(next);
        setResult(computed);
        track(funnelEvents.diagnosticCompleted, {
          score: computed.score,
          band: computed.band,
        });
        setPhase("gating");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setPending(null);
    }, 320);
  }

  async function handleGating(values: GatingValues) {
    if (!result) return;
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          score: result.score,
          band: result.band,
          recommendedPlan: result.recommendedPlan,
          answers,
        }),
      }).catch((e) => console.error("lead post failed", e));
      track(funnelEvents.leadCaptured, { plan: result.recommendedPlan });
      setLead({
        name: values.name,
        email: values.email,
        phone: values.phone,
        role: values.role,
        company: values.company,
      });
      setPhase("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  }

  if (phase === "result" && result && lead) {
    return (
      <ResultReport result={result} answers={answers} lead={lead} />
    );
  }

  if (phase === "gating" && result) {
    return (
      <Container className="max-w-2xl py-12">
        {/* Valor entregue antes do dado: score + prioridade */}
        <div className="flex flex-col items-center text-center animate-scale-in">
          <Badge tone="brand">
            <Sparkles className="h-3.5 w-3.5" /> Seu resultado está pronto
          </Badge>
          <div className="mt-6">
            <ScoreGauge score={result.score} band={result.band} />
          </div>
          <div className="mt-3">
            <Badge tone={BAND_TONE[result.band]}>
              Risco {result.bandLabel}
            </Badge>
          </div>
          <p className="mt-4 max-w-md text-ink-soft">
            Analisamos suas 5 respostas e encontramos{" "}
            <strong className="text-ink">
              {result.gapsCount}{" "}
              {result.gapsCount === 1 ? "ponto" : "pontos"} de autuação
            </strong>{" "}
            na sua operação.
          </p>
          <div className="mt-5 w-full max-w-md rounded-2xl border border-brand-100 bg-brand-50/60 p-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
              Prioridade nº 1
            </p>
            <p className="mt-1 text-ink-soft">{result.insight}</p>
          </div>
        </div>

        {/* Desbloqueio do diagnóstico completo */}
        <div className="mt-8 rounded-3xl border border-surface-sunken bg-white p-6 shadow-soft sm:p-8">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-brand-600" />
            <h2 className="font-display text-xl font-bold text-ink">
              Destrave seu diagnóstico completo
            </h2>
          </div>
          <ul className="mt-4 grid gap-2 text-sm text-ink-soft sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-brand-600" /> Dinheiro em risco
            </li>
            <li className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-brand-600" /> Checklist técnico
            </li>
            <li className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-brand-600" /> Plano recomendado
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-muted">
            Resultado na tela na hora + relatório em PDF no seu e-mail.
          </p>
          <div className="mt-6">
            <GatingForm onSubmit={handleGating} submitting={submitting} />
          </div>
        </div>
      </Container>
    );
  }

  // Fase de quiz
  return (
    <Container className="max-w-2xl py-12">
      {step === 0 && (
        <div className="mb-8 text-center animate-fade-up">
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Descubra o risco financeiro da sua operação em 90 segundos
          </h1>
          <p className="mt-2 text-ink-soft">
            Responda 5 perguntas simples e saiba exatamente o que falta para
            blindar seu negócio contra a fiscalização.
          </p>
        </div>
      )}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-ink-muted">
          <div className="flex items-center gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={() => !pending && setStep((s) => s - 1)}
                className="inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium text-ink-soft transition-colors hover:bg-surface-sunken hover:text-ink"
                aria-label="Voltar para a pergunta anterior"
              >
                <ArrowLeft className="h-4 w-4" /> Voltar
              </button>
            )}
            <span>
              Pergunta {step + 1} de {questions.length}
            </span>
          </div>
          <span>{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-surface-sunken">
          <div
            className="h-full rounded-full bg-brand-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div key={question.id} className="animate-fade-up">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          {question.title}
        </h2>
        {question.help && <p className="mt-2 text-ink-soft">{question.help}</p>}

        <div className="mt-7 space-y-3">
          {question.options.map((option) => {
            const selected =
              pending === option.id || answers[question.id] === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => selectOption(option.id)}
                className={cn(
                  "group flex w-full items-center justify-between gap-4 rounded-2xl border bg-white px-5 py-4 text-left transition-all hover:border-brand-300 hover:shadow-soft",
                  selected
                    ? "border-brand-500 bg-brand-50/50 ring-2 ring-brand-200"
                    : "border-surface-sunken",
                )}
              >
                <span className="font-medium text-ink">{option.label}</span>
                {selected ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" />
                ) : (
                  <ArrowRight className="h-5 w-5 shrink-0 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
