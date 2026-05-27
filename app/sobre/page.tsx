import { ArrowRight, ScrollText, ShieldCheck, Target } from "lucide-react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A Food Guard é uma consultoria nutricional para food service: conformidade, documentação e equipe orientada — todo mês, sem improviso.",
};

export default function SobrePage() {
  return (
    <>
      <section className="bg-surface-soft">
        <Container className="py-16 sm:py-20">
          <Badge tone="brand">Sobre o Food Guard</Badge>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Nascemos para estar do lado de quem alimenta o Brasil.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            A Food Guard é uma consultoria nutricional para food service. Cuidamos
            de conformidade, documentação, equipe orientada e da margem que se
            ganha quando a operação roda no padrão — todo mês, sem improviso e
            sem você precisar virar especialista em norma sanitária.
          </p>
        </Container>
      </section>

      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-surface-sunken bg-white p-8 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Target className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-display text-xl font-bold text-ink">
              Pra que existimos
            </h2>
            <p className="mt-3 text-ink-soft">
              Pra que nenhum bom negócio que alimenta gente seja autuado por
              falta de acompanhamento. A vigilância não avisa quando vai
              aparecer — a Food Guard mantém a operação pronta antes disso.
            </p>
          </div>
          <div className="rounded-2xl border border-surface-sunken bg-white p-8 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-display text-xl font-bold text-ink">
              O que entregamos
            </h2>
            <p className="mt-3 text-ink-soft">
              Consultoria nutricional de ponta a ponta: documentação obrigatória
              em dia, visitas regulares à operação, treinamento da equipe e
              resposta rápida quando aperta. Tudo de forma previsível, sob
              contrato.
            </p>
          </div>
          <div className="rounded-2xl border border-surface-sunken bg-white p-8 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <ScrollText className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-display text-xl font-bold text-ink">
              Como trabalhamos
            </h2>
            <p className="mt-3 text-ink-soft">
              Nosso time é composto por nutricionistas com CRN ativo, com
              experiência prática em food service. Trabalhamos com método e
              tecnologia que tira a burocracia do seu caminho — você acompanha,
              a gente executa.
            </p>
          </div>
        </div>
      </Section>

      <section className="bg-surface-soft">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            eyebrow="Atendemos"
            title="Quem confia na Food Guard"
            description="Restaurantes, padarias, lanchonetes, buffets, dark kitchens, escolas e operações de refeição coletiva em São Paulo capital e Grande SP."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Restaurantes e bares", text: "De casa de bairro a operação com várias unidades." },
              { title: "Padarias e confeitarias", text: "Produção própria, com exigências sanitárias específicas." },
              { title: "Buffets, eventos e catering", text: "Operação variável, alto volume e múltiplos pontos de risco." },
              { title: "Escolas e refeição coletiva", text: "Atendimento contínuo e regulação mais rigorosa." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-surface-sunken bg-white p-6 shadow-soft"
              >
                <h3 className="font-display text-lg font-bold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">{item.text}</p>
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
            Trabalhamos conforme a RDC 216/2004 (Anvisa) e a Portaria 2.619/2011,
            com as normas técnicas conduzidas pelo nosso time. Tratamos os dados
            dos clientes conforme a LGPD, com registro de consentimento e proteção
            dos seus dados garantida.
          </p>
          <Button href="/diagnostico" className="mt-7">
            Descobrir meu risco de multa <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Section>
    </>
  );
}
