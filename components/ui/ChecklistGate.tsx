"use client";

import { CheckCircle2, Download, FileText } from "lucide-react";
import { useState } from "react";
import { GatingForm, type GatingValues } from "@/components/diagnostic/GatingForm";

const PDF = "/checklist-vigilancia-food-guard.pdf";

/**
 * Portão do checklist completo.
 *
 * A página em si continua aberta e indexável — é o ativo de busca. O que
 * exige os dados é o PDF de 80 itens, que é o material denso de verdade.
 * Fechar a página inteira mataria justamente o tráfego que traz o lead.
 */
export function ChecklistGate() {
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
          "Não foi possível liberar agora. Tente de novo em instantes — ou fale com a gente no WhatsApp que a gente manda na hora.",
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
      <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-6 text-center sm:p-10">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand-600" />
        <h3 className="mt-3 font-display text-xl font-bold text-ink">
          Pronto, seu checklist está liberado
        </h3>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          São 80 itens em 12 blocos, prontos para imprimir e levar para a
          cozinha. Um nutricionista da equipe entra em contato para ajudar com
          o que aparecer em branco.
        </p>
        <a
          href={PDF}
          download
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-soft transition hover:bg-brand-700 hover:shadow-lift"
        >
          <Download className="h-5 w-5" /> Baixar o checklist em PDF
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-surface-sunken bg-white p-6 shadow-soft sm:p-8">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold text-ink">
            Quer a versão completa, com 80 itens?
          </h3>
          <p className="mt-1.5 text-ink-soft">
            O checklist acima cobre o essencial. A versão em PDF traz os 80
            itens organizados nos 12 blocos que a fiscalização percorre, com o
            que costuma gerar autuação em cada um.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <GatingForm
          onSubmit={handleSubmit}
          submitting={enviando}
          ctaLabel="Liberar o checklist completo"
          consentPurpose="enviar o checklist e entrar em contato"
          optinLabel="Aceito receber o contato do nutricionista pelo WhatsApp (opcional)."
          footnote="Download na hora, sem espera. Sem spam."
        />
      </div>

      {erro && <p className="mt-4 text-sm text-danger-600">{erro}</p>}
    </div>
  );
}
