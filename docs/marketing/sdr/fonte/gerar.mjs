import fs from "node:fs";
import path from "node:path";
import {
  agendamento, cadencia, CNPJ, descoberta, estrategia, ofertaVisita, posAgendamento, respostas, SITE,
  WA_EXIBICAO, WA_NUMERO,
} from "./mensagens.mjs";
import { travar, travarCliente } from "./trava.mjs";

// Nada sai daqui com posicionamento errado, duração da visita ou fechamento antigo.
// Tudo o que o cliente lê: sem nome de pessoa e sem CRN.
travarCliente([
  ...[...cadencia, ...agendamento, ...posAgendamento].map((m) => [m.texto, m.id ?? m.nome]),
  ...descoberta.map((d) => [d.mensagem, `descoberta: ${d.situacao}`]),
  [ofertaVisita.texto, "oferta da visita"],
  ...respostas.filter((r) => !/quanto tempo|tempo leva|atrapalh/i.test(r.gatilho)).map((r) => [r.texto, r.gatilho]),
]);

// A única mensagem que pode falar de duração é a resposta a quem perguntou quanto tempo leva.
const perguntaDuracao = (g) => /quanto tempo|tempo leva|atrapalh/i.test(g);
travar([
  ...[...cadencia, ...agendamento, ...posAgendamento].flatMap((m) =>
    [[m.texto, m.id ?? m.nome], [m.semNome ?? "", `${m.id} (sem nome)`], [m.nota ?? "", `${m.id} (nota)`]]),
  ...descoberta.flatMap((d) => [[d.mensagem, `descoberta: ${d.situacao}`], [d.proximo_passo, `descoberta: ${d.situacao} (próximo passo)`]]),
  [ofertaVisita.texto, "oferta da visita"],
  ...respostas.filter((r) => !perguntaDuracao(r.gatilho)).flatMap((r) => [[r.texto, r.gatilho], [r.nota ?? "", `${r.gatilho} (nota)`]]),
  // "nao_dizer" lista de propósito as expressões proibidas, então fica de fora.
  [JSON.stringify({ ...estrategia.proposta, nao_dizer: [] }), "proposta de valor"],
  [JSON.stringify(estrategia.segmentacao), "segmentação"],
]);

const FONTE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(FONTE, "..");
const PREVIEW = path.join(FONTE, "preview");
fs.mkdirSync(PREVIEW, { recursive: true });

// Logos. No envio de verdade, o logo da assinatura entra por upload no editor
// de assinatura do Gmail, para não depender de imagem hospedada no domínio
// principal num e-mail frio. A URL abaixo serve ao e-mail de confirmação.
const LOGO_CLARO = { prod: `https://${SITE}/email/logo-food-guard-claro.png`, preview: `file://${FONTE}/logo-email-claro.png` };
const LOGO_ESCURO = { prod: `https://${SITE}/email/logo-food-guard.png`, preview: `file://${FONTE}/logo-email.png` };

const C = {
  navy: "#0b1c34", verde: "#74b43c", verdeEsc: "#446e22", verdeClaro: "#f3faea",
  ink: "#1f2e3d", muted: "#5b6b7a", linha: "#e3e9ef", fundo: "#eef2f6",
};
const F = "font-family:Arial,Helvetica,sans-serif;";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function inline(x, marcar) {
  let h = esc(x);
  if (marcar) {
    h = h.replace(/\[([^\]]+)\]/g,
      `<span style="background:#fff1dc;color:#7a3a05;border-radius:3px;padding:0 3px;font-weight:bold;">[$1]</span>`);
  }
  return h;
}

const paragrafos = (texto) => texto.split("\n\n");

// Endereços do site viram link clicável no e-mail. No WhatsApp o próprio app faz isso.
const linkar = (html) => html.replace(/foodguardassessoria\.com\.br(\/[a-z-]+)?/g,
  (url) => `<a href="https://${url}" style="color:${C.verdeEsc};font-weight:bold;">${url}</a>`);

// ---- WhatsApp ---------------------------------------------------------------
const txt = (nome, texto) => fs.writeFileSync(path.join(OUT, `whatsapp-${nome}.txt`), `${texto}\n`);

// ---- E-mail de prospecção: cara de e-mail escrito por alguém ----------------
// Fundo branco, texto corrido, nada de cabeçalho colorido nem botão. A marca
// vai na assinatura. É o formato que chega na caixa principal e recebe resposta.
function assinatura(logo) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:26px;"><tr>
<td style="width:36px;height:3px;background:${C.verde};font-size:0;line-height:3px;">&nbsp;</td></tr></table>
<img src="${logo}" width="150" height="38" alt="Food Guard Assessoria" style="display:block;border:0;margin-top:14px;">
<p style="margin:10px 0 0;${F}font-size:14px;line-height:1.55;color:${C.muted};">
<strong style="color:${C.navy};">Equipe Food Guard</strong><br>
Consultoria nutricional para serviços de alimentação · São Paulo<br>
WhatsApp ${WA_EXIBICAO} · ${SITE}
</p>`;
}

function rodapeLgpd(marcar) {
  return `<p style="margin:28px 0 0;padding-top:14px;border-top:1px solid ${C.linha};${F}font-size:12px;line-height:1.6;color:#8794a1;">
