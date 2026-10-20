// Monta, para cada post aprovado pela revisão, tudo o que o Rafael e o Renan precisam ler:
// rascunho do artigo, imagens do carrossel, capa do blog, legenda, stories e fichas em PDF.
// Uso: node montar-semana.mjs semana.json  (array de { post, carrossel, ficha_renan, decisoes, revisao, data, dir, foto? })
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

const FONTE = path.dirname(new URL(import.meta.url).pathname);
const RAIZ = path.join(FONTE, "../../../..");
const INSTA = path.join(FONTE, "..");
const require = createRequire(path.join(RAIZ, "package.json"));
const sharp = require("sharp");
const CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const css = fs.readFileSync(path.join(FONTE, "doc.css"), "utf8").replaceAll("url(MEDIA/", `url(file://${RAIZ}/.next/static/media/`);
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const lista = (xs) => `<ul>${(xs ?? []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
const pdf = (html, saida) => { const t = saida.replace(/\.pdf$/, ".html"); fs.writeFileSync(t, html); execFileSync(CHROME, ["--headless", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=4000", `--print-to-pdf=${saida}`, `file://${t}`], { stdio: "ignore" }); fs.rmSync(t); };

const itens = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
for (const it of itens) {
  const { post, carrossel: c } = it;
  const pasta = path.join(INSTA, it.dir);
  fs.mkdirSync(path.join(pasta, "slides"), { recursive: true });

  // 1. Artigo como rascunho (fora de content/blog, para não ir ao ar num deploy).
  const fm = `---\ntitle: ${JSON.stringify(post.title)}\ndescription: ${JSON.stringify(post.description)}\ndate: "${it.data}T18:00:00-03:00"\nauthor: "Food Guard"\nreadingTime: ${JSON.stringify(post.readingTime)}\ntag: ${JSON.stringify(post.tag)}\n---\n\n`;
  const mdx = path.join(RAIZ, "docs/rascunhos-blog", `${post.slug}.mdx`);
  fs.writeFileSync(mdx, fm + post.corpo_mdx.trim() + "\n");

  // 2. Carrossel, capa do blog, legenda e stories.
  const comFoto = c.slides.map((s, i) => (it.foto && i === 0 ? { ...s, foto: path.relative(pasta, it.foto) } : s));
  fs.writeFileSync(path.join(pasta, "carrossel.json"), JSON.stringify({ tag: post.tag, cta: "Matéria completa: link na bio", slides: comFoto, legenda: c.legenda, hashtags: c.hashtags, textos_alternativos: c.textos_alternativos, stories: c.stories }, null, 1));
  fs.writeFileSync(path.join(pasta, "legenda.txt"), `${c.legenda}\n\n${c.hashtags.join(" ")}\n`);
  fs.writeFileSync(path.join(pasta, "stories.txt"), c.stories.map((s, i) => `${i + 1}. ${s}`).join("\n") + "\n");
  execFileSync("node", [path.join(FONTE, "render-carrossel.mjs"), path.join(pasta, "carrossel.json"), path.join(pasta, "slides")], { stdio: "inherit" });
  execFileSync("node", [path.join(FONTE, "render-capa.mjs"), JSON.stringify({ titulo: post.title, tag: post.tag }), path.join(pasta, "capa-blog.jpg"), ...(it.foto ? [it.foto] : [])], { stdio: "inherit" });
  const n = c.slides.length, W = 300, H = 375, g = 10;
  const th = await Promise.all(c.slides.map((_, i) => sharp(path.join(pasta, "slides", `slide-${String(i + 1).padStart(2, "0")}.jpg`)).resize(W).toBuffer()));
  await sharp({ create: { width: W * 4 + g * 3, height: H * Math.ceil(n / 4) + g * (Math.ceil(n / 4) - 1), channels: 3, background: "#ffffff" } })
    .composite(th.map((b, i) => ({ input: b, left: (i % 4) * (W + g), top: Math.floor(i / 4) * (H + g) }))).jpeg({ quality: 90 }).toFile(path.join(pasta, "mosaico.jpg"));

  // 3. Ficha do Renan: o que conferir + as afirmações com a fonte encontrada.
  const ficha = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Conferência técnica</title><style>${css}
.topo{background:var(--navy);color:#fff;padding:9mm 10mm;border-radius:3mm;margin-bottom:6mm}.topo h1{font-size:18pt;margin:0 0 2mm}.topo p{margin:0;color:#c6d7e6}td{font-size:8.4pt}th{font-size:7.4pt}</style></head><body>
<div class="topo"><h1>Conferência técnica: ${esc(post.title)}</h1><p>Para o Renan. Publicação prevista para ${esc(it.quando)}. O texto oficial das normas não abre no ambiente de quem escreveu, então cada afirmação veio de fonte que cita a norma. Abra a norma, confira e marque ok ou corrigir.</p></div>
<h2><span>1 ·</span> O que mais importa conferir</h2>
<table><tr><th style="width:34%">Afirmação</th><th style="width:14%">Onde</th><th>O que conferir</th><th style="width:7%">Ok?</th></tr>
${it.ficha_renan.map((f) => `<tr><td>${esc(f.afirmacao)}</td><td>${esc(f.onde)}</td><td>${esc(f.o_que_conferir)}</td><td></td></tr>`).join("")}</table>
<section class="nova"><h2><span>2 ·</span> Todas as afirmações técnicas do texto, com a fonte</h2>
<table><tr><th style="width:30%">Afirmação</th><th style="width:14%">Norma</th><th>Trecho que a fonte cita</th><th style="width:10%">Confiança</th></tr>
${post.afirmacoes.map((a) => `<tr><td>${esc(a.afirmacao)}</td><td>${esc(a.norma)}</td><td>${esc(a.trecho_da_fonte)}<br><span style="color:var(--muted);word-break:break-all">${esc(a.url)}</span></td><td>${esc(a.confianca)}</td></tr>`).join("")}</table>
<h2><span>3 ·</span> Incertezas declaradas por quem escreveu</h2>${lista(post.incertezas)}
${it.decisoes?.length ? `<h2><span>4 ·</span> Decisões do Rafael</h2>${lista(it.decisoes)}` : ""}</section></body></html>`;
  pdf(ficha, path.join(INSTA, `ficha-renan-${it.chave}.pdf`));

  // 4. Leitura do artigo.
  execFileSync("node", [path.join(FONTE, "gerar-leitura-post.mjs"), mdx, path.join(INSTA, `leitura-${it.chave}.pdf`)], { stdio: "inherit" });
  console.log("montado:", it.chave);
}
