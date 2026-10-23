# Rotina de segunda-feira: conteúdo da semana para aprovação

Roda toda segunda, perto do meio-dia (horário de Brasília), numa sessão nova. Objetivo:
mandar ao Rafael e ao Renan, por e-mail, os dois posts da semana (blog e Instagram) para
aprovação. **Esta rotina nunca publica nada e nunca envia nada para a `main`.**

## Destinatários

- rafael.andes2@gmail.com
- reeh_rizzo@hotmail.com (Renan, nutricionista, faz a curadoria técnica)

## Passo a passo

1. Trabalhe na branch `claude/charming-allen-Nc7aL`:
   `git fetch origin claude/charming-allen-Nc7aL && git checkout claude/charming-allen-Nc7aL && git pull`.
   Se o repositório não estiver na sessão, adicione `rafaffernandes/FOOD-GUARD-` e clone antes.
   Rode `npm install` se `node_modules` não existir (o gerador de imagens usa `sharp`).
2. Datas da semana: a quarta e o sábado desta semana, às 18h.
3. Pautas: em `docs/marketing/instagram/pautas.json`, pegue as duas primeiras com status
   `pendente`, na ordem. Não use `aguarda_renan`.
4. Produção: rode o workflow salvo em `docs/marketing/instagram/fonte/workflow-posts-da-semana.js`
   (Workflow com `scriptPath`), com `args` no formato
   `{ "posts": [{ "chave": "quarta-DD-MM", "dia": "quarta-feira, DD/MM/AAAA", "tema": ..., "angulo": ... }, { sábado igual }], "existentes": [títulos de content/blog e docs/rascunhos-blog] }`.
   Ele escreve, revisa tecnicamente e devolve o post final, o carrossel, a ficha do Renan e as decisões.
5. Montagem: grave o resultado em `docs/marketing/instagram/fonte/semana-AAAA-MM-DD.json`
   (data da segunda), um item por post com `chave`, `data` (AAAA-MM-DD), `dir`
   (`quarta-AAAA-MM-DD` / `sabado-AAAA-MM-DD`), `quando` ("quarta-feira, DD/MM, às 18h") e
   `pacote` (`aprovacao-semana-AAAA-MM-DD.pdf`). Depois rode, a partir de
   `docs/marketing/instagram/fonte/`:
   - `node montar-semana.mjs semana-AAAA-MM-DD.json`
   - `node gerar-pacote.mjs semana-AAAA-MM-DD.json ../aprovacao-semana-AAAA-MM-DD.pdf`
   Confira o mosaico de cada carrossel (texto cortado ou encostando no rodapé).
6. Pautas usadas: troque o status para `enviada para aprovação` e anote a data.
7. Commit e push **só na branch** (`git push -u origin claude/charming-allen-Nc7aL`).
8. E-mail: `node gerar-email-aprovacao.mjs semana-AAAA-MM-DD.json ../email-aprovacao-semana-AAAA-MM-DD.html`.
   O repositório é privado, então o e-mail não aponta para o GitHub: capa e mosaico vão
   embutidos, e PDFs e slides vão anexados (lista em `email-aprovacao-semana-AAAA-MM-DD.html.anexos.json`,
   que o envio lê sozinho; commite junto). Confira no resumo do gerador se o total fica abaixo de 20 MB. Envie com
   `node enviar-email-aprovacao.mjs ../email-aprovacao-semana-AAAA-MM-DD.html "Food Guard · Conteúdo da semana para aprovação (quarta DD/MM e sábado DD/MM)"`.
   O envio é pelo Resend. A chave fica num segredo de rede do ambiente (host `api.resend.com`):
   o proxy coloca a chave na requisição, ela não aparece na sessão e não está em variável de
   ambiente. O e-mail vai para o Rafael e para o Renan, e as respostas voltam para o Rafael.
   Não teste a chave com outros endpoints (como `/domains`): uma chave só de envio responde 401
   `restricted_api_key` a eles, e isso não é falha. O teste é o próprio envio.
9. Registro: o script grava cada tentativa em `docs/marketing/instagram/envios.log`. Sempre
   faça commit e push desse arquivo na branch, com sucesso ou com erro. Se o envio falhar
   (`missing_api_key` é chave ausente; erro de conexão é rede), não tente outro caminho.

## Configuração (uma vez, feita pelo Rafael)

No Claude, setinha ao lado do título da sessão → **Editar ambiente na nuvem** → **Segredos de
rede** → **Adicionar segredo**: tipo **Bearer**, nome `Resend Food Guard`, site permitido
`api.resend.com`, cabeçalho `Authorization` com prefixo `Bearer` e a chave do Resend no valor →
**Adicionar**. Não precisa mexer em Acesso à rede. Detalhes da tela em `docs/conectar-instagram.md`,
Parte 2 (é o mesmo formulário).

## Regras do conteúdo

As regras de marca e de verdade estão no próprio workflow e no `CLAUDE.md`. As principais:
consultoria nutricional para serviços de alimentação; só RDC 216/2004 e Portaria 2.619/2011;
nada de caso, depoimento ou estatística inventada; nada de número que não tenha fonte que cite a
norma; o post fica em `docs/rascunhos-blog` até ser aprovado.

## Envio único desta semana

Se a mensagem que disparou a rotina disser "envie a semana 2026-10-19", não produza nada: o
conteúdo já existe. A partir de `docs/marketing/instagram/fonte/`, rode
`node enviar-email-aprovacao.mjs ../email-aprovacao-semana-2026-10-19.html "Food Guard · Conteúdo da semana para aprovação (quarta 21/10 e sábado 24/10)"`.
Depois, commit e push de `docs/marketing/instagram/envios.log` na branch (passo 9).
