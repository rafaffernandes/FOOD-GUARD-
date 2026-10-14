// Trava de marca. O gerar.mjs e o doc.mjs passam todo texto por aqui e param
// com erro se aparecer algo que a Food Guard decidiu não dizer.

const PROIBIDO = [
  // Posicionamento: a Food Guard é consultoria nutricional para serviços de
  // alimentação (food service). Nunca empresa ou assessoria "de nutricionistas".
  [/empresa (particular )?de nutricionistas/i, "a Food Guard não é \"empresa de nutricionistas\""],
  [/assessoria de nutricionistas/i, "a Food Guard não é \"assessoria de nutricionistas\""],
  [/nutricionistas que cuidam/i, "posicionamento errado: use \"consultoria nutricional para serviços de alimentação\""],
  [/somos (uma equipe de )?nutricionistas/i, "posicionamento errado: use \"consultoria nutricional para serviços de alimentação\""],
  [/(^|[^a-z])nutricionistas para servi[cç]os/im, "posicionamento errado: use \"consultoria nutricional para serviços de alimentação\""],
  [/empresa particular/i, "posicionamento errado: use \"consultoria nutricional para serviços de alimentação\""],
  // Visita: não se fala em duração nem em parar a operação.
  [/\buma hora\b|\bminutos de visita|leva cerca de/i, "não mencionar quanto tempo a visita leva"],
  [/parar a opera[cç][aã]o|não para a opera[cç][aã]o|sem atrapalhar/i, "não falar em parar ou atrapalhar a operação"],
  // Fechamento antigo, que soava robô.
  [/fica melhor \[dia\] ou \[dia\]/i, "fechamento antigo: use a pergunta pelo melhor dia e horário"],
  // Voz da marca (CLAUDE.md).
  [/\bRT\b/, "nunca \"RT\": use \"nutricionista responsável\""],
  [/CFN 600/i, "nunca citar \"CFN 600\""],
  [/car[eê]ncia/i, "nunca \"carência\""],
  [/dinheiro de volta/i, "nunca \"dinheiro de volta\""],
];

export function conferir(texto, onde) {
  const erros = PROIBIDO.filter(([re]) => re.test(texto)).map(([, motivo]) => `${onde}: ${motivo}`);
  return erros;
}

export function travar(lista) {
  const erros = lista.flatMap(([texto, onde]) => conferir(texto, onde));
  if (erros.length) {
    console.error(`Trava de marca: ${erros.length} problema(s)\n- ${erros.join("\n- ")}`);
    process.exit(1);
  }
}
