import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  ClipboardCheck,
  FileWarning,
  Gauge,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  ShieldCheck,
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
    title: "Um nutricionista que conhece sua cozinha",
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
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-200 ring-1 ring-inset ring-white/15">
              <ShieldCheck className="h-3.5 w-3.5" /> Uma empresa segura, um
              profissional especializado
            </span>
            <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Trabalhe <span className="text-brand-400">sem medo</span> da
              vigilância sanitária
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              Pare de torcer pra fiscalização não aparecer. Você cuida da comida e
              um nutricionista de verdade cuida do resto: visita sua cozinha,
              deixa toda a papelada em dia e responde rápido no WhatsApp. Sua
              operação tranquila e pronta pra qualquer fiscalização.
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
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <Timer className="h-4 w-4 text-brand-400" /> Resultado em 90s,
                grátis
              </span>
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-brand-400" /> Sem cadastro pra
                começar
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-400" /> A gente vai até
                você
              </span>
            </div>
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
              title="5 perguntas. 90 segundos. Seu raio-x de conformidade."
              description="Responda 5 perguntas rápidas sobre a sua operação e descubra na hora o quanto você está exposto a uma multa e o que fazer pra resolver. É grátis e você nem precisa se cadastrar pra começar."
            />
            <ul className="mt-8 space-y-4">
              {[
                "Saiba na hora se a sua operação corre risco de multa.",
                "Veja em reais quanto uma irregularidade pode tirar do seu caixa.",
                "Receba a lista exata do que falta pra ficar em dia.",
                "Descubra qual plano resolve o seu caso, com o preço já na tela.",
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
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-300">
              O que você recebe em 90 segundos
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-white">
              Seu raio-x de conformidade, na hora
            </h3>
            <p className="mt-3 text-white/70">
              Em menos de 2 minutos você enxerga seu nível de risco, o tamanho do
              prejuízo que está evitando e o passo a passo pra dormir tranquilo.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-danger-500/15 p-5 ring-1 ring-danger-500/30">
              <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-danger-400" />
              <p className="text-sm text-white/80">
                Uma autuação vai de{" "}
                <strong className="text-white">R$ 2 mil a R$ 30 mil</strong>. Seu
                diagnóstico mostra como não pagar nenhuma.
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
            description="Três planos de assinatura mensal. Garantia de adequação em 90 dias ou seu dinheiro de volta."
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
              O Renan é nutricionista com CRN ativo e mais de 10 anos dentro de
              cozinhas de food service. Ele cansou de ver operações boas serem
              autuadas por pura falta de acompanhamento. O Rafael vem da
              tecnologia e enxergou um jeito de dar escala a esse cuidado sem
              perder o lado humano. Dessa sociedade nasceu a Food Guard: um
              nutricionista de verdade na sua operação e a tecnologia
              trabalhando nos bastidores pra tudo ficar simples, rápido e em
              dia.
            </p>
            <Button href="/sobre" variant="outline" className="mt-5">
              Conheça quem somos <ArrowRight className="h-4 w-4" />
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
