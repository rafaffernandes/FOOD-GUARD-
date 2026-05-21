import { Resend } from "resend";
import type { DiagnosticResult } from "@/lib/diagnostic/engine";
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
    const { error } = await resend.emails.send({
      from,
      to: lead.email,
      subject: reportSubject(result),
      html: buildReportHtml(lead, result),
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
