// Gera o PDF de aprovação do plano de Instagram, do backlog e do conteúdo de sábado.
// Entrada: conteudo.json (saída final do fluxo de produção). Uso: node gerar-plano.mjs
import fs from "node:fs";
import path from "node:path";

const FONTE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(FONTE, "..");
const MEDIA = "/home/user/FOOD-GUARD-/.next/static/media";
const d = JSON.parse(fs.readFileSync(path.join(FONTE, "conteudo.json"), "utf8"));
const { plano, backlog, mudancas } = d.igFinal;
const { post, carrossel } = d.postFinal;
const css = fs.readFileSync(path.join(FONTE, "doc.css"), "utf8").replaceAll("url(MEDIA/", `url(file://${MEDIA}/`);

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const br = (s) => esc(s).replace(/\n/g, "<br>");
const lista = (xs) => `<ul>${(xs ?? []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
const DIAS = { 0: "domingo", 1: "segunda", 2: "terça", 3: "quarta", 4: "quinta", 5: "sexta", 6: "sábado" };
const dataBR = (iso) => { const [y, m, dd] = iso.split("-").map(Number); const dt = new Date(Date.UTC(y, m - 1, dd)); return `${DIAS[dt.getUTCDay()]}, ${String(dd).padStart(2, "0")}/${String(m).padStart(2, "0")}`; };

const secPlano = `
<section>
<h2><span>1 ·</span> Plano do Instagram</h2>
<div class="intro"><b>Objetivo.</b> ${esc(plano.objetivo)}</div>
<div class="cols2">
  <div><h3>Para quem</h3>${lista(plano.publico)}</div>
  <div><h3>Perfil</h3><p><b>Bio sugerida:</b> ${esc(plano.perfil.bio)}</p><p><b>Link na bio:</b> ${esc(plano.perfil.link_na_bio)}</p><h3>Destaques</h3>${lista(plano.perfil.destaques)}</div>
</div>
<h3>Pilares de conteúdo</h3>
<table>
<tr><th style="width:22%">Pilar</th><th style="width:8%">Peso</th><th style="width:30%">Para quê</th><th>Exemplos de pauta</th></tr>
${plano.pilares.map((p) => `<tr><td><b>${esc(p.nome)}</b></td><td class="n">${esc(p.percentual)}%</td><td>${esc(p.para_que)}</td><td>${lista(p.exemplos)}</td></tr>`).join("")}
</table>
</section>
<section class="nova">
<h2><span>2 ·</span> Formatos, calendário e crescimento</h2>
<table>
<tr><th style="width:20%">Formato</th><th style="width:16%">Frequência</th><th style="width:16%">Quem produz</th><th>Como</th></tr>
${plano.formatos.map((f) => `<tr><td><b>${esc(f.formato)}</b></td><td>${esc(f.frequencia)}</td><td>${esc(f.quem_produz)}</td><td>${esc(f.como)}</td></tr>`).join("")}
</table>
<div class="cols2">
  <div><h3>Uma semana típica</h3>${lista(plano.calendario_semana)}</div>
  <div><h3>Como crescer, sem atalho</h3>${lista(plano.crescimento)}</div>
</div>
<div class="cols2">
  <div><h3>Engajamento</h3>${lista(plano.engajamento)}</div>
  <div><h3>Do Instagram ao cliente</h3>${lista(plano.conversao)}</div>
</div>
<h3>O que acompanhar</h3>
<table>
<tr><th style="width:26%">Métrica</th><th>Por que importa</th><th style="width:24%">Meta inicial</th></tr>
${plano.metricas.map((m) => `<tr><td><b>${esc(m.metrica)}</b></td><td>${esc(m.por_que)}</td><td>${esc(m.meta_inicial)}</td></tr>`).join("")}
</table>
<div class="intro"><b>Curadoria do Renan.</b> ${esc(plano.curadoria)}</div>
<h3>O que não fazer</h3>${lista(plano.nao_fazer)}
</section>`;

const secBacklog = `
<section class="nova">
<h2><span>3 ·</span> Backlog das próximas seis semanas</h2>
<div class="intro">Doze datas, terça e sábado, às 18h. Cada data tem um artigo e uma peça de Instagram. As peças marcadas com <b>Renan</b> dependem de gravação ou foto real; o resto é produzido e publicado automaticamente. <b>Nada vai ao ar sem a validação do Renan e a sua aprovação.</b></div>
${backlog.slots.map((s) => `
<div class="ramo-card">
  <div class="sit">${esc(dataBR(s.data))}</div>
  <table class="check" style="margin:0">
    <tr><td>Blog</td><td><b>${esc(s.blog.titulo)}</b><br><span style="color:var(--muted)">${esc(s.blog.pergunta_que_responde)} · palavra-chave: ${esc(s.blog.palavra_chave)} · para: ${esc(s.blog.segmento_alvo)}</span></td></tr>
    <tr><td>Instagram</td><td><b>${esc(s.instagram.formato)}</b> · pilar ${esc(s.instagram.pilar)}${s.instagram.precisa_do_renan ? ' · <b style="color:var(--warn)">Renan</b>' : ""}<br>Gancho: ${esc(s.instagram.gancho)}</td></tr>
    <tr><td>Stories</td><td>${(s.stories ?? []).map(esc).join(" · ")}</td></tr>
  </table>
</div>`).join("")}
</section>`;

const secSabado = `
<section class="nova">
<h2><span>4 ·</span> Publicação de sábado, 17/10, às 18h</h2>
<div class="intro"><b>Artigo:</b> ${esc(post.title)}<br><span style="color:var(--muted)">${esc(post.description)}</span></div>
<h3>Carrossel (${carrossel.slides.length} slides)</h3>
<img class="shot" src="file://${FONTE}/sabado/mosaico.jpg" alt="">
<h3>Legenda</h3>
<div class="bolha">${br(carrossel.legenda)}</div>
<p style="color:var(--muted);margin-top:2mm">${esc(carrossel.hashtags.join(" "))}</p>
<h3>O que o Renan precisa conferir</h3>${lista(post.incertezas)}
<h3>Fontes</h3>${lista(post.fontes)}
</section>`;

const secMudancas = (mudancas ?? []).length ? `<section><h2><span>5 ·</span> O que a revisão mudou</h2>${lista(mudancas)}</section>` : "";

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Plano de conteúdo · Food Guard</title><style>${css}</style></head><body>
<div class="capa">
  <img src="file://${path.join(FONTE, "../../sdr/fonte/logo-email.png")}" alt="Food Guard">
  <div><h1>Plano de conteúdo<br>Instagram e blog</h1>
  <p class="sub">Para ganhar seguidores qualificados, gerar engajamento e trazer clientes. Terça e sábado, às 18h, com validação do Renan antes de ir ao ar.</p></div>
  <div class="idx"><b>1.</b> Plano do Instagram &nbsp;·&nbsp; <b>2.</b> Formatos, calendário e crescimento<br><b>3.</b> Backlog de seis semanas &nbsp;·&nbsp; <b>4.</b> Publicação de sábado<br><br>Para aprovação · outubro de 2026</div>
</div>
${secPlano}${secBacklog}${secSabado}${secMudancas}
</body></html>`;
fs.writeFileSync(path.join(OUT, "plano-instagram.html"), html);
console.log("plano-instagram.html gerado");
