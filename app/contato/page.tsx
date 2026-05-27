import { Instagram, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { site, whatsappLink } from "@/lib/content/site";
import { formatPhone } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Food Guard. Atendimento em São Paulo capital e Grande SP.",
};

export default function ContatoPage() {
  return (
    <>
      <section className="bg-surface-soft">
        <Container className="py-16 text-center sm:py-20">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Fale com a Food Guard
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            Tire dúvidas sobre planos, conformidade ou sobre o seu diagnóstico —
            ou nos siga nas redes pra ver bastidores da consultoria.
          </p>
        </Container>
      </section>

      <Section>
        {/* Canais diretos */}
        <div className="grid gap-6 sm:grid-cols-3">
          <ContactCard
            icon={MessageCircle}
            title="WhatsApp"
            text={`Resposta rápida no horário comercial. ${formatPhone(site.whatsapp)}`}
            action={
              <Button
                href={whatsappLink(
                  "Olá! Vim pelo site do Food Guard e quero conversar sobre consultoria nutricional.",
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

        {/* Redes sociais */}
        <div className="mt-10">
          <h2 className="font-display text-xl font-bold text-ink">
            Nas redes
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Bastidores da consultoria, conteúdo técnico e respostas pra dúvidas
            frequentes.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <a
              href={site.social.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-surface-sunken bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0a66c2] text-white">
                <Linkedin className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display font-bold text-ink">LinkedIn</p>
                <p className="text-sm text-ink-soft group-hover:text-brand-700">
                  /company/{site.social.linkedin.handle}
                </p>
              </div>
            </a>
            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-surface-sunken bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white">
                <Instagram className="h-6 w-6" />
              </div>
              <div>
                <p className="font-display font-bold text-ink">Instagram</p>
                <p className="text-sm text-ink-soft group-hover:text-brand-700">
                  {site.social.instagram.handle}
                </p>
              </div>
            </a>
          </div>
        </div>

        <div className="mt-12 rounded-3xl bg-brand-600 px-8 py-12 text-center text-white">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Antes de falar, descubra seu risco
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-brand-50">
            O diagnóstico gratuito dá contexto à conversa: você chega sabendo o
            que falta e qual plano faz sentido.
          </p>
          <Button href="/diagnostico" size="lg" variant="secondary" className="mt-7">
            Fazer diagnóstico
          </Button>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink-muted">
          A Food Guard trata seus dados conforme a LGPD. Para solicitações
          relativas aos seus dados, escreva para {site.email}.
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
