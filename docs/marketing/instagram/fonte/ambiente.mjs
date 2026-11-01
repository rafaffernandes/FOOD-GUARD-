// Caminhos que mudam de uma sessão para outra. O Chromium pré-instalado muda de versão
// quando o ambiente é recriado (chromium-1194, chromium-1243...), então procura o mais novo
// em vez de fixar.
import fs from "node:fs";
import path from "node:path";

const RAIZ = "/opt/pw-browsers";
export const CHROME = process.env.CHROME_PATH || fs.readdirSync(RAIZ)
  .filter((d) => /^chromium-\d+$/.test(d))
  .sort((a, b) => b.split("-")[1] - a.split("-")[1])
  .flatMap((d) => ["chrome-linux64", "chrome-linux"].map((s) => `${RAIZ}/${d}/${s}/chrome`))
  .find((p) => fs.existsSync(p));
if (!CHROME) throw new Error(`Chromium não encontrado em ${RAIZ}`);

// Fontes da marca (Sora e Inter), guardadas no repositório: antes vinham do .next, que
// uma sessão nova não tem. Os nomes são os que o next/font gera, e o CSS usa esses nomes.
export const FONTES = path.join(path.dirname(new URL(import.meta.url).pathname), "../../fontes");
