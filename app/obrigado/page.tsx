import { CalendarCheck, CheckCircle2, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { site, whatsappLink } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Pagamento confirmado — Food Guard",
  description: "Bem-vindo à Food Guard! Veja os próximos passos do onboarding.",
  robots: { index: false, follow: false },
};

/** Página de pós-pagamento (URL de redirecionamento configurada no Asaas). */
export default function ObrigadoPage() {
  const steps = [
    {
      icon: MessageCircle,
      title: "1 · Boas-vindas no WhatsApp",
      text: "Em até 1 dia útil nossa equipe te chama para confirmar os dados da operação e apresentar o nutricionista responsável pelo seu atendimento.",
    },
    {
      icon: CalendarCheck,
      title: "2 · Primeira visita agendada",
      text: "Agendamos a visita inicial à sua cozinha para o levantamento completo: documentação, estrutura e rotinas da equipe.",
    },
    {
      icon: CheckCircle2,
      title: "3 · Plano de adequação",
      text: "Você recebe o plano de ação priorizado e começamos a executar — rumo à operação 100% pronta para qualquer fiscalização.",
    },
  ];

  return (
    <main className="bg-surface-soft py-16 sm:py-24">
      <Container className="max-w-3xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700 ring-1 ring-inset ring-brand-100">
            <CheckCircle2 className="h-4 w-4" /> Pagamento confirmado
          </span>
          <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Bem-vindo à Food Guard! 🎉
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">
            Sua assinatura está ativa. A partir de agora, a conformidade da sua
            operação é problema nosso — veja como começamos.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {steps.map((s) => (
            <Card key={s.title} className="flex items-start gap-4">
              <s.icon className="mt-0.5 h-6 w-6 shrink-0 text-brand-600" strokeWidth={2.2} />
              <div>
                <h2 className="font-display text-lg font-bold text-ink">
                  {s.title}
                </h2>
                <p className="mt-1 text-sm text-ink-soft">{s.text}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            href={whatsappLink(
              "Olá! Acabei de assinar um plano da Food Guard e quero começar o onboarding.",
            )}
            external
            size="lg"
          >
            <MessageCircle className="h-5 w-5" /> Falar com a equipe agora
          </Button>
          <p className="mt-3 text-xs text-ink-muted">
            Prefere e-mail? Escreva para {site.email}
          </p>
        </div>
      </Container>
    </main>
  );
}
