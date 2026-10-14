import fs from "node:fs";
import path from "node:path";
import { mensagens, posAgendamento, respostas, WA_NUMERO, WA_TEXTO } from "./mensagens.mjs";


const OUT = path.join(path.dirname(new URL(import.meta.url).pathname), "..");
const SCRATCH = path.dirname(new URL(import.meta.url).pathname);
fs.mkdirSync(OUT, { recursive: true });

const LOGO_PROD = "https://foodguardassessoria.com.br/email/logo-food-guard.png";
const LOGO_PREVIEW = `file://${SCRATCH}/logo-email.png`;
const WA_LINK = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(WA_TEXTO)}`;

const C = {
  navy: "#0b1c34", navy2: "#16335c", verde: "#74b43c", verdeEsc: "#446e22",
  verdeClaro: "#f3faea", ink: "#1f2e3d", muted: "#5b6b7a", linha: "#dce5ed", fundo: "#eef2f6",
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---- WhatsApp -------------------------------------------------------------
function paraWhats(m) {
  const linhas = [];
  for (const b of m.blocos) {
    const x = b.x.replace(/\*\*(.+?)\*\*/g, "*$1*");
    if (b.t === "opcoes") linhas.push([x, ...b.itens.map((i) => `• ${i}`)].join("\n"));
    else linhas.push(x);
  }
  linhas.push("Equipe Food Guard");
  return linhas.join("\n\n");
}

// ---- E-mail ---------------------------------------------------------------
function inline(x, marcarCampos) {
  let h = esc(x).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  if (marcarCampos) {
    h = h.replace(/\[([^\]]+)\]/g,
      `<span style="background:#fff1dc;color:#7a3a05;border-radius:3px;padding:0 3px;font-weight:bold;">[$1]</span>`);
  }
  return h;
}

function corpoEmail(m, marcar) {
  const F = "font-family:Arial,Helvetica,sans-serif;";
  return m.blocos.map((b) => {
    if (b.t === "p") {
      return `<p style="margin:0 0 18px;${F}font-size:16px;line-height:1.65;color:${C.ink};">${inline(b.x, marcar)}</p>`;
    }
    if (b.t === "destaque") {
      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 22px;">
<tr><td style="background:${C.verdeClaro};border-left:4px solid ${C.verde};border-radius:12px;padding:18px 22px;">
<p style="margin:0 0 6px;${F}font-size:11px;font-weight:bold;letter-spacing:1.6px;text-transform:uppercase;color:${C.verdeEsc};">${esc(b.rotulo)}</p>
<p style="margin:0;${F}font-size:16px;line-height:1.6;color:${C.navy};">${inline(b.x, marcar)}</p>
</td></tr></table>`;
    }
    if (b.t === "opcoes") {
      const itens = b.itens.map((i) => `<tr><td style="padding:0 0 8px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="border:1px solid ${C.linha};border-radius:10px;padding:12px 16px;${F}font-size:15px;color:${C.navy};">
<span style="display:inline-block;width:8px;height:8px;border-radius:8px;background:${C.verde};margin-right:10px;vertical-align:middle;"></span>${inline(i, marcar)}</td>
</tr></table></td></tr>`).join("");
      return `<p style="margin:0 0 10px;${F}font-size:16px;line-height:1.65;color:${C.ink};">${inline(b.x, marcar)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 14px;">${itens}</table>`;
    }
    return "";
  }).join("\n");
}

function email(m, { preview }) {
  const logo = preview ? LOGO_PREVIEW : LOGO_PROD;
  const F = "font-family:Arial,Helvetica,sans-serif;";
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${esc(m.assunto)}</title>
<!--[if mso]><style>table,td,p,a{font-family:Arial,sans-serif!important}</style><![endif]-->
<style>
@media (max-width:620px){
  .card{width:100%!important;border-radius:0!important}
  .px{padding-left:22px!important;padding-right:22px!important}
  .tit{font-size:22px!important}
}
</style>
</head>
<body style="margin:0;padding:0;background:${C.fundo};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${esc(m.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.fundo};">
<tr><td align="center" style="padding:32px 12px;">
<table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;">

<tr><td class="px" style="background:${C.navy};padding:26px 40px;">
<img src="${logo}" width="217" height="58" alt="Food Guard Assessoria" style="display:block;border:0;outline:none;">
</td></tr>
<tr><td style="height:4px;background:${C.verde};line-height:4px;font-size:0;">&nbsp;</td></tr>

<tr><td class="px" style="padding:36px 40px 4px;">
<h1 class="tit" style="margin:0 0 22px;${F}font-size:26px;line-height:1.25;font-weight:bold;color:${C.navy};">${inline(m.titulo, preview)}</h1>
${corpoEmail(m, preview)}
</td></tr>

<tr><td class="px" style="padding:6px 40px 34px;">
<table role="presentation" cellpadding="0" cellspacing="0"><tr>
<td style="border-radius:999px;background:${C.verde};">
<a href="${WA_LINK}" style="display:inline-block;padding:15px 30px;${F}font-size:16px;font-weight:bold;color:${C.navy};text-decoration:none;border-radius:999px;">${esc(m.cta)} &rarr;</a>
</td></tr></table>
</td></tr>

<tr><td class="px" style="padding:0 40px 34px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="border-top:1px solid ${C.linha};padding-top:22px;">
<p style="margin:0;${F}font-size:16px;font-weight:bold;color:${C.navy};">Equipe Food Guard</p>
<p style="margin:4px 0 0;${F}font-size:14px;line-height:1.5;color:${C.muted};">Assessoria em segurança alimentar · São Paulo<br>WhatsApp (11) 97646-6553 · foodguardassessoria.com.br</p>
</td></tr></table>
</td></tr>

<tr><td class="px" style="background:#f6f8fa;padding:20px 40px;${F}font-size:12px;line-height:1.6;color:#8794a1;">
Food Guard Assessoria · CNPJ 60.833.961/0001-73 · São Paulo, SP<br>
Não quer mais receber nossas mensagens? Responda este e-mail com a palavra <strong>sair</strong> que removemos o seu contato.
</td></tr>

</table>
</td></tr></table>
</body>
</html>
`;
}

// ---- Saída ----------------------------------------------------------------
for (const m of mensagens) {
  fs.writeFileSync(path.join(OUT, `email-${m.id}.html`), email(m, { preview: false }));
  fs.writeFileSync(path.join(SCRATCH, `preview-${m.id}.html`), email(m, { preview: true }));
  fs.writeFileSync(path.join(OUT, `whatsapp-${m.id}.txt`), paraWhats(m) + "\n");
}

fs.writeFileSync(path.join(SCRATCH, "dados.json"), JSON.stringify({
  mensagens: mensagens.map((m) => ({ ...m, whats: paraWhats(m) })),
  posAgendamento, respostas,
}, null, 2));

console.log("gerado:", fs.readdirSync(OUT).join(", "));
