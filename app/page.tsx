import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  ClipboardCheck,
  ClipboardList,
  FileWarning,
  Gauge,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  ShieldCheck,
  Target,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FAQ } from "@/components/ui/FAQ";
import { FadeInOnScroll } from "@/components/ui/FadeInOnScroll";
import { photos } from "@/lib/content/photos";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PlanCard } from "@/components/ui/PlanCard";
import { Section, SectionHeading } from "@/components/ui/Section";
import { plans } from "@/lib/content/plans";
import { site, whatsappLink } from "@/lib/content/site";

const problems = [
  {
    icon: FileWarning,
    title: "A conta chega sem aviso",
    text: "A fiscalização não marca hora. Se tiver algo fora do lugar, vem multa, interdição e prejuízo, sempre muito maior do que custaria ter resolvido antes.",
  },
  {
    icon: Gauge,
    title: "Você não sabe o que falta",
    text: "Manual, POPs, fichas técnicas, treinamento da equipe. É exigência demais pra acompanhar sozinho, e fica impossível saber se a sua operação está mesmo em ordem.",
  },
  {
    icon: CalendarClock,
    title: "Ninguém assume por você",
    text: "Sem um nutricionista acompanhando de perto, cada pendência vira problema seu. E, quando a vigilância aparece, é você quem responde por tudo.",
  },
];

const solution = [
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
    text: "Auditorias organizadas e digitalizadas. Manual, POPs e fichas técnicas em dia. Você cuida do seu negócio, a documentação fica por nossa conta.",
  },
];

