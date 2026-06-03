import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  FileSignature,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { docusignUrl, site, whatsappLink } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Bem-vindo à Food Guard",
  description: "Sua assinatura foi confirmada. Próximo passo: assinar o contrato via DocSign.",
  robots: { index: false },
};

const steps = [
  {
    icon: FileSignature,
    label: "Assine o contrato",
    description: "Você receberá o link do DocSign por e-mail. O contrato é o documento que formaliza a parceria.",
    highlight: true,
  },
  {
    icon: CalendarClock,
    label: "Agendamos a reunião inicial",
    description: "Nossa equipe entrará em contato em breve para marcar a primeira visita e alinhar a operação.",
    highlight: false,
  },
  {
    icon: ShieldCheck,
    label: "Sua operação em conformidade",
    description: "A partir da primeira visita, cuidamos de tudo: documentação, checklist e plano de ação.",
    highlight: false,
  },
];

export default function SucessoPage() {
  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      {/* Faixa de confirmação */}
      <div className="bg-brand-600 py-3 text-center text-sm font-semibold text-white">
        Assinatura confirmada
      </div>

      <Container className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">

          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 ring-8 ring-brand-100">
              <CheckCircle2 className="h-10 w-10 text-brand-600" strokeWidth={1.5} />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Seja bem-vindo à Food Guard!
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Estamos muito felizes em ter você aqui. Sua operação está
              prestes a dar um salto em conformidade e tranquilidade.
            </p>
          </div>

          {/* Card principal — DocSign (ação mais importante) */}
          <div className="mt-10 overflow-hidden rounded-3xl border-2 border-brand-600 bg-white shadow-lift">
            <div className="bg-brand-600 px-6 py-4 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-100">
                Ação obrigatória
              </p>
              <p className="mt-0.5 font-display text-lg font-bold text-white">
                Assine o contrato agora
              </p>
            </div>
            <div className="px-8 py-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <FileSignature className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-ink">
                    O contrato precisa ser assinado via DocSign
                  </h2>
                  <p className="mt-2 text-ink-soft">
                    Você receberá o link de assinatura no e-mail cadastrado
                    em breve. O contrato formaliza todos os termos do plano
                    escolhido e é o passo mais importante para iniciarmos.
                  </p>
                  <p className="mt-3 text-sm font-medium text-brand-700">
                    Não encontrou o e-mail? Verifique a pasta de spam ou
                    entre em contato pelo WhatsApp abaixo.
                  </p>
                </div>
              </div>

              {docusignUrl ? (
                <div className="mt-6 border-t border-surface-sunken pt-6">
                  <a
                    href={docusignUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-600 px-6 py-4 font-display text-base font-bold text-white shadow-lift transition-all hover:bg-brand-700 active:scale-[0.98]"
                  >
                    <FileSignature className="h-5 w-5 shrink-0" />
                    Acessar e assinar o contrato agora
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </a>
                  <p className="mt-3 text-center text-xs text-ink-muted">
                    Abre o DocuSign em uma nova aba. Você precisará do e-mail
                    cadastrado para autenticar.
                  </p>
                </div>
              ) : (
                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
                  O link do contrato será enviado para o seu e-mail em instantes.
                  Verifique também a pasta de spam.
                </div>
              )}
            </div>
          </div>

          {/* Próximos passos */}
          <div className="mt-8 space-y-4">
            {steps.map((step, i) => (
              <div
                key={step.label}
                className={`flex items-start gap-4 rounded-2xl border bg-white p-6 ${
                  step.highlight
                    ? "border-brand-200 shadow-soft"
                    : "border-surface-sunken"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="font-display font-bold text-ink">{step.label}</p>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-soft">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 space-y-3 rounded-3xl border border-surface-sunken bg-white p-8">
            <p className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Prefere falar agora?
            </p>
            <p className="text-center text-ink-soft">
              Nossa equipe está disponível para tirar dúvidas, confirmar
              o recebimento do contrato ou agendar já a primeira visita.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                href={whatsappLink(
                  "Olá! Acabei de assinar na Food Guard e quero confirmar os próximos passos."
                )}
                size="lg"
                className="w-full sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                Chamar no WhatsApp
              </Button>
              <Button
                href="/"
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Voltar ao site
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Rodapé de confiança */}
          <p className="mt-8 text-center text-sm text-ink-muted">
            Dúvidas?{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-brand-700 underline underline-offset-2"
            >
              {site.email}
            </a>
          </p>
        </div>
      </Container>
    </main>
  );
}
