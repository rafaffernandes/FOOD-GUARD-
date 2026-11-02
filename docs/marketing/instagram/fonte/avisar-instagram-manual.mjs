// Plano B do Instagram: quando o publicar-instagram.mjs não consegue postar (token ausente,
// vencido ou erro da Meta), manda ao Rafael, pelo Resend, os slides na ordem e a legenda
// pronta para colar no Meta Business Suite. Só para o Rafael (--teste do envio).
// Uso: node avisar-instagram-manual.mjs <slug>
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const slug = process.argv[2];
const AGENDA = new URL("../agenda.json", import.meta.url);
const pub = JSON.parse(fs.readFileSync(AGENDA, "utf8")).publicacoes.find((p) => p.slug === slug);
if (!pub) throw new Error(`slug fora da agenda: ${slug}`);

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const F = "font-family:Arial,Helvetica,sans-serif;";
const quando = new Date(pub.data).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo", dateStyle: "full", timeStyle: "short" });
const motivo = pub.motivo ? `Motivo: ${pub.motivo}` : "A conexão com o Instagram ainda não está configurada.";
const nomes = pub.slides.map((_, i) => `${String(i + 1).padStart(2, "0")}-${slug}.jpg`);

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"></head><body style="margin:0;padding:24px 10px;background:#eef2f6;">
<table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:14px;">
<tr><td style="padding:26px 28px;${F}color:#1f2e3d;font-size:15px;line-height:1.6;">
<h1 style="margin:0 0 10px;font-size:22px;color:#0b1c34;">Post do Instagram para publicar à mão</h1>
<p style="margin:0 0 12px;">O artigo <b>${esc(pub.titulo)}</b> entrou no blog em ${esc(quando)}, mas o carrossel não foi publicado sozinho. ${esc(motivo)}</p>
<p style="margin:0 0 12px;"><b>Como postar (cerca de 5 minutos):</b> no Meta Business Suite, crie um post de carrossel no Instagram, suba os ${pub.slides.length} slides anexados na ordem do nome do arquivo (01 a ${String(pub.slides.length).padStart(2, "0")}) e cole a legenda abaixo.</p>
<div style="background:#f3faea;border-left:4px solid #74b43c;border-radius:8px;padding:12px 14px;margin:0 0 12px;font-size:14px;">${esc(pub.legenda).replace(/\n/g, "<br>")}</div>
<p style="margin:0;font-size:13px;color:#5b6b7a;">Artigo no ar: ${esc(pub.blog)}</p>
</td></tr></table></body></html>`;

const saida = new URL(`../aviso-instagram-${slug}.html`, import.meta.url).pathname;
fs.writeFileSync(saida, html);
// Os caminhos dos anexos são relativos a docs/marketing/instagram (é o que o envio espera).
fs.writeFileSync(`${saida}.anexos.json`, JSON.stringify(pub.slides.map((s, i) => ({ arquivo: `../../../public${s}`, nome: nomes[i] })), null, 1) + "\n");
fs.writeFileSync(`${saida}.texto.txt`, `Post do Instagram para publicar à mão: ${pub.titulo}\n\n${motivo}\n\nNo Meta Business Suite, crie um carrossel, suba os slides anexados na ordem (01 a ${String(pub.slides.length).padStart(2, "0")}) e cole a legenda:\n\n${pub.legenda}\n\nArtigo: ${pub.blog}\n\nFood Guard`);
execFileSync("node", [new URL("./enviar-email-aprovacao.mjs", import.meta.url).pathname, saida, `Food Guard · Instagram para postar à mão: ${pub.titulo}`, "--teste"], { stdio: "inherit" });
