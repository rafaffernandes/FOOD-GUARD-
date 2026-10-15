// PDF de leitura do rascunho do post (para o Rafael e o Renan lerem antes de ir ao ar).
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
const require = createRequire("/home/user/FOOD-GUARD-/package.json");
const { micromark } = require("micromark");
const { gfm, gfmHtml } = require("micromark-extension-gfm");
const matter = require("gray-matter");

const [entrada, saida] = process.argv.slice(2);
const { data, content } = matter(fs.readFileSync(entrada, "utf8"));
const corpo = micromark(content, { extensions: [gfm()], htmlExtensions: [gfmHtml()] });
const MEDIA = "/home/user/FOOD-GUARD-/.next/static/media";
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${data.title}</title><style>
@font-face{font-family:Sora;src:url(file://${MEDIA}/f3f7e95f2dbc4fe4-s.p.woff2) format('woff2');font-weight:100 900}
@font-face{font-family:Inter;src:url(file://${MEDIA}/e4af272ccee01ff0-s.p.woff2) format('woff2');font-weight:100 900}
@page{size:A4;margin:16mm 16mm 18mm}
body{font-family:Inter,sans-serif;color:#1f2e3d;font-size:10.4pt;line-height:1.62}
.aviso{background:#fff7ed;border-left:1.2mm solid #b85a14;border-radius:2mm;padding:3.5mm 5mm;margin:0 0 7mm;color:#7a3a05;font-size:9.4pt}
.tag{font-size:8.6pt;font-weight:700;color:#446e22;text-transform:uppercase;letter-spacing:.08em}
h1{font-family:Sora,sans-serif;font-size:22pt;line-height:1.15;color:#0b1c34;margin:1mm 0 3mm;letter-spacing:-.02em}
.desc{color:#5b6b7a;margin:0 0 8mm}
h2{font-family:Sora,sans-serif;font-size:14pt;color:#0b1c34;margin:8mm 0 2.5mm;page-break-after:avoid}
h3{font-family:Sora,sans-serif;font-size:11.2pt;color:#16335c;margin:5mm 0 1.5mm;page-break-after:avoid}
p{margin:0 0 3mm} ul,ol{margin:0 0 3mm;padding-left:6mm} li{margin-bottom:1mm}
table{width:100%;border-collapse:collapse;font-size:9pt;margin:3mm 0 5mm;page-break-inside:avoid}
th{background:#0b1c34;color:#fff;text-align:left;padding:2mm 2.6mm}td{padding:2mm 2.6mm;border-bottom:.2mm solid #dce5ed;vertical-align:top}
tr:nth-child(even) td{background:#f2f6fa} a{color:#446e22}
</style></head><body>
<div class="aviso"><b>Rascunho para conferência.</b> Não publicado. Os números vieram de buscas, e o texto oficial das normas não foi aberto por quem escreveu. O Renan precisa conferir antes de ir ao ar.</div>
<div class="tag">${data.tag} · ${data.readingTime} · previsto para ${data.date}</div>
<h1>${data.title}</h1><p class="desc">${data.description}</p>${corpo}</body></html>`;
const tmp = saida.replace(/\.pdf$/, ".html");
fs.writeFileSync(tmp, html);
execFileSync("/opt/pw-browsers/chromium-1194/chrome-linux/chrome", ["--headless", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=4000", `--print-to-pdf=${saida}`, `file://${tmp}`], { stdio: "ignore" });
fs.rmSync(tmp);
console.log("gerado", saida);