Food Guard Assessoria · CNPJ ${CNPJ} · São Paulo, SP<br>
Se não quiser mais receber nossas mensagens, responda SAIR.
</p>`;
}

function emailProspeccao(m, { preview }) {
  const marcar = preview;
  const logo = preview ? LOGO_CLARO.preview : LOGO_CLARO.prod;
  const corpo = paragrafos(m.texto).map((p) =>
    `<p style="margin:0 0 16px;${F}font-size:15px;line-height:1.65;color:${C.ink};">${linkar(inline(p, marcar)).replace(/\n/g, "<br>")}</p>`,
  ).join("\n");
  const citado = m.email.fio === "resposta"
    ? `<p style="margin:18px 0 0;${F}font-size:13px;color:#8794a1;">··· mensagem anterior citada abaixo</p>` : "";
  // Cabeçalho De/Para/Assunto: só na prévia, para mostrar como chega na caixa.
  const cab = preview ? `<div style="background:#f6f8fa;border-bottom:1px solid ${C.linha};padding:14px 24px;${F}font-size:13px;line-height:1.7;color:${C.muted};">
<strong style="color:${C.navy};">De:</strong> Food Guard &lt;contato@[domínio de prospecção]&gt;<br>
<strong style="color:${C.navy};">Para:</strong> ${inline("[e-mail do Estabelecimento]", true)}<br>
<strong style="color:${C.navy};">Assunto:</strong> <span style="color:${C.ink};font-weight:bold;">${inline(m.email.assunto, true)}</span>
</div>` : "";
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(m.email.assunto)}</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;">
${cab}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:26px 24px 30px;">
<div style="max-width:560px;">
${corpo}
${citado}
${assinatura(logo)}
${rodapeLgpd(marcar)}
</div>
</td></tr></table>
</body>
</html>
`;
}

// ---- E-mail de confirmação: aqui entra o layout completo da marca -----------
// A pessoa já respondeu e marcou a visita. Não é mais e-mail frio, então o
// visual de marca passa confiança em vez de cara de propaganda.
function emailConfirmacao({ preview }) {
  const marcar = preview;
  const logo = preview ? LOGO_ESCURO.preview : LOGO_ESCURO.prod;
  const wa = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent("Olá! Sobre a visita da Food Guard no [Estabelecimento]:")}`;
  const linha = (rot, val) => `<tr>
<td style="padding:9px 0;border-bottom:1px solid #dfe9d3;${F}font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${C.verdeEsc};width:120px;vertical-align:top;">${rot}</td>
<td style="padding:9px 0;border-bottom:1px solid #dfe9d3;${F}font-size:16px;color:${C.navy};vertical-align:top;">${inline(val, marcar)}</td></tr>`;
  const passo = (n, t, d) => `<tr><td style="padding:0 0 14px;vertical-align:top;width:40px;">
