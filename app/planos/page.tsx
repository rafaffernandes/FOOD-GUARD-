import { Check } from "lucide-react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FAQ } from "@/components/ui/FAQ";
import { PlanCard } from "@/components/ui/PlanCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { comparisonRows, plans } from "@/lib/content/plans";
import { site } from "@/lib/content/site";
import { formatBRL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Planos e preços",
  description:
    "Três planos de consultoria nutricional para food service: Básico (R$ 700), Essencial (R$ 1.200) e Premium (R$ 1.999).",
};

const planFaqs = [
  {
    q: "Se a vigilância aparecer enquanto sou cliente, vocês me ajudam?",
    a: "Sim, e na hora. O nosso atendimento no WhatsApp é direto com o nutricionista do seu plano. Se a fiscalização chegar, a gente entra em contato com o fiscal junto com você, organiza a documentação que ele precisa ver e monta o plano de resposta na hora — sem você ter que improvisar uma defesa sozinho.",
  },
  {
    q: "Quanto tempo até minha operação estar em conformidade?",
    a: "Depende de onde você está partindo, mas o caminho típico é: o que falta começa a sair do papel já na primeira visita; documentação obrigatória (POPs, doc. ANVISA, Manual de Boas Práticas) fica pronta entre 30 e 60 dias; conformidade plena, com a equipe treinada e processos rodando, costuma se consolidar em 90 dias.",
  },
  {
    q: "Posso trocar de plano se precisar de mais suporte?",
    a: "Pode, e na hora. Se a sua operação cresce, se você decide abrir uma unidade, se uma fiscalização aperta o ritmo — em qualquer um desses momentos você sobe de plano sem multa e sem reinício de prazo. Você paga só a diferença, e o nutricionista assume a partir do mês seguinte.",
  },
  {
    q: "O nutricionista assina pela minha operação?",
    a: "Só no plano Premium. No Premium, o Renan assume a responsabilidade técnica formal — ele assina, responde tecnicamente pela operação e é referência junto à vigilância. Nos planos Básico e Essencial, cuidamos da documentação e das visitas, mas a responsabilidade técnica permanece com o seu nutricionista atual (ou pode ser contratada à parte).",
  },
];

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${site.url}/planos#service`,
  name: "Consultoria nutricional para food service",
  serviceType: "Consultoria em segurança alimentar e conformidade sanitária",
  provider: { "@id": `${site.url}/#organization` },
  areaServed: { "@type": "City", name: "São Paulo" },
  url: `${site.url}/planos`,
  description:
    "Consultoria nutricional recorrente para restaurantes, padarias, buffets, dark kitchens e operações de refeição coletiva. Nutricionista responsável, documentação ANVISA (Manual de Boas Práticas, POPs, fichas técnicas), treinamento da equipe e suporte no WhatsApp. Em conformidade com RDC 216/2004 e Portaria 2.619/2011.",
  offers: plans.map((p) => ({
    "@type": "Offer",
    name: `Plano ${p.name}`,
    price: p.price,
    priceCurrency: "BRL",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: p.price,
      priceCurrency: "BRL",
      unitText: "MONTH",
      billingDuration: "P1M",
    },
    url: `${site.url}/planos`,
    availability: "https://schema.org/InStock",
    category: p.positioning,
  })),
};

const productsLd = plans.map((p) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${site.url}/planos#plano-${p.id}`,
  name: `Plano ${p.name} — Food Guard`,
  description: `${p.positioning} ${p.featuresList.join(". ")}.`,
  brand: { "@type": "Brand", name: site.name },
  category: "Consultoria nutricional / Conformidade sanitária",
  offers: {
    "@type": "Offer",
    price: p.price,
    priceCurrency: "BRL",
    url: `${site.url}/planos`,
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: p.price,
      priceCurrency: "BRL",
      unitText: "MONTH",
    },
  },
}));

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/planos#faq`,
  mainEntity: planFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PlanosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      {productsLd.map((p) => (
        <script
          key={p["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(p) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <section className="bg-surface-soft">
        <Container className="py-16 text-center sm:py-20">
          <Badge tone="brand">Planos</Badge>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            A vigilância não avisa quando vai aparecer.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
            Sua operação precisa estar pronta. Consultoria nutricional de ponta
            a ponta — conformidade, margem e equipe no padrão, todo mês.
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
                          <span className="text-ink-muted/50">—</span>
                        ) : value === "Sim" ? (
                          <Check className="h-4 w-4 text-brand-600" strokeWidth={3} />
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

      <section id="faq" className="bg-surface-soft">
        <Container className="py-16 sm:py-24">
          <SectionHeading align="center" eyebrow="Dúvidas" title="Perguntas frequentes" />
          <div className="mx-auto mt-10 max-w-3xl">
            <FAQ items={planFaqs} />
          </div>
        </Container>
      </section>
    </>
  );
}
