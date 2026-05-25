import { ArrowRight, ShieldCheck, Target } from "lucide-react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "O Food Guard é uma assessoria de segurança alimentar para food service, com nutricionista responsável (CRN ativo) e tecnologia que tira a burocracia do seu caminho.",
};

export default function SobrePage() {
  return (
    <>
      <section className="bg-surface-soft">
        <Container className="py-16 sm:py-20">
          <Badge tone="brand">Sobre o Food Guard</Badge>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Conformidade sanitária acessível, previsível e auditável
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Transformamos uma obrigação difusa — ter um nutricionista responsável
            e documentação em dia — em um serviço previsível, com resposta rápida,
            segurança alimentar garantida e tecnologia que tira a burocracia do
            seu caminho.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-surface-sunken bg-white p-8 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-display text-xl font-bold text-ink">
              Nossa visão
            </h2>
            <p className="mt-3 text-ink-soft">
              Tornar a segurança alimentar acessível, previsível e auditável para
              pequenas e médias operações de food service brasileiras — com
              nutricionista responsável e tecnologia que reduz custo e erro
              humano.
            </p>
          </div>
          <div className="rounded-2xl border border-surface-sunken bg-white p-8 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-display text-xl font-bold text-ink">
              Nutricionista + tecnologia
            </h2>
            <p className="mt-3 text-ink-soft">
              Unimos um nutricionista responsável com CRN ativo à tecnologia que
              tira a burocracia do seu caminho. Você sabe exatamente o que tem, o
              que falta e quanto custa — com resposta rápida e adequação garantida
              em 90 dias.
            </p>
          </div>
        </div>
      </Section>

      <section className="bg-surface-soft">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            eyebrow="Quem assina pela sua operação"
            title="Um nutricionista de verdade cuidando do seu negócio"
            description="Não é um software impessoal: é um nutricionista responsável com nome, rosto e CRN ativo cuidando da sua segurança alimentar."
          />

          {/* Renan — destaque máximo (o RT) */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-brand-200 bg-white p-8 shadow-glow lg:col-span-2">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-brand-600 font-display text-3xl font-bold text-white">
                  RM
                </div>
                <div>
                  <Badge tone="brand">Nutricionista responsável · CRN ativo</Badge>
                  <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                    Renan Muniz
                  </h3>
                  <p className="mt-1 text-ink-soft">
                    Nutricionista com CRN ativo e mais de 10 anos em food service.
                    É ele quem assina, visita a sua operação e responde no
                    WhatsApp.
                  </p>
                </div>
              </div>
              <p className="mt-6 border-t border-surface-sunken pt-5 font-display text-lg font-semibold text-ink">
                “Garantia de adequação em 90 dias ou seu dinheiro de volta.”
              </p>
            </div>

            {/* Quem somos — empresa (sem destaque pessoal) */}
            <div className="rounded-2xl border border-surface-sunken bg-surface p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-700 text-white">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                Quem somos
              </h3>
              <p className="mt-3 text-sm text-ink-soft">
                Uma assessoria de segurança alimentar que une nutricionista
                responsável e tecnologia. Nosso time cuida da documentação, das
                visitas e das normas técnicas — você foca na sua operação.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="rounded-3xl border border-surface-sunken bg-white p-8 shadow-soft">
          <h2 className="font-display text-2xl font-bold text-ink">
            Conformidade e privacidade
          </h2>
          <p className="mt-3 max-w-3xl text-ink-soft">
            Trabalhamos conforme a RDC 216/2004 (Anvisa) e a Portaria 2.619/2011,
            com as normas técnicas conduzidas pelo nosso time. Tratamos os dados
            dos clientes conforme a LGPD, com registro de consentimento imutável e
            Encarregado de Dados (DPO) designado.
          </p>
          <Button href="/diagnostico" className="mt-7">
            Descobrir meu risco de multa <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Section>
    </>
  );
}
