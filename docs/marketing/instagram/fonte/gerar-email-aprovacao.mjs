// Gera o HTML do e-mail semanal de aprovação (Rafael e Renan).
// As imagens e os PDFs são servidos pelo GitHub a partir de um commit fixo, para o link não mudar.
// Uso: node gerar-email-aprovacao.mjs semana.json <sha-do-commit> saida.html
import fs from "node:fs";
import path from "node:path";
const [entrada, sha, saida] = process.argv.slice(2);
const itens = JSON.parse(fs.readFileSync(entrada, "utf8")).filter(Boolean);
const REPO = "rafaffernandes/FOOD-GUARD-";
const raw = (p) => `https://raw.githubusercontent.com/${REPO}/${sha}/docs/marketing/instagram/${p}`;
const rawRaiz = (p) => `https://raw.githubusercontent.com/${REPO}/${sha}/${p}`;
const blob = (p) => `https://github.com/${REPO}/blob/${sha}/docs/marketing/instagram/${p}`;
const tree = (p) => `https://github.com/${REPO}/tree/${sha}/docs/marketing/instagram/${p}`;
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const br = (s) => esc(s).replace(/\n/g, "<br>");
const F = "font-family:Arial,Helvetica,sans-serif;";
const botao = (href, txt) => `<a href="${href}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 18px;border-radius:999px;background:#74b43c;color:#0b1c34;${F}font-size:14px;font-weight:bold;text-decoration:none;">${esc(txt)}</a>`;
const post = (it, n) => `
<tr><td style="padding:26px 28px 6px;">
<p style="margin:0 0 6px;${F}font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#446e22;">Post ${n} · ${esc(it.quando)}</p>
<h2 style="margin:0 0 6px;${F}font-size:21px;line-height:1.25;color:#0b1c34;">${esc(it.post.title)}</h2>
<p style="margin:0 0 16px;${F}font-size:14px;line-height:1.55;color:#5b6b7a;">${esc(it.post.description)}</p>
<p style="margin:0 0 6px;${F}font-size:13px;font-weight:bold;color:#0b1c34;">Blog: capa do artigo</p>
<img src="${raw(`${it.dir}/capa-blog.jpg`)}" width="544" alt="Capa do artigo" style="display:block;width:100%;max-width:544px;border-radius:8px;margin:0 0 16px;">
<p style="margin:0 0 6px;${F}font-size:13px;font-weight:bold;color:#0b1c34;">Instagram: carrossel de ${it.carrossel.slides.length} slides</p>
<img src="${raw(`${it.dir}/mosaico.jpg`)}" width="544" alt="Slides do carrossel" style="display:block;width:100%;max-width:544px;border-radius:8px;border:1px solid #dce5ed;margin:0 0 16px;">
<p style="margin:0 0 6px;${F}font-size:13px;font-weight:bold;color:#0b1c34;">Legenda do Instagram</p>
<div style="background:#f3faea;border-left:4px solid #74b43c;border-radius:8px;padding:12px 14px;margin:0 0 16px;${F}font-size:14px;line-height:1.55;color:#1f2e3d;">${br(it.carrossel.legenda)}<br><br>${esc(it.carrossel.hashtags.join(" "))}</div>
${botao(blob(`leitura-${it.chave}.pdf`), "Ler o artigo completo")}
${botao(tree(`${it.dir}/slides`), "Baixar os slides")}
${botao(blob(`ficha-renan-${it.chave}.pdf`), "Ficha técnica do Renan")}
</td></tr>`;
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#eef2f6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f6;"><tr><td align="center" style="padding:24px 10px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;">
<tr><td style="background:#0b1c34;padding:22px 28px;"><img src="${rawRaiz("public/email/logo-food-guard.png")}" width="180" alt="Food Guard" style="display:block;"></td></tr>
<tr><td style="height:4px;background:#74b43c;font-size:0;line-height:4px;">&nbsp;</td></tr>
<tr><td style="padding:26px 28px 0;">
<h1 style="margin:0 0 10px;${F}font-size:23px;color:#0b1c34;">Conteúdo da semana para aprovação</h1>
<p style="margin:0 0 12px;${F}font-size:15px;line-height:1.6;color:#1f2e3d;">Rafael e Renan, seguem os ${itens.length} conteúdos desta semana. Blog e Instagram são a mesma publicação: o carrossel apresenta o essencial e leva para a matéria completa no link da bio.</p>
<div style="background:#fff7ed;border-left:4px solid #b85a14;border-radius:8px;padding:12px 14px;${F}font-size:14px;line-height:1.55;color:#7a3a05;">
<b>Como aprovar:</b> responda este e-mail com <b>aprovado</b> e o número do post, ou mande o ajuste.<br>
<b>Renan:</b> antes de aprovar, confira a ficha técnica de cada post. A primeira página é o que mais importa.<br>
Nada vai ao ar sem as duas aprovações.</div>
</td></tr>
${itens.map((it, i) => post(it, i + 1)).join('<tr><td style="padding:0 28px;"><hr style="border:0;border-top:1px solid #dce5ed;margin:10px 0;"></td></tr>')}
<tr><td style="padding:18px 28px 26px;">${botao(blob(path.basename(it0Pacote(itens))), "Pacote completo em PDF")}</td></tr>
<tr><td style="background:#f6f8fa;padding:16px 28px;${F}font-size:12px;line-height:1.6;color:#8794a1;">Food Guard · Consultoria nutricional para serviços de alimentação · foodguardassessoria.com.br<br>E-mail interno de aprovação, enviado toda segunda-feira.</td></tr>
</table></td></tr></table></body></html>`;
function it0Pacote(xs) { return xs[0].pacote ?? "aprovacao.pdf"; }
fs.writeFileSync(saida, html);
console.log("e-mail gerado:", saida, (html.length / 1024).toFixed(1) + " KB");
