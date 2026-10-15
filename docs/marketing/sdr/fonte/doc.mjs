import fs from "node:fs";
import path from "node:path";
import { travar } from "./trava.mjs";

const FONTE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(FONTE, "..");
const PREVIEW = path.join(FONTE, "preview");
const MEDIA = path.join(FONTE, "../../../../.next/static/media");
const { cadencia, descoberta, ofertaVisita, agendamento, posAgendamento, respostas, estrategia } = JSON.parse(
  fs.readFileSync(path.join(PREVIEW, "dados.json"), "utf8"),
);
const { proposta, segmentacao, funil } = estrategia;
// Versões curtas para o plano de aprovação; o manual usa o texto completo.
const resumo = estrategia.resumo;
const segCurto = (s) => resumo?.segmentos.find((r) => r.nome === s.nome) ?? { dor: s.dor_provavel, angulo: s.angulo, isca: s.isca };
const etapaCurta = (e) => resumo?.etapas.find((r) => r.etapa === e.etapa) ?? { definicao: e.definicao, hipotese: e.hipotese_inicial };
const css = fs.readFileSync(path.join(FONTE, "doc.css"), "utf8").replaceAll("url(MEDIA/", `url(file://${MEDIA}/`);

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const campos = (s) => esc(s).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>');
const whats = (t) => campos(t).replace(/\n/g, "<br>");
const primeiraLinha = (t) => t.split("\n")[0];
const lista = (xs, cls = "") => `<ul class="${cls}">${(xs ?? []).map((x) => `<li>${campos(x)}</li>`).join("")}</ul>`;
const notif = (t) => `<div class="notif"><div class="notif-app">WhatsApp · agora</div><b>Food Guard</b><br>${campos(primeiraLinha(t))}</div>`;

const primeiras = cadencia.filter((m) => m.numero === 1);
const seguintes = cadencia.filter((m) => m.numero !== 1);

// ---- 2. Proposta de valor ----------------------------------------------------
const secProposta = (completo) => `
<section class="nova">
<h2><span>2 ·</span> Proposta de valor</h2>
<div class="intro"><b>O problema que a Food Guard resolve:</b> ${esc(proposta.problema_central)}</div>
<div class="destaque-proposta"><b>Em uma frase.</b> ${esc(proposta.proposta_valor)}</div>
<h3>As quatro perguntas que a abordagem precisa responder</h3>
${proposta.respostas.map((r) => `
<div class="q4">
  <div class="p">${esc(r.pergunta)}</div>
  ${completo ? `<div>${esc(r.resposta_interna)}</div><div class="rot">Como aparece na mensagem</div>` : ""}
  <div class="bolha">${whats(r.frase_para_mensagem)}</div>
  ${completo ? `<div class="rot">Prova que existe hoje</div><div>${esc(r.prova_disponivel_hoje)}</div>` : ""}
</div>`).join("")}
${completo ? `<div class="cols2">
  <div><h3>Diferenciais que dá para provar</h3>${lista(proposta.diferenciais_reais)}</div>
  <div><h3>Por que agir esta semana, sem inventar escassez</h3>${lista(proposta.urgencia_honesta)}</div>
</div>
<div class="cols2">
  <div><h3>Prova que ainda falta construir</h3>${lista(proposta.provas_a_construir)}</div>
  <div><h3>O que não dizer</h3><!--trava:ignora-->${lista(proposta.nao_dizer)}<!--/trava--></div>
</div>` : `<p style="color:var(--muted)">O argumento completo de cada pergunta, os diferenciais que dá para provar, os motivos de urgência e o que não dizer estão no Manual do SDR.</p>`}
</section>`;