<div style="width:28px;height:28px;border-radius:28px;background:${C.verde};color:${C.navy};${F}font-size:14px;font-weight:bold;line-height:28px;text-align:center;">${n}</div></td>
<td style="padding:3px 0 14px;${F}font-size:15px;line-height:1.55;color:${C.ink};"><strong style="color:${C.navy};">${t}</strong><br>${d}</td></tr>`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>Visita agendada</title>
<style>@media (max-width:620px){.card{width:100%!important;border-radius:0!important}.px{padding-left:22px!important;padding-right:22px!important}}</style>
</head>
<body style="margin:0;padding:0;background:${C.fundo};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${inline("Visita do nutricionista da Food Guard: [dia], às [hora].", false)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.fundo};">
<tr><td align="center" style="padding:32px 12px;">
<table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;">
<tr><td class="px" style="background:${C.navy};padding:26px 40px;"><img src="${logo}" width="217" height="58" alt="Food Guard Assessoria" style="display:block;border:0;"></td></tr>
<tr><td style="height:4px;background:${C.verde};line-height:4px;font-size:0;">&nbsp;</td></tr>
<tr><td class="px" style="padding:34px 40px 8px;">
<p style="margin:0 0 8px;${F}font-size:12px;font-weight:bold;letter-spacing:1.6px;text-transform:uppercase;color:${C.verdeEsc};">Visita gratuita</p>
<h1 style="margin:0 0 14px;${F}font-size:26px;line-height:1.25;color:${C.navy};">${inline("Visita agendada, [Nome]", marcar)}</h1>
<p style="margin:0 0 22px;${F}font-size:16px;line-height:1.65;color:${C.ink};">${inline("Que bom que vamos conhecer o [Estabelecimento]! Seguem os dados da visita gratuita do nutricionista.", marcar)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.verdeClaro};border-radius:12px;"><tr><td style="padding:10px 22px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${linha("Data", "[dia], às [hora]")}
${linha("Endereço", "[endereço]")}
<tr>
<td style="padding:9px 0 0;${F}font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:${C.verdeEsc};width:120px;vertical-align:top;">Quem vai</td>
<td style="padding:9px 0 0;${F}font-size:16px;color:${C.navy};vertical-align:top;">Um nutricionista da Food Guard</td></tr>
</table></td></tr></table>
</td></tr>
<tr><td class="px" style="padding:26px 40px 6px;">
<p style="margin:0 0 16px;${F}font-size:18px;font-weight:bold;color:${C.navy};">Como é a visita</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${passo(1, "Conhece a operação com você", "O nutricionista acompanha a rotina da equipe e tira as suas dúvidas.")}
${passo(2, "Confere o que a fiscalização olha", "Documentos, registros, temperatura, higienização e armazenamento.")}
${passo(3, "Mostra o que está em ordem e o que falta", "No final, conversa com você sobre o que vale priorizar. O que ele vê fica entre você e a Food Guard.")}
</table>
</td></tr>
<tr><td class="px" style="padding:6px 40px 30px;">
<p style="margin:0 0 16px;${F}font-size:15px;line-height:1.6;color:${C.muted};">Precisa remarcar? Responda este e-mail ou chame a gente no WhatsApp.</p>
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="border-radius:999px;background:${C.verde};">
<a href="${wa}" style="display:inline-block;padding:14px 28px;${F}font-size:16px;font-weight:bold;color:${C.navy};text-decoration:none;border-radius:999px;">Falar no WhatsApp &rarr;</a>
</td></tr></table>
</td></tr>
<tr><td class="px" style="padding:0 40px 30px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-top:1px solid ${C.linha};padding-top:20px;">
<p style="margin:0;${F}font-size:15px;font-weight:bold;color:${C.navy};">Equipe Food Guard</p>
<p style="margin:4px 0 0;${F}font-size:13px;line-height:1.5;color:${C.muted};">Consultoria nutricional para serviços de alimentação · São Paulo<br>WhatsApp ${WA_EXIBICAO} · ${SITE}</p>
</td></tr></table></td></tr>
<tr><td class="px" style="background:#f6f8fa;padding:18px 40px;${F}font-size:12px;line-height:1.6;color:#8794a1;">Food Guard Assessoria · CNPJ ${CNPJ} · São Paulo, SP</td></tr>
</table>
</td></tr></table>
</body>
</html>
`;
}

// ---- Assinatura para instalar no Gmail --------------------------------------
function arquivoAssinatura() {
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>Assinatura de e-mail · Food Guard</title></head>
<body style="margin:0;padding:32px;background:#ffffff;">
<!-- Abra este arquivo no navegador, selecione a assinatura abaixo da linha,
     copie e cole em Gmail > Configurações > Assinatura. Depois troque o logo
     colado pelo upload do arquivo logo-food-guard-claro.png (botão de imagem
     do editor), para a imagem ficar hospedada pelo próprio Google. -->
<p style="${F}font-size:13px;color:#8794a1;margin:0 0 20px;">Copie a partir da linha verde:</p>
${assinatura("../../../public/email/logo-food-guard-claro.png")}
</body></html>
`;
}

// ---- Saída -----------------------------------------------------------------
for (const f of fs.readdirSync(OUT)) {
  if (/^(email|whatsapp|roteiro)-.*\.(html|txt)$/.test(f)) fs.rmSync(path.join(OUT, f));
}
for (const m of cadencia) {
  txt(m.id, m.texto);
  fs.writeFileSync(path.join(OUT, `email-${m.id}.html`), emailProspeccao(m, { preview: false }));
  fs.writeFileSync(path.join(PREVIEW, `email-${m.id}.html`), emailProspeccao(m, { preview: true }));
}
for (const m of [...agendamento, ...posAgendamento]) txt(m.id, m.texto);
// Roteiros para o SDR copiar e colar.
const bloco = (titulo, texto, nota) => `## ${titulo}\n\n${texto}${nota ? `\n\n(nota: ${nota})` : ""}\n`;
fs.writeFileSync(path.join(OUT, "roteiro-descoberta.txt"),
  [...descoberta.map((d) => bloco(d.situacao, d.mensagem, d.proximo_passo)), bloco("Oferta da visita", ofertaVisita.texto, ofertaVisita.quando_usar)].join("\n"));
fs.writeFileSync(path.join(OUT, "roteiro-objecoes.txt"), respostas.map((r) => bloco(r.gatilho, r.texto, r.nota)).join("\n"));
fs.writeFileSync(path.join(OUT, "email-confirmacao.html"), emailConfirmacao({ preview: false }));
fs.writeFileSync(path.join(PREVIEW, "email-confirmacao.html"), emailConfirmacao({ preview: true }));
fs.writeFileSync(path.join(OUT, "assinatura-email.html"), arquivoAssinatura());

fs.writeFileSync(path.join(PREVIEW, "dados.json"), JSON.stringify({ cadencia, descoberta, ofertaVisita, agendamento, posAgendamento, respostas, estrategia }, null, 2));
console.log("gerado:", fs.readdirSync(OUT).filter((f) => f !== "fonte").join(", "));
