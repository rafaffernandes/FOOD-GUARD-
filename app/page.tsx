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
import Link from "next/link";
import { FAQ } from "@/components/ui/FAQ";
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
    text: "A fiscalização não marca hora. Se tiver algo fora do lugar, vem multa, interdição e prejuízo — sempre muito maior do que custaria ter resolvido antes.",
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
    text: "Manual, POPs, fichas técnicas e auditorias organizados e digitalizados. Você cuida do seu negócio; a documentação fica por nossa conta.",
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
    a: "O diagnóstico segue regras objetivas (não é \"chute\" de IA), baseadas na Portaria 2.619/2011 e na RDC 216/2004, atualizadas constantemente pelo nosso nutricionista, Renan Muniz.",
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

export default function HomePage() {
  return (
    <>
      {/* Hero — capa full (foto via placeholder; trocar por <Image> ao receber) */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        {/* Camada da foto de capa (placeholder). Para usar foto real:
            adicione bg-[url('/capa.jpg')] bg-cover bg-center neste div. */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950" />
        <div className="absolute inset-0 bg-brand-sheen opacity-[0.08]" />
        <div className="absolute inset-0 bg-grid-faint [background-size:22px_22px] opacity-20" />
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
              sua operação. Você foca no que gera faturamento.
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

      {/* Barra de autoridade */}
      <div className="border-b border-surface-sunken bg-white">
        <Container className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6 text-sm font-medium text-ink-soft">
          <span className="text-xs uppercase tracking-wide text-ink-muted">
            Em conformidade com
          </span>
          {[
            "ANVISA",
            "RDC 216/2004",
            "Portaria 2.619/2011",
            "CRN-3",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-brand-600" />
              {item}
            </span>
          ))}
        </Container>
      </div>

      {/* Prova social — credibilidade honesta */}
      <Section className="bg-white">
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { stat: "+10", label: "anos do nutricionista em food service" },
            { stat: "CRN-3", label: "nutricionista responsável ativo" },
            { stat: "90 dias", label: "garantia de adequação real" },
            { stat: "100%", label: "documentação digital, sem papelada" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-surface-sunken bg-surface-soft p-5 text-center"
            >
              <p className="font-display text-3xl font-bold text-brand-700">
                {s.stat}
              </p>
              <p className="mt-1 text-sm text-ink-soft">{s.label}</p>
            </div>
          ))}
        </div>
        <figure className="mx-auto mt-8 max-w-3xl rounded-3xl border border-surface-sunken bg-surface-soft p-7 text-center shadow-soft">
          <blockquote className="font-display text-lg italic text-ink sm:text-xl">
            “Vi tanta operação boa sendo autuada por pura falta de
            acompanhamento que decidi criar a Food Guard.”
          </blockquote>
          <figcaption className="mt-3 text-sm font-medium text-brand-700">
            Renan Muniz · nutricionista responsável, CRN-3
          </figcaption>
        </figure>
      </Section>

      {/* Problema */}
      <Section className="bg-[#f4efe4]">
        <SectionHeading
          eyebrow="O problema"
          title="Estar irregular custa caro e quase sempre pega de surpresa"
          description="Quem trabalha com alimento no Brasil convive com a RDC 216/2004 e a Portaria 2.619/2011. Na correria do dia a dia, três coisas costumam pegar o dono desprevenido:"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {problems.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-surface-sunken bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
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
      <section className="bg-[#fbfaf6]">
        <Container className="py-16 sm:py-24">
          <SectionHeading
            eyebrow="A solução"
            title="Segurança alimentar e tranquilidade em uma assinatura"
            description="Tudo o que a sua operação precisa pra ficar em dia, reunido em uma assinatura mensal simples."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {solution.map((s) => (
              <div
                key={s.title}
                className="flex gap-5 rounded-2xl border border-surface-sunken bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
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
                "Sai do escuro: descubra agora o que pode te custar caro.",
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
                  Plano Básico — documentação + visitas quinzenais
                </p>
              </li>
            </ul>

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-danger-500/15 p-4 ring-1 ring-danger-500/30">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-danger-400" />
              <p className="text-sm text-white/80">
                Uma autuação sanitária custa entre{" "}
                <strong className="text-white">R$ 2 mil e R$ 30 mil</strong>.
                Seu diagnóstico mostra, ponto a ponto, o que falta — e quanto
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
            title="Preços visíveis, sem letra miúda"
            description="Três planos de assinatura mensal. 90 dias para estar 100% em conformidade real — se não chegarmos lá, seguimos trabalhando sem custo extra até chegar."
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

      {/* História da Food Guard */}
      <Section>
        <div className="grid items-center gap-8 rounded-3xl border border-surface-sunken bg-white p-8 shadow-soft sm:grid-cols-[auto,1fr] sm:p-10">
          {/* Placeholder da foto do Renan — trocar por <Image> ao receber */}
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-3xl bg-brand-600 font-display text-5xl font-bold text-white sm:mx-0 sm:h-40 sm:w-40">
            RM
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              Quem está por trás
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
              A Food Guard nasceu de um incômodo: ver bom negócio levando multa
              à toa
            </h2>
            <p className="mt-3 text-ink-soft">
              Renan Muniz passou mais de 10 anos dentro de operações food
              service — restaurantes, hospitais, catering, cozinha industrial.
              Viu de perto o que acontece quando uma boa operação é autuada por
              causa de um POP desatualizado ou um Manual que nunca saiu do
              papel. Rafael vem da tecnologia e enxergou que esse problema tem
              solução — desde que alguém construa o sistema certo em volta de
              um nutricionista que realmente conhece o chão de fábrica.
            </p>
            <p className="mt-3 text-ink-soft">
              A Food Guard nasceu dessa parceria: o conhecimento técnico de
              quem esteve em centenas de inspeções, mais a tecnologia de quem
              sabe como escalar esse cuidado sem perder o lado humano. O
              resultado é simples — sua operação em dia, com um profissional
              que você conhece pelo nome.
            </p>
            <Button href="/sobre" variant="outline" className="mt-5">
              Ver nossa história completa <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
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
