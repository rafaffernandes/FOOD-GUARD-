// Gera um Reel (MP4 vertical 1080x1920, H.264, ~25 s) a partir do carrossel aprovado.
// Mesmo conteúdo e mesmas afirmações do carrossel: abertura com a pergunta do slide 1,
// uma cena por slide de conteúdo e o fechamento com a chamada para o artigo e para seguir.
// Sem rosto e sem voz (a Food Guard fala como marca); trilha silenciosa, que o Instagram
// aceita. O texto fica dentro da área segura do Reels (fora do topo e da faixa de baixo,
// onde ficam a legenda e os botões).
// Uso: node render-reel.mjs carrossel.json saida.mp4
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
import { CHROME, FONTES } from "./ambiente.mjs";

const [entrada, saida] = process.argv.slice(2);
const dados = JSON.parse(fs.readFileSync(entrada, "utf8"));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "reel-"));

const b64 = (f) => fs.readFileSync(f).toString("base64");
const sora = b64(`${FONTES}/f3f7e95f2dbc4fe4-s.p.woff2`);
const inter = b64(`${FONTES}/e4af272ccee01ff0-s.p.woff2`);
const logo = b64(new URL("../../../../public/email/logo-food-guard.png", import.meta.url).pathname);
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const C = { navy: "#0b1c34", verde: "#74b43c", verdeClaro: "#aedb66", suave: "#c6d7e6" };
const css = `
@font-face{font-family:Sora;src:url(data:font/woff2;base64,${sora}) format('woff2');font-weight:100 900}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${inter}) format('woff2');font-weight:100 900}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1920px;background:${C.navy};font-family:Inter,sans-serif;color:#fff}
.cena{position:relative;width:1080px;height:1920px;overflow:hidden}
.grade{position:absolute;inset:0;opacity:.07;background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:60px 60px}
.brilho{position:absolute;right:-300px;top:120px;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,rgba(116,180,60,.32),transparent 68%)}
.area{position:absolute;left:90px;right:150px;top:300px;bottom:520px;display:flex;flex-direction:column;justify-content:center;z-index:2}
.tag{font-size:30px;letter-spacing:.16em;text-transform:uppercase;color:${C.verdeClaro};font-weight:700;margin-bottom:34px}
.barra{width:110px;height:12px;border-radius:6px;background:${C.verde};margin-bottom:44px}
h1{font-family:Sora;font-weight:800;font-size:92px;line-height:1.05;letter-spacing:-.02em}
.destaque{font-family:Sora;font-weight:800;font-size:118px;line-height:1;color:${C.verdeClaro};letter-spacing:-.03em;margin-bottom:40px}
h2{font-family:Sora;font-weight:700;font-size:58px;line-height:1.12;margin-bottom:30px}
p{font-size:42px;line-height:1.38;color:#e6eef6}
.origem{display:inline-block;margin-top:40px;padding:14px 26px;border-radius:999px;font-size:28px;font-weight:700;letter-spacing:.04em}
.origem.norma{background:rgba(116,180,60,.18);color:${C.verdeClaro};border:2px solid rgba(174,219,102,.5)}
.origem.sugestao{background:rgba(198,215,230,.12);color:${C.suave};border:2px solid rgba(198,215,230,.4)}
.cont{position:absolute;left:90px;top:220px;font-size:28px;letter-spacing:.14em;color:${C.suave};font-weight:600;z-index:2}
.logo{height:84px;align-self:flex-start;margin-bottom:56px;border-radius:18px;box-shadow:0 0 0 14px #0b1c34,0 0 0 16px rgba(255,255,255,.10)}
.cta{font-family:Sora;font-weight:800;font-size:80px;line-height:1.08}
.cta em{font-style:normal;color:${C.verdeClaro}}
.seta{margin-top:46px;font-size:40px;color:${C.suave}}
`;
const pagina = (corpo) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="cena"><div class="grade"></div><div class="brilho"></div>${corpo}</div></body></html>`;

const slides = dados.slides;
const conteudo = slides.slice(1, -1).filter((s) => s.texto);
const total = conteudo.length;
const cenas = [
  { segundos: 2.6, html: pagina(`<div class="area"><div class="tag">${esc(dados.tag ?? "Food Guard")}</div><div class="barra"></div><h1>${esc(slides[0].titulo)}</h1></div>`) },
  ...conteudo.map((s, i) => {
    const sugestao = /sugest/i.test(s.origem ?? "");
    const origem = s.origem ? `<div><span class="origem ${sugestao ? "sugestao" : "norma"}">${esc(s.origem)}</span></div>` : "";
    return {
      segundos: 3.6,
      html: pagina(`<div class="cont">${i + 1} / ${total}</div><div class="area">${s.destaque ? `<div class="destaque">${esc(s.destaque)}</div>` : ""}<h2>${esc(s.titulo)}</h2><p>${esc(s.texto)}</p>${origem}</div>`),
    };
  }),
  { segundos: 3.4, html: pagina(`<div class="area"><img class="logo" src="data:image/png;base64,${logo}" alt=""><div class="cta">A matéria completa está no <em>link da bio</em>.</div><div class="seta">Siga a Food Guard para não perder a próxima.</div></div>`) },
];

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
const imagens = [];
for (const [i, c] of cenas.entries()) {
  await page.setContent(c.html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  // Texto longo: diminui a fonte até caber na área segura.
  await page.evaluate(() => {
    const area = document.querySelector(".area");
    const p = area.querySelector("p");
    for (let t = 42; p && t > 30 && area.scrollHeight > area.clientHeight; t -= 2) p.style.fontSize = t + "px";
  });
  const arq = path.join(tmp, `cena-${String(i).padStart(2, "0")}.png`);
  await page.screenshot({ path: arq });
  imagens.push(arq);
}
await browser.close();

// Cada cena com uma aproximação lenta (zoom de 1 a 1,04) e transição suave entre elas.
const FPS = 30;
const T = 0.45;
const args = ["-y"];
cenas.forEach((c, i) => args.push("-loop", "1", "-t", String(c.segundos), "-i", imagens[i]));
args.push("-f", "lavfi", "-t", "60", "-i", "anullsrc=channel_layout=stereo:sample_rate=48000");
const filtros = cenas.map((c, i) => {
  const quadros = Math.round(c.segundos * FPS);
  return `[${i}:v]scale=2160:3840,zoompan=z='1+0.04*on/${quadros}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${quadros}:s=1080x1920:fps=${FPS},setsar=1[v${i}]`;
});
let anterior = "v0";
let deslocamento = cenas[0].segundos - T;
for (let i = 1; i < cenas.length; i++) {
  const nome = i === cenas.length - 1 ? "vout" : `x${i}`;
  filtros.push(`[${anterior}][v${i}]xfade=transition=fade:duration=${T}:offset=${deslocamento.toFixed(3)}[${nome}]`);
  anterior = nome;
  deslocamento += cenas[i].segundos - T;
}
const duracao = cenas.reduce((s, c) => s + c.segundos, 0) - T * (cenas.length - 1);
args.push(
  "-filter_complex", filtros.join(";"),
  "-map", "[vout]", "-map", `${cenas.length}:a`,
  "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p", "-r", String(FPS), "-crf", "20", "-preset", "medium",
  "-c:a", "aac", "-b:a", "128k", "-ar", "48000",
  "-t", duracao.toFixed(2), "-movflags", "+faststart", saida,
);
execFileSync("ffmpeg", args, { stdio: ["ignore", "ignore", "pipe"] });
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`reel ${saida}: ${cenas.length} cenas, ${duracao.toFixed(1)} s, ${(fs.statSync(saida).size / 1048576).toFixed(1)} MB`);
