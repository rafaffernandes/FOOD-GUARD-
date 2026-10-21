// Envia o e-mail semanal de aprovação pelo Resend (o mesmo serviço que o site usa).
// A chave fica num segredo de rede do ambiente (host api.resend.com): o proxy do ambiente
// coloca o cabeçalho Authorization e a chave nunca entra na sessão. Se existir a variável
// RESEND_API_KEY, ela é usada no lugar.
// Uso: node enviar-email-aprovacao.mjs email.html "Assunto" [--teste]
//   --teste: manda só para o Rafael.
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const [html, assunto, modo] = process.argv.slice(2);
const chave = process.env.RESEND_API_KEY;
const DESTINOS = modo === "--teste" ? ["rafael.andes2@gmail.com"] : ["rafael.andes2@gmail.com", "reeh_rizzo@hotmail.com"];
const corpo = fs.readFileSync(html, "utf8");
// Versão em texto: os links do HTML, para leitores sem HTML.
const links = [...corpo.matchAll(/<a href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].map(([, href, txt]) => `${txt}: ${href}`);
const texto = `Conteúdo da semana para aprovação. Responda este e-mail com "aprovado" e o número do post, ou mande o ajuste.\n\n${links.join("\n")}\n\nFood Guard`;

const payload = {
  from: process.env.RESEND_FROM_APROVACAO || "Food Guard <contato@foodguardassessoria.com.br>",
  to: DESTINOS,
  reply_to: ["rafael.andes2@gmail.com"],
  subject: assunto,
  html: corpo,
  text: texto,
};
const tmp = `${html}.payload.json`;
fs.writeFileSync(tmp, JSON.stringify(payload));
let saida;
try {
  // curl respeita o proxy do ambiente; o fetch do Node não.
  // Sem RESEND_API_KEY, vai sem Authorization: quem coloca é o segredo de rede.
  const auth = chave ? ["-H", `Authorization: Bearer ${chave}`] : [];
  saida = execFileSync("curl", ["-sS", "-w", "\n%{http_code}", "-X", "POST", "https://api.resend.com/emails",
    ...auth, "-H", "Content-Type: application/json", "--data-binary", `@${tmp}`], { encoding: "utf8" });
} catch (erro) {
  console.error(`Sem conexão com api.resend.com (${String(erro.stderr || erro.message).trim()}). Confira o segredo de rede do Resend. Nada foi enviado.`);
  process.exit(2);
} finally {
  fs.rmSync(tmp, { force: true });
}
const linhas = saida.trim().split("\n");
const status = linhas.pop();
console.log(`Resend respondeu ${status}: ${linhas.join("\n")}`);
if (status === "401" || status === "403") {
  console.error("O Resend não recebeu a chave: confira o segredo de rede (host api.resend.com, tipo Bearer). Nada foi enviado.");
}
process.exit(status.startsWith("2") ? 0 : 1);
