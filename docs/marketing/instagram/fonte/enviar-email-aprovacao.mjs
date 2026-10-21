// Envia o e-mail semanal de aprovação pelo Resend (o mesmo serviço que o site usa).
// Precisa da variável RESEND_API_KEY no ambiente e de acesso de rede a api.resend.com.
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

if (!chave) {
  console.error("RESEND_API_KEY não está no ambiente. Nada foi enviado.");
  process.exit(2);
}
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
  saida = execFileSync("curl", ["-sS", "-w", "\n%{http_code}", "-X", "POST", "https://api.resend.com/emails",
    "-H", `Authorization: Bearer ${chave}`, "-H", "Content-Type: application/json", "--data-binary", `@${tmp}`], { encoding: "utf8" });
} finally {
  fs.rmSync(tmp, { force: true });
}
const linhas = saida.trim().split("\n");
const status = linhas.pop();
console.log(`Resend respondeu ${status}: ${linhas.join("\n")}`);
process.exit(status.startsWith("2") ? 0 : 1);
