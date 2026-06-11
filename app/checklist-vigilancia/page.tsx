import { CheckSquare, Printer } from "lucide-react";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Checklist: o que a vigilância sanitária cobra primeiro — Food Guard",
  description:
    "Checklist gratuito com os itens que a vigilância sanitária avalia primeiro em estabelecimentos de alimentação (RDC 216/2004). Imprima e confira sua cozinha.",
  alternates: { canonical: `${site.url}/checklist-vigilancia` },
};

/**
 * Lead magnet do blog: checklist prático e imprimível (Ctrl+P → salvar como
 * PDF). Sem gating — o CTA leva ao diagnóstico, que é onde capturamos o lead.
 */

const GRUPOS: { titulo: string; itens: string[] }[] = [
  {
    titulo: "📄 Documentação (o nº 1 em autuações)",
    itens: [
      "Manual de Boas Práticas atualizado e disponível no local",
      "POPs (higienização, controle de pragas, água, saúde dos manipuladores)",
      "Licença/alvará sanitário válido e visível",
      "Comprovantes de dedetização e limpeza de caixa d'água no prazo",
    ],
  },
  {
    titulo: "🌡️ Temperaturas e alimentos",
    itens: [
      "Planilhas de controle de temperatura preenchidas (geladeiras, freezers, balcões)",
      "Alimentos armazenados identificados, com validade e dentro do prazo",
      "Separação correta (cru × pronto · datas · alturas de prateleira)",
      "Termômetro funcionando e calibrado",
    ],
  },
  {
    titulo: "👥 Equipe e rotinas",
    itens: [
      "Treinamento de boas práticas registrado (com lista de presença/ata)",
      "Uniformes limpos, cabelo protegido, sem adornos",
      "Atestados de saúde dos manipuladores (ASO) em dia",
      "Lavatórios com sabonete, papel toalha e cartaz de higienização",
    ],
  },
  {
    titulo: "🏗️ Estrutura e higiene",
    itens: [
      "Telas nas janelas, ralos com proteção, portas vedadas (pragas)",
      "Superfícies e utensílios íntegros e higienizados",
      "Lixeiras com tampa e acionamento sem as mãos",
      "Produtos de limpeza identificados e separados dos alimentos",
    ],
  },
];

export default function ChecklistPage() {
  return (
    <main className="bg-surface py-14 sm:py-20">
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
          Material gratuito
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          O que a vigilância sanitária cobra primeiro
        </h1>
        <p className="mt-3 text-ink-soft">
          Checklist baseado na <strong>RDC 216/2004 (Anvisa)</strong> e na{" "}
          <strong>Portaria 2.619/2011</strong>, com os pontos que mais geram
          autuação em cozinhas profissionais. Imprima (Ctrl+P) ou salve como PDF
          e confira item a item na sua operação.
        </p>

        <div className="mt-8 space-y-5 print:space-y-3">
          {GRUPOS.map((g) => (
            <Card key={g.titulo}>
              <h2 className="font-display text-lg font-bold text-ink">
                {g.titulo}
              </h2>
              <ul className="mt-3 space-y-2.5">
                {g.itens.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <CheckSquare
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                      strokeWidth={2.2}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <p className="mt-6 flex items-center gap-2 text-xs text-ink-muted print:hidden">
          <Printer className="h-4 w-4" /> Dica: Ctrl+P (ou Compartilhar →
          Imprimir no celular) e escolha “Salvar como PDF”.
        </p>

        <div className="mt-10 rounded-3xl bg-brand-600 px-8 py-10 text-center text-white print:hidden">
          <h2 className="font-display text-2xl font-bold">
            Marcou algum item como pendente?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-brand-50">
            Faça o diagnóstico gratuito (2 min) e veja seu risco real de multa —
            com relatório em PDF.
          </p>
          <Button href="/diagnostico" variant="secondary" size="lg" className="mt-6">
            Fazer o diagnóstico gratuito
          </Button>
        </div>
      </Container>
    </main>
  );
}
