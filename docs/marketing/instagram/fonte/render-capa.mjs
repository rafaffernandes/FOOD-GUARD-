// Gera a capa do post do blog (1200x630, JPEG) com a identidade da marca.
// Uso: node render-capa.mjs '{"titulo":"...","tag":"..."}' saida.jpg [foto.jpg]
import fs from "node:fs";
import { createRequire } from "node:module";
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
const require = createRequire("/home/user/FOOD-GUARD-/package.json");
const sharp = require("sharp");
const [json, saida, foto] = process.argv.slice(2);
const d = JSON.parse(json);
const MEDIA = "/home/user/FOOD-GUARD-/.next/static/media";
const b64 = (f) => fs.readFileSync(f).toString("base64");
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Sora;src:url(data:font/woff2;base64,${b64(`${MEDIA}/f3f7e95f2dbc4fe4-s.p.woff2`)}) format('woff2');font-weight:100 900}
*{box-sizing:border-box;margin:0;padding:0}html,body{width:1200px;height:630px;background:#0b1c34;color:#fff;font-family:Sora,sans-serif}
.c{position:relative;width:1200px;height:630px;padding:64px 72px;display:flex;flex-direction:column;overflow:hidden}
.f{position:absolute;inset:0;background:${foto ? `url(data:image/jpeg;base64,${b64(foto)}) center/cover` : "none"}}
.f::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(11,28,52,.96) 30%,rgba(11,28,52,.55))}
.g{position:absolute;inset:0;opacity:.07;background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:48px 48px}
.b{position:absolute;right:-220px;top:-220px;width:640px;height:640px;border-radius:50%;background:radial-gradient(circle,rgba(116,180,60,.34),transparent 68%)}
.z{position:relative;z-index:2}.t{font-size:24px;letter-spacing:.2em;text-transform:uppercase;color:#aedb66;font-weight:700}
h1{font-size:64px;line-height:1.1;letter-spacing:-.02em;font-weight:700;margin:auto 0;max-width:980px}
.m{display:flex;align-items:center;gap:16px;font-size:26px;color:#c6d7e6;font-weight:600}.m i{width:56px;height:8px;border-radius:6px;background:#74b43c;display:block}
</style></head><body><div class="c"><div class="f"></div><div class="g"></div><div class="b"></div>
<div class="z t">${esc(d.tag ?? "Blog Food Guard")}</div><h1 class="z">${esc(d.titulo)}</h1><div class="z m"><i></i>Food Guard · Consultoria nutricional para food service</div></div></body></html>`;
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html); await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: "png" }); await browser.close();
await sharp(png).jpeg({ quality: 90, mozjpeg: true }).toFile(saida);
console.log("capa", saida, (fs.statSync(saida).size / 1024).toFixed(0) + " KB");
