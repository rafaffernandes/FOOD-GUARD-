import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  FileWarning,
  Gauge,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { FAQ } from "@/components/ui/FAQ";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PlanCard } from "@/components/ui/PlanCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { plans } from "@/lib/content/plans";
import { site } from "@/lib/content/site";

const problems = [
  {
    icon: FileWarning,
    title: "Risco jurídico e financeiro",
    text: "Fiscalização, autuação, multa e até interdição — muitas vezes sem aviso e com custo de adequação tardia muito maior que o da prevenção.",
  },
  {
    icon: Gauge,
    title: "Opacidade total",
    text: "Você não sabe o que falta, quanto custa resolver, nem em quanto tempo. O RT tradicional é informal, some quando você precisa e não dá clareza nenhuma.",
  },
  {
    icon: CalendarClock,
    title: "Falta de previsibilidade",
    text: "Contratos verbais, RT que aparece esporadicamente, nenhuma trilha de auditoria. Quando a fiscalização chega, você descobre que estava descoberto.",
  },
];

const solution = [
  {
    icon: BadgeCheck,
    title: "Responsabilidade técnica nominal",
    text: "RT com nome, foto e CRN ativo assinando pela sua operação. Sem promessas vazias.",
  },
  {
    icon: ShieldCheck,
    title: "Previsibilidade contratual",
    text: "Escopo claro, visitas por mês definidas, resposta rápida garantida e adequação em 90 dias ou seu dinheiro de volta.",
  },
  {
    icon: Sparkles,
    title: "Diagnóstico instantâneo",
    text: "5 perguntas em até 90 segundos mostram seu risco, o que falta, quanto a irregularidade pode te custar e o plano recomendado.",
  },
  {
    icon: MessageSquare,
    title: "Menos papelada, mais organização",
    text: "Toda a documentação e as auditorias digitalizadas, com painel do cliente, agenda de visitas e suporte direto no WhatsApp.",
  },
];