// ---- 3. Segmentação ----------------------------------------------------------
const secSegmentos = (completo) => completo ? `
<section class="nova">
<h2><span>3 ·</span> Segmentação: para quem falar primeiro</h2>
<div class="intro">Os segmentos são <b>hipóteses</b>. Depois das primeiras 100 conversas, os números de cada um dizem onde vale insistir. Restaurante maior não vale mais por definição, e autuado não contrata sempre.</div>
${segmentacao.segmentos.map((s) => `
<div class="seg">
  <h3>${esc(s.nome)}</h3>
  <p class="quem">${esc(s.quem)}</p>
  <dl>
    <dt>Como reconhecer</dt><dd>${lista(s.sinais_para_identificar)}</dd>
    <dt>Dor provável</dt><dd>${esc(s.dor_provavel)}</dd>
    <dt>Ângulo</dt><dd>${esc(s.angulo)}</dd>
    <dt>Descoberta</dt><dd>${lista(s.perguntas_descoberta)}</dd>
    <dt>Isca</dt><dd>${esc(s.isca)}</dd>
    <dt>Plano provável</dt><dd>${esc(s.plano_provavel)}</dd>
    <dt>Prioridade</dt><dd>${esc(s.regra_de_prioridade)}</dd>
  </dl>
</div>`).join("")}
<h3>Os campos novos na base</h3>
<table>
<tr><th style="width:22%">Campo</th><th style="width:30%">Valores</th><th>Como preencher</th></tr>
${segmentacao.campos_da_base.map((c) => `<tr><td><b>${esc(c.campo)}</b></td><td>${esc(c.valores)}</td><td>${esc(c.como_preencher)}</td></tr>`).join("")}
</table>
<div class="cols2">
  <div><h3>Rubrica de prioridade</h3><p>${esc(segmentacao.rubrica_prioridade)}</p></div>
  <div><h3>Ordem de ataque do dia</h3><p>${esc(segmentacao.ordem_de_ataque)}</p></div>
</div>
</section>` : `
<section class="nova">
<h2><span>3 ·</span> Segmentação: para quem falar primeiro</h2>
<div class="intro">Os segmentos são <b>hipóteses</b>. Depois das primeiras 100 conversas, os números de cada um dizem onde vale insistir. Como reconhecer cada um, a rubrica de prioridade e a ordem de ataque do dia estão no Manual do SDR.</div>
<table>
<tr><th style="width:22%">Segmento</th><th style="width:26%">Dor provável</th><th style="width:30%">Ângulo da mensagem</th><th style="width:22%">Isca</th></tr>
${segmentacao.segmentos.map((s) => { const c = segCurto(s); return `<tr><td><b>${esc(s.nome)}</b></td><td>${esc(c.dor)}</td><td>${esc(c.angulo)}</td><td>${esc(c.isca)}</td></tr>`; }).join("")}
</table>
<h3>Os campos novos na base</h3>
<table>
<tr><th style="width:28%">Campo</th><th>Valores</th></tr>
${segmentacao.campos_da_base.map((c) => `<tr><td><b>${esc(c.campo)}</b></td><td>${esc(c.valores)}</td></tr>`).join("")}
</table>
</section>`;

// ---- 4. Regras e cadência ----------------------------------------------------
const secRegras = `
<section class="nova">
<h2><span>4 ·</span> Regras e cadência</h2>
<div class="regras">
  <div class="regra forte"><b>Problema primeiro, visita depois</b>A conversa parte do problema que a Food Guard resolve. A visita de avaliação sem custo é o primeiro passo para mostrar valor, não o produto.</div>
  <div class="regra forte"><b>Descobrir antes de oferecer</b>Uma ou duas perguntas para entender quem cuida da rotina e se há necessidade. Só então a visita.</div>
  <div class="regra"><b>Quem somos</b>Food Guard, consultoria nutricional para serviços de alimentação. Quem assina é a empresa.</div>
  <div class="regra"><b>Fechamento</b>Quando puxa a visita, termina perguntando o melhor dia e horário. Nunca sem pergunta.</div>
  <div class="regra"><b>Sem resposta: no máximo três</b>Terça, sexta e terça seguinte. Depois, encerra.</div>
  <div class="regra"><b>Nada inventado</b>Sem caso de cliente, depoimento ou número sem fonte. Duração da visita e preço só quando perguntarem.</div>
</div>
<div class="trilho">
  <div class="etapa"><div class="d">Terça</div><div class="n">1 · Primeiro contato, por segmento</div></div>
  <div class="seta">→</div>
  <div class="etapa"><div class="d">Sexta</div><div class="n">2 · Checklist de 80 itens</div></div>
  <div class="seta">→</div>
  <div class="etapa"><div class="d">Terça seguinte</div><div class="n">3 · Encerramento</div></div>
  <div class="seta">→</div>
  <div class="etapa fim"><div class="d">Sem resposta</div><div class="n">Encerra · sai da lista</div></div>
</div>
<div class="ramo">
  <b>Respondeu em qualquer momento?</b> Sai da cadência e segue este caminho:
  <div class="fluxo"><span>Descoberta · 1 ou 2 perguntas</span><span>→ Oferta da visita</span><span>→ 5 · escolheu o dia</span><span>→ Confirmação</span><span>→ Lembrete</span><span>→ Visita</span><span>→ Proposta</span></div>
</div>
<div class="alerta"><b>Um canal por lead.</b> WhatsApp é o canal principal, digitado um a um, 20 a 30 conversas novas por dia, de terça a sexta, das 14h30 às 17h. E-mail só para quem não tem WhatsApp. Mensagem automática do WhatsApp Business não conta como resposta.</div>
</section>`;

