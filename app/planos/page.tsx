import { Check, Minus } from "lucide-react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FAQ } from "@/components/ui/FAQ";
import { PlanCard } from "@/components/ui/PlanCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { comparisonRows, plans } from "@/lib/content/plans";
import { formatBRL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Planos e preços",
  description:
    "Três planos de assinatura mensal de segurança alimentar: Básico (R$ 700), Essencial (R$ 1.200) e Premium (R$ 1.999). Garantia de adequação em 90 dias.",
};

const planFaqs = [
  {
    q: "Como funciona a garantia de 90 dias?",
    a: "Se em 90 dias a sua operação não estiver adequada conforme o escopo do plano, devolvemos o valor pago. A garantia cobre a entrega do nosso trabalho técnico.",
  },
  {
    q: "Posso trocar de plano depois?",
    a: "Sim. Conforme sua operação cresce ou as exigências mudam, você pode migrar de plano. O diagnóstico ajuda a identificar o ideal a cada momento.",
  },
  {
    q: "Qual plano inclui o nutricionista responsável?",
    a: "O plano Premium inclui o nutricionista responsável assinando pela sua operação. Os planos Básico e Essencial cuidam da documentação, das visitas e das boas práticas; a responsabilidade técnica pode ser contratada à parte.",
  },
];

export default function PlanosPage() {
  return (
    <>
      <section className="bg-surface-soft">
        <Container className="py-16 text-center sm:py-20">
          <Badge tone="brand">Preços transparentes</Badge>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Segurança alimentar previsível, com preço na mesa
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            Assinatura mensal e garantia de adequação em 90 dias ou seu dinheiro
            de volta. Sem surpresa, sem letra miúda.
          </p>
        </Container>
      </section>

      <Section className="pt-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Tabela comparativa */}
        <div className="mt-16 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-surface-sunken">
                <th className="py-4 pr-4 text-sm font-semibold text-ink-muted">
                  Comparativo
                </th>
                {plans.map((p) => (
                  <th key={p.id} className="px-4 py-4">
                    <div className="font-display text-lg font-bold text-ink">
                      {p.name}
                    </div>
                    <div className="text-sm font-medium text-brand-700">
                      {formatBRL(p.price)}/mês
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row} className="border-b border-surface-sunken">
                  <td className="py-4 pr-4 text-sm font-medium text-ink">
                    {row}
                  </td>
                  {plans.map((p) => {
                    const value = p.features.find((f) => f.label === row)?.value;
                    return (
                      <td key={p.id} className="px-4 py-4 text-sm text-ink-soft">
                        {value === "Não" || !value ? (
                          <Minus className="h-4 w-4 text-ink-muted" />
                        ) : value === "Sim" ? (
                          <Check className="h-4 w-4 text-brand-600" />
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 rounded-3xl bg-ink px-8 py-12 text-center text-white">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Não sabe qual plano é o seu?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/70">
            Faça o diagnóstico gratuito: em 90 segundos recomendamos o plano ideal
            com base no seu risco real.
          </p>
          <Button href="/diagnostico" size="lg" className="mt-7">
            Fazer diagnóstico e descobrir meu plano ideal
          </Button>
        </div>
      </Section>

      <section className="bg-surface-soft">
        <Container className="py-16 sm:py-24">
          <SectionHeading align="center" eyebrow="Dúvidas" title="Sobre os planos" />
          <div className="mx-auto mt-10 max-w-3xl">
            <FAQ items={planFaqs} />
          </div>
        </Container>
      </section>
    </>
  );
}
