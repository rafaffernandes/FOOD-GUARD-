import fs from "node:fs";
import path from "node:path";
import { travar } from "./trava.mjs";

const FONTE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(FONTE, "..");
const PREVIEW = path.join(FONTE, "preview");
const MEDIA = path.join(FONTE, "../../../../.next/static/media");
const { cadencia, agendamento, posAgendamento, respostas } = JSON.parse(
  fs.readFileSync(path.join(PREVIEW, "dados.json"), "utf8"),
);

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const campos = (s) => esc(s).replace(/\[([^\]]+)\]/g, '<span class="ph">[$1]</span>');
const whats = (t) => campos(t).replace(/\n/g, "<br>");
const primeiraLinha = (t) => t.split("\n")[0];

// Resultado do teste com donos simulados (chance de responder / de marcar, em %).
const teste = [
  { p: "Seu Valdir · por quilo, Parque São Lucas", a: [8, 3], d: [8, 3] },
  { p: "Dona Célia · padaria grande, já tem nutricionista", a: [6, 2], d: [8, 3] },
  { p: "Lucas · japonês novo no Tatuapé", a: [25, 12], d: [45, 25] },
  { p: "Márcio · self-service, nutricionista \"da família\"", a: [12, 3], d: [12, 4] },
  { p: "Renata · autuada há seis semanas, com prazo", a: [65, 40], d: [70, 55] },
  { p: "Diego · dark kitchen na Penha", a: [5, 2], d: [6, 2] },
];
const media = (k, i) => Math.round(teste.reduce((s, t) => s + t[k][i], 0) / teste.length);

const paginasMsg = cadencia.map((m, i) => `
<section class="nova">
  ${i === 0 ? '<h2><span>4 ·</span> As três mensagens</h2>' : ""}
  <div class="msg-cab">
    <div class="msg-num">${m.numero}</div>
    <div>
      <div class="msg-quando">${esc(m.quando)}</div>
      <h2 class="msg-nome">${esc(m.nome)}</h2>
      <p class="msg-regra">${esc(m.regra)}</p>
    </div>
  </div>
  <div class="duas">
    <div class="col-w">
      <div class="canal">Como aparece na notificação</div>
      <div class="notif"><div class="notif-app">WhatsApp · agora</div><b>Food Guard</b><br>${campos(primeiraLinha(m.texto))}</div>
      <div class="canal">WhatsApp</div>
      <div class="bolha">${whats(m.texto)}</div>
      <div class="semnome"><b>Sem nome confirmado, a primeira linha fica:</b><br>${campos(m.semNome)}</div>
    </div>
    <div class="col-e">
      <div class="canal">E-mail ${m.email.fio === "resposta" ? "· resposta no mesmo fio" : "· primeiro envio"}</div>
      <img class="shot" src="file://${PREVIEW}/email-${m.id}.png" alt="">
    </div>
  </div>
</section>`).join("");

const resp4 = agendamento.map((m) => `
  <div class="card">
    <div class="card-t"><span class="tag">${esc(m.letra)}</span> ${esc(m.nome)} <span>· ${esc(m.quando)}</span></div>
    <div class="bolha">${whats(m.texto)}</div>
    ${m.nota ? `<div class="nota">${esc(m.nota)}</div>` : ""}
  </div>`).join("");

const pos = posAgendamento.map((p) => `
  <div class="card">
    <div class="card-t">${esc(p.nome)} <span>· ${esc(p.quando)}</span></div>
    <div class="bolha">${whats(p.texto)}</div>
    ${p.nota ? `<div class="nota">${esc(p.nota)}</div>` : ""}
  </div>`).join("");

// Roteiro em dois blocos: dúvidas sobre a Food Guard e situações da conversa.
const DUVIDAS = ["Quanto custa?", "Quais são os planos? Qual a diferença?", "Isso é obrigatório?",
  "Quem é? De onde tirou meu número? É da Vigilância?", "O que vocês fazem exatamente?", "Quem vai vir?",
  "Com quem eu falo? É robô?", "Já tenho nutricionista", "Aqui é só delivery, isso vale para mim?",
  "Vocês atendem na minha região?", "Fui autuado / tenho prazo para regularizar"];
const cartao = (r) => `
  <div class="resp">
    <div class="gatilho">"${esc(r.gatilho)}"</div>
    <div class="bolha">${whats(r.texto)}</div>
    ${r.nota ? `<div class="nota">${esc(r.nota)}</div>` : ""}
  </div>`;