const faqs = [
  {
    q: "Por que o Food Guard é diferente das assessorias tradicionais?",
    a: "Nascemos para modernizar um setor que parou no tempo: unimos um Responsável Técnico nutricionista com CRN-3 ativo a tecnologia que elimina papelada, dá respostas rápidas e transparência total. Você sabe exatamente o que tem, o que falta e quanto custa — algo que o RT informal não entrega.",
  },
  {
    q: "Por que preciso de um Responsável Técnico nutricionista?",
    a: "A Resolução CFN nº 600/2018 e a RDC 216/2004 da Anvisa exigem responsabilidade técnica e documentação (Manual de Boas Práticas, POPs, APPCC, fichas técnicas) para operações de food service. Sem isso, você fica exposto a autuação e interdição.",
  },
  {
    q: "Como funciona a cobrança?",
    a: "Assinatura mensal em três planos (Essencial, Conformidade e Premium), com carência mínima de 12 meses. Os preços são visíveis em todo o site — transparência faz parte do nosso posicionamento.",
  },
  {
    q: "O diagnóstico é confiável?",
    a: "O diagnóstico segue regras objetivas (não é \"chute\" de IA), baseadas na RDC 216/2004 e na CFN nº 600/2018 e atualizadas constantemente pelo nosso Responsável Técnico, Renan Muniz.",
  },
  {
    q: "Vocês atendem minha região?",
    a: "Neste momento atendemos São Paulo capital e Grande SP. Faça o diagnóstico mesmo assim — entramos em contato para avaliar seu caso.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-surface-soft">
        <div className="absolute inset-0 bg-grid-faint [background-size:22px_22px] opacity-50" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-hero-glow" />
        <Container className="relative flex flex-col items-center py-20 text-center lg:py-28">
          <div className="animate-fade-up flex flex-col items-center">
            <Badge tone="brand">
              <ShieldCheck className="h-3.5 w-3.5" /> Assessoria nutricional com
              tecnologia
            </Badge>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Trabalhe <span className="text-brand-600">sem medo</span> da
              vigilância sanitária
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Evite multas e interdições. Tenha um Responsável Técnico (RT)
              nutricionista com CRN ativo, documentação sempre em dia e adequação
              garantida em 90 dias — ou seu dinheiro de volta.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/diagnostico" size="lg">
                Descobrir meu risco de multa
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button href="/planos" size="lg" variant="outline">
                Ver planos e preços
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-muted">
              <span className="flex items-center gap-1.5">
                <Timer className="h-4 w-4 text-brand-600" /> Resultado em 90s,
                grátis
              </span>
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-brand-600" /> RT com CRN-3
                ativo
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-600" /> 90 dias ou
                devolução
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Barra de autoridade */}
      <div className="border-y border-surface-sunken bg-white">
        <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6 text-sm font-medium text-ink-soft">
          <span className="text-xs uppercase tracking-wide text-ink-muted">
            Em conformidade com
          </span>
          {[
            "ANVISA · RDC 216/2004",
            "CFN nº 600/2018",
            "RT com CRN-3 ativo",
            "Conforme a LGPD",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-brand-600" />
              {item}
            </span>
          ))}
        </Container>
      </div>

      {/* Problema */}
      <Section>
        <SectionHeading
          eyebrow="O problema"
          title="Estar irregular custa caro — e quase sempre pega de surpresa"
          description="Quem produz ou comercializa alimentos no Brasil está sujeito à RDC 216/2004 e à Resolução CFN nº 600/2018. Na prática, isso vira três dores concretas."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {problems.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-surface-sunken bg-white p-7 shadow-soft"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-danger-50 text-danger-600">
                <p.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-ink-soft">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Solução */}
      <section className="bg-surface-soft">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            eyebrow="A solução"
            title="Responsabilidade técnica e conformidade, empacotadas em assinatura"
            description="Quatro atributos que o mercado informal de RT não oferece."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {solution.map((s) => (
              <div
                key={s.title}
                className="flex gap-5 rounded-2xl border border-surface-sunken bg-white p-7 shadow-soft"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <s.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-ink-soft">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Como o diagnóstico funciona */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="O diagnóstico"
              title="5 perguntas. 90 segundos. Um relatório premium."
              description="O diagnóstico é o coração do Food Guard: mostra valor antes de pedir qualquer dado e te dá clareza imediata sobre o seu risco."
            />
            <ul className="mt-8 space-y-4">
              {[
                "Score de risco de 0 a 100, com revelação animada.",
                "Dinheiro em risco: multa estimada e custo de adequação tardia.",
                "Checklist técnico do que falta na sua operação.",
                "Plano recomendado com preço visível e dupla opção: agendar com o RT ou assinar.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <span className="text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
            <Button href="/diagnostico" size="lg" className="mt-8">
              Descobrir meu risco de multa <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="rounded-3xl bg-ink p-8 text-white shadow-lift">
            <div className="mb-6 flex items-start gap-3 rounded-2xl bg-danger-500/15 p-4 ring-1 ring-danger-500/30">
              <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-danger-400" />
              <div>
                <p className="font-display text-lg font-bold text-white">
                  Multas de R$ 2 mil a R$ 1,5 milhão
                </p>
                <p className="text-sm text-white/60">
                  O diagnóstico estima quanto a irregularidade pode custar à sua
                  operação — antes da fiscalização.
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">
              Como funciona o score
            </p>
            <div className="mt-6 space-y-4">
              {[
                ["66–100", "Risco baixo", "Essencial", "text-brand-400"],
                ["31–65", "Risco médio", "Conformidade", "text-warn-500"],
                ["0–30", "Risco crítico", "Premium", "text-danger-500"],
              ].map(([range, risk, plan, color]) => (
                <div
                  key={range}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-5 py-4"
                >
                  <div>
                    <span className={`font-display text-xl font-bold ${color}`}>
                      {range}
                    </span>
                    <span className="ml-2 text-sm text-white/60">{risk}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    → {plan}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-white/50">
              Regras baseadas na RDC 216/2004 e na CFN nº 600/2018, atualizadas
              constantemente pelo nosso Responsável Técnico.
            </p>
          </div>
        </div>
      </Section>

      {/* Planos */}
      <section className="bg-surface-soft">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            align="center"
            eyebrow="Planos"
            title="Preços visíveis, sem letra miúda"
            description="Três planos de assinatura mensal. Carência de 12 meses. Garantia de adequação em 90 dias ou devolução."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink-muted">
            Não sabe qual escolher?{" "}
            <Link href="/diagnostico" className="font-semibold text-brand-700">
              O diagnóstico recomenda o ideal para você.
            </Link>
          </p>
        </Container>
      </section>

      {/* Fundadores */}
      <Section>
        <SectionHeading
          eyebrow="Quem assina pela sua operação"
          title="Pessoas reais, com nome e registro"
          description="Sem call center, sem promessa vazia. Os sócios atendem os primeiros clientes pessoalmente."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {site.founders.map((f) => (
            <div
              key={f.name}
              className="flex gap-5 rounded-2xl border border-surface-sunken bg-white p-7 shadow-soft"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-600 font-display text-xl font-bold text-white">
                {f.initials}
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-ink">
                  {f.name}
                </h3>
                <p className="text-sm font-medium text-brand-700">{f.role}</p>
                <p className="mt-2 text-sm text-ink-soft">{f.credentials}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <section className="bg-surface-soft">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            align="center"
            eyebrow="Dúvidas"
            title="Perguntas frequentes"
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <FAQ items={faqs} />
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <Section>
        <div className="overflow-hidden rounded-3xl bg-brand-600 px-8 py-14 text-center text-white sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold sm:text-4xl">
            Descubra seu risco sanitário antes que a fiscalização descubra.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-50">
            Diagnóstico gratuito, sem login, resultado em 90 segundos.
          </p>
          <Button
            href="/diagnostico"
            size="lg"
            variant="secondary"
            className="mt-8"
          >
            Descobrir meu risco de multa <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Section>
    </>
  );
}
