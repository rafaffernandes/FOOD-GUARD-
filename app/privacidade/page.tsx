import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Política de Privacidade — Food Guard",
  description:
    "Como a Food Guard coleta, usa e protege seus dados pessoais (LGPD).",
  alternates: { canonical: `${site.url}/privacidade` },
};

export default function PrivacidadePage() {
  return (
    <main className="bg-surface py-16 sm:py-24">
      <Container className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
          Política de Privacidade
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          Última atualização: junho de 2026 · {site.legalName}
        </p>

        <div className="prose-fg mt-8 space-y-6 text-ink-soft">
          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              1. Quem somos
            </h2>
            <p className="mt-2">
              A Food Guard é uma consultoria especializada em food service, com
              foco em regularização e segurança dos alimentos (RDC 216/2004 e
              Portaria 2.619/2011). Esta política explica como tratamos seus
              dados pessoais, em conformidade com a Lei Geral de Proteção de
              Dados (Lei nº 13.709/2018 — LGPD).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              2. Quais dados coletamos
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Diagnóstico gratuito:</strong> nome, e-mail, telefone,
                empresa, cargo e suas respostas às perguntas do diagnóstico.
              </li>
              <li>
                <strong>Contato/WhatsApp:</strong> mensagens que você nos envia
                pelos canais de atendimento.
              </li>
              <li>
                <strong>Navegação:</strong> dados de uso do site (páginas
                visitadas, origem do acesso) via cookies de análise, quando
                ativos.
              </li>
              <li>
                <strong>Contratação:</strong> dados necessários ao faturamento
                (processados pelo nosso parceiro de pagamentos Asaas).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              3. Para que usamos
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Gerar e enviar o relatório do seu diagnóstico (e-mail/PDF).</li>
              <li>
                Entrar em contato para apresentar nossos serviços, quando você
                consentir ou solicitar.
              </li>
              <li>Prestar e melhorar os serviços contratados.</li>
              <li>Cumprir obrigações legais e fiscais.</li>
            </ul>
            <p className="mt-2">
              Bases legais: consentimento (art. 7º, I), execução de contrato
              (art. 7º, V) e legítimo interesse (art. 7º, IX), sempre com a
              opção de descadastro em comunicações comerciais.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              4. Com quem compartilhamos
            </h2>
            <p className="mt-2">
              Não vendemos seus dados. Compartilhamos apenas com operadores
              necessários à operação: hospedagem e banco de dados (Vercel,
              Supabase), envio de e-mail (Resend), pagamentos (Asaas) e
              ferramentas de análise — todos sob contratos de proteção de
              dados.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              5. Por quanto tempo guardamos
            </h2>
            <p className="mt-2">
              Dados de leads: até 2 anos após o último contato, ou até você
              pedir a exclusão. Dados de clientes: pelo prazo do contrato e
              prazos legais aplicáveis. Registros de consentimento são mantidos
              de forma imutável para auditoria.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              6. Seus direitos (LGPD)
            </h2>
            <p className="mt-2">
              Você pode solicitar a qualquer momento: confirmação de
              tratamento, acesso, correção, anonimização, portabilidade,
              exclusão e revogação de consentimento. É só escrever para{" "}
              <a className="text-brand-700 underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              . Respondemos em até 15 dias.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              7. Segurança
            </h2>
            <p className="mt-2">
              Usamos criptografia em trânsito (HTTPS), controle de acesso por
              credenciais restritas e provedores com certificações de mercado.
              Nenhum sistema é 100% seguro, mas adotamos medidas técnicas e
              organizacionais proporcionais ao risco.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-ink">
              8. Encarregado (DPO) e contato
            </h2>
            <p className="mt-2">
              Dúvidas sobre esta política ou sobre seus dados:{" "}
              <a className="text-brand-700 underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              . Podemos atualizar esta política; a versão vigente estará sempre
              nesta página.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
