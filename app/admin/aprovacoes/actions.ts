"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { setDraftStatus } from "@/lib/agent/store";

/**
 * Server Actions da fila de aprovação. Ações humanas (human-in-the-loop):
 * aprovar libera o rascunho para envio/publicação; rejeitar o descarta.
 * O envio em si (WhatsApp/Resend/publicação) é um passo posterior.
 *
 * table e id vêm de campos ocultos do formulário, editáveis no navegador: só as 3
 * tabelas da fila e um uuid passam. Sem isso, o update com a chave de serviço valeria
 * para qualquer tabela que tivesse uma coluna status.
 */
const alvoSchema = z.object({
  table: z.enum(["outreach_drafts", "content_drafts", "lead_activity"]),
  id: z.string().uuid(),
});

async function update(formData: FormData, status: "aprovado" | "rejeitado") {
  await requireAdmin();
  const alvo = alvoSchema.safeParse({ table: formData.get("table"), id: formData.get("id") });
  if (!alvo.success) return;
  await setDraftStatus(alvo.data.table, alvo.data.id, status);
  revalidatePath("/admin/aprovacoes");
}

export async function approveDraft(formData: FormData) {
  await update(formData, "aprovado");
}

export async function rejectDraft(formData: FormData) {
  await update(formData, "rejeitado");
}
