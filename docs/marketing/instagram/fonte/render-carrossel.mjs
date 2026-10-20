// Gera as imagens de um carrossel do Instagram (1080x1350, JPEG) a partir de um JSON:
//   { "slides": [{ "titulo", "texto", "destaque"? }], ... }
// Uso: node render-carrossel.mjs entrada.json pasta-de-saida
// O primeiro slide é a capa, o último é o fechamento com logo e chamada.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const require = createRequire("/home/user/FOOD-GUARD-/package.json");
const sharp = require("sharp");

const [entrada, saida] = process.argv.slice(2);
const dados = JSON.parse(fs.readFileSync(entrada, "utf8"));
fs.mkdirSync(saida, { recursive: true });

const FONTE = path.dirname(new URL(import.meta.url).pathname);
const MEDIA = "/home/user/FOOD-GUARD-/.next/static/media";
const b64 = (f) => fs.readFileSync(f).toString("base64");
const sora = b64(`${MEDIA}/f3f7e95f2dbc4fe4-s.p.woff2`);
const inter = b64(`${MEDIA}/e4af272ccee01ff0-s.p.woff2`);
const logo = b64("/home/user/FOOD-GUARD-/public/email/logo-food-guard.png");

const C = { navy: "#0b1c34", navy2: "#16335c", verde: "#74b43c", verdeClaro: "#aedb66", branco: "#ffffff", suave: "#c6d7e6" };
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const total = dados.slides.length;

const base = `
@font-face{font-family:Sora;src:url(data:font/woff2;base64,${sora}) format('woff2');font-weight:100 900}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${inter}) format('woff2');font-weight:100 900}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px;background:${C.navy};font-family:Inter,sans-serif;color:${C.branco}}
.slide{position:relative;width:1080px;height:1350px;padding:110px 96px 120px;display:flex;flex-direction:column;overflow:hidden}
.grade{position:absolute;inset:0;opacity:.07;background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:54px 54px}
.brilho{position:absolute;right:-260px;top:-260px;width:760px;height:760px;border-radius:50%;background:radial-gradient(circle,rgba(116,180,60,.34),transparent 68%)}
.z{position:relative;z-index:2}
.barra{width:96px;height:10px;border-radius:6px;background:${C.verde};margin-bottom:46px}
.pag{position:absolute;left:96px;right:96px;bottom:56px;z-index:2;display:flex;justify-content:space-between;align-items:center;font-size:26px;letter-spacing:.14em;text-transform:uppercase;color:${C.suave};font-weight:600}
.pag .pontos{display:flex;gap:12px}.pag .pontos i{width:14px;height:14px;border-radius:50%;background:rgba(255,255,255,.22);display:block}.pag .pontos i.on{background:${C.verde}}
h1,h2{font-family:Sora,sans-serif;letter-spacing:-.02em;font-weight:700}
.capa h1{font-size:104px;line-height:1.06;margin-top:auto;margin-bottom:auto}
.capa .tag{font-size:30px;letter-spacing:.2em;text-transform:uppercase;color:${C.verdeClaro};font-weight:700}
.capa .desliza{font-size:34px;color:${C.suave};font-weight:600;margin-bottom:34px}
.miolo h2{font-size:78px;line-height:1.1;margin-bottom:46px}
.miolo p{font-size:46px;line-height:1.38;color:#e6eef6;font-weight:500}
.origem{display:inline-block;align-self:flex-start;font-size:26px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;padding:10px 22px;border-radius:999px;margin:-14px 0 34px;border:2px solid rgba(255,255,255,.28);color:${C.suave}}
.origem.norma{border-color:${C.verde};color:${C.verdeClaro}}
.foto{position:absolute;inset:0;background-size:cover;background-position:center}
.foto::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,28,52,.62) 0%,rgba(11,28,52,.93) 78%)}
.destaque{font-family:Sora,sans-serif;font-weight:800;color:${C.verde};font-size:230px;line-height:1;letter-spacing:-.04em;margin:8px 0 22px}
.destaque.curto{font-size:300px}
.fim h2{font-size:84px;line-height:1.1;margin-bottom:40px}
.fim p{font-size:44px;line-height:1.4;color:#e6eef6;margin-bottom:56px}
.cta{display:inline-block;background:${C.verde};color:${C.navy};font-weight:800;font-size:44px;padding:30px 52px;border-radius:999px;font-family:Sora,sans-serif;align-self:flex-start}
.fim img{width:380px;margin-top:auto;margin-bottom:20px;align-self:flex-start}
`;

function pontos(i) { return `<div class="pontos">${dados.slides.map((_, k) => `<i class="${k === i ? "on" : ""}"></i>`).join("")}</div>`; }

function html(s, i) {
  const rodape = `<div class="pag"><span>${i + 1} / ${total}</span>${pontos(i)}</div>`;
  const foto = s.foto ? `<div class="foto" style="background-image:url(data:image/jpeg;base64,${b64(path.resolve(path.dirname(entrada), s.foto))})"></div>` : "";
  const fundo = `${foto}<div class="grade"></div><div class="brilho"></div>`;
  if (i === 0) return `<div class="slide capa">${fundo}<div class="z tag">${esc(dados.tag ?? "Food Guard")}</div><h1 class="z">${esc(s.titulo)}</h1><div class="z desliza">Deslize para ver →</div>${rodape}</div>`;
  if (i === total - 1) return `<div class="slide fim">${fundo}<div class="z barra"></div><h2 class="z">${esc(s.titulo)}</h2><p class="z">${esc(s.texto)}</p><div class="z cta">${esc(dados.cta ?? "Link na bio")}</div><img class="z" src="data:image/png;base64,${logo}" alt="">${rodape}</div>`;
  const dest = s.destaque ? `<div class="z destaque ${String(s.destaque).length <= 4 ? "curto" : ""}">${esc(s.destaque)}</div>` : "";
  const origem = s.origem ? `<div class="z origem ${/norma|rdc|portaria/i.test(s.origem) && !/sugest/i.test(s.origem) ? "norma" : ""}">${esc(s.origem)}</div>` : "";
  return `<div class="slide miolo">${fundo}<div class="z barra"></div>${origem}<h2 class="z">${esc(s.titulo)}</h2>${dest}<p class="z">${esc(s.texto)}</p>${rodape}</div>`;
}

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
const arquivos = [];
for (let i = 0; i < total; i++) {
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${base}</style></head><body>${html(dados.slides[i], i)}</body></html>`);
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  const f = path.join(saida, `slide-${String(i + 1).padStart(2, "0")}.jpg`);
  await sharp(png).flatten({ background: C.navy }).jpeg({ quality: 92, mozjpeg: true }).toFile(f);
  arquivos.push(f);
}
await browser.close();
console.log(arquivos.map((f) => `${path.basename(f)} ${(fs.statSync(f).size / 1024).toFixed(0)} KB`).join("\n"));