// ---- 5. Primeiras mensagens --------------------------------------------------
const secPrimeiras = (completo) => `
<section class="nova">
<h2><span>5 ·</span> Primeiro contato, uma versão por segmento</h2>
<div class="intro">A pergunta abre a mensagem porque é a única parte que aparece na notificação, e ela serve para <b>descobrir</b> quem cuida da rotina sanitária, não para empurrar a visita. Sem nome confirmado, a mensagem abre sem o [Nome].</div>
${completo ? primeiras.map((m) => `
<div class="msg1">
  <div class="seg-nome">${esc(m.segmento)}</div>
  <div class="duas">
    <div class="col-w">${notif(m.texto)}<div class="bolha">${whats(m.texto)}</div></div>
    <div class="col-e"><div class="canal">Por que assim</div><p>${esc(m.porque)}</p></div>
  </div>
</div>`).join("") : `<div class="cols2">${primeiras.map((m) => `
<div class="msg1">
  <div class="seg-nome">${esc(m.segmento)}</div>
  ${notif(m.texto)}<div class="bolha">${whats(m.texto)}</div>
</div>`).join("")}</div>`}
<div class="canal">Exemplo no e-mail (o primeiro segmento)</div>
<img class="shot" style="max-width:120mm" src="file://${PREVIEW}/email-${primeiras[0].id}.png" alt="">
</section>`;

// ---- 6. Segundo contato e encerramento ---------------------------------------
const secSeguintes = seguintes.map((m, i) => `
<section class="nova">
  ${i === 0 ? '<h2><span>6 ·</span> Segundo contato e encerramento</h2>' : ""}
  <div class="msg-cab">
    <div class="msg-num">${m.numero}</div>
    <div>
      <div class="msg-quando">${esc(m.quando)}</div>
      <h2 class="msg-nome">${esc(m.nome)}</h2>
      <p class="msg-regra">${esc(m.regra)}</p>
    </div>
  </div>
  <div class="duas">
    <div class="col-w"><div class="canal">Como aparece na notificação</div>${notif(m.texto)}<div class="canal">WhatsApp</div><div class="bolha">${whats(m.texto)}</div></div>
    <div class="col-e"><div class="canal">E-mail · resposta no mesmo fio</div><img class="shot" src="file://${PREVIEW}/email-${m.id}.png" alt=""></div>
  </div>
</section>`).join("");

// ---- 7. Descoberta -----------------------------------------------------------
const secDescoberta = (completo) => `
<section class="nova">
<h2><span>7 ·</span> Quando a pessoa responde: descoberta e oferta</h2>
<div class="intro"><b>Uma ou duas perguntas, no máximo.</b> O objetivo é entender quem cuida da rotina, como ela é feita e se existe uma necessidade que justifique a visita. Quem diz que está tudo certo e não mostra brecha recebe o checklist e não é empurrado para a visita.</div>
<div class="${completo ? "" : "cols2"}">${descoberta.map((d) => `
<div class="ramo-card">
  <div class="sit">${esc(d.situacao)}</div>
  <div class="bolha">${whats(d.mensagem)}</div>
  ${completo ? `<div class="prox"><b>Depois:</b> ${esc(d.proximo_passo)}</div>` : ""}
