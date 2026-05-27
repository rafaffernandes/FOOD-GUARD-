import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarClock,
  ClipboardCheck,
  FileWarning,
  Gauge,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PlanCard } from "@/components/ui/PlanCard";
import { plans } from "@/lib/content/plans";
import { formatBRL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Preview · estética editorial",
  robots: { index: false, follow: false },
};

/* Cores adaptadas (filosofia Serif, paleta Food Guard navy+verde):
 *   ivory   = #FAFAF8   (warmer canvas)
 *   ink     = navy-900  (rich black com leve toque navy)
 *   accent  = brand-700 #446e22  (papel do burnished gold)
 *   border  = #E8E4DF   (warm gray rules)
 */

/* ------------------------------------------------------------------ */
/*  Subcomponents                                                     */
/* ------------------------------------------------------------------ */

function Rule() {
  return <span className="h-px flex-1 bg-[#e8e4df]" />;
}

function SmallCaps({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-700 ${className}`}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-5">
      <Rule />
      <SmallCaps>{children}</SmallCaps>
      <Rule />
    </div>
  );
}

function GoldButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-brand-700 px-7 text-sm font-medium tracking-wide text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-md"
    >
      {children}
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}

function OutlineButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-navy-900/80 px-7 text-sm font-medium tracking-wide text-navy-900 transition-all duration-200 hover:border-brand-700 hover:bg-[#f5f3f0] hover:text-brand-700"
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function PreviewEditorial() {
  return (
    <div className="bg-[#FAFAF8] font-source text-navy-900">
      {/* Aviso de preview */}
      <div className="border-b border-[#e8e4df] bg-[#f5f3f0]">
        <Container className="flex items-center justify-between py-2 text-xs text-ink-soft">
          <p>
            <em>Preview</em> · estética editorial. A home oficial continua em{" "}
            <Link href="/" className="underline">
              /
            </Link>
            .
          </p>
        </Container>
      </div>

      {/* Ambient glow no canto */}
      <div className="pointer-events-none fixed -top-32 right-0 h-[520px] w-[520px] rounded-full bg-brand-300/[0.06] blur-[160px]" />

      {/* ------------------ HERO (centered, narrow, serif) ---------- */}
      <section className="relative py-32 lg:py-44">
        <Container className="max-w-3xl text-center">
          <SmallCaps>Food Guard · Segurança alimentar</SmallCaps>

          <h1 className="mt-8 font-serif text-[2.5rem] leading-[1.1] tracking-[-0.02em] text-navy-900 sm:text-6xl lg:text-[4.5rem]">
            Chega de trabalhar com{" "}
            <em className="not-italic text-brand-700">medo</em> da vigilância
            sanitária.
          </h1>

          {/* Rule line ornamental */}
          <div className="mx-auto mt-8 flex w-32 items-center justify-center">
            <span className="h-px flex-1 bg-brand-700/40" />
            <span className="mx-3 h-1.5 w-1.5 rounded-full bg-brand-700" />
            <span className="h-px flex-1 bg-brand-700/40" />
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-[1.75] tracking-[0.01em] text-ink-soft">
            Um nutricionista especializado assume toda a parte regulatória da
            sua operação — ANVISA, documentação, fiscalizações. Você foca no
            que gera faturamento.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GoldButton href="/diagnostico">
              Estou em conformidade? Descubra grátis
            </GoldButton>
            <OutlineButton href="/planos">
              Quero minha operação protegida
            </OutlineButton>
          </div>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            Grátis · 90 segundos · sem cadastro
          </p>
        </Container>
      </section>

      {/* ------------------ AUTORIDADES (rule + names, no marquee) -- */}
      <section className="border-y border-[#e8e4df] py-10">
        <Container className="max-w-5xl">
          <div className="flex flex-col items-center gap-6">
            <SmallCaps>Sua empresa em conformidade com</SmallCaps>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-3 font-serif text-xl text-navy-900">
              <span>ANVISA</span>
              <span className="h-1 w-1 rounded-full bg-brand-700/60" />
              <span>Vigilância Sanitária</span>
              <span className="h-1 w-1 rounded-full bg-brand-700/60" />
              <span>RDC 216/2004</span>
              <span className="h-1 w-1 rounded-full bg-brand-700/60" />
              <span>Portaria 2.619/2011</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------ PROBLEMA ---------------------------------- */}
      <section className="py-32 lg:py-44">
        <Container className="max-w-5xl">
          <SectionLabel>O problema</SectionLabel>

          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-4xl leading-[1.2] tracking-[-0.01em] text-navy-900 sm:text-5xl">
              Estar irregular custa caro, e quase sempre{" "}
              <em className="not-italic text-brand-700">pega de surpresa.</em>
            </h2>
            <p className="mt-6 text-lg leading-[1.75] text-ink-soft">
              Quem trabalha com alimento no Brasil convive com a RDC 216/2004
              e a Portaria 2.619/2011. Três coisas costumam pegar o dono
              desprevenido:
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3 lg:gap-12">
            {[
              {
                num: "01",
                icon: FileWarning,
                title: "A conta chega sem aviso",
                text: "A fiscalização não marca hora. Se tiver algo fora do lugar, vem multa, interdição e prejuízo — sempre muito maior do que custaria ter resolvido antes.",
              },
              {
                num: "02",
                icon: Gauge,
                title: "Você não sabe o que falta",
                text: "Manual, POPs, fichas, treinamento da equipe. É exigência demais pra acompanhar sozinho, e fica impossível saber se a operação está mesmo em ordem.",
              },
              {
                num: "03",
                icon: CalendarClock,
                title: "Ninguém assume por você",
                text: "Sem um nutricionista acompanhando de perto, cada pendência vira problema seu. E, quando a vigilância aparece, é você quem responde por tudo.",
              },
            ].map((p) => (
              <article
                key={p.title}
                className="border-t-2 border-brand-700/80 bg-white px-2 pt-10"
              >
                <SmallCaps>{p.num}</SmallCaps>
                <h3 className="mt-4 font-serif text-2xl leading-tight text-navy-900">
                  {p.title}
                </h3>
                <p className="mt-4 text-base leading-[1.75] text-ink-soft">
                  {p.text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------ SOLUÇÃO (asymmetric) --------------------- */}
      <section className="border-t border-[#e8e4df] py-32 lg:py-44">
        <Container className="max-w-5xl">
          <div className="grid items-start gap-16 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <SmallCaps>A solução</SmallCaps>
              <h2 className="mt-6 font-serif text-4xl leading-[1.15] tracking-[-0.01em] text-navy-900 sm:text-5xl">
                Segurança alimentar e tranquilidade,
                <br />
                <em className="not-italic text-brand-700">
                  em uma assinatura.
                </em>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-[1.75] text-ink-soft">
                Tudo o que a sua operação precisa pra ficar em dia, reunido em
                uma assinatura mensal simples.
              </p>
            </div>
            <div className="space-y-6 border-l border-[#e8e4df] pl-8">
              <div>
                <p className="font-serif text-5xl text-navy-900">+10</p>
                <p className="mt-2 text-sm text-ink-soft">
                  anos do nutricionista em food service
                </p>
              </div>
              <div className="h-px bg-[#e8e4df]" />
              <div>
                <p className="font-serif text-5xl text-navy-900">90 dias</p>
                <p className="mt-2 text-sm text-ink-soft">
                  pra estar 100% em conformidade real
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-[#e8e4df] bg-[#e8e4df] md:grid-cols-2">
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
              <article
                key={s.title}
                className="group flex items-start gap-5 bg-white p-10 transition-colors duration-200 hover:bg-[#f5f3f0]/40"
              >
                <s.icon className="mt-1 h-7 w-7 shrink-0 text-brand-700" strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif text-xl leading-tight text-navy-900">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-base leading-[1.75] text-ink-soft">
                    {s.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------ DIAGNÓSTICO ------------------------------ */}
      <section className="border-t border-[#e8e4df] bg-white py-32 lg:py-44">
        <Container className="max-w-5xl">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SmallCaps>O diagnóstico</SmallCaps>
              <h2 className="mt-6 font-serif text-4xl leading-[1.15] tracking-[-0.01em] text-navy-900 sm:text-5xl">
                Em 90 segundos você sai sabendo onde está{" "}
                <em className="not-italic text-brand-700">exposto.</em>
              </h2>
              <p className="mt-6 text-lg leading-[1.75] text-ink-soft">
                Cinco perguntas. Noventa segundos. Um retrato preciso do risco
                da sua operação, com o valor exato que você pode estar
                arriscando e o caminho mais curto pra resolver.
              </p>

              <ul className="mt-10 space-y-5">
                {[
                  "Descubra agora o que pode te custar caro.",
                  "Veja, em reais, o tamanho do prejuízo que está evitando.",
                  "Receba um plano claro: o que arrumar primeiro pra ficar tranquilo.",
                  "Tudo no celular, em 90 segundos, sem se cadastrar.",
                ].map((item, i) => (
                  <li key={item} className="flex gap-5">
                    <span className="font-serif text-xl leading-none text-brand-700">
                      0{i + 1}
                    </span>
                    <span className="border-l border-[#e8e4df] pl-5 leading-[1.75] text-ink-soft">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <GoldButton href="/diagnostico">
                  Descobrir meu risco de multa
                </GoldButton>
              </div>
            </div>

            {/* Editorial mock report */}
            <aside className="relative border-t-2 border-brand-700 bg-[#FAFAF8] p-10 shadow-sm">
              <SmallCaps className="text-ink-muted">
                Exemplo do seu raio-x · Ilustrativo
              </SmallCaps>
              <p className="mt-8 font-serif text-7xl leading-none text-navy-900">
                73<span className="text-3xl text-ink-muted">/100</span>
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700">
                Risco Moderado
              </p>

              <div className="my-8 h-px bg-[#e8e4df]" />

              <dl className="space-y-5 text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-soft">Multa que você está evitando</dt>
                  <dd className="font-serif text-xl text-navy-900">
                    {formatBRL(18000)}
                  </dd>
                </div>
                <div className="h-px bg-[#e8e4df]" />
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-soft">Pontos críticos</dt>
                  <dd className="font-serif text-xl text-navy-900">4 itens</dd>
                </div>
                <div className="h-px bg-[#e8e4df]" />
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-ink-soft">Próximo passo</dt>
                  <dd className="font-serif text-xl text-navy-900">
                    Plano Básico
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      {/* ------------------ PLANOS ----------------------------------- */}
      <section className="border-t border-[#e8e4df] py-32 lg:py-44">
        <Container className="max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <SmallCaps>Planos</SmallCaps>
            <h2 className="mt-6 font-serif text-4xl leading-[1.15] tracking-[-0.01em] text-navy-900 sm:text-5xl">
              Preços visíveis,{" "}
              <em className="not-italic text-brand-700">sem letra miúda.</em>
            </h2>
            <p className="mt-6 text-lg leading-[1.75] text-ink-soft">
              Três planos de assinatura mensal. 90 dias para estar 100% em
              conformidade real — se não chegarmos lá, seguimos trabalhando
              sem custo extra até chegar.
            </p>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-ink-muted">
            Não sabe qual escolher?{" "}
            <Link
              href="/diagnostico"
              className="text-brand-700 underline decoration-brand-700/40 underline-offset-4 transition-colors hover:decoration-brand-700"
            >
              Faça o diagnóstico e veja o ideal pra você
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* ------------------ HISTÓRIA / PULL QUOTE -------------------- */}
      <section className="border-t border-[#e8e4df] bg-[#f5f3f0]/40 py-32 lg:py-44">
        <Container className="max-w-4xl">
          <SectionLabel>Quem está por trás</SectionLabel>
          <div className="relative text-center">
            <span
              aria-hidden
              className="absolute -top-12 left-1/2 -translate-x-1/2 font-serif text-[120px] leading-none text-brand-700/30"
            >
              “
            </span>
            <blockquote className="relative font-serif text-3xl leading-[1.4] text-navy-900 sm:text-4xl">
              A Food Guard nasceu de um incômodo: ver bom negócio levando
              multa à toa por causa de um POP desatualizado ou um Manual que
              nunca saiu do papel.
            </blockquote>
          </div>
          <div className="mt-12 grid items-center gap-6 sm:grid-cols-[auto_1fr_auto]">
            <div className="mx-auto h-16 w-16 rounded-full bg-brand-700 font-serif text-2xl text-white sm:mx-0 flex items-center justify-center">
              RM
            </div>
            <div className="text-center sm:text-left">
              <p className="font-serif text-xl text-navy-900">Renan Muniz</p>
              <SmallCaps className="mt-1 inline-block">
                Nutricionista responsável · CRN ativo
              </SmallCaps>
            </div>
            <div className="mx-auto sm:mx-0">
              <OutlineButton href="/sobre">
                Ver nossa história completa
              </OutlineButton>
            </div>
          </div>
        </Container>
      </section>

      {/* ------------------ CTA FINAL -------------------------------- */}
      <section className="border-t border-[#e8e4df] py-32 lg:py-40">
        <Container className="max-w-3xl text-center">
          <SectionLabel>Próximo passo</SectionLabel>
          <h2 className="font-serif text-4xl leading-[1.15] tracking-[-0.01em] text-navy-900 sm:text-6xl">
            Descubra seu risco antes que a{" "}
            <em className="not-italic text-brand-700">fiscalização</em>{" "}
            descubra.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-[1.75] text-ink-soft">
            Diagnóstico gratuito, sem cadastro, resultado em 90 segundos.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <GoldButton href="/diagnostico">
              Descobrir meu risco de multa
            </GoldButton>
            <OutlineButton href="/planos">Ver planos</OutlineButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
