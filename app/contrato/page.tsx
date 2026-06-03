"use client";

import { ArrowLeft, FileSignature, Printer } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { whatsappLink } from "@/lib/content/site";

const PLANOS: Record<string, { nome: string; valor: string; servicos: string[] }> = {
  basico: {
    nome: "Básico",
    valor: "R$ 1.200,00",
    servicos: [
      "Visitas presenciais quinzenais",
      "Documentação ANVISA completa e POPs",
      "Checklist de inspeção sanitária",
      "Relatório simplificado de não conformidades",
      "Plano de ação para adequações",
      "Orientação sobre armazenamento e controle de validade",
      "Suporte via WhatsApp em horário comercial (segunda a sexta, 9h às 18h)",
      "Atualização de documentos regulatórios quando necessário",
      "Apoio básico em fiscalizações sanitárias",
    ],
  },
  essencial: {
    nome: "Essencial",
    valor: "R$ 2.300,00",
    servicos: [
      "Visitas presenciais semanais (1 vez por semana)",
      "Documentação ANVISA completa e POPs",
      "Manual de Boas Práticas padrão",
      "Auditoria interna mensal",
      "Relatório completo com plano de ação",
      "Revisão e adequação de registros obrigatórios",
      "Revisão periódica de cardápio",
      "Avaliação de desperdício alimentar",
      "Treinamento periódico da equipe",
      "Simulação de fiscalização sanitária",
      "Revisão de fornecedores e documentos obrigatórios",
      "Suporte via WhatsApp com horário estendido (até 20h e sábados)",
    ],
  },
  premium: {
    nome: "Premium",
    valor: "R$ 3.400,00",
    servicos: [
      "Visitas presenciais 2 vezes por semana",
      "Nutricionista como Responsável Técnico (RT) formal",
      "Documentação ANVISA completa e POPs",
      "Manual de Boas Práticas personalizado",
      "Criação e atualização de fichas técnicas",
      "Criação, análise e otimização de cardápios",
      "Controle e análise de desperdício alimentar",
      "Indicadores mensais de conformidade",
      "Análise de custos e rentabilidade do cardápio",
      "Treinamento mensal da equipe",
      "Reuniões gerenciais para acompanhamento de resultados",
      "Gestão e acompanhamento de planos de ação",
      "Apoio prioritário em fiscalizações e intercorrências",
      "Suporte via WhatsApp prioritário com resposta em até 2 horas",
    ],
  },
};

