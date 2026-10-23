// Gera o HTML do e-mail semanal de aprovação (Rafael e Renan).
// Nada vem do GitHub (o repositório é privado): as imagens vão embutidas (cid:) e os PDFs e
// slides vão anexados. A lista de arquivos sai em <saida>.anexos.json, que o
// enviar-email-aprovacao.mjs lê sozinho. Os caminhos são relativos a docs/marketing/instagram.
// Uso: node gerar-email-aprovacao.mjs semana.json saida.html
import fs from "node:fs";
import path from "node:path";
const [entrada, saida] = process.argv.slice(2);
const itens = JSON.parse(fs.readFileSync(entrada, "utf8")).filter(Boolean);
const BASE = new URL("../", import.meta.url);
const anexos = [];
function anexar(rel, nome, cid) {
  if (!fs.existsSync(new URL(rel, BASE))) throw new Error(`anexo não encontrado: ${rel}`);
  anexos.push({ arquivo: rel, nome, ...(cid ? { cid } : {}) });
}
const embutir = (rel, cid) => (anexar(rel, cid + path.extname(rel), cid), `cid:${cid}`);
const anexo = (rel, nome) => (anexar(rel, nome ?? path.basename(rel)), nome ?? path.basename(rel));
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const br = (s) => esc(s).replace(/\n/g, "<br>");
const F = "font-family:Arial,Helvetica,sans-serif;";
const lista = (xs) => `<ul style="margin:0 0 8px;padding-left:20px;${F}font-size:14px;line-height:1.6;color:#1f2e3d;">${xs.map((x) => `<li>${x}</li>`).join("")}</ul>`;
function anexosDoPost(it) {
  const pasta = `${it.dir}/slides`;
  const slides = fs.readdirSync(new URL(pasta + "/", BASE)).filter((f) => f.endsWith(".jpg")).sort();
  slides.forEach((f) => anexo(`${pasta}/${f}`, `${it.chave}-${f}`));
  return lista([
    `Artigo completo: <b>${esc(anexo(`leitura-${it.chave}.pdf`))}</b>`,
    `Ficha técnica do Renan: <b>${esc(anexo(`ficha-renan-${it.chave}.pdf`))}</b>`,
    `Slides para postar: <b>${esc(`${it.chave}-slide-01.jpg`)}</b> a <b>${esc(`${it.chave}-${slides.at(-1)}`)}</b>, na ordem`,
  ]);
}
const post = (it, n) => `
<tr><td style="padding:26px 28px 6px;">
<p style="margin:0 0 6px;${F}font-size:12px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#446e22;">Post ${n} · ${esc(it.quando)}</p>
<h2 style="margin:0 0 6px;${F}font-size:21px;line-height:1.25;color:#0b1c34;">${esc(it.post.title)}</h2>
<p style="margin:0 0 16px;${F}font-size:14px;line-height:1.55;color:#5b6b7a;">${esc(it.post.description)}</p>
<p style="margin:0 0 6px;${F}font-size:13px;font-weight:bold;color:#0b1c34;">Blog: capa do artigo</p>
<img src="${embutir(`${it.dir}/capa-blog.jpg`, `capa-${n}`)}" width="544" alt="Capa do artigo" style="display:block;width:100%;max-width:544px;border-radius:8px;margin:0 0 16px;">
<p style="margin:0 0 6px;${F}font-size:13px;font-weight:bold;color:#0b1c34;">Instagram: carrossel de ${it.carrossel.slides.length} slides</p>
<img src="${embutir(`${it.dir}/mosaico.jpg`, `mosaico-${n}`)}" width="544" alt="Slides do carrossel" style="display:block;width:100%;max-width:544px;border-radius:8px;border:1px solid #dce5ed;margin:0 0 16px;">
<p style="margin:0 0 6px;${F}font-size:13px;font-weight:bold;color:#0b1c34;">Legenda do Instagram</p>
<div style="background:#f3faea;border-left:4px solid #74b43c;border-radius:8px;padding:12px 14px;margin:0 0 16px;${F}font-size:14px;line-height:1.55;color:#1f2e3d;">${br(it.carrossel.legenda)}<br><br>${esc(it.carrossel.hashtags.join(" "))}</div>
<p style="margin:0 0 6px;${F}font-size:13px;font-weight:bold;color:#0b1c34;">Nos anexos deste e-mail</p>
${anexosDoPost(it)}
</td></tr>`;
const postsHtml = itens.map((it, i) => post(it, i + 1)).join('<tr><td style="padding:0 28px;"><hr style="border:0;border-top:1px solid #dce5ed;margin:10px 0;"></td></tr>');
const logo = embutir("../../../public/email/logo-food-guard.png", "logo");
const pacote = anexo(path.basename(itens[0].pacote ?? "aprovacao.pdf"));
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#eef2f6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f6;"><tr><td align="center" style="padding:24px 10px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;">
<tr><td style="background:#0b1c34;padding:22px 28px;"><img src="${logo}" width="180" alt="Food Guard" style="display:block;"></td></tr>
<tr><td style="height:4px;background:#74b43c;font-size:0;line-height:4px;">&nbsp;</td></tr>
<tr><td style="padding:26px 28px 0;">
<h1 style="margin:0 0 10px;${F}font-size:23px;color:#0b1c34;">Conteúdo da semana para aprovação</h1>
<p style="margin:0 0 12px;${F}font-size:15px;line-height:1.6;color:#1f2e3d;">Rafael e Renan, seguem os ${itens.length} conteúdos desta semana. Blog e Instagram são a mesma publicação: o carrossel apresenta o essencial e leva para a matéria completa no link da bio.</p>
<div style="background:#fff7ed;border-left:4px solid #b85a14;border-radius:8px;padding:12px 14px;${F}font-size:14px;line-height:1.55;color:#7a3a05;">
<b>Como aprovar:</b> responda este e-mail com <b>aprovado</b> e o número do post, ou mande o ajuste.<br>
<b>Renan:</b> antes de aprovar, confira a ficha técnica de cada post. A primeira página é o que mais importa.<br>
Nada vai ao ar sem as duas aprovações.</div>
</td></tr>
${postsHtml}
<tr><td style="padding:18px 28px 26px;${F}font-size:14px;line-height:1.6;color:#1f2e3d;">Pacote completo em PDF, anexado: <b>${esc(pacote)}</b></td></tr>
<tr><td style="background:#f6f8fa;padding:16px 28px;${F}font-size:12px;line-height:1.6;color:#8794a1;">Food Guard · Consultoria nutricional para serviços de alimentação · foodguardassessoria.com.br<br>E-mail interno de aprovação, enviado toda segunda-feira.</td></tr>
</table></td></tr></table></body></html>`;
fs.writeFileSync(saida, html);
fs.writeFileSync(`${saida}.anexos.json`, JSON.stringify(anexos, null, 1) + "\n");
const total = anexos.reduce((s, a) => s + fs.statSync(new URL(a.arquivo, BASE)).size, 0);
console.log("e-mail gerado:", saida, (html.length / 1024).toFixed(1) + " KB,", anexos.length, "anexos,", (total / 1048576).toFixed(1) + " MB");
