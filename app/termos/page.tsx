import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Termos de Uso — Food Guard",
  description: "Condições de uso do site e dos serviços da Food Guard.",
  alternates: { canonical: `${site.url}/termos` },
};

export default function TermosPage() {
  return (
    <main className="bg-surface py-16 sm:py-24">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
          Termos de Uso
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          Última atualização: junho de 2026 · {site.legalName}
          {site.cnpj ? ` · CNPJ ${site.cnpj}` : ""}
        </p>

        <div className="mt-8 space-y-6 text-ink-soft">
          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              1. Sobre o serviço
            </h2>
            <p className="mt-2">
              A Food Guard oferece consultoria especializada em food service —
              incluindo adequação à vigilância sanitária, documentação, boas
              práticas e acompanhamento por nutricionista. O site oferece ainda
              um <strong>diagnóstico gratuito</strong>, de caráter informativo.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              2. Natureza do diagnóstico
            </h2>
            <p className="mt-2">
              O diagnóstico é uma <strong>estimativa preliminar</strong> baseada
              nas suas respostas. Ele não substitui inspeção presencial, laudo
              técnico nem parecer jurídico, e não garante aprovação em
              fiscalizações. Os valores de multas e probabilidades exibidos são
              estimativas de mercado, meramente ilustrativos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              3. Planos e pagamento
            </h2>
            <p className="mt-2">
              Os planos (Básico, Essencial e Premium) são assinaturas mensais
              processadas pelo parceiro Asaas. Valores, escopo e condições de
              cada plano estão descritos na página de planos. O cancelamento
              pode ser solicitado a qualquer momento pelos canais de contato,
              encerrando a cobrança do ciclo seguinte.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              4. Garantia de conformidade
            </h2>
            <p className="mt-2">{site.guarantee}</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              5. Responsabilidades do cliente
            </h2>
            <p className="mt-2">
              A consultoria depende de informações verdadeiras e da execução,
              pelo cliente, das adequações recomendadas. A Food Guard não se
              responsabiliza por autuações decorrentes de informações omitidas
              ou de recomendações não implementadas.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              6. Propriedade intelectual
            </h2>
            <p className="mt-2">
              Conteúdos do site (textos, marca, relatórios e materiais) são da
              Food Guard. Documentos produzidos para o cliente (POPs, Manual de
              Boas Práticas) são de uso do cliente na operação contratada.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              7. Privacidade
            </h2>
            <p className="mt-2">
              O tratamento de dados pessoais é regido pela nossa{" "}
              <a className="text-brand-700 underline" href="/privacidade">
                Política de Privacidade
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              8. Foro e contato
            </h2>
            <p className="mt-2">
              Estes termos são regidos pelas leis brasileiras. Fica eleito o
              foro da comarca de São Paulo/SP. Dúvidas:{" "}
              <a className="text-brand-700 underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
