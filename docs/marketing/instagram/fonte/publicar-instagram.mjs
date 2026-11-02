// Publica no Instagram o carrossel da agenda (../agenda.json) cuja data já chegou.
// O token fica num segredo de rede do ambiente (hosts graph.instagram.com e
// graph.facebook.com): o proxy coloca o cabeçalho Authorization e o token nunca entra na
// sessão. As imagens são buscadas pela Meta no site (public/instagram/<slug>/), que precisa
// estar publicado antes.
// Uso:
//   node publicar-instagram.mjs                 publica a próxima publicação vencida
//   node publicar-instagram.mjs --slug <slug>   publica essa, se a data já chegou
//   node publicar-instagram.mjs --teste         só lê a conta e a cota, não publica
// Saída: 0 publicou (ou nada a fazer), 1 falhou (motivo em ../publicacoes.log e na agenda).
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const SITE = "https://foodguardassessoria.com.br";
const API = `https://graph.instagram.com/${process.env.IG_API_VERSION ? process.env.IG_API_VERSION + "/" : ""}`;
const AGENDA = new URL("../agenda.json", import.meta.url);
const LOG = new URL("../publicacoes.log", import.meta.url);
const args = process.argv.slice(2);
const teste = args.includes("--teste");
const slugPedido = args.includes("--slug") ? args[args.indexOf("--slug") + 1] : null;

const dormir = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
const registrar = (txt) => fs.appendFileSync(LOG, `${new Date().toISOString()} | ${txt}\n`);

// curl respeita o proxy do ambiente (é ele que injeta o token); o fetch do Node não.
function api(metodo, caminho, campos = {}) {
  const dados = Object.entries(campos).flatMap(([k, v]) => ["--data-urlencode", `${k}=${v}`]);
  let saida;
  try {
    saida = execFileSync("curl", ["-sS", "-w", "\n%{http_code}", "-X", metodo, ...(metodo === "GET" ? ["-G"] : []), ...dados, API + caminho], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    // CONNECT 403 do proxy = o segredo de rede do Instagram não está no ambiente.
    throw new Error(`sem conexão com graph.instagram.com (${String(e.stderr || e.message).trim()}): confira o segredo de rede "Instagram Food Guard"`);
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

const conta = () => {
  const me = api("GET", "me", { fields: "user_id,username,account_type" });
  if (!me.user_id) throw new Error(`a conta não devolveu user_id: ${JSON.stringify(me)}`);
  return me;
};

if (teste) {
  try {
    const me = conta();
    let cota = null;
    try { cota = api("GET", `${me.user_id}/content_publishing_limit`, { fields: "quota_usage,config" }); } catch (e) { cota = { erro: e.message }; }
    console.log(`Conectado como @${me.username} (${me.account_type}), id ${me.user_id}. Cota de publicação: ${JSON.stringify(cota)}`);
    process.exit(0);
  } catch (e) {
    console.error(`Instagram não conectado: ${e.message}`);
    process.exit(1);
  }
}

const agenda = JSON.parse(fs.readFileSync(AGENDA, "utf8"));
const agora = new Date();
// Com --slug, também tenta de novo uma publicação que falhou.
const pub = agenda.publicacoes.find((p) => new Date(p.data) <= agora && (slugPedido
  ? p.slug === slugPedido && (p.status === "agendado" || p.status === "falhou")
  : p.status === "agendado"));
if (!pub) {
  console.log(slugPedido ? `Nada a publicar para ${slugPedido} (já publicado, fora da data ou inexistente).` : "Nada vencido na agenda.");
  process.exit(0);
}

try {
  const me = conta();
  const filhos = pub.slides.map((s) => api("POST", `${me.user_id}/media`, { image_url: SITE + s, is_carousel_item: "true" }).id);
  const carrossel = api("POST", `${me.user_id}/media`, { media_type: "CAROUSEL", children: filhos.join(","), caption: pub.legenda }).id;
  // A Meta processa o contêiner antes de aceitar a publicação.
  let estado = "";
  for (let i = 0; i < 24 && estado !== "FINISHED"; i++) {
    estado = api("GET", carrossel, { fields: "status_code" }).status_code;
    if (estado === "ERROR" || estado === "EXPIRED") throw new Error(`contêiner do carrossel ficou ${estado}`);
    if (estado !== "FINISHED") dormir(5000);
  }
  if (estado !== "FINISHED") throw new Error(`contêiner não ficou pronto em 2 minutos (último estado: ${estado})`);
  const midia = api("POST", `${me.user_id}/media_publish`, { creation_id: carrossel }).id;
  let link = "";
  try { link = api("GET", midia, { fields: "permalink" }).permalink ?? ""; } catch { /* o post saiu; o link é só conveniência */ }
  Object.assign(pub, { status: "publicado", publicado_em: new Date().toISOString(), instagram: link, midia });
  registrar(`publicado | ${pub.slug} | ${link || midia}`);
  console.log(`Publicado: ${pub.titulo} → ${link || midia}`);
} catch (e) {
  Object.assign(pub, { status: "falhou", falhou_em: new Date().toISOString(), motivo: e.message });
  registrar(`falhou | ${pub.slug} | ${e.message}`);
  console.error(`Não publicou ${pub.slug}: ${e.message}`);
  process.exitCode = 1;
} finally {
  fs.writeFileSync(AGENDA, JSON.stringify(agenda, null, 1) + "\n");
}
