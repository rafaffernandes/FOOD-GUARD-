import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Escapa texto para entrar em HTML. Use em todo dado digitado pelo usuário que vai
 * para um template de e-mail: sem isso, quem preenche o formulário injeta HTML (um
 * link falso, por exemplo) num e-mail enviado pelo domínio da Food Guard.
 */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** JSON-LD seguro dentro de <script>: um "</script>" no texto não fecha a tag. */
export function jsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c");
}

/** Formata um número (ex.: 5511999998888) como +55 (11) 99999-8888. */
export function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  const m = d.match(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/);
  if (!m) return raw;
  return `+${m[1]} (${m[2]}) ${m[3]}-${m[4]}`;
}
