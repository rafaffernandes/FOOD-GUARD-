"use client";

import { CheckCircle2, Download } from "lucide-react";
import { useState } from "react";
import { GatingForm, type GatingValues } from "@/components/diagnostic/GatingForm";
import { cn } from "@/lib/utils";

const PDF = "/checklist-vigilancia-food-guard.pdf";

/**
 * Captura do checklist de 80 itens.
 *
 * Reusa o formulário do diagnóstico: mesmos campos, mesma base. Só os textos
 * mudam, porque prometer "relatório" e "dinheiro em risco" para quem pediu um
 * checklist seria mentira de interface.
 *
 * `banner` vive dentro do post do blog e só abre o formulário quando a pessoa
 * diz que quer baixar — assim o artigo não nasce com um formulário no meio
 * pedindo dados de quem só veio ler. `inline` é a da página do checklist, onde
 * o formulário já aparece aberto porque a pessoa chegou atrás do material.
 */
export function ChecklistGate({
  variant = "inline",
}: {
  variant?: "banner" | "inline";
}) {
  const [aberto, setAberto] = useState(variant === "inline");
  const [enviando, setEnviando] = useState(false);
  const [liberado, setLiberado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleSubmit(values: GatingValues) {
    setEnviando(true);
    setErro(null);
    try {
      const res = await fetch("/api/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        console.error("[checklist] falha:", res.status, data.error);
        setErro(
          "Não foi possível liberar agora. Tente de novo em instantes — ou chame a gente no WhatsApp que mandamos na hora.",
        );
        return;
      }
      setLiberado(true);
    } catch {
      setErro("Sem conexão. Verifique sua internet e tente de novo.");
    } finally {
      setEnviando(false);
    }
  }

  if (liberado) {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-6 text-center">
        <CheckCircle2 className="mx-auto h-9 w-9 text-brand-600" />
        <p className="mt-3 font-display text-lg font-bold text-ink">
          Pronto, seu checklist está liberado
        </p>
        <p className="mx-auto mt-1.5 max-w-md text-sm text-ink-soft">
          São 80 itens em 12 blocos, prontos para imprimir e levar para a
          cozinha. Um nutricionista da equipe entra em contato para ajudar com o
          que ficar em branco.
        </p>
        <a
          href={PDF}
          download
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-brand-700 hover:shadow-lift"
        >
          <Download className="h-5 w-5" /> Baixar o checklist em PDF
        </a>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border p-6",
        variant === "banner"
          ? "border-brand-200 bg-brand-50/60"
          : "border-surface-sunken bg-white shadow-soft sm:p-8",
      )}
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-ink">
            Checklist completo: os 80 itens que a vigilância cobra
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Em 12 blocos, com o que costuma gerar autuação em cada um. Imprima e
            confira sua cozinha antes da fiscalização.
          </p>
        </div>
        {!aberto && (
          <button
            type="button"
            onClick={() => setAberto(true)}
            className="shrink-0 rounded-full border border-brand-600 px-5 py-2.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-600 hover:text-white"
          >
            Quero baixar
          </button>
        )}
      </div>

      {aberto && (
        <div className="mt-6">
          <GatingForm
            onSubmit={handleSubmit}
            submitting={enviando}
            ctaLabel="Liberar o checklist completo"
            consentPurpose="enviar o checklist e entrar em contato"
            optinLabel="Aceito receber o contato do nutricionista pelo WhatsApp (opcional)."
            footnote="Download na hora, sem espera. Sem spam."
          />
          {erro && <p className="mt-4 text-sm text-danger-600">{erro}</p>}
        </div>
      )}
    </div>
  );
}
