import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  ClipboardCheck,
  FileWarning,
  Gauge,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlanCard } from "@/components/ui/PlanCard";
import { plans } from "@/lib/content/plans";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Preview · novo design",
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/*  Subcomponents (inline para isolar do design system atual)         */
/* ------------------------------------------------------------------ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-brand-300/50 bg-brand-50 px-5 py-2">
      <span className="h-2 w-2 animate-pulse-dot rounded-full bg-brand-500" />
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-brand-700">
        {children}
      </span>
    </div>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-signature-gradient bg-clip-text text-transparent">
      {children}
    </span>
  );
}

function PrimaryCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-accent-gradient px-7 font-semibold text-white shadow-accent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-accent-lg hover:brightness-110 active:scale-[0.98]"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function SecondaryCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-surface-sunken bg-white px-7 font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function PreviewHome() {
  return (
    <div className="bg-surface">
      {/* Aviso de preview */}
      <div className="bg-warn-50 border-b border-warn-100">
        <Container className="flex items-center justify-between py-2 text-xs text-warn-600">
          <p>
            <strong>Preview</strong> · nova proposta de design para a home. A home oficial continua em{" "}
            <Link href="/" className="underline">/</Link>.
          </p>
        </Container>
      </div>

      {/* ------------------ HERO (asymmetric, animated graphic) ----- */}
      <section className="relative overflow-hidden">
        {/* Atmospheric glows */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-brand-300/30 blur-[140px]" />
        <div className="pointer-events-none absolute -right-40 top-40 h-[420px] w-[420px] rounded-full bg-navy-200/40 blur-[160px]" />

        <Container className="relative grid items-center gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
          {/* LEFT — copy */}
          <div className="animate-fade-up-slow">
            <SectionLabel>Segurança alimentar inteligente</SectionLabel>

            <h1 className="mt-7 font-serif text-[2.75rem] leading-[1.05] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[5.25rem]">
              Chega de trabalhar
              <br />
              com{" "}
              <span className="relative inline-block">
                <GradientText>medo</GradientText>
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-3 w-full rounded-sm bg-signature-gradient opacity-15 md:-bottom-2 md:h-4"
                />
              </span>{" "}
              da
              <br />
              vigilância sanitária
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              Um nutricionista especializado assume toda a parte regulatória da
              sua operação. Você foca no que gera faturamento.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryCta href="/diagnostico">
                Estou em conformidade? Descubra grátis
              </PrimaryCta>
              <SecondaryCta href="/planos">
                Quero minha operação protegida
              </SecondaryCta>
            </div>

            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
              Grátis · 90s · Veja quais pontos podem gerar multa
            </p>
          </div>

          {/* RIGHT — abstract animated graphic */}
          <div className="relative mx-auto hidden h-[480px] w-[480px] max-w-full lg:block">
            {/* Outer rotating dashed ring */}
            <div className="absolute inset-0 animate-rotate-slow rounded-full border-2 border-dashed border-brand-400/30" />
            {/* Inner ring */}
            <div className="absolute inset-12 rounded-full border border-surface-sunken bg-white shadow-xl" />

            {/* Floating card top-right — mini score */}
            <div className="absolute right-0 top-8 w-52 animate-float rounded-2xl border border-surface-sunken bg-white p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                  Score
                </span>
                <BadgeCheck className="h-4 w-4 text-brand-500" />
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-serif text-5xl text-ink">88</span>
                <span className="text-sm text-ink-muted">/100</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-sunken">
                <div className="h-full w-[88%] rounded-full bg-accent-gradient" />
              </div>
            </div>

            {/* Floating card bottom-left — status pill */}
            <div className="absolute bottom-8 left-0 w-56 animate-float-slow rounded-2xl bg-navy-900 p-5 text-white shadow-xl">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse-dot rounded-full bg-brand-400" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/60">
                  Em ordem
                </span>
              </div>
              <p className="mt-3 font-serif text-xl leading-tight">
                Documentação ANVISA + POPs
              </p>
              <p className="mt-1 text-xs text-white/50">Atualizado hoje</p>
            </div>

            {/* Corner accent block */}
            <div className="absolute bottom-0 right-0 h-28 w-28 rounded-3xl bg-accent-gradient shadow-accent-lg" />

            {/* Dot grid */}
            <div className="absolute right-12 top-1/2 grid -translate-y-1/2 grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-brand-300"
                  style={{ opacity: 0.4 + ((i % 3) * 0.2) }}
                />
              ))}
            </div>

            {/* Center mini badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-surface-sunken bg-white px-4 py-2 shadow-md">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand-700">
                Food Guard
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------ MARQUEE ---------------------------------- */}
      <div className="border-y border-surface-sunken bg-white">
        <Container className="py-6">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            Sua empresa em conformidade com
          </p>
          <div className="mt-4 overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-16 whitespace-nowrap font-serif text-xl text-ink">
              {Array.from({ length: 2 }).flatMap((_, copy) =>
                ["ANVISA", "Vigilância Sanitária", "RDC 216/2004", "Portaria 2.619/2011"].map(
                  (item) => (
                    <span key={`${copy}-${item}`} className="flex items-center gap-16">
                      {item}
                      <span className="h-1 w-1 rounded-full bg-brand-400" />
                    </span>
                  ),
                ),
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* ------------------ PROBLEMA (INVERTED) ---------------------- */}
      <section className="relative overflow-hidden bg-navy-900 py-28 text-white">
        {/* Dot pattern texture */}
        <div className="pointer-events-none absolute inset-0 bg-dot-pattern [background-size:24px_24px] opacity-100" />
        {/* Corner glow */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-brand-500/10 blur-[140px]" />

        <Container className="relative">
          <div className="max-w-2xl">
            <SectionLabel>O problema</SectionLabel>
            <h2 className="mt-6 font-serif text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl">
              Estar irregular custa caro e quase sempre{" "}
              <GradientText>pega de surpresa</GradientText>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Quem trabalha com alimento no Brasil convive com a RDC 216/2004 e
              a Portaria 2.619/2011. Na correria do dia a dia, três coisas
              costumam pegar o dono desprevenido:
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: FileWarning,
                title: "A conta chega sem aviso",
                text: "A fiscalização não marca hora. Se tiver algo fora do lugar, vem multa, interdição e prejuízo — sempre muito maior do que custaria ter resolvido antes.",
              },
              {
                icon: Gauge,
                title: "Você não sabe o que falta",
                text: "Manual, POPs, fichas, treinamento da equipe. É exigência demais pra acompanhar sozinho, e fica impossível saber se a operação está mesmo em ordem.",
              },
              {
                icon: CalendarClock,
                title: "Ninguém assume por você",
                text: "Sem um nutricionista acompanhando de perto, cada pendência vira problema seu. E, quando a vigilância aparece, é você quem responde por tudo.",
              },
            ].map((p, i) => (
              <div
                key={p.title}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.07]"
              >
                <span className="font-mono text-xs text-white/40">
                  0{i + 1}
                </span>
                <div className="mt-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-gradient text-white shadow-accent">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-white">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-white/65">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------ SOLUÇÃO ---------------------------------- */}
      <section className="relative py-28">
        <Container>
          <div className="max-w-2xl">
            <SectionLabel>A solução</SectionLabel>
            <h2 className="mt-6 font-serif text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Segurança alimentar e <GradientText>tranquilidade</GradientText> em uma
              assinatura
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Tudo o que a sua operação precisa pra ficar em dia, reunido em
              uma assinatura mensal simples.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[
              {
                icon: BadgeCheck,
                title: "Um nutricionista que conhece sua operação",
                text: "Um nutricionista do nosso time vai até a sua operação, entende sua rotina e cuida da segurança alimentar de perto. Você fala com uma pessoa de verdade, não com um call center.",
              },
              {
                icon: ShieldCheck,
                title: "Você sempre sabe onde está",
                text: "Escopo claro, visitas marcadas e um plano de ação com prazo. Sem surpresa: você sabe o que falta e quando vai estar resolvido.",
              },
              {
                icon: ClipboardCheck,
                title: "Pronto pra fiscalização a qualquer hora",
                text: "Documentação sempre em dia e equipe orientada. Se a vigilância bater na porta hoje, você mostra tudo sem suar frio.",
              },
              {
                icon: MessageSquare,
                title: "A papelada é com a gente",
                text: "Manual, POPs, fichas técnicas e auditorias organizados e digitalizados. Você cuida do seu negócio; a documentação fica por nossa conta.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-2xl border border-surface-sunken bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-500/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent-gradient text-white shadow-accent transition-transform duration-300 group-hover:scale-110">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-ink">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------ DIAGNÓSTICO ------------------------------ */}
      <section className="relative overflow-hidden bg-brand-50/40 py-28">
        <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-brand-300/30 blur-[100px]" />
        <Container className="relative grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionLabel>O diagnóstico</SectionLabel>
            <h2 className="mt-6 font-serif text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Em 90 segundos você sai sabendo onde está{" "}
              <GradientText>exposto</GradientText>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Cinco perguntas. Noventa segundos. Um retrato preciso do risco
              da sua operação, com o valor exato que você pode estar
              arriscando e o caminho mais curto pra resolver.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Sai do escuro: descubra agora o que pode te custar caro.",
                "Veja, em reais, o tamanho do prejuízo que está evitando.",
                "Receba um plano claro: o que arrumar primeiro pra ficar tranquilo.",
                "Tudo no celular, em 90 segundos, sem ter que se cadastrar.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-gradient">
                    <BadgeCheck className="h-3 w-3 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <PrimaryCta href="/diagnostico">
                Descobrir meu risco de multa
              </PrimaryCta>
            </div>
          </div>

          {/* Preview do relatório */}
          <div className="relative rounded-3xl bg-navy-900 p-8 text-white shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-300">
                Exemplo do seu raio-x
              </span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-white/60">
                Ilustrativo
              </span>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-white/60">Seu índice</p>
                <p className="font-serif text-6xl text-white">73</p>
                <p className="font-mono text-xs uppercase tracking-wider text-warn-500">
                  Risco moderado
                </p>
              </div>
              <Sparkles className="h-12 w-12 text-brand-400/40" />
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[73%] rounded-full bg-accent-gradient" />
            </div>

            <ul className="mt-7 space-y-2.5">
              <li className="flex items-center justify-between text-sm">
                <span className="text-white/70">Multa que você evita</span>
                <span className="font-serif text-lg text-white">Até R$ 18.000</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-white/70">Pontos críticos</span>
                <span className="font-serif text-lg text-white">4 itens</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-white/70">Plano ideal</span>
                <span className="font-serif text-lg text-white">Básico</span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* ------------------ PLANOS ----------------------------------- */}
      <section className="relative py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Planos</SectionLabel>
            <h2 className="mt-6 font-serif text-4xl leading-[1.1] tracking-tight text-ink sm:text-5xl">
              Preços visíveis, sem <GradientText>letra miúda</GradientText>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Três planos de assinatura mensal. 90 dias para estar 100% em
              conformidade real — se não chegarmos lá, seguimos trabalhando
              sem custo extra até chegar.
            </p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink-muted">
            Não sabe qual escolher?{" "}
            <Link href="/diagnostico" className="font-semibold text-brand-700 underline-offset-4 hover:underline">
              Faça o diagnóstico e veja o ideal pra você.
            </Link>
          </p>
        </Container>
      </section>

      {/* ------------------ HISTÓRIA --------------------------------- */}
      <section className="py-28">
        <Container className="max-w-5xl">
          <div className="rounded-[2rem] border border-surface-sunken bg-white p-10 shadow-xl sm:p-14">
            <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              {/* Placeholder foto Renan */}
              <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-tl-[3rem] rounded-br-[3rem] bg-accent-gradient shadow-accent-lg lg:mx-0">
                <div className="absolute inset-0 flex items-center justify-center font-serif text-7xl text-white/95">
                  RM
                </div>
              </div>
              <div>
                <SectionLabel>Quem está por trás</SectionLabel>
                <h2 className="mt-6 font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
                  A Food Guard nasceu de um incômodo: ver bom negócio levando{" "}
                  <GradientText>multa à toa</GradientText>
                </h2>
                <p className="mt-5 leading-relaxed text-ink-soft">
                  Renan Muniz passou mais de 10 anos dentro de operações food
                  service — restaurantes, hospitais, catering, cozinha
                  industrial. Viu de perto o que acontece quando uma boa
                  operação é autuada por causa de um POP desatualizado ou um
                  Manual que nunca saiu do papel. Rafael vem da tecnologia e
                  enxergou que esse problema tem solução.
                </p>
                <div className="mt-7">
                  <SecondaryCta href="/sobre">
                    Ver nossa história completa
                  </SecondaryCta>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------ CTA FINAL (INVERTED) --------------------- */}
      <section className="relative overflow-hidden bg-navy-900 py-28 text-white">
        <div className="pointer-events-none absolute inset-0 bg-dot-pattern [background-size:32px_32px] opacity-100" />
        <div className="pointer-events-none absolute -left-32 -bottom-32 h-[420px] w-[420px] rounded-full bg-brand-500/15 blur-[140px]" />

        <Container className="relative text-center">
          <SectionLabel>Próximo passo</SectionLabel>
          <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-[1.1] tracking-tight text-white sm:text-6xl">
            Descubra seu risco antes que a{" "}
            <GradientText>fiscalização</GradientText> descubra.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
            Diagnóstico gratuito, sem cadastro, resultado em 90 segundos.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryCta href="/diagnostico">
              Descobrir meu risco de multa
            </PrimaryCta>
            <Link
              href="/planos"
              className={cn(
                "inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-white/20 px-7 font-semibold text-white",
                "transition-all hover:-translate-y-0.5 hover:bg-white/10",
              )}
            >
              Ver planos
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
