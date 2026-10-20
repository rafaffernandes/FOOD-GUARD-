// Pacote de aprovação da semana: para cada post, capa do blog, carrossel, legenda, stories e o artigo.
// Uso: node gerar-pacote.mjs semana.json saida.pdf
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
const FONTE = path.dirname(new URL(import.meta.url).pathname);
const RAIZ = path.join(FONTE, "../../../..");
const INSTA = path.join(FONTE, "..");
const require = createRequire(path.join(RAIZ, "package.json"));
const { micromark } = require("micromark");
const { gfm, gfmHtml } = require("micromark-extension-gfm");
const [entrada, saidaArg] = process.argv.slice(2);
const saida = path.resolve(saidaArg);
const itens = JSON.parse(fs.readFileSync(entrada, "utf8")).filter(Boolean);
const MEDIA = `${RAIZ}/.next/static/media`;
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const br = (s) => esc(s).replace(/\n/g, "<br>");
const bloco = (it) => {
  const p = it.post, c = it.carrossel, dir = path.join(INSTA, it.dir);
  return `<section class="post">
<div class="faixa">${esc(it.quando)}</div>
<h1>${esc(p.title)}</h1><p class="desc">${esc(p.description)}</p>
<h2>Capa do blog</h2><img class="capa" src="file://${dir}/capa-blog.jpg">
<h2>Carrossel do Instagram</h2><img class="mosaico" src="file://${dir}/mosaico.jpg">
<div class="duas"><div><h2>Legenda</h2><div class="bolha">${br(c.legenda)}<br><br>${esc(c.hashtags.join(" "))}</div></div>
<div><h2>Stories</h2><ol>${c.stories.map((s) => `<li>${esc(s)}</li>`).join("")}</ol></div></div>
<h2 class="quebra">Artigo do blog</h2>
<div class="artigo">${micromark(p.corpo_mdx, { extensions: [gfm()], htmlExtensions: [gfmHtml()] })}</div>
</section>`;
};
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Conteúdo da semana</title><style>
@font-face{font-family:Sora;src:url(file://${MEDIA}/f3f7e95f2dbc4fe4-s.p.woff2) format('woff2');font-weight:100 900}
@font-face{font-family:Inter;src:url(file://${MEDIA}/e4af272ccee01ff0-s.p.woff2) format('woff2');font-weight:100 900}
@page{size:A4;margin:14mm 14mm 16mm}
body{font-family:Inter,sans-serif;color:#1f2e3d;font-size:10pt;line-height:1.58}
.capa-doc{background:#0b1c34;color:#fff;border-radius:3mm;padding:12mm;margin-bottom:8mm}
.capa-doc h1{font-family:Sora;font-size:24pt;margin:0 0 3mm;color:#fff}.capa-doc p{color:#c6d7e6;margin:0 0 2mm}
.post{page-break-before:always}.post:first-of-type{page-break-before:auto}
.faixa{display:inline-block;background:#74b43c;color:#0b1c34;font-weight:700;border-radius:99mm;padding:1mm 4mm;font-size:9pt}
h1{font-family:Sora;font-size:19pt;line-height:1.18;color:#0b1c34;margin:3mm 0 2mm}.desc{color:#5b6b7a;margin:0 0 5mm}
h2{font-family:Sora;font-size:12pt;color:#16335c;margin:6mm 0 2.5mm}.quebra{page-break-before:always}
.capa{width:100%;border-radius:2mm}.mosaico{width:100%;border-radius:2mm;border:.3mm solid #dce5ed}
.duas{display:flex;gap:6mm}.duas>div{flex:1}
.bolha{background:#e7f3dc;border:.25mm solid #b9d98c;border-radius:3mm;padding:3.5mm 4mm;font-size:9pt}
.artigo h2{font-size:13pt;color:#0b1c34}.artigo h3{font-family:Sora;font-size:10.8pt;color:#16335c;margin:4mm 0 1.5mm}
table{width:100%;border-collapse:collapse;font-size:8.6pt;margin:3mm 0 5mm}th{background:#0b1c34;color:#fff;text-align:left;padding:2mm 2.4mm}
td{padding:2mm 2.4mm;border-bottom:.2mm solid #dce5ed;vertical-align:top}tr:nth-child(even) td{background:#f2f6fa}a{color:#446e22}
</style></head><body>
<div class="capa-doc"><h1>Conteúdo da semana para aprovação</h1>
<p>${itens.map((it) => esc(it.quando)).join(" · ")}</p>
<p>Blog e Instagram são a mesma publicação: o carrossel apresenta o essencial e leva para a matéria completa no link da bio. Nada vai ao ar sem a conferência técnica do Renan (ficha à parte) e a sua aprovação.</p></div>
${itens.map(bloco).join("")}</body></html>`;
const tmp = saida.replace(/\.pdf$/, ".html");
fs.writeFileSync(tmp, html);
execFileSync("/opt/pw-browsers/chromium-1194/chrome-linux/chrome", ["--headless", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=6000", `--print-to-pdf=${saida}`, `file://${tmp}`], { stdio: "ignore" });
fs.rmSync(tmp);
console.log("pacote", saida);