</div>`).join("")}</div>
<h3>Oferta da visita</h3>
<p style="color:var(--muted)">${esc(ofertaVisita.quando_usar)}</p>
<div class="bolha">${whats(ofertaVisita.texto)}</div>
</section>`;

// ---- 8. Agendamento e depois de marcada --------------------------------------
const cartao = (m, completo) => `
  <div class="card">
    <div class="card-t">${m.letra ? `<span class="tag">${esc(m.letra)}</span> ` : ""}${esc(m.nome)} <span>· ${esc(m.quando)}</span></div>
    <div class="bolha">${whats(m.texto)}</div>
    ${completo && m.nota ? `<div class="nota">${esc(m.nota)}</div>` : ""}
  </div>`;
const secAgenda = (completo) => `
<section class="nova">
<h2><span>8 ·</span> Agendamento e depois de marcada</h2>
<div class="intro">Visita marcada ainda não é visita feita. No e-mail, é aqui que entra o layout completo da marca: a pessoa já respondeu e marcou, então o visual de empresa passa confiança.</div>
<div class="lado">
  <div>${[...agendamento, ...posAgendamento].map((m) => cartao(m, completo)).join("")}</div>
  <div><div class="canal">E-mail de confirmação</div><img class="shot" src="file://${PREVIEW}/email-confirmacao.png" alt=""></div>
</div>
</section>`;

// ---- 9. Objeções -------------------------------------------------------------
const secObjecoes = (completo) => `
<section class="nova">
<h2><span>9 ·</span> Objeções</h2>
<div class="intro"><b>Responda em até 5 minutos</b>, por texto, começando pelo que a pessoa disse. As quatro primeiras são as perguntas que você levantou: por que não continuar como está, por que pagar todo mês, por que agora e por que a Food Guard.</div>
<div class="cols2">${respostas.map((r) => `
  <div class="resp">
    <div class="gatilho">"${esc(r.gatilho)}"</div>
    <div class="bolha">${whats(r.texto)}</div>
    ${completo && r.nota ? `<div class="nota">${esc(r.nota)}</div>` : ""}
  </div>`).join("")}</div>
</section>`;

// ---- 10. Funil até a receita -------------------------------------------------
const secFunil = (completo) => `
<section class="nova">
<h2><span>10 ·</span> Funil: do primeiro contato à receita</h2>
<div class="intro">Taxa de resposta sozinha engana: uma operação com menos respostas pode fechar mais contratos. O número que importa é <b>receita recorrente por 100 contatos</b>. As taxas abaixo são <b>hipóteses</b> para começar; depois das primeiras 100 conversas, viram o número real.</div>
${completo ? `<table>
<tr><th style="width:17%">Etapa</th><th style="width:27%">Definição</th><th style="width:24%">Para avançar</th><th style="width:16%">Métrica</th><th style="width:16%">Hipótese inicial</th></tr>
${funil.etapas.map((e) => `<tr><td><b>${esc(e.etapa)}</b></td><td>${esc(e.definicao)}</td><td>${esc(e.criterio_para_avancar)}</td><td>${esc(e.metrica)}</td><td>${esc(e.hipotese_inicial)}</td></tr>`).join("")}
</table>` : `<table>
<tr><th style="width:24%">Etapa</th><th style="width:46%">O que é</th><th style="width:30%">Hipótese inicial</th></tr>
${funil.etapas.map((e) => { const c = etapaCurta(e); return `<tr><td><b>${esc(e.etapa)}</b></td><td>${esc(c.definicao)}</td><td>${esc(c.hipotese)}</td></tr>`; }).join("")}
</table>`}
<h3>O que é um lead qualificado</h3><p>${esc(completo ? funil.qualificacao : resumo?.qualificacao ?? funil.qualificacao)}</p>
<h3>A conta até a receita</h3><p>${esc(completo ? funil.conta_ate_a_receita : resumo?.conta ?? funil.conta_ate_a_receita)}</p>
${completo ? `<div class="cols2">
  <div><h3>Relatório de toda sexta</h3>${lista(funil.relatorio_semanal)}</div>
  <div><h3>O que aprender nas primeiras 100 conversas</h3>${lista(funil.o_que_aprender_nas_primeiras_100)}</div>
