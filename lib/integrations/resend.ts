import { Resend } from "resend";
import type { DiagnosticResult } from "@/lib/diagnostic/engine";
import { buildReportPdf } from "./pdf";
import { buildReportHtml, reportSubject } from "./report";
import type { LeadPayload } from "./types";

const apiKey = process.env.RESEND_API_KEY;
const from = process.env.RESEND_FROM || "Food Guard <onboarding@resend.dev>";

export const resendConfigured = Boolean(apiKey);

export async function sendDiagnosticEmail(
  lead: LeadPayload,
  result: DiagnosticResult,
): Promise<{ ok: boolean; devMode?: boolean; error?: string }> {
  if (!resendConfigured) {
    console.info(
      `[dev] Resend não configurado — relatório seria enviado para ${lead.email}`,
    );
    return { ok: true, devMode: true };
  }

  try {
    const resend = new Resend(apiKey);
    let attachments: { filename: string; content: Buffer }[] | undefined;
    try {
      const pdf = await buildReportPdf(lead, result);
      attachments = [{ filename: "diagnostico-food-guard.pdf", content: pdf }];
    } catch (pdfErr) {
      console.error("[pdf] falha ao gerar relatório, enviando só HTML:", pdfErr);
    }

    const { error } = await resend.emails.send({
      from,
      to: lead.email,
      subject: reportSubject(result),
      html: buildReportHtml(lead, result),
      attachments,
    });
    if (error) {
      console.error("[resend] erro ao enviar:", error.message);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "erro desconhecido";
    console.error("[resend] exceção:", message);
    return { ok: false, error: message };
  }
}

const teamEmail =
  process.env.TEAM_NOTIFY_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL;

/**
 * Notificação interna para a equipe (ex.: lead tier A com SLA de 15 min).
 * Degradação graciosa: sem Resend/destinatário, loga em dev.
 */
export async function notifyTeam(subject: string, text: string): Promise<void> {
  if (!resendConfigured || !teamEmail) {
    console.info(`[dev] notificação interna — ${subject}: ${text}`);
    return;
  }
  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: teamEmail,
      subject: `[Food Guard] ${subject}`,
      text,
    });
  } catch (err) {
    console.error(
      "[resend] notifyTeam:",
      err instanceof Error ? err.message : "erro desconhecido",
    );
  }
}
