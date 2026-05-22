import { ArrowRight, ShieldCheck, Target } from "lucide-react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "O Food Guard é uma assessoria de conformidade sanitária e nutricional para food service, fundada por Renan Muniz (RT nutricionista CRN-3) e Rafael Fernandes (produto e IA).",
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
            Transformamos uma obrigação legal difusa — ter um RT nutricionista e
            documentação técnica em dia — em um serviço previsível, com resposta
            rápida garantida, responsabilidade técnica nominal e tecnologia que
            elimina papelada.
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
              Tornar a regulação sanitária e nutricional acessível, previsível e
              auditável para pequenas e médias operações de food service
              brasileiras — entregando previsibilidade contratual,
              responsabilidade técnica nominal e tecnologia que reduz custo e erro
              humano.
            </p>
          </div>
          <div className="rounded-2xl border border-surface-sunken bg-white p-8 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-display text-xl font-bold text-ink">
              Posicionamento honesto
            </h2>
            <p className="mt-3 text-ink-soft">
              Somos uma assessoria nova. Não temos 180 clientes nem 15 anos de
              operação. Temos um Responsável Técnico com nome, registro ativo
              (CRN-3), rosto e disposição de atender pessoalmente os primeiros
              clientes — um diferencial de confiança num setor cheio de promessas
              vazias.
            </p>
          </div>
        </div>
      </Section>

      <section className="bg-surface-soft">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            eyebrow="Os sócios"
            title="Quem está por trás"
            description="Operação enxuta, dois sócios, responsabilidade clara."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {site.founders.map((f) => (
              <div
                key={f.name}
                className="rounded-2xl border border-surface-sunken bg-white p-8 shadow-soft"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 font-display text-xl font-bold text-white">
                    {f.initials}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink">
                      {f.name}
                    </h3>
                    <p className="text-sm font-medium text-brand-700">{f.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-ink-soft">{f.credentials}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section>
        <div className="rounded-3xl border border-surface-sunken bg-white p-8 shadow-soft">
          <h2 className="font-display text-2xl font-bold text-ink">
            Conformidade e privacidade
          </h2>
          <p className="mt-3 max-w-3xl text-ink-soft">
            Trabalhamos em conformidade com a RDC 216/2004 (Anvisa) e a Resolução
            CFN nº 600/2018. Renan Muniz é formalmente designado DPO (Encarregado
            de Dados), e tratamos os dados dos clientes conforme a LGPD, com
            registro de consentimento imutável e segregação de funções.
          </p>
          <Button href="/diagnostico" className="mt-7">
            Fazer diagnóstico gratuito <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Section>
    </>
  );
}
