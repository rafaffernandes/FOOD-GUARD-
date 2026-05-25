import { planById } from "@/lib/content/plans";
import type { DiagnosticResult } from "@/lib/diagnostic/engine";
import { formatBRL } from "@/lib/utils";
import type { LeadPayload } from "./types";

const BAND_COLOR: Record<string, string> = {
  critico: "#dc2626",
  medio: "#d97706",
  baixo: "#059669",
};

/** Relatório do diagnóstico em HTML (corpo do e-mail Resend). */
export function buildReportHtml(
  lead: LeadPayload,
  result: DiagnosticResult,
): string {
  const plan = planById(result.recommendedPlan);
  const color = BAND_COLOR[result.band] ?? "#059669";
  const checklist = result.checklist
    .map(
      (c) => `
      <tr>
        <td style="padding:8px 0;font-size:15px;color:#0b1f1a;">
          ${c.done ? "✅" : "⚠️"} ${c.area}
        </td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="pt-BR">
<body style="margin:0;background:#f6faf8;font-family:Arial,Helvetica,sans-serif;color:#0b1f1a;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
    <p style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#059669;font-weight:bold;margin:0 0 8px;">Food Guard · Diagnóstico Regulatório</p>
    <h1 style="font-size:24px;margin:0 0 16px;">Olá, ${lead.name.split(" ")[0]} 👋</h1>
    <p style="font-size:15px;line-height:1.6;color:#33433e;margin:0 0 24px;">
      Aqui está o resultado do diagnóstico de conformidade da <strong>${lead.company}</strong>.
    </p>

    <div style="background:#fff;border:1px solid #eef4f1;border-radius:16px;padding:24px;text-align:center;margin-bottom:24px;">
      <div style="font-size:13px;color:#6b7a75;margin-bottom:8px;">Seu score de conformidade</div>
      <div style="font-size:56px;font-weight:bold;color:${color};line-height:1;">${result.score}<span style="font-size:22px;color:#6b7a75;">/100</span></div>
      <div style="display:inline-block;margin-top:12px;padding:4px 14px;border-radius:999px;background:${color}1a;color:${color};font-weight:bold;font-size:14px;">Risco ${result.bandLabel}</div>
    </div>

    <div style="background:#fff;border:1px solid #eef4f1;border-radius:16px;padding:24px;margin-bottom:24px;">
      <h2 style="font-size:16px;margin:0 0 12px;">Dinheiro em risco (estimativa)</h2>
      <p style="margin:0 0 6px;font-size:15px;color:#33433e;">Multa sanitária: <strong>${result.moneyAtRisk.fineRange}</strong></p>
      <p style="margin:0 0 6px;font-size:15px;color:#33433e;">Custo de adequação tardia: <strong>${formatBRL(result.moneyAtRisk.lateAdequationCost)}</strong></p>
      <p style="margin:0;font-size:15px;color:#33433e;">Chance de autuação: <strong>${result.moneyAtRisk.autuacaoChance}</strong></p>
    </div>

    <div style="background:#fff;border:1px solid #eef4f1;border-radius:16px;padding:24px;margin-bottom:24px;">
      <h2 style="font-size:16px;margin:0 0 8px;">Checklist técnico</h2>
      <table style="width:100%;border-collapse:collapse;">${checklist}</table>
    </div>

    <div style="background:#022c22;border-radius:16px;padding:24px;color:#fff;margin-bottom:24px;">
      <div style="font-size:13px;color:#6ee7b7;margin-bottom:6px;">Plano recomendado</div>
      <div style="font-size:22px;font-weight:bold;">${plan.name} — ${formatBRL(plan.price)}/mês</div>
      <div style="font-size:14px;color:#a7f3d0;margin-top:4px;">${plan.positioning}</div>
      <div style="font-size:13px;color:#a7f3d0;margin-top:12px;">Garantia: adequação em 90 dias ou devolução.</div>
    </div>

    <p style="font-size:13px;color:#6b7a75;line-height:1.6;margin:24px 0 0;">
      Estimativas com base na RDC 216/2004 (Anvisa) e na Portaria 2.619/2011, sob revisão do nutricionista Renan Muniz (CRN ativo). Os valores são ilustrativos e variam por município e gravidade.
    </p>
  </div>
</body>
</html>`;
}

export function reportSubject(result: DiagnosticResult): string {
  return `Seu diagnóstico Food Guard: risco ${result.bandLabel} (${result.score}/100)`;
}