const faqs = [
  {
    q: "Por que preciso de um nutricionista responsável?",
    a: "A Portaria 2.619/2011 e a RDC 216/2004 exigem boas práticas e documentação (Manual de Boas Práticas, POPs, fichas técnicas) para operações de food service. Um nutricionista responsável garante que tudo isso esteja em ordem e assina pela sua operação — sem isso, você fica exposto a autuação e interdição.",
  },
  {
    q: "Como funciona a cobrança?",
    a: "Assinatura mensal em três planos (Básico, Essencial e Premium), com preços visíveis em todo o site. Sem surpresa, sem letra miúda.",
  },
  {
    q: "O diagnóstico é confiável?",
    a: "O diagnóstico segue regras objetivas (não é \"chute\" de IA), baseadas na Portaria 2.619/2011 e na RDC 216/2004, atualizadas constantemente pela nossa equipe de nutricionistas.",
  },
  {
    q: "Vou ter que preencher muita papelada?",
    a: "Zero papelada da sua parte. Nós montamos, organizamos e digitalizamos toda a documentação técnica para você — Manual de Boas Práticas, POPs, fichas e registros. Você só acompanha.",
  },
  {
    q: "A vigilância bateu aqui hoje. Vocês resolvem rápido?",
    a: "Sim. O atendimento no WhatsApp é direto com o nutricionista e montamos seu plano de emergência na hora. Comece pelo diagnóstico para já chegarmos sabendo o que a sua operação precisa.",
  },
  {
    q: "Vocês atendem minha região?",
    a: "Neste momento atendemos São Paulo capital e Grande SP. Faça o diagnóstico mesmo assim — entramos em contato para avaliar seu caso.",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      {/* Hero — capa full com foto e overlay navy */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <Image
          src={photos.hero.src}
          alt={photos.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/85 to-navy-950" />
        <div className="absolute inset-0 bg-brand-sheen opacity-[0.06]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-hero-glow" />
        <Container className="relative flex flex-col items-center py-24 text-center lg:py-32">
          <div className="animate-fade-up flex flex-col items-center">
            <h1 className="max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Chega de trabalhar com{" "}
              <span className="text-brand-400">medo</span> da vigilância
              sanitária
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              Um nutricionista especializado assume toda a parte regulatória da
              sua operação. Você foca no que gera receita.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
              <Button href="/diagnostico" size="lg">
                Estou em conformidade? Descubra grátis
              </Button>
              <Button href="/planos" size="lg" variant="outline">
                Quero minha operação protegida
              </Button>
            </div>
            <p className="mt-3 text-sm text-white/55">
              Grátis · 90s · Veja quais pontos críticos podem gerar multa.
            </p>
          </div>
        </Container>
      </section>

      {/* Barra de autoridade — marquee infinito (R → L) */}
      <div className="relative overflow-hidden border-y border-surface-sunken bg-white">
        <Container className="relative py-5">
          <p className="text-center text-xs uppercase tracking-[0.18em] text-ink-muted">
            Sua empresa em conformidade com
          </p>
          <div className="mt-3 overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap text-sm font-medium text-ink-soft">
              {Array.from({ length: 2 }).flatMap((_, copy) =>
                [
                  "ANVISA",
                  "Vigilância sanitária",
                  "RDC 216/2004",
                  "Portaria 2.619/2011",
                ].map((item) => (
                  <span
                    key={`${copy}-${item}`}
                    className="flex items-center gap-2"
                  >
                    <BadgeCheck className="h-4 w-4 text-brand-600" />
                    {item}
                    <span className="ml-12 text-ink-muted/40">·</span>
                  </span>
                )),
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Problema */}
      <Section className="bg-[#f4efe4]">
        <SectionHeading
          eyebrow="O problema"
          title="Estar irregular custa caro e quase sempre pega de surpresa"
          description="Quem trabalha com alimento no Brasil convive com a RDC 216/2004 e a Portaria 2.619/2011. Na correria do dia a dia, três coisas costumam pegar o dono desprevenido:"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {problems.map((p, i) => (
            <FadeInOnScroll
              key={p.title}
              delay={i * 100}
              as="article"
              className="overflow-hidden rounded-2xl border border-surface-sunken bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={photos.problems[i]}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent" />
              </div>
              <div className="-mt-6 relative p-7">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-danger-50 text-danger-600 ring-4 ring-white">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-ink-soft">{p.text}</p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </Section>

      {/* Solução */}
      <section className="bg-[#fbfaf6]">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            eyebrow="A solução"
            title="Segurança alimentar e tranquilidade em uma assinatura"
            description="Tudo o que a sua operação precisa pra ficar em dia, reunido em uma assinatura mensal simples."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {solution.map((s, i) => (
              <FadeInOnScroll
                key={s.title}
                delay={i * 80}
                as="article"
                className="group grid grid-cols-[140px_1fr] overflow-hidden rounded-2xl border border-surface-sunken bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift sm:grid-cols-[180px_1fr]"
              >
                <div className="relative h-full min-h-[160px] overflow-hidden bg-brand-50">
                  <Image
                    src={photos.solutions[i]}
                    alt=""
                    fill
                    sizes="180px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-900/10 to-transparent" />
                </div>
                <div className="flex gap-4 p-6 sm:p-7">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft">{s.text}</p>
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Como o diagnóstico funciona */}
      <Section className="bg-brand-50/40">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="O diagnóstico"
              title="Em 90 segundos você sai sabendo onde está exposto"
              description="Cinco perguntas. Noventa segundos. Um retrato preciso do risco da sua operação, com o valor exato que você pode estar arriscando e o caminho mais curto pra resolver."
            />
            <ul className="mt-8 space-y-4">
              {[
                "Não fique no escuro: descubra agora o que pode te custar caro.",
                "Veja, em reais, o tamanho do prejuízo que está evitando.",
                "Receba um plano claro: o que arrumar primeiro pra ficar tranquilo.",
                "Tudo no celular, em 90 segundos, sem ter que se cadastrar.",
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

          {/* Preview atrativo: exemplo concreto do entregável (ilustrativo) */}
          <div className="relative rounded-3xl bg-navy-900 p-8 text-white shadow-lift">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-300">
                Exemplo do seu raio-x
              </p>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                Ilustrativo
              </span>
            </div>
            <ul className="space-y-3">
              {/* Índice de conformidade */}
              <li className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-white/80">
                    <ShieldCheck className="h-4 w-4 text-brand-400" />
                    Seu índice de conformidade
                  </span>
                  <span className="font-display text-lg font-bold text-brand-300">
                    73 / 100
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[73%] rounded-full bg-brand-500" />
                </div>
                <p className="mt-2 text-xs text-white/55">Risco moderado</p>
              </li>
              {/* Multa */}
              <li className="flex items-center justify-between rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <span className="flex items-center gap-2 text-sm text-white/80">
                  <Wallet className="h-4 w-4 text-brand-400" />
                  Multa que você está evitando
                </span>
                <span className="font-display text-lg font-bold text-danger-300">
                  Até R$ 18.000
                </span>
              </li>
              {/* Pontos críticos */}
              <li className="flex items-center justify-between rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <span className="flex items-center gap-2 text-sm text-white/80">
                  <ClipboardList className="h-4 w-4 text-brand-400" />
                  Pontos críticos identificados
                </span>
                <span className="font-display text-base font-bold text-white">
                  4 itens
                </span>
              </li>
              {/* Próximo passo */}
              <li className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Target className="h-4 w-4 text-brand-400" />
                  Próximo passo recomendado
                </div>
                <p className="mt-1 text-sm font-semibold text-white">
                  Plano Básico: documentação e visitas quinzenais
                </p>
              </li>
            </ul>

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-danger-500/15 p-4 ring-1 ring-danger-500/30">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-danger-400" />
              <p className="text-sm text-white/80">
                Uma autuação sanitária custa entre{" "}
                <strong className="text-white">R$ 2 mil e R$ 30 mil</strong>.
                Seu diagnóstico mostra, ponto a ponto, o que falta e quanto
                isso pode custar se você esperar mais.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Planos */}
      <section className="bg-surface-soft">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            align="center"
            eyebrow="Planos"
            title="A vigilância não avisa quando vai aparecer."
            description="Sua operação precisa estar pronta. Consultoria nutricional de ponta a ponta: conformidade, margem e equipe no padrão, todo mês."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-ink-muted">
            Não sabe qual escolher?{" "}
            <Link href="/diagnostico" className="font-semibold text-brand-700">
              Faça o diagnóstico e veja o ideal pra você.
            </Link>
          </p>
        </Container>
      </section>

      {/* Quem somos */}
      <Section>
        <div className="rounded-3xl border border-surface-sunken bg-white p-8 shadow-soft sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
            Quem somos
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
            A Food Guard nasceu de um incômodo: ver bom negócio levando multa
            à toa
          </h2>
          <p className="mt-3 text-ink-soft">
            A Food Guard é uma consultoria nutricional para food service. Cuidamos
            de conformidade, documentação, equipe orientada e da margem que se
            ganha quando a operação roda no padrão. Todo mês, sem improviso e
            sem você precisar virar especialista em norma sanitária.
          </p>
          <p className="mt-3 text-ink-soft">
            Nutricionistas especializados em inspeções, com experiência prática em
            centenas de visitas sanitárias. Tecnologia que tira a burocracia do seu caminho. O
            resultado é simples: sua operação em dia, com um profissional
            que você conhece pelo nome.
          </p>
          <Button href="/sobre" variant="outline" className="mt-5">
            Ver nossa história completa <ArrowRight className="h-4 w-4" />
          </Button>
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

      {/* Quem atendemos — galeria de segmentos */}
      <Section className="bg-white">
        <SectionHeading
          align="center"
          eyebrow="Quem atendemos"
          title="Operações de food service em São Paulo e Grande SP"
          description="De padaria de bairro a refeição coletiva, a Food Guard adapta o plano ao porte e ao perfil de risco da sua operação."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {photos.segments.map((seg, i) => (
            <FadeInOnScroll
              key={seg.title}
              delay={i * 80}
              as="article"
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-navy-900 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <Image
                src={seg.src}
                alt={seg.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-lg font-bold text-white">
                  {seg.title}
                </p>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </Section>

      {/* Fale com a gente */}
      <Section>
        <SectionHeading
          align="center"
          eyebrow="Contato"
          title="Fale com a gente"
          description="Atendemos São Paulo capital e Grande SP. Quer tirar uma dúvida antes de começar? Chama no WhatsApp ou manda um e-mail, a gente responde rápido."
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
          <a
            href={whatsappLink("Olá! Vim pelo site da Food Guard e quero tirar uma dúvida.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-2xl border border-surface-sunken bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
            <div>
              <p className="font-display font-bold text-ink">WhatsApp</p>
              <p className="text-sm text-ink-soft">Resposta rápida no horário comercial.</p>
            </div>
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-start gap-3 rounded-2xl border border-surface-sunken bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
            <div>
              <p className="font-display font-bold text-ink">E-mail</p>
              <p className="break-all text-sm text-ink-soft">{site.email}</p>
            </div>
          </a>
          <div className="flex items-start gap-3 rounded-2xl border border-surface-sunken bg-white p-5 shadow-soft">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
            <div>
              <p className="font-display font-bold text-ink">Onde atendemos</p>
              <p className="text-sm text-ink-soft">São Paulo capital · Grande SP</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-soft">
          <a
            href={site.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-brand-700"
          >
            <Instagram className="h-4 w-4" /> Instagram {site.social.instagram.handle}
          </a>
          <a
            href={site.social.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-brand-700"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn ({site.social.linkedin.handle})
          </a>
        </div>
      </Section>

      {/* CTA final */}
      <Section className="pt-0">
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
