// Publica no Instagram o carrossel de uma data da agenda (../agenda.json) e avisa o Rafael.
// O token fica num segredo de rede do ambiente (hosts graph.instagram.com e
// graph.facebook.com): o proxy coloca o cabeçalho Authorization e o token nunca entra na
// sessão. As imagens são buscadas pela Meta no site (public/instagram/<slug>/), que precisa
// ter sido publicado antes da data.
//
// Não depende de gravar nada no repositório: antes de publicar, confere no próprio Instagram
// se o post já saiu (pelo começo da legenda). Assim uma tarefa disparada duas vezes, ou uma
// resposta perdida da Meta, não gera post duplicado.
//
// Uso:
//   node publicar-instagram.mjs --slug <slug>   publica esse post, se a data já chegou
//   node publicar-instagram.mjs --teste         só lê a conta e a cota, não publica
//   --sem-email   não manda e-mail (nem confirmação nem plano B)
//   --forcar      tenta de novo um post marcado como "falhou" na agenda local
//   --ensaio      faz tudo menos publicar (contêiner pronto, que a Meta descarta em 24h);
//                 ignora data e status e não grava nada nem manda e-mail
// Saída: 0 publicado (ou já estava); 1 falhou e o plano B foi enviado ao Rafael;
//        2 falhou e o plano B também falhou; 3 a data ainda não chegou.
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const SITE = "https://foodguardassessoria.com.br";
// Apps novos da Meta usam o "login unificado": token de usuário do sistema, que fala com
// graph.facebook.com. Apps antigos com login do Instagram falam com graph.instagram.com.
const VERSAO = process.env.IG_API_VERSION ? process.env.IG_API_VERSION + "/" : "";
const HOSTS = { facebook: `https://graph.facebook.com/${VERSAO}`, instagram: `https://graph.instagram.com/${VERSAO}` };
let API = HOSTS.facebook;
const AGENDA = new URL("../agenda.json", import.meta.url);
const LOG = new URL("../publicacoes.log", import.meta.url);
const args = process.argv.slice(2);
const teste = args.includes("--teste");
const semEmail = args.includes("--sem-email");
const ensaio = args.includes("--ensaio");
const slugPedido = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : null;

const dormir = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
const registrar = (txt) => fs.appendFileSync(LOG, `${new Date().toISOString()} | ${txt}\n`);

