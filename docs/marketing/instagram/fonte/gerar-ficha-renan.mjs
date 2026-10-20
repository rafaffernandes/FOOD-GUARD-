// Ficha de conferência técnica para o Renan: o que abrir, em qual norma, e o que decidir.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const FONTE = path.dirname(new URL(import.meta.url).pathname);
const OUT = path.join(FONTE, "..");
const css = fs.readFileSync(path.join(FONTE, "doc.css"), "utf8").replaceAll("url(MEDIA/", "url(file:///home/user/FOOD-GUARD-/.next/static/media/");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const decisoes = [
  ["Cocção na capital: 70 °C ou 74 °C?", "O post diz 70 °C em todas as partes do alimento (RDC 216) e avisa que a Portaria pode ter exigência própria. Buscas independentes sugerem que a Portaria 2.619 pede 74 °C, com combinações como 70 °C por 2 min ou 65 °C por 15 min, e 74 °C no reaquecimento. Ninguém conseguiu abrir o texto oficial.", "Abrir o item de tratamento térmico e o de reaquecimento da Portaria 2.619 consolidada. Se for 74 °C, o post, o slide 3 e o item 55 do checklist mudam."],
  ["Norma estadual: citar ou não?", "A Grande SP não é regida pela Portaria 2.619, que é da capital. Há notícias de uma norma estadual de boas práticas nova (CVS 3/2026, vigência divergente nas fontes) no lugar da CVS 5/2013. Pela regra de marca, só citamos RDC 216 e Portaria 2.619. O post apenas avisa que o município ou o estado podem ter regra própria.", "Decidir com o Rafael: manter assim, ou abrir uma exceção e citar a estadual com a ressalva de vigência."],
  ["O que o diagnóstico mede", "As 5 perguntas do diagnóstico são tipo de operação, nutricionista, documentação, fiscalização anterior e treinamento. Nenhuma é sobre temperatura. O post já descreve assim e atribui a temperatura ao checklist e à visita.", "Confirmar que a descrição está correta e honesta."],
];

const linhas = [
  ["Comida quente: acima de 60 °C por no máximo 6 h", "RDC 216", "Post, slide 2", "Confirmar 'acima de' (e não 'igual ou acima de') e o item."],
  ["Resfriamento: de 60 °C a 10 °C em até 2 h; depois abaixo de 5 °C, ou -18 °C ou menos", "RDC 216", "Post, slide 4", "Uma fonte descreve outra curva (60 a 21 °C em 2 h, 21 a 5 °C em 4 h). Pode ser da norma estadual. Conferir qual é a da RDC 216."],
  ["Cocção: 70 °C em todas as partes, ou combinação de tempo e temperatura equivalente", "RDC 216", "Post, slide 3", "Ver a decisão 1."],
  ["Descongelamento: abaixo de 5 °C, ou micro-ondas com cocção imediata", "RDC 216", "Post", "Confirmar o texto."],
  ["Refrigerado: abaixo de 5 °C. Prazo de 5 dias a 4 °C ou menos; entre 4 e 5 °C, prazo menor", "RDC 216", "Post", "Confirmar 'abaixo de 5 °C', os 5 dias e a redação sobre o prazo menor."],
  ["Verificar a temperatura na recepção e no armazenamento", "RDC 216", "Post", "Confirmar o item. A numeração varia entre cópias."],
  ["Recebimento: congelados até -12 °C; pescado cru resfriado até 3 °C; carnes cruas resfriadas até 7 °C", "Portaria 2.619 (item 5.7, segundo roteiros da Prefeitura)", "Post, slide 5", "Conferir no texto consolidado e se as alterações de 2019 e 2024 mudaram algum valor. A faixa de 0 a 3 °C do pescado só aparece na lista de culinária japonesa."],
  ["Registro regular da temperatura do alimento preparado e dos equipamentos de exposição, sem número fixo de medições", "RDC 216", "Post, slide 6", "A frase vem de trecho de prova de concurso. Confirmar o item e se a RDC realmente não fixa frequência."],
  ["Frequência de registro: 2 vezes ao dia nos equipamentos de refrigeração, a cada 2 h nos pratos expostos", "Portaria 2.619 ou norma estadual?", "Removido do post", "Três buscas atribuem esses números à CVS 5/2013 (estadual). Se existirem na Portaria 2.619, podem voltar com o item."],
  ["Exposição de alimento frio: até 10 °C por 4 h, ou 10 a 21 °C por 2 h", "Portaria 2.619 ou norma estadual?", "Removido do post", "Mesma dúvida. Hoje o post manda perguntar à vigilância local."],
  ["Limites de armazenamento nos roteiros da Prefeitura (carnes 4 °C, pescado 2 °C?)", "Roteiro de inspeção de restaurantes (Prefeitura)", "Post só avisa que pode ser menor que 4 °C", "Se confirmar, vale citar o roteiro pelo nome, com os números."],
  ["Reaquecimento", "RDC 216 e Portaria", "Fora do post, e o post avisa", "Dizer qual é a regra, para entrar numa próxima peça."],
  ["Óleo de fritura, 180 °C", "RDC 216", "Fora do post", "Uma fonte confirma 180 °C, outra cita outro valor. Confirmar antes de usar."],
  ["Links para os textos oficiais (Anvisa e Prefeitura)", "-", "Post, seção 'Onde conferir'", "Abrir os dois links e ver se carregam e se mostram a versão atualizada."],
];

