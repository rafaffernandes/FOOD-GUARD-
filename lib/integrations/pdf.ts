import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { planById } from "@/lib/content/plans";
import type { DiagnosticResult } from "@/lib/diagnostic/engine";
import { formatBRL } from "@/lib/utils";
import type { LeadPayload } from "./types";

const BAND_RGB: Record<string, [number, number, number]> = {
  critico: [0.86, 0.15, 0.15],
  medio: [0.85, 0.47, 0.02],
  baixo: [0.02, 0.59, 0.41],
};

/** Gera o relatório do diagnóstico em PDF (Buffer), para anexar no e-mail. */
export async function buildReportPdf(
  lead: LeadPayload,
  result: DiagnosticResult,
): Promise<Buffer> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]); // A4
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const [br, bg, bb] = BAND_RGB[result.band] ?? BAND_RGB.baixo;
  const plan = planById(result.recommendedPlan);

  const margin = 50;
  let y = 792;

  const text = (
    s: string,
    opts: { size?: number; font?: typeof font; color?: [number, number, number]; x?: number } = {},
  ) => {
    page.drawText(s, {
      x: opts.x ?? margin,
      y,
      size: opts.size ?? 11,
      font: opts.font ?? font,
      color: rgb(...(opts.color ?? [0.04, 0.12, 0.1])),
    });
  };

  // Cabeçalho
  text("FOOD GUARD", { size: 10, font: bold, color: [0.02, 0.59, 0.41] });
  y -= 26;
  text("Diagnóstico Regulatório", { size: 22, font: bold });
  y -= 18;
  text(`${lead.company} · ${new Date().toLocaleDateString("pt-BR")}`, {
    size: 10,
    color: [0.42, 0.48, 0.46],
  });

  // Score
  y -= 50;
  text(`${result.score}/100`, { size: 40, font: bold, color: [br, bg, bb] });
  y -= 22;
  text(`Risco ${result.bandLabel}`, { size: 13, font: bold, color: [br, bg, bb] });

  // Dinheiro em risco
  y -= 44;
  text("Dinheiro em risco (estimativa)", { size: 14, font: bold });
  y -= 22;
  text(`Multa sanitária: ${result.moneyAtRisk.fineRange}`);
  y -= 18;
  text(`Custo de adequação tardia: ${formatBRL(result.moneyAtRisk.lateAdequationCost)}`);
  y -= 18;
  text(`Chance de autuação: ${result.moneyAtRisk.autuacaoChance}`);

  // Checklist
  y -= 40;
  text("Checklist técnico", { size: 14, font: bold });
  for (const item of result.checklist) {
    y -= 20;
    text(`${item.done ? "[OK]" : "[ ! ]"} ${item.area}`, {
      color: item.done ? [0.02, 0.59, 0.41] : [0.86, 0.15, 0.15],
    });
  }

  // Plano recomendado
  y -= 44;
  text("Plano recomendado", { size: 14, font: bold });
  y -= 22;
  text(`${plan.name} — ${formatBRL(plan.price)}/mês`, { size: 13, font: bold });
  y -= 18;
  text(plan.positioning, { color: [0.42, 0.48, 0.46] });
  y -= 18;
  text("Garantia: adequação em 90 dias ou devolução.");

  // Rodapé (posição fixa no fim da página)
  y = 50;
  text(
    "Estimativas com base na RDC 216/2004 (Anvisa) e na Portaria 2.619/2011, sob revisao do nutricionista Renan Muniz (CRN ativo).",
    { size: 8, color: [0.42, 0.48, 0.46] },
  );
  y = 38;
  text("Os valores sao ilustrativos e variam por municipio e gravidade.", {
    size: 8,
    color: [0.42, 0.48, 0.46],
  });

  const bytes = await doc.save();
  return Buffer.from(bytes);
}