const respDuvidas = DUVIDAS.map((g) => respostas.find((r) => r.gatilho === g)).map(cartao).join("");
const respSituacoes = respostas.filter((r) => !DUVIDAS.includes(r.gatilho)).map(cartao).join("");
if (respostas.filter((r) => DUVIDAS.includes(r.gatilho)).length !== DUVIDAS.length) throw new Error("gatilho do roteiro não encontrado");

const linhasTeste = teste.map((t) => `<tr><td>${esc(t.p)}</td><td class="n">${t.a[0]}%</td><td class="n">${t.a[1]}%</td><td class="n forte">${t.d[0]}%</td><td class="n forte">${t.d[1]}%</td></tr>`).join("");

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>Plano de abordagem SDR · Food Guard</title>
<style>
@font-face{font-family:Sora;src:url(file://${MEDIA}/f3f7e95f2dbc4fe4-s.p.woff2) format('woff2');font-weight:100 900}
@font-face{font-family:Inter;src:url(file://${MEDIA}/e4af272ccee01ff0-s.p.woff2) format('woff2');font-weight:100 900}
@page { size: A4; margin: 14mm 13mm 15mm; }
:root{--navy:#0b1c34;--navy2:#16335c;--verde:#74b43c;--verdeE:#446e22;--verdeC:#f3faea;
  --ink:#1f2e3d;--muted:#5b6b7a;--linha:#dce5ed;--soft:#f2f6fa;--warn:#b85a14;--warn50:#fff7ed}
*{box-sizing:border-box}
body{margin:0;font-family:Inter,Helvetica,Arial,sans-serif;color:var(--ink);font-size:9.4pt;line-height:1.5}
h1,h2,h3,.msg-num,.capa .idx b{font-family:Sora,Inter,sans-serif}
.capa{height:266mm;display:flex;flex-direction:column;justify-content:space-between;background:var(--navy);
  color:#fff;padding:18mm 16mm;page-break-after:always}
.capa img{width:62mm}
.capa h1{font-size:27pt;line-height:1.12;font-weight:700;margin:0 0 6mm;letter-spacing:-.4pt}
.capa .sub{font-size:10.6pt;color:#c6d7e6;max-width:145mm;line-height:1.6;margin:0}
.capa .idx{font-size:9pt;color:#8fa8bf;line-height:1.85}
.capa .idx b{color:var(--verde)}
h2{font-size:12.5pt;font-weight:700;color:#fff;background:var(--navy2);padding:3mm 5mm;border-radius:2mm;margin:0 0 4mm}
h2 span{color:var(--verde)}
h3{font-size:10.4pt;color:var(--navy);margin:5mm 0 2mm}
section{margin:0 0 6mm}
.nova{page-break-before:always}
.junto{page-break-inside:avoid}
p{margin:0 0 3mm}
ul{margin:0 0 3mm;padding-left:5mm}li{margin:0 0 1.4mm}
.intro{background:var(--soft);border-left:1.2mm solid var(--verde);border-radius:2mm;padding:3.5mm 5mm;margin:0 0 5mm;color:var(--muted)}
.intro b{color:var(--ink)}
.regras{display:grid;grid-template-columns:1fr 1fr;gap:3mm}
.regra{border:.3mm solid var(--linha);border-radius:2.5mm;padding:3.5mm 4mm}
.regra b{display:block;color:var(--navy);font-size:9.8pt;margin-bottom:1mm}
.regra.forte{background:var(--navy);border-color:var(--navy);color:#c6d7e6}
.regra.forte b{color:var(--verde)}
.trilho{display:flex;align-items:stretch;gap:2mm;margin:4mm 0}
.etapa{flex:1;border-radius:2.5mm;padding:3mm;background:var(--soft);border:.3mm solid var(--linha);text-align:center}
.etapa .d{font-size:7.8pt;font-weight:700;color:var(--verdeE);text-transform:uppercase;letter-spacing:.06em}
.etapa .n{font-size:9.6pt;font-weight:700;color:var(--navy);margin-top:1mm}
.etapa.fim{background:#fdf2f2;border-color:#f3c9c9}.etapa.fim .d{color:#a32020}
.seta{display:flex;align-items:center;color:var(--verde);font-weight:800;font-size:12pt}
.ramo{margin-top:3mm;background:var(--verdeC);border:.3mm solid #cfe6ae;border-radius:2.5mm;padding:3.5mm 4.5mm}
.ramo b{color:var(--navy)}
.ramo .fluxo{display:flex;gap:2mm;flex-wrap:wrap;margin-top:2mm}
.ramo .fluxo span{background:#fff;border:.3mm solid #cfe6ae;border-radius:99mm;padding:1mm 3mm;font-size:8.4pt;font-weight:700;color:var(--verdeE)}
table{width:100%;border-collapse:collapse;font-size:8.7pt;margin:3mm 0}
th{text-align:left;padding:2.2mm 2.8mm;background:var(--navy);color:#fff;font-size:7.8pt;text-transform:uppercase;letter-spacing:.04em}
td{padding:2.2mm 2.8mm;border-bottom:.2mm solid var(--linha);vertical-align:top}
tr:nth-child(even) td{background:var(--soft)}
td.n{text-align:center;white-space:nowrap}td.forte{font-weight:700;color:var(--verdeE)}
tr.total td{font-weight:700;background:var(--verdeC)!important;color:var(--navy)}
.msg-cab{display:flex;gap:4mm;align-items:flex-start;margin-bottom:4mm}
.msg-num{flex:0 0 12mm;height:12mm;border-radius:99mm;background:var(--verde);color:var(--navy);font-weight:700;font-size:16pt;display:flex;align-items:center;justify-content:center}
.msg-quando{font-size:8.2pt;font-weight:700;color:var(--verdeE);text-transform:uppercase;letter-spacing:.07em}
.msg-nome{background:none;color:var(--navy);padding:0;margin:.5mm 0 1mm;font-size:16pt}
.msg-regra{color:var(--muted);margin:0}
.duas{display:flex;gap:5mm;align-items:flex-start}
.col-w{flex:0 0 84mm}.col-e{flex:1}
.canal{font-size:7.8pt;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin:0 0 1.5mm}
.notif{background:#1f2933;color:#e9eef3;border-radius:3.5mm;padding:3mm 4mm;font-size:8.8pt;line-height:1.45;margin-bottom:4mm}
.notif b{color:#fff}.notif-app{font-size:7pt;color:#9fb0c0;margin-bottom:1mm;text-transform:uppercase;letter-spacing:.06em}
.notif .ph{background:#4a3a20;color:#ffd79a}
.bolha{background:#e7f3dc;border:.25mm solid #b9d98c;border-radius:3mm;padding:3.5mm 4mm;font-size:9pt;line-height:1.6}
.semnome{font-size:8.4pt;color:var(--muted);margin-top:2.5mm;padding:2.5mm 3.5mm;border:.25mm dashed var(--linha);border-radius:2mm}
.semnome b{color:var(--ink)}
.shot{width:100%;border-radius:2mm;border:.3mm solid var(--linha)}
.ph{background:#fff1dc;color:#7a3a05;padding:0 .8mm;border-radius:.8mm;font-weight:700}
.card{margin:0 0 4mm;page-break-inside:avoid}.card-t{font-weight:700;color:var(--navy);margin-bottom:1.5mm}.card-t span{font-weight:400;color:var(--muted)}
.card-t .tag{display:inline-block;background:var(--verde);color:var(--navy);border-radius:99mm;padding:0 2.4mm;font-weight:700;margin-right:1mm}
.resp{page-break-inside:avoid;margin:0 0 3.5mm}
.gatilho{font-weight:700;color:var(--navy);font-size:9.6pt;margin-bottom:1.2mm}
.nota{font-size:8.4pt;color:var(--warn);background:var(--warn50);border-left:1mm solid var(--warn);border-radius:1.5mm;padding:2mm 3mm;margin-top:1.5mm}
.alerta{background:var(--warn50);border-left:1.2mm solid var(--warn);border-radius:2mm;padding:3.5mm 5mm;margin:3mm 0;color:#7a3a05}
.alerta b{color:#5c2a02}
.cols2{display:grid;grid-template-columns:1fr 1fr;gap:4mm}
.lado{display:flex;gap:5mm;align-items:flex-start}.lado>div{flex:1}
.check td:first-child{width:34%;font-weight:700;color:var(--navy)}
</style></head><body>

<div class="capa">
  <img src="file://${FONTE}/logo-email.png" alt="Food Guard">
  <div>
    <h1>Plano de abordagem<br>e follow-up do SDR</h1>
    <p class="sub">Três mensagens no máximo, uma comunicação só. O mesmo texto vai por WhatsApp ou por e-mail; muda só a embalagem. Toda conversa tem um objetivo: marcar a visita presencial e gratuita de um nutricionista.</p>
  </div>
  <div class="idx">
    <b>1.</b> O que mudou e por quê &nbsp;·&nbsp; <b>2.</b> As regras &nbsp;·&nbsp; <b>3.</b> A cadência<br>
    <b>4.</b> As três mensagens, no WhatsApp e no e-mail<br>
    <b>5.</b> Quando a pessoa responde &nbsp;·&nbsp; <b>6.</b> Depois de marcada &nbsp;·&nbsp; <b>7.</b> Roteiro do SDR<br>
    <b>8.</b> Funciona por e-mail? &nbsp;·&nbsp; <b>9.</b> Operação do WhatsApp<br>
    <b>10.</b> Rotina e números &nbsp;·&nbsp; <b>11.</b> Para você aprovar<br><br>
    Versão 2 para aprovação · outubro de 2026
  </div>
</div>

<section>
<h2><span>1 ·</span> O que mudou e por quê</h2>
<div class="intro">Antes de te mandar, testei a sequência com <b>seis donos de operação simulados</b>, cada um com um perfil real da nossa lista, e com <b>quatro especialistas</b> (SDR, redator de resposta direta, ex-gerente de operações de restaurante e especialista em entrega de e-mail). Depois reescrevi, os mesmos seis leram de novo sem saber o que tinha mudado, e uma última rodada conferiu fatos e legislação, as suas regras e a naturalidade do texto. É simulação: serve para apontar direção, não substitui o primeiro mês de envio real.</div>
<table>
<tr><th style="width:46%">Perfil simulado</th><th colspan="2" style="text-align:center">Primeira versão</th><th colspan="2" style="text-align:center">Versão revisada</th></tr>
<tr><td></td><td class="n"><b>Responde</b></td><td class="n"><b>Marca</b></td><td class="n"><b>Responde</b></td><td class="n"><b>Marca</b></td></tr>
${linhasTeste}
<tr class="total"><td>Média</td><td class="n">${media("a", 0)}%</td><td class="n">${media("a", 1)}%</td><td class="n">${media("d", 0)}%</td><td class="n">${media("d", 1)}%</td></tr>
</table>
<h3>O que o teste mostrou</h3>
<ul>
<li><b>A notificação decide.</b> Só a primeira linha aparece na tela. Na primeira versão ela era "aqui é da Food Guard, assessoria…", e todos leram como vendedor antes de abrir. Agora a primeira linha é a pergunta, com o nome da casa.</li>
<li><b>A visita aparecia tarde demais.</b> Só a mensagem 3 falava da visita gratuita, e ela é a menos lida. Agora a visita entra já na 2.</li>
<li><b>Resposta que ignora a pergunta soa robô.</b> Quem perguntou preço ou contou que foi autuado e recebeu texto pronto quase desistiu. Regra nova: primeiro responde o que a pessoa disse, depois puxa a visita.</li>
<li><b>Preço escondido parece armadilha.</b> No teste, quem perguntou o preço e não teve resposta desconfiou. Pela sua decisão, a resposta é "depende da operação": a visita é gratuita e o plano é montado para cada modelo de negócio. Os valores continuam públicos no site, em /planos.</li>
<li><b>Detalhe de robô derruba tudo:</b> nome errado, "o Padaria", "restaurante" para quem é padaria, "responda VISITA" em maiúsculas, "pode responder só com sim, não ou não sei". Tudo isso saiu.</li>
<li><b>Os números da tabela são da versão revisada.</b> A versão final mudou depois disso, com a checagem e com a sua revisão (seção 1, abaixo), e não foi testada de novo.</li>
</ul>
<div class="alerta"><b>O que o texto não resolve.</b> Os seis donos disseram a mesma coisa: o que mais faz responder é indicação de alguém conhecido, alguém passar no balcão ou o nome de uma pessoa de verdade. A mensagem converte melhor quem já sente a dor (autuado, com medo da fiscalização, operação nova). Para os desconfiados, o caminho é indicação e visita de balcão, que ficam como canais complementares.</div>
<h3>O que mudou com a sua revisão</h3>
<!--trava:ignora--><table>
<tr><th style="width:30%">Ponto</th><th>Como ficou</th></tr>
<tr><td><b>Quem somos</b></td><td>"Food Guard, consultoria nutricional para serviços de alimentação", em todas as mensagens, na assinatura do e-mail e no perfil do WhatsApp. "Empresa de nutricionistas" e "assessoria de nutricionistas" saíram de tudo, e o gerador agora se recusa a montar o material se alguma dessas expressões voltar.</td></tr>
<tr><td><b>Primeira mensagem</b></td><td>Mantém a pergunta do Manual na abertura e ganha o que faltava: quem é a Food Guard, o que ela faz e o link do diagnóstico gratuito, para quem quiser conhecer antes. O diagnóstico coloca o lead no funil com dados mais completos.</td></tr>
<tr><td><b>Fechamento</b></td><td>Saiu o "fica melhor [dia] ou [dia], por volta das [hora]?". Agora as respostas fecham com "Que dia e horário ficam melhores para a visita?".</td></tr>
<tr><td><b>Duração da visita</b></td><td>Não aparece em nenhuma mensagem, nem "não precisa parar a operação". Se a pessoa quiser saber, ela pergunta.</td></tr>
<tr><td><b>Operação, não cozinha</b></td><td>O nutricionista "conhece a operação com você".</td></tr>
<tr><td><b>Preço</b></td><td>"Depende da operação." A visita é gratuita e o plano é montado para cada modelo de negócio.</td></tr>
<tr><td><b>Tom</b></td><td>Mais comercial e amigável nas respostas, sem frase de roteiro.</td></tr>
</table><!--/trava-->
</section>

<section class="nova">
<h2><span>2 ·</span> As regras</h2>
<div class="regras">
  <div class="regra forte"><b>Objetivo único</b>Toda conversa existe para marcar a visita presencial de um nutricionista. Nenhuma outra chamada concorre com essa.</div>
  <div class="regra forte"><b>A visita é sempre gratuita</b>Sem custo e sem compromisso, em todas as mensagens e em todas as respostas.</div>
  <div class="regra"><b>Quem assina é a empresa</b>Food Guard ou Equipe Food Guard. Nunca o nome de uma pessoa.</div>
  <div class="regra"><b>Uma comunicação, qualquer canal</b>O texto do WhatsApp e o do e-mail são o mesmo. No e-mail entram assunto, assinatura com logo e rodapé.</div>
  <div class="regra"><b>Sem resposta: no máximo três</b>Terça, sexta e terça seguinte. Depois disso, encerra e o lead sai da lista.</div>
  <div class="regra"><b>Respondeu: sai da cadência</b>Responde primeiro o que a pessoa disse e fecha perguntando o melhor dia e horário para a visita.</div>
</div>
<h3>Como preencher os campos (a mesclagem)</h3>
<table>
<tr><th style="width:24%">Campo</th><th>Regra</th></tr>
<tr><td><b>[Nome]</b></td><td>Só com o nome do dono confirmado (resposta dele no Google Maps, Instagram, site). Sem nome, a mensagem abre sem vocativo. Nunca mandar com colchete, vazio ou com o nome da casa no lugar do nome da pessoa.</td></tr>
<tr><td><b>[Estabelecimento]</b></td><td>O nome que o dono usa: "Sabor da Vila", e não "Restaurante e Pizzaria Sabor da Vila - Marmitex 24h". Ajuste "do/da" e "no/na" na hora: "da Rainha de São Lucas".</td></tr>
<tr><td><b>[origem]</b></td><td>Onde o contato foi achado de verdade: Google Maps, Instagram, site ou "com a [nome] da equipe de vocês". Quatro dos seis donos perguntaram de onde veio o número.</td></tr>
<tr><td><b>[dia] [hora]</b></td><td>O dia e o horário que a pessoa escolheu. Ao confirmar, prefira fora do pico: restaurante e self-service à tarde, entre o almoço e o jantar; padaria no começo da tarde; delivery de manhã, antes de abrir.</td></tr>
</table>
</section>

<section class="junto">
<h2><span>3 ·</span> A cadência</h2>
<div class="trilho">
  <div class="etapa"><div class="d">Terça</div><div class="n">1 · Primeiro contato</div></div>
  <div class="seta">→</div>
  <div class="etapa"><div class="d">Sexta</div><div class="n">2 · Segundo contato</div></div>
  <div class="seta">→</div>
  <div class="etapa"><div class="d">Terça seguinte</div><div class="n">3 · Última tentativa</div></div>
  <div class="seta">→</div>
  <div class="etapa fim"><div class="d">Sem resposta</div><div class="n">Encerra · sai da lista</div></div>
</div>
<div class="ramo">
  <b>Respondeu em qualquer momento?</b> Sai da cadência e segue este caminho:
  <div class="fluxo"><span>4a ou 4b · em até 5 min</span><span>→ 5 · escolheu o dia</span><span>→ Confirmação</span><span>→ Lembrete na véspera</span><span>→ Visita</span></div>
</div>
<table>
<tr><th style="width:22%">Canal</th><th style="width:40%">Quando usar</th><th style="width:38%">Horário de envio</th></tr>
<tr><td><b>WhatsApp</b></td><td>Canal principal, sempre que houver número</td><td>Terça a sexta, das 14h30 às 17h. Nunca no almoço nem no jantar</td></tr>
<tr><td><b>E-mail</b></td><td>Só para quem não tem WhatsApp que funcione</td><td>Terça a sexta, das 14h30 às 17h, um a um e espaçado</td></tr>
</table>
<div class="alerta"><b>Um canal por lead.</b> O mesmo texto pelos dois canais no mesmo dia soa robô e vira seis toques. Uma coluna única de status na planilha garante que qualquer resposta, em qualquer canal, encerre os dois. Mensagem automática do WhatsApp Business (saudação, cardápio) não conta como resposta.</div>
</section>

${paginasMsg}

<section class="nova">
<h2><span>5 ·</span> Quando a pessoa responde</h2>
<div class="intro"><b>Antes do texto-base, uma ou duas frases respondem o que a pessoa perguntou ou contou.</b> Perguntou preço, responde. Contou que foi autuada, reconhece isso. Depois vem a visita gratuita e o fechamento: "Que dia e horário ficam melhores para a visita?". Para quem ainda quer conhecer antes, o diagnóstico gratuito do site entra como segunda opção.</div>
${resp4}
</section>

<section class="nova">
<h2><span>6 ·</span> Depois de marcada</h2>
<div class="intro">Visita marcada ainda não é visita feita. Confirmação e lembrete são o que derruba a falta. No e-mail, é aqui que entra o layout completo da marca: a pessoa já respondeu e marcou, então o visual de empresa passa confiança em vez de cara de propaganda.</div>
<div class="lado">
  <div>${pos}</div>
  <div><div class="canal">E-mail de confirmação</div><img class="shot" src="file://${PREVIEW}/email-confirmacao.png" alt=""></div>
</div>
</section>

<section class="nova">
<h2><span>7 ·</span> Roteiro do SDR</h2>
<div class="intro"><b>Responda em até 5 minutos</b> no horário comercial, sempre por texto, começando pelo que a pessoa disse, com tom de conversa e não de roteiro. Quase toda resposta fecha puxando a visita. As exceções são a recusa, que se respeita na hora, e os pedidos que mudam o caminho (ligar, mandar por e-mail, falar com o responsável, voltar daqui a um mês).</div>
<h3>Dúvidas sobre a Food Guard e a visita</h3>
<div class="cols2">${respDuvidas}</div>
<h3>Situações da conversa</h3>
<div class="cols2">${respSituacoes}</div>
</section>

<section class="nova">
<h2><span>8 ·</span> Funciona por e-mail?</h2>
<div class="intro"><b>O texto funciona. O e-mail como canal é fraco para esse público, e o formato muda.</b> Nenhum dos seis donos simulados responderia o primeiro e-mail; na versão revisada, uma responderia. Quem lê o e-mail do restaurante costuma ser o contador ou o escritório, no meio de boleto e nota do iFood. O e-mail fica como canal secundário, para quem não tem WhatsApp.</div>
<h3>Por que o e-mail de prospecção não leva o layout de newsletter</h3>
<p>Logo grande no topo, faixa colorida, título e botões são exatamente o padrão que o Gmail manda para a aba Promoções, onde ninguém responde contato frio. Os quatro especialistas concordaram nisso. Por isso o e-mail de prospecção tem cara de e-mail escrito por alguém: fundo branco, texto corrido e a marca na assinatura, com logo e cores. O layout completo da marca vai onde funciona: no e-mail de confirmação da visita (seção 6) e, depois, na newsletter de conteúdo.</p>
<h3>Antes do primeiro envio</h3>
<table class="check">
<tr><th>Item</th><th>O que fazer</th></tr>
<tr><td>Domínio separado</td><td>Prospecção nunca sai do foodguardassessoria.com.br nem pelo Resend. Esse domínio entrega os relatórios do diagnóstico, e denúncia de spam de lista fria derruba a entrega deles. O Resend também proíbe envio para lista sem consentimento, então a conta pode ser suspensa. Registrar um domínio só para prospecção (um .com.br custa R$ 40 por ano no Registro.br).</td></tr>
<tr><td>Caixa de verdade</td><td>Uma caixa no Google Workspace nesse domínio, com remetente "Food Guard" &lt;contato@…&gt;. Nunca "noreply".</td></tr>
<tr><td>Autenticação</td><td>SPF, DKIM e DMARC configurados no DNS do domínio novo. Eu te passo os registros quando o domínio existir.</td></tr>
<tr><td>Aquecimento</td><td>Duas a três semanas de uso leve antes da prospecção. Depois, no máximo 20 a 30 e-mails novos por dia.</td></tr>
<tr><td>Lista limpa</td><td>Conferir os endereços antes de enviar. Mais de 2% de e-mail inexistente queima um domínio novo.</td></tr>
<tr><td>Sem rastreio</td><td>Sem pixel de abertura e sem rastreio de clique. Os dois pesam contra no filtro.</td></tr>
<tr><td>Assinatura</td><td>Instalar a assinatura com logo no Gmail (arquivo assinatura-email.html), subindo a imagem pelo editor, e não por link.</td></tr>
<tr><td>Mensagens 2 e 3</td><td>Saem como resposta no mesmo fio ("Re:"), com o e-mail anterior citado embaixo. Nunca como e-mail novo.</td></tr>
</table>
</section>

<section class="junto">
<h2><span>9 ·</span> Operação do WhatsApp</h2>
<table class="check">
<tr><th>Item</th><th>O que fazer</th></tr>
<tr><td>Número dedicado</td><td>Recomendo um número só para prospecção. Mensagem fria gera bloqueio e denúncia, e o WhatsApp restringe o número. Se for o (11) 97646-6553, que está no site, a Food Guard perde também o canal dos leads que chegam sozinhos.</td></tr>
<tr><td>Perfil completo</td><td>WhatsApp Business com logo, nome "Food Guard", descrição "Consultoria nutricional para serviços de alimentação em São Paulo. Não somos órgão público.", site, CNPJ e horário. O dono toca no perfil antes de responder.</td></tr>
<tr><td>Volume e ritmo</td><td>20 a 30 conversas novas por dia, digitadas uma a uma. Nada de disparador em massa. Se aparecerem bloqueios, pausa o dia.</td></tr>
<tr><td>Horário</td><td>Terça a sexta, das 14h30 às 17h. Segunda tem muita cozinha fechada; almoço e jantar enterram a mensagem.</td></tr>
</table>
</section>

<section class="junto">
<h2><span>10 ·</span> Rotina e números</h2>
<h3>A planilha do SDR, uma linha por lead</h3>
<table>
<tr><th>Estabelecimento</th><th>Contato</th><th>Canal</th><th>Msg 1</th><th>Msg 2</th><th>Msg 3</th><th>Resposta</th><th>Visita</th><th>Status</th></tr>
<tr><td>Nome limpo, tipo e bairro</td><td>Nome confirmado e número</td><td>Whats ou e-mail</td><td>data</td><td>data</td><td>data</td><td>o que disse</td><td>data e hora</td><td>em cadência · respondeu · retorno em [data] · agendado · encerrado · descadastrado</td></tr>
</table>
<h3>Os três números de toda sexta</h3>
<table>
<tr><th style="width:38%">Métrica</th><th style="width:20%">Meta inicial</th><th style="width:42%">Se estiver abaixo, olhe para</th></tr>
<tr><td>Taxa de resposta</td><td>15% a 25%</td><td>A primeira linha, a mesclagem e o horário de envio</td></tr>
<tr><td>Resposta que vira visita marcada</td><td>40% ou mais</td><td>A velocidade da resposta e se o SDR responde o que foi perguntado</td></tr>
<tr><td>Falta na visita marcada</td><td>Abaixo de 10%</td><td>Confirmação e lembrete na véspera</td></tr>
</table>
<p style="color:var(--muted)">As metas são ponto de partida. Depois das primeiras 100 conversas, a gente troca pelo número real.</p>
</section>

<section class="nova">
<h2><span>11 ·</span> Para você aprovar</h2>
<div class="alerta"><b>Antes do primeiro envio: consultar o CRN-3 sobre a visita gratuita.</b> A checagem final achou um risco para o nutricionista, não para a empresa: o Código de Ética do nutricionista (Resolução CFN 599/2018, art. 57) proíbe usar "promoções" de serviços como forma de propaganda, e uma avaliação gratuita oferecida em prospecção pode ser enquadrada aí. É uma leitura possível, não uma certeza; não achei parecer do CRN sobre visita de pré-venda. Recomendo pedir uma orientação por escrito ao CRN-3 descrevendo a visita como etapa comercial da Food Guard e guardar a resposta. Se pedirem ajuste, a visita continua gratuita e só muda o nome, por exemplo "visita de avaliação, sem custo, para montar a proposta".</div>
<table>
<tr><th style="width:30%">Ponto</th><th style="width:70%">O que escrevi, e o que precisa da sua confirmação</th></tr>
<tr><td><b>As três mensagens e as respostas</b></td><td>Seções 4 a 7. É o texto que vai para o WhatsApp e para o e-mail.</td></tr>
<tr><td><b>"O que ele vê fica entre você e a Food Guard"</b></td><td>Foi a frase que mais baixou a guarda dos donos simulados. Escrevi "entre você e a Food Guard", e não "fica só com você", porque o nutricionista leva o que viu para a empresa montar a proposta e o sigilo profissional tem exceção legal. Ela é um compromisso: só pode ficar se for prática da Food Guard não repassar a ninguém de fora.</td></tr>
<tr><td><b>Link na primeira mensagem</b></td><td>Pedido seu, e faz sentido para o funil. Dois cuidados: link vindo de número desconhecido aumenta um pouco a chance de denúncia no WhatsApp, então vale acompanhar os bloqueios na primeira semana. E hoje o diagnóstico não registra de onde o lead veio; o SDR confere pelo telefone na base. Se quiser que a origem "prospecção" fique registrada sozinha, é um ajuste pequeno no site, que eu faço quando você pedir.</td></tr>
<tr><td><b>Preço na resposta</b></td><td>Como você pediu: "depende da operação", a visita é gratuita e o plano é montado para cada modelo de negócio. Se a pessoa insistir nos valores, o SDR manda o link de /planos, onde eles já estão públicos.</td></tr>
<tr><td><b>Quem vai na visita</b></td><td>Todos os donos simulados perguntaram "quem vem?". Hoje a confirmação diz "um nutricionista da Food Guard". Se quiser, a confirmação passa a levar o nome e o CRN de quem vai. As mensagens de prospecção continuam assinadas pela empresa.</td></tr>
<tr><td><b>Lead autuado</b></td><td>Quem foi autuado recebe os dois primeiros horários livres da agenda, mesmo que tirem outra visita do lugar. É o lead que mais converte.</td></tr>
<tr><td><b>Número de WhatsApp</b></td><td>Recomendo um número só para prospecção (seção 9). A decisão é sua.</td></tr>
<tr><td><b>Domínio de e-mail</b></td><td>Se o e-mail for usado, precisa de domínio e caixa próprios (seção 8). Sem isso, recomendo só WhatsApp por enquanto.</td></tr>
<tr><td><b>Layout do e-mail</b></td><td>Prospecção com cara de e-mail pessoal e marca na assinatura; layout completo na confirmação. Se preferir o layout completo também no primeiro e-mail, dá para trocar, sabendo que ele tende a cair em Promoções.</td></tr>
<tr><td><b>Visita gratuita nos materiais antigos</b></td><td>A apresentação para o Renan e o PDF de prospecção ainda falam da Visita Diagnóstica de R$ 490. Atualizo depois que você aprovar este plano.</td></tr>
</table>
</section>

</body></html>`;

// O quadro "O que mudou" cita as expressões que saíram; o resto do documento passa pela trava.
const texto = html.replace(/<!--trava:ignora-->[\s\S]*?<!--\/trava-->/g, "").replace(/<[^>]+>/g, " ");
travar([[texto, "plano-sdr.html"]]);
fs.writeFileSync(path.join(OUT, "plano-sdr.html"), html);
console.log("documento gerado");