const rotina = [
  "Anotar a hora em que a preparação foi para o balcão.",
  "Medir o balcão em intervalos curtos, como a cada 2 horas, e anotar.",
  "Imprimir o limite no formulário e anotar o número medido, em vez de 'ok'.",
  "Deixar um campo para a ação corretiva e definir quem mede e quem confere.",
  "Dividir a preparação em recipientes menores e rasos para esfriar dentro das 2 horas.",
];

const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Conferência técnica · post de temperatura</title><style>${css}
body{padding:0} .topo{background:var(--navy);color:#fff;padding:9mm 10mm;border-radius:3mm;margin-bottom:6mm}
.topo h1{font-size:19pt;margin:0 0 2mm}.topo p{margin:0;color:#c6d7e6}
td{font-size:8.4pt} th{font-size:7.4pt}
</style></head><body>
<div class="topo"><h1>Conferência técnica: post de temperatura</h1>
<p>Para o Renan. O post e o carrossel de sábado, 17/10, às 18h, só vão ao ar depois da sua conferência. Os números vieram de buscas na internet, porque o texto oficial das normas não pôde ser aberto por quem escreveu. Esta ficha lista o que abrir e o que decidir.</p></div>

<h2><span>1 ·</span> Três decisões</h2>
${decisoes.map(([t, s, a]) => `<div class="ramo-card"><div class="sit">${esc(t)}</div><p>${esc(s)}</p><div class="prox"><b>O que fazer:</b> ${esc(a)}</div></div>`).join("")}

<section class="nova"><h2><span>2 ·</span> O que conferir, afirmação por afirmação</h2>
<p style="color:var(--muted)">Para cada linha: abrir a norma indicada, ver se o número e a redação batem, e marcar "ok" ou "corrigir".</p>
<table><tr><th style="width:34%">Afirmação</th><th style="width:15%">Norma</th><th style="width:13%">Onde aparece</th><th>O que conferir</th><th style="width:7%">Ok?</th></tr>
${linhas.map(([a, n, o, c]) => `<tr><td>${esc(a)}</td><td>${esc(n)}</td><td>${esc(o)}</td><td>${esc(c)}</td><td></td></tr>`).join("")}</table>

<h2><span>3 ·</span> Dicas de rotina que a Food Guard sugere</h2>
<p>No post e no carrossel elas aparecem marcadas como "sugestão da Food Guard", e não como exigência da norma. Aprovar, ajustar ou tirar:</p>
<ul>${rotina.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
<div class="alerta"><b>Prazo.</b> Para sair no sábado às 18h, a resposta precisa chegar até o meio-dia. Se não der tempo, o post vai para a semana seguinte, sem prejuízo.</div>
</section></body></html>`;
fs.writeFileSync(path.join(OUT, "ficha-renan-temperatura-rascunho.html"), html);
execFileSync("/opt/pw-browsers/chromium-1194/chrome-linux/chrome", ["--headless", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=4000", `--print-to-pdf=${path.join(OUT, "ficha-renan-temperatura-rascunho.pdf")}`, `file://${path.join(OUT, "ficha-renan-temperatura-rascunho.html")}`], { stdio: "ignore" });
console.log("ficha gerada");