</div>
<h3>Colunas da planilha do SDR</h3>
${lista(funil.colunas_planilha, "lista2")}` : ""}
</section>`;

// ---- 11. Canais --------------------------------------------------------------
const secCanais = `
<section class="nova">
<h2><span>11 ·</span> Operação dos canais</h2>
<h3>WhatsApp</h3>
<table class="check">
<tr><th>Item</th><th>O que fazer</th></tr>
<tr><td>Número dedicado</td><td>Recomendo um número só para prospecção. Mensagem fria gera bloqueio e denúncia, e o WhatsApp restringe o número. Se for o (11) 97646-6553, que está no site, a Food Guard perde também o canal dos leads que chegam sozinhos.</td></tr>
<tr><td>Perfil completo</td><td>WhatsApp Business com logo, nome "Food Guard", descrição "Consultoria nutricional para serviços de alimentação em São Paulo. Não somos órgão público.", site, CNPJ e horário. O dono toca no perfil antes de responder.</td></tr>
<tr><td>Volume e ritmo</td><td>20 a 30 conversas novas por dia, digitadas uma a uma. Nada de disparador em massa. Se aparecerem bloqueios, pausa o dia.</td></tr>
<tr><td>Horário</td><td>Terça a sexta, das 14h30 às 17h. Segunda tem muita cozinha fechada; almoço e jantar enterram a mensagem.</td></tr>
</table>
<h3>E-mail (canal secundário)</h3>
<table class="check">
<tr><th>Item</th><th>O que fazer</th></tr>
<tr><td>Domínio separado</td><td>Prospecção nunca sai do foodguardassessoria.com.br nem pelo Resend, que entregam os relatórios do diagnóstico. Registrar um domínio só para prospecção (R$ 40 por ano no Registro.br) com caixa no Google Workspace.</td></tr>
<tr><td>Autenticação e aquecimento</td><td>SPF, DKIM e DMARC no domínio novo, duas a três semanas de uso leve e depois no máximo 20 a 30 e-mails novos por dia, sem pixel de abertura.</td></tr>
<tr><td>Formato</td><td>Cara de e-mail pessoal, com a marca na assinatura (assinatura-email.html). As mensagens 2 e 3 vão como resposta no mesmo fio.</td></tr>
</table>
</section>`;

// ---- 12. Aprovação -----------------------------------------------------------
const decisoesFixas = [
  ["CRN-3", "Pedir orientação por escrito sobre a visita de avaliação sem custo como etapa comercial (Código de Ética, Resolução CFN 599/2018, art. 57). Chamar de \"visita de avaliação\" já ajuda."],
  ["Número de WhatsApp", "Número dedicado à prospecção, separado do número do site."],
];
const secAprovar = `
<section class="nova">
<h2><span>12 ·</span> Para você aprovar</h2>
<table>
<tr><th style="width:28%">Ponto</th><th>O que precisa da sua decisão</th></tr>
${decisoesFixas.map(([p, t]) => `<tr><td><b>${esc(p)}</b></td><td>${esc(t)}</td></tr>`).join("")}
${(estrategia.decisoes_para_o_dono ?? []).map((d) => `<tr><td colspan="2">${esc(d)}</td></tr>`).join("")}
</table>
</section>`;

