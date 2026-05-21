import { Mail, MapPin, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site, whatsappLink } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com o Responsável Técnico do Food Guard. Atendimento em São Paulo capital e Grande SP.",
};

export default function ContatoPage() {
  return (
    <>
      <section className="bg-surface-soft">
        <Container className="py-16 text-center sm:py-20">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Fale com o RT
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            Tire dúvidas sobre conformidade, planos ou sobre o seu diagnóstico. O
            atendimento é direto com os sócios.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-6 sm:grid-cols-3">
          <ContactCard
            icon={MessageCircle}
            title="WhatsApp"
            text="Resposta rápida no horário comercial."
            action={
              <Button
                href={whatsappLink(
                  "Olá! Vim pelo site do Food Guard e quero falar sobre conformidade.",
                )}
                external
                size="sm"
              >
                Abrir WhatsApp
              </Button>
            }
          />
          <ContactCard
            icon={Mail}
            title="E-mail"
            text={site.email}
            action={
              <Button href={`mailto:${site.email}`} external size="sm" variant="outline">
                Enviar e-mail
              </Button>
            }
          />
          <ContactCard
            icon={MapPin}
            title="Atendimento"
            text={`${site.city}. Visitas presenciais conforme o plano.`}
          />
        </div>

        <div className="mt-12 rounded-3xl bg-brand-600 px-8 py-12 text-center text-white">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Antes de falar, descubra seu risco
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-brand-50">
            O diagnóstico gratuito dá contexto à conversa: você chega sabendo o que
            falta e qual plano faz sentido.
          </p>
          <Button href="/diagnostico" size="lg" variant="secondary" className="mt-7">
            Fazer diagnóstico
          </Button>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink-muted">
          O Food Guard trata seus dados conforme a LGPD. Encarregado de Dados
          (DPO): Renan Muniz. Para solicitações relativas aos seus dados, escreva
          para {site.email}.
        </p>
      </Section>
    </>
  );
}

function ContactCard({
  icon: Icon,
  title,
  text,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-surface-sunken bg-white p-7 shadow-soft">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-5 font-display text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 flex-1 text-ink-soft">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