function hoje(): string {
  return new Date().toLocaleDateString("pt-BR", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

interface Campos {
  nome: string;
  razaoSocial: string;
  cnpj: string;
  endereco: string;
  cidade: string;
  estado: string;
  email: string;
  telefone: string;
}

const VAZIO: Campos = {
  nome: "",
  razaoSocial: "",
  cnpj: "",
  endereco: "",
  cidade: "",
  estado: "",
  email: "",
  telefone: "",
};

function label(valor: string, fallback: string) {
  return valor.trim() ? valor : fallback;
}

function ContratoContent() {
  const params = useSearchParams();
  const planoId = (params.get("plano") || "essencial").toLowerCase();
  const plano = PLANOS[planoId] ?? PLANOS.essencial;

  const [campos, setCampos] = useState<Campos>(VAZIO);
  const [preenchido, setPreenchido] = useState(false);

  const set = (k: keyof Campos) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setCampos((p) => ({ ...p, [k]: e.target.value }));

  const pronto = Object.values(campos).every((v) => v.trim().length > 0);

  return (
    <div className="min-h-screen bg-[#fbfaf6]">
      {/* Cabeçalho */}
      <div className="border-b border-surface-sunken bg-white px-6 py-4 print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <Link
            href="/sucesso"
            className="flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Link>
          <h1 className="font-display text-base font-bold text-ink">
            Contrato de Prestação de Serviços — Plano {plano.nome}
          </h1>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg border border-surface-sunken bg-white px-3 py-2 text-sm font-medium text-ink-soft hover:bg-surface-soft"
          >
            <Printer className="h-4 w-4" /> Imprimir / PDF
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Formulário de dados (oculto ao imprimir se preenchido) */}
        {!preenchido && (
          <div className="mb-8 rounded-3xl border border-brand-200 bg-white p-8 shadow-soft print:hidden">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <FileSignature className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-ink">
                  Preencha os dados do contratante
                </h2>
                <p className="text-sm text-ink-soft">
                  As informações serão inseridas automaticamente no contrato abaixo.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {([
                ["nome", "Nome completo do responsável *", "João da Silva"],
                ["razaoSocial", "Razão Social / Nome do estabelecimento *", "Restaurante Exemplo Ltda."],
                ["cnpj", "CNPJ *", "00.000.000/0001-00"],
                ["email", "E-mail *", "contato@empresa.com.br"],
                ["telefone", "Telefone / WhatsApp *", "(11) 99999-9999"],
                ["endereco", "Endereço completo *", "Rua Exemplo, 123 — Bairro"],
                ["cidade", "Cidade *", "São Paulo"],
                ["estado", "Estado *", "SP"],
              ] as [keyof Campos, string, string][]).map(([k, lbl, ph]) => (
                <div key={k} className={k === "endereco" ? "sm:col-span-2" : ""}>
                  <label className="mb-1 block text-xs font-semibold text-ink-muted">
                    {lbl}
                  </label>
                  <input
                    type={k === "email" ? "email" : k === "telefone" ? "tel" : "text"}
                    placeholder={ph}
                    value={campos[k]}
                    onChange={set(k)}
                    className="w-full rounded-xl border border-surface-sunken bg-[#fbfaf6] px-4 py-3 text-sm text-ink outline-none ring-offset-2 transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => setPreenchido(true)}
              disabled={!pronto}
              className="mt-6 w-full rounded-2xl bg-brand-600 px-6 py-4 font-display text-base font-bold text-white transition-all hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Visualizar contrato com meus dados
            </button>
          </div>
        )}

        {preenchido && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4 print:hidden">
            <p className="text-sm font-medium text-brand-800">
              Dados preenchidos. O contrato está pronto abaixo.
            </p>
            <button
              onClick={() => setPreenchido(false)}
              className="text-sm font-semibold text-brand-700 underline"
            >
              Editar dados
            </button>
          </div>
        )}

        {/* Contrato */}
        <div className="rounded-3xl border border-surface-sunken bg-white p-8 shadow-soft sm:p-12 print:rounded-none print:border-0 print:p-0 print:shadow-none">

          {/* Cabeçalho do contrato */}
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">
              Food Guard Consultoria Nutricional
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink">
              CONTRATO DE PRESTAÇÃO DE SERVIÇOS
            </h2>
            <p className="mt-1 text-sm font-semibold text-ink-soft">
              CONSULTORIA NUTRICIONAL EM FOOD SERVICE — PLANO {plano.nome.toUpperCase()}
            </p>
          </div>

          <div className="space-y-7 text-sm leading-relaxed text-ink-soft">

            {/* Identificação das partes */}
            <section>
              <h3 className="mb-3 font-display text-base font-bold text-ink">
                IDENTIFICAÇÃO DAS PARTES
              </h3>
              <p>
                <strong className="text-ink">CONTRATADA:</strong> Food Guard Consultoria
                Nutricional, prestadora de serviços de consultoria nutricional e assessoria
                em segurança alimentar para estabelecimentos de food service, doravante
                denominada simplesmente <strong className="text-ink">CONTRATADA</strong>.
              </p>
              <p className="mt-3">
                <strong className="text-ink">CONTRATANTE:</strong>{" "}
                <span className="font-semibold text-ink">
                  {label(campos.razaoSocial, "[RAZÃO SOCIAL / NOME DO ESTABELECIMENTO]")}
                </span>
                , inscrita no CNPJ sob o n.º{" "}
                <span className="font-semibold text-ink">
                  {label(campos.cnpj, "[CNPJ]")}
                </span>
                , com sede em{" "}
                <span className="font-semibold text-ink">
                  {label(campos.endereco, "[ENDEREÇO]")}
                </span>
                ,{" "}
                <span className="font-semibold text-ink">
                  {label(campos.cidade, "[CIDADE]")}
                </span>
                {" "}—{" "}
                <span className="font-semibold text-ink">
                  {label(campos.estado, "[ESTADO]")}
                </span>
                , representada por{" "}
                <span className="font-semibold text-ink">
                  {label(campos.nome, "[NOME DO RESPONSÁVEL]")}
                </span>
                , doravante denominada simplesmente{" "}
                <strong className="text-ink">CONTRATANTE</strong>.
              </p>
              <p className="mt-3">
                As partes acima identificadas têm entre si justo e contratado o seguinte:
              </p>
            </section>

            <hr className="border-surface-sunken" />

            {/* Cláusula 1 — Objeto */}
            <section>
              <h3 className="mb-3 font-display text-base font-bold text-ink">
                CLÁUSULA 1 — OBJETO DO CONTRATO
              </h3>
              <p>
                O presente instrumento tem como objeto a prestação de serviços de
                consultoria nutricional e assessoria em conformidade sanitária para
                operações de food service, em conformidade com a{" "}
                <strong className="text-ink">RDC 216/2004 (ANVISA)</strong> e a{" "}
                <strong className="text-ink">Portaria 2.619/2011</strong>, sob o{" "}
                <strong className="text-ink">Plano {plano.nome}</strong>, no valor de{" "}
                <strong className="text-ink">{plano.valor} (mensais)</strong>.
              </p>
            </section>

            <hr className="border-surface-sunken" />

            {/* Cláusula 2 — Serviços */}
            <section>
              <h3 className="mb-3 font-display text-base font-bold text-ink">
                CLÁUSULA 2 — ESCOPO DOS SERVIÇOS
              </h3>
              <p className="mb-3">
                A CONTRATADA se obriga a prestar ao CONTRATANTE os seguintes serviços,
                incluídos no Plano {plano.nome}:
              </p>
              <ol className="space-y-1.5">
                {plano.servicos.map((s, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="shrink-0 font-semibold text-brand-600">{i + 1}.</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3">
                Serviços adicionais não previstos neste escopo poderão ser contratados
                separadamente, mediante proposta específica e aditivo contratual.
              </p>
            </section>

            <hr className="border-surface-sunken" />

            {/* Cláusula 3 — Prazo */}
            <section>
              <h3 className="mb-3 font-display text-base font-bold text-ink">
                CLÁUSULA 3 — PRAZO E VIGÊNCIA
              </h3>
              <p>
                <strong className="text-ink">3.1.</strong> O presente contrato tem vigência
                de <strong className="text-ink">12 (doze) meses</strong>, a contar da data de
                assinatura, com <strong className="text-ink">renovação automática</strong> por
                igual período, salvo manifestação contrária de qualquer das partes com
                antecedência mínima de 30 (trinta) dias antes do término do período vigente.
              </p>
              <p className="mt-3">
                <strong className="text-ink">3.2.</strong> O prazo mínimo de 12 (doze) meses
                é condição essencial para a viabilidade do serviço, considerando o tempo
                necessário para implantação, treinamento, adequação da documentação e
                acompanhamento continuado das melhorias de conformidade.
              </p>
            </section>

            <hr className="border-surface-sunken" />

            {/* Cláusula 4 — Pagamento */}
            <section>
              <h3 className="mb-3 font-display text-base font-bold text-ink">
                CLÁUSULA 4 — VALOR E FORMA DE PAGAMENTO
              </h3>
              <p>
                <strong className="text-ink">4.1.</strong> Pela prestação dos serviços
                descritos na Cláusula 2, o CONTRATANTE pagará à CONTRATADA o valor
                mensal de <strong className="text-ink">{plano.valor}</strong>, mediante
                cobrança recorrente via plataforma de pagamento, no vencimento definido
                no ato da contratação.
              </p>
              <p className="mt-3">
                <strong className="text-ink">4.2.</strong> Em caso de atraso no pagamento,
                incidirão juros moratórios de 1% (um por cento) ao mês e multa de 2%
                (dois por cento) sobre o valor em aberto, além de correção monetária pelo
                IGPM/FGV.
              </p>
              <p className="mt-3">
                <strong className="text-ink">4.3.</strong> O inadimplemento por mais de
                30 (trinta) dias corridos enseja a suspensão imediata dos serviços e, a
                critério da CONTRATADA, a rescisão contratual sem ônus para esta.
              </p>
            </section>

            <hr className="border-surface-sunken" />

            {/* Cláusula 5 — Cancelamento */}
            <section>
              <h3 className="mb-3 font-display text-base font-bold text-ink">
                CLÁUSULA 5 — CANCELAMENTO E RESCISÃO
              </h3>
              <p>
                <strong className="text-ink">5.1.</strong> O CONTRATANTE poderá solicitar
                o cancelamento do contrato mediante{" "}
                <strong className="text-ink">notificação por escrito</strong> com
                antecedência mínima de <strong className="text-ink">30 (trinta) dias</strong>.
              </p>
              <p className="mt-3">
                <strong className="text-ink">5.2.</strong> Caso a rescisão ocorra antes do
                término do prazo mínimo de 12 (doze) meses (Cláusula 3.2), o CONTRATANTE
                estará sujeito ao pagamento de{" "}
                <strong className="text-ink">multa rescisória equivalente a 3 (três)
                mensalidades vigentes</strong>, salvo nos casos previstos em lei como
                excludentes de responsabilidade.
              </p>
              <p className="mt-3">
                <strong className="text-ink">5.3.</strong> A CONTRATADA poderá rescindir
                o contrato sem ônus nos seguintes casos: (a) inadimplemento do
                CONTRATANTE por período superior a 30 dias; (b) descumprimento das
                orientações técnicas que coloquem em risco a conformidade sanitária da
                operação; (c) impedimento legal ou regulatório que inviabilize a prestação
                dos serviços.
              </p>
              <p className="mt-3">
                <strong className="text-ink">5.4.</strong> O cancelamento não isenta o
                CONTRATANTE do pagamento das mensalidades vencidas até a data da efetiva
                rescisão.
              </p>
            </section>

            <hr className="border-surface-sunken" />

            {/* Cláusula 6 — Obrigações */}
            <section>
              <h3 className="mb-3 font-display text-base font-bold text-ink">
                CLÁUSULA 6 — OBRIGAÇÕES DAS PARTES
              </h3>
              <p className="font-semibold text-ink">6.1. Obrigações da CONTRATADA:</p>
              <ul className="mt-2 space-y-1.5 pl-4">
                <li>a) Prestar os serviços com pontualidade e qualidade técnica;</li>
                <li>b) Designar nutricionista habilitado (CRN ativo) para execução dos serviços;</li>
                <li>c) Guardar sigilo sobre as informações operacionais e financeiras do CONTRATANTE;</li>
                <li>d) Emitir relatórios e documentos nos prazos acordados;</li>
                <li>e) Comunicar previamente qualquer alteração na equipe responsável.</li>
              </ul>
              <p className="mt-4 font-semibold text-ink">6.2. Obrigações do CONTRATANTE:</p>
              <ul className="mt-2 space-y-1.5 pl-4">
                <li>a) Efetuar os pagamentos nas datas acordadas;</li>
                <li>b) Garantir acesso do nutricionista às instalações nas datas agendadas;</li>
                <li>c) Fornecer as informações e documentos necessários à execução dos serviços;</li>
                <li>d) Implementar as orientações técnicas emitidas pela CONTRATADA;</li>
                <li>e) Comunicar com antecedência qualquer impedimento às visitas agendadas.</li>
              </ul>
            </section>

            <hr className="border-surface-sunken" />

            {/* Cláusula 7 — Responsabilidade */}
            <section>
              <h3 className="mb-3 font-display text-base font-bold text-ink">
                CLÁUSULA 7 — RESPONSABILIDADE TÉCNICA
              </h3>
              <p>
                <strong className="text-ink">7.1.</strong> A responsabilidade técnica pela
                operação é sempre do <strong className="text-ink">CONTRATANTE</strong>,
                nos termos da legislação sanitária vigente. A CONTRATADA, ao prestar seus
                serviços, orienta, documenta e acompanha a conformidade, mas não substitui
                a responsabilidade legal do estabelecimento perante os órgãos sanitários.
              </p>
              <p className="mt-3">
                <strong className="text-ink">7.2.</strong> No Plano Premium, o nutricionista
                da CONTRATADA poderá figurar como Responsável Técnico (RT) formal, nos
                termos do CFN e da legislação aplicável, mediante assinatura de termo
                específico de responsabilidade técnica.
              </p>
            </section>

            <hr className="border-surface-sunken" />

            {/* Cláusula 8 — LGPD */}
            <section>
              <h3 className="mb-3 font-display text-base font-bold text-ink">
                CLÁUSULA 8 — PROTEÇÃO DE DADOS (LGPD)
              </h3>
              <p>
                As partes se comprometem a tratar os dados pessoais compartilhados no
                âmbito deste contrato em conformidade com a{" "}
                <strong className="text-ink">Lei Geral de Proteção de Dados (Lei n.º 13.709/2018)</strong>,
                utilizando-os exclusivamente para as finalidades previstas neste instrumento
                e adotando medidas adequadas de segurança e confidencialidade.
              </p>
            </section>

            <hr className="border-surface-sunken" />

            {/* Cláusula 9 — Foro */}
            <section>
              <h3 className="mb-3 font-display text-base font-bold text-ink">
                CLÁUSULA 9 — DISPOSIÇÕES GERAIS E FORO
              </h3>
              <p>
                <strong className="text-ink">9.1.</strong> Este contrato representa o
                acordo integral entre as partes, substituindo qualquer entendimento
                anterior sobre o mesmo objeto.
              </p>
              <p className="mt-3">
                <strong className="text-ink">9.2.</strong> As partes elegem o Foro da
                Comarca de <strong className="text-ink">São Paulo — SP</strong> para
                dirimir quaisquer dúvidas ou litígios decorrentes deste instrumento,
                com renúncia expressa a qualquer outro, por mais privilegiado que seja.
              </p>
            </section>

            <hr className="border-surface-sunken" />

            {/* Assinaturas */}
            <section>
              <p className="mb-8 text-center">
                São Paulo, {hoje()}.
              </p>
              <div className="grid gap-12 sm:grid-cols-2">
                <div className="text-center">
                  <div className="mx-auto mb-3 h-px w-full max-w-xs bg-ink-muted/30" />
                  <p className="font-semibold text-ink">CONTRATADA</p>
                  <p className="text-xs text-ink-muted">Food Guard Consultoria Nutricional</p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 h-px w-full max-w-xs bg-ink-muted/30" />
                  <p className="font-semibold text-ink">
                    {label(campos.nome, "CONTRATANTE")}
                  </p>
                  <p className="text-xs text-ink-muted">
                    {label(campos.razaoSocial, "[Razão Social]")}
                    {campos.cnpj ? ` — CNPJ ${campos.cnpj}` : ""}
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* CTA final */}
        <div className="mt-8 rounded-3xl border border-brand-200 bg-white p-8 text-center shadow-soft print:hidden">
          <FileSignature className="mx-auto mb-3 h-10 w-10 text-brand-600" />
          <h3 className="font-display text-xl font-bold text-ink">
            Pronto para assinar?
          </h3>
          <p className="mt-2 text-ink-soft">
            O contrato será enviado para assinatura digital via{" "}
            <strong className="text-ink">DocuSign</strong> no e-mail{" "}
            <strong className="text-ink">
              {label(campos.email, "[seu e-mail]")}
            </strong>.
            Entre em contato pelo WhatsApp para confirmar o envio.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={whatsappLink(
                `Olá! Preenchi meu contrato Food Guard (Plano ${plano.nome}) e quero confirmar a assinatura via DocuSign. Meu e-mail é ${campos.email || "[e-mail não preenchido]"}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 font-display text-base font-bold text-white shadow-lift transition-all hover:bg-brand-700"
            >
              <FileSignature className="h-5 w-5" />
              Confirmar assinatura via WhatsApp
            </a>
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 rounded-2xl border border-surface-sunken bg-white px-6 py-4 font-display text-base font-bold text-ink transition-all hover:bg-surface-soft"
            >
              <Printer className="h-5 w-5" />
              Salvar como PDF
            </button>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: white; }
          @page { margin: 2cm; }
        }
      `}</style>
    </div>
  );
}

export default function ContratoPage() {
  return (
    <Suspense>
      <ContratoContent />
    </Suspense>
  );
}
