"use client";

import { ArrowLeft, ArrowRight, Lock, Sparkles } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { funnelEvents, track } from "@/lib/analytics";
import {
  computeDiagnostic,
  type DiagnosticResult,
} from "@/lib/diagnostic/engine";
import { type Answers, questions } from "@/lib/diagnostic/questions";
import { cn } from "@/lib/utils";
import { GatingForm, type GatingValues } from "./GatingForm";
import { ResultDashboard } from "./ResultDashboard";
import { ScoreGauge } from "./ScoreGauge";

type Phase = "quiz" | "gating" | "result";

export function DiagnosticFlow() {
  const [phase, setPhase] = useState<Phase>("quiz");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [lead, setLead] = useState<{ name: string; company: string } | null>(
    null,
  );
  const [started, setStarted] = useState(false);

  const question = questions[step];
  const progress = Math.round(((step + (phase === "quiz" ? 0 : 1)) / questions.length) * 100);

  function selectOption(optionId: string) {
    if (!started) {
      track(funnelEvents.diagnosticStarted);
      setStarted(true);
    }
    const next = { ...answers, [question.id]: optionId };
    setAnswers(next);

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
      setLead({ name: values.name, company: values.company });
      setPhase("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setSubmitting(false);
    }
  }

  if (phase === "result" && result && lead) {
    return (
      <Container className="max-w-3xl py-12">
        <ResultDashboard
          result={result}
          firstName={lead.name.split(" ")[0]}
          company={lead.company}
        />
      </Container>
    );
  }

  if (phase === "gating" && result) {
    return (
      <Container className="max-w-2xl py-12">
        {/* Revelação parcial: valor antes do dado */}
        <div className="flex flex-col items-center text-center animate-scale-in">
          <Badge tone="brand">
            <Sparkles className="h-3.5 w-3.5" /> Resultado pronto
          </Badge>
          <div className="mt-6">
            <ScoreGauge score={result.score} band={result.band} />
          </div>
          <p className="mt-4 max-w-md text-lg text-ink-soft">
            {result.insight}
          </p>
        </div>

        {/* Gating */}
        <div className="relative mt-10">
          <div className="mb-5 flex items-center justify-center gap-2 text-sm font-medium text-ink-muted">
            <Lock className="h-4 w-4 text-brand-600" />
            Veja o dinheiro em risco, o checklist técnico e o plano recomendado
          </div>
          <div className="rounded-3xl border border-surface-sunken bg-white p-6 shadow-soft sm:p-8">
            <GatingForm onSubmit={handleGating} submitting={submitting} />
          </div>
        </div>
      </Container>
    );
  }

  // Fase de quiz
  return (
    <Container className="max-w-2xl py-12">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-ink-muted">
          <span>
            Pergunta {step + 1} de {questions.length}
          </span>
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
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          {question.title}
        </h1>
        {question.help && (
          <p className="mt-2 text-ink-soft">{question.help}</p>
        )}

        <div className="mt-7 space-y-3">
          {question.options.map((option) => {
            const selected = answers[question.id] === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => selectOption(option.id)}
                className={cn(
                  "group flex w-full items-center justify-between gap-4 rounded-2xl border bg-white px-5 py-4 text-left transition-all hover:border-brand-300 hover:shadow-soft",
                  selected
                    ? "border-brand-400 ring-2 ring-brand-100"
                    : "border-surface-sunken",
                )}
              >
                <span className="font-medium text-ink">{option.label}</span>
                <ArrowRight className="h-5 w-5 shrink-0 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-600" />
              </button>
            );
          })}
        </div>

        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </button>
        )}
      </div>
    </Container>
  );
}
