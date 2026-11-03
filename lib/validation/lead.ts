import { z } from "zod";

/**
 * Dados de contato dos formulários públicos (diagnóstico e checklist), validados no
 * servidor. Todo texto tem tamanho máximo: o nome e a empresa vão para o e-mail do
 * relatório, o PDF e o prompt do follow-up, e sem teto qualquer um empurra textos
 * enormes para o banco e para a IA.
 *
 * Não usa .strict() na raiz: o diagnóstico manda score, faixa e plano junto, e esses
 * campos precisam continuar sendo descartados (o servidor recalcula tudo).
 */
export const contatoSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  // Aceita 0xx, ramal com x e o travessão de texto colado; 25 cobre "+55 (011) 9 9999-8888".
  phone: z.string().trim().regex(/^[0-9()+\s.xX–-]{8,25}$/),
  company: z.string().trim().min(2).max(160),
  role: z.enum(["Diretor", "Gestor", "Gerente", "Supervisor", "Outro"]),
  consent: z.literal(true),
  whatsappOptin: z.boolean().optional(),
  utm: z
    .object({
      utm_source: z.string().max(100).optional(),
      utm_medium: z.string().max(100).optional(),
      utm_campaign: z.string().max(100).optional(),
      utm_content: z.string().max(100).optional(),
      utm_term: z.string().max(100).optional(),
    })
    .optional(),
});