// ---- 1. O que mudou ----------------------------------------------------------
const secMudou = (completo) => `
<section>
<h2><span>1 ·</span> O que mudou nesta versão</h2>
<div class="intro">${esc(estrategia.diagnostico)}</div>
<table>
<tr><th style="width:28%">Antes</th><th>Agora</th></tr>
<tr><td>A visita era o produto da mensagem</td><td>A mensagem parte do problema operacional (rotina sanitária organizada, registros em dia, operação pronta para a fiscalização). A visita é o primeiro passo.</td></tr>
<tr><td>Uma mensagem igual para todos</td><td>Quatro segmentos, cada um com seu gancho, mais uma versão para quem não se encaixa. A base ganha perfil, sinal de oportunidade e prioridade.</td></tr>
<tr><td>Pergunta do Manual, sim ou não</td><td>Perguntas de descoberta: quem cuida da rotina, como é feita, se há necessidade. Só depois a visita.</td></tr>
<tr><td>Segundo e terceiro contatos insistindo na visita</td><td>Segundo contato oferece o checklist de 80 itens, que já captura o lead no site. Terceiro encerra com educação e deixa a porta aberta.</td></tr>
<tr><td>Metas de resposta e agendamento</td><td>Funil completo até contrato e receita recorrente, com hipóteses por etapa.</td></tr>
</table>
${completo && (estrategia.mudancas_pos_critica ?? []).length ? `<h3>Ajustes depois da crítica do diretor comercial e dos donos simulados</h3>${lista(estrategia.mudancas_pos_critica)}` : ""}
</section>`;

function montar(completo) {
  const titulo = completo ? "Manual do SDR" : "Plano de prospecção<br>e SDR";
  const sub = completo
    ? "A referência completa para quem vai operar a prospecção: o argumento por trás de cada resposta, como reconhecer cada segmento, a rubrica de prioridade e o que fazer depois de cada mensagem."
    : "Para quem falar, o que dizer e como medir até virar contrato. A conversa parte do problema que a Food Guard resolve, descobre a situação de cada operação e só então oferece a visita de avaliação sem custo.";
  const rodape = completo ? "Manual do SDR · acompanha o Plano de prospecção · outubro de 2026" : "Versão 4 para aprovação · outubro de 2026";
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>${completo ? "Manual do SDR" : "Plano de prospecção e SDR"} · Food Guard</title>
<style>${css}</style></head><body>
<div class="capa">
  <img src="file://${FONTE}/logo-email.png" alt="Food Guard">
  <div>
    <h1>${titulo}</h1>
    <p class="sub">${sub}</p>
  </div>
  <div class="idx">
    <b>1.</b> O que mudou &nbsp;·&nbsp; <b>2.</b> Proposta de valor &nbsp;·&nbsp; <b>3.</b> Segmentação<br>
    <b>4.</b> Regras e cadência &nbsp;·&nbsp; <b>5.</b> Primeiro contato por segmento<br>
    <b>6.</b> Segundo contato e encerramento &nbsp;·&nbsp; <b>7.</b> Descoberta e oferta<br>
    <b>8.</b> Agendamento &nbsp;·&nbsp; <b>9.</b> Objeções &nbsp;·&nbsp; <b>10.</b> Funil até a receita<br>
    <b>11.</b> Operação dos canais &nbsp;·&nbsp; <b>12.</b> Para você aprovar<br><br>
    ${rodape}
  </div>
</div>
${secMudou(completo)}${secProposta(completo)}${secSegmentos(completo)}${secRegras}${secPrimeiras(completo)}${secSeguintes}${secDescoberta(completo)}${secAgenda(completo)}${secObjecoes(completo)}${secFunil(completo)}${secCanais}${secAprovar}
</body></html>`;
}

for (const [completo, arquivo] of [[false, "plano-sdr.html"], [true, "manual-sdr.html"]]) {
  const html = montar(completo);
  // O que está entre os marcadores cita de propósito as expressões proibidas.
  const texto = html.replace(/<!--trava:ignora-->[\s\S]*?<!--\/trava-->/g, "").replace(/<style>[\s\S]*?<\/style>/, "").replace(/<[^>]+>/g, " ");
  travar([[texto, arquivo]]);
  fs.writeFileSync(path.join(OUT, arquivo), html);
}
console.log("documentos gerados");
