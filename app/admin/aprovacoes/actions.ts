"use server";

import { revalidatePath } from "next/cache";
import { type DraftTable, setDraftStatus } from "@/lib/agent/store";

/**
 * Server Actions da fila de aprovação. Ações humanas (human-in-the-loop):
 * aprovar libera o rascunho para envio/publicação; rejeitar o descarta.
 * O envio em si (WhatsApp/Resend/publicação) é um passo posterior.
 */

async function update(formData: FormData, status: "aprovado" | "rejeitado") {
  const table = formData.get("table") as DraftTable;
  const id = formData.get("id") as string;
  if (table && id) await setDraftStatus(table, id, status);
  revalidatePath("/admin/aprovacoes");
}

export async function approveDraft(formData: FormData) {
  await update(formData, "aprovado");
}

export async function rejectDraft(formData: FormData) {
  await update(formData, "rejeitado");
}