// curl respeita o proxy do ambiente (é ele que injeta o token); o fetch do Node não.
function api(metodo, caminho, campos = {}, base = API) {
  const dados = Object.entries(campos).flatMap(([k, v]) => ["--data-urlencode", `${k}=${v}`]);
  let saida;
  try {
    saida = execFileSync("curl", ["-sS", "--max-time", "60", "-w", "\n%{http_code}", "-X", metodo, ...(metodo === "GET" ? ["-G"] : []), ...dados, base + caminho], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    const err = String(e.stderr || e.message).trim();
    throw new Error(/CONNECT tunnel failed.*403/.test(err)
      ? `o ambiente não tem acesso à API da Meta: falta o segredo de rede "Instagram Food Guard" (${err})`
      : `falha de rede ou tempo esgotado falando com a Meta (${err})`);
  }
  const linhas = saida.trim().split("\n");
  const status = Number(linhas.pop());
  let corpo;
  try { corpo = JSON.parse(linhas.join("\n")); } catch { corpo = { bruto: linhas.join(" ").slice(0, 300) }; }
  if (status < 200 || status >= 300 || corpo.error) {
    const msg = corpo.error ? `${corpo.error.type ?? ""} ${corpo.error.code ?? ""} ${corpo.error.message ?? ""}`.trim() : JSON.stringify(corpo);
    throw new Error(`${metodo} ${caminho.split("?")[0]} → HTTP ${status}: ${msg}`);
  }
  return corpo;
}

/**
 * Acha a conta do Instagram e o endereço da API que aceita o token. O id pode vir da agenda
 * (instagram_id, que o painel da Meta mostra ao gerar o token); sem ele, tenta descobrir.
 */
function conta(idConhecido) {
  const erros = [];
  if (idConhecido) {
    for (const base of [HOSTS.facebook, HOSTS.instagram]) {
      try {
        const c = api("GET", idConhecido, { fields: "id,username" }, base);
        API = base;
        return { user_id: c.id, username: c.username, via: base };
      } catch (e) { erros.push(e.message); }
    }
  }
  try {
    const me = api("GET", "me", { fields: "user_id,username" }, HOSTS.instagram);
    if (me.user_id) { API = HOSTS.instagram; return { user_id: me.user_id, username: me.username, via: HOSTS.instagram }; }
  } catch (e) { erros.push(e.message); }
  try {
    // Token de usuário do sistema (login unificado): a conta vem como ativo atribuído.
    const ig = (api("GET", "me/assigned_instagram_accounts", { fields: "id,username" }, HOSTS.facebook).data ?? [])[0];
    if (ig) { API = HOSTS.facebook; return { user_id: ig.id, username: ig.username, via: HOSTS.facebook }; }
  } catch (e) { erros.push(e.message); }
  try {
    const paginas = api("GET", "me/accounts", { fields: "instagram_business_account{id,username}" }, HOSTS.facebook).data ?? [];
    const ig = paginas.map((p) => p.instagram_business_account).find(Boolean);
    if (ig) { API = HOSTS.facebook; return { user_id: ig.id, username: ig.username, via: HOSTS.facebook }; }
  } catch (e) { erros.push(e.message); }
  throw new Error(`não achei a conta do Instagram com este token. ${erros.join(" | ")}`);
}

/** Post já publicado com esta legenda (compara a primeira linha)? Devolve o post ou null. */
function jaPublicado(igId, legenda) {
  const inicio = legenda.split("\n")[0].trim();
  const recentes = api("GET", `${igId}/media`, { fields: "id,caption,permalink,timestamp", limit: "15" }).data ?? [];
  return recentes.find((m) => (m.caption ?? "").trim().startsWith(inicio)) ?? null;
}

/** E-mail só para o Rafael, pelo mesmo envio do Resend da aprovação. */
function avisarRafael(slug, assunto, linhas) {
  if (semEmail) return;
  const html = new URL(`../aviso-publicado-${slug}.html`, import.meta.url).pathname;
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  fs.writeFileSync(html, `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"></head><body style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1f2e3d;">${linhas.map((l) => `<p>${esc(l)}</p>`).join("")}<p>Food Guard</p></body></html>`);
  fs.writeFileSync(`${html}.texto.txt`, `${linhas.join("\n\n")}\n\nFood Guard`);
  execFileSync("node", [new URL("./enviar-email-aprovacao.mjs", import.meta.url).pathname, html, assunto, "--teste"], { stdio: "inherit" });
}

const agenda = JSON.parse(fs.readFileSync(AGENDA, "utf8"));
const salvar = () => fs.writeFileSync(AGENDA, JSON.stringify(agenda, null, 1) + "\n");

if (teste) {
  try {
    const me = conta(agenda.instagram_id);
    let cota = null;
    try { cota = api("GET", `${me.user_id}/content_publishing_limit`, { fields: "quota_usage,config" }); } catch (e) { cota = { erro: e.message }; }
    console.log(`Conectado como @${me.username}, id ${me.user_id}, via ${me.via}. Cota de publicação: ${JSON.stringify(cota)}`);
    process.exit(0);
  } catch (e) {
    console.error(`Instagram não conectado: ${e.message}`);
    process.exit(1);
  }
}

if (!slugPedido) {
  console.error("Informe o post: --slug <slug> (veja agenda.json).");
  process.exit(1);
}
const pub = agenda.publicacoes.find((p) => p.slug === slugPedido);
if (!pub) {
  registrar(`falhou | ${slugPedido} | slug fora da agenda`);
  console.error(`Slug fora da agenda: ${slugPedido}. A cópia do repositório pode estar desatualizada.`);
  process.exit(1);
}
if (!ensaio && new Date(pub.data) > new Date()) {
  console.error(`Ainda não chegou a data (${pub.data}). Nada foi feito.`);
  process.exit(3);
}
if (!ensaio && (pub.status === "publicado" || pub.status === "manual" || (pub.status === "falhou" && !args.includes("--forcar")))) {
  console.log(`${pub.slug} já está "${pub.status}" na agenda. Nada foi feito.`);
  process.exit(0);
}

try {
  const me = conta(agenda.instagram_id);
  const existente = jaPublicado(me.user_id, pub.legenda);
  if (existente && ensaio) {
    console.log(`Ensaio: ${pub.slug} já está publicado (${existente.permalink ?? existente.id}).`);
    process.exit(0);
  }
  if (existente) {
    Object.assign(pub, { status: "publicado", instagram: existente.permalink ?? "", midia: existente.id });
    salvar();
    registrar(`já estava publicado | ${pub.slug} | ${existente.permalink ?? existente.id}`);
    console.log(`Já estava publicado: ${existente.permalink ?? existente.id}`);
    process.exit(0);
  }
  const filhos = pub.slides.map((s) => api("POST", `${me.user_id}/media`, { image_url: SITE + s, is_carousel_item: "true" }).id);
  const carrossel = api("POST", `${me.user_id}/media`, { media_type: "CAROUSEL", children: filhos.join(","), caption: pub.legenda }).id;
  // A Meta processa o contêiner antes de aceitar a publicação: até 5 minutos.
  let estado = "";
  for (let i = 0; i < 30 && estado !== "FINISHED"; i++) {
    estado = api("GET", carrossel, { fields: "status_code" }).status_code;
    if (estado === "ERROR" || estado === "EXPIRED") throw new Error(`a Meta recusou o carrossel (status ${estado})`);
    if (estado !== "FINISHED") dormir(10000);
  }
  if (estado !== "FINISHED") throw new Error(`a Meta não terminou de processar o carrossel em 5 minutos (último status: ${estado})`);
  if (ensaio) {
    console.log(`Ensaio ok: ${pub.slug} com ${filhos.length} slides e legenda aceitos; contêiner ${carrossel} pronto e NÃO publicado.`);
    process.exit(0);
  }
  let midia;
  try {
    midia = api("POST", `${me.user_id}/media_publish`, { creation_id: carrossel }).id;
  } catch (e) {
    // A publicação pode ter saído mesmo com erro na resposta: confere antes de desistir.
    dormir(15000);
    const st = api("GET", carrossel, { fields: "status_code" }).status_code;
    if (st === "PUBLISHED") midia = jaPublicado(me.user_id, pub.legenda)?.id ?? carrossel;
    else if (st === "FINISHED") midia = api("POST", `${me.user_id}/media_publish`, { creation_id: carrossel }).id;
    else throw e;
  }
  Object.assign(pub, { status: "publicado", publicado_em: new Date().toISOString(), midia });
  salvar();
  let link = "";
  try { link = api("GET", midia, { fields: "permalink" }).permalink ?? ""; } catch { /* o post saiu; o link é só conveniência */ }
  pub.instagram = link;
  salvar();
  registrar(`publicado | ${pub.slug} | ${link || midia}`);
  console.log(`Publicado: ${pub.titulo} → ${link || midia}`);
  try {
    avisarRafael(pub.slug, `Food Guard · Publicado no Instagram: ${pub.titulo}`, [
      `O carrossel "${pub.titulo}" foi publicado no Instagram.`,
      `Post: ${link || "(a Meta não devolveu o link; confira no perfil)"}`,
      `Artigo no blog: ${pub.blog}`,
    ]);
  } catch (e) {
    console.error(`O post saiu, mas o e-mail de confirmação falhou: ${e.message}`);
  }
} catch (e) {
  if (ensaio) {
    console.error(`Ensaio falhou para ${pub.slug}: ${e.message}`);
    process.exit(1);
  }
  Object.assign(pub, { status: "falhou", falhou_em: new Date().toISOString(), motivo: e.message });
  salvar();
  registrar(`falhou | ${pub.slug} | ${e.message}`);
  console.error(`Não publicou ${pub.slug}: ${e.message}`);
  if (semEmail) process.exit(1);
  try {
    execFileSync("node", [new URL("./avisar-instagram-manual.mjs", import.meta.url).pathname, pub.slug], { stdio: "inherit" });
    process.exit(1);
  } catch (e2) {
    registrar(`plano B falhou | ${pub.slug} | ${e2.message}`);
    console.error(`O plano B também falhou: ${e2.message}`);
    process.exit(2);
  }
}
