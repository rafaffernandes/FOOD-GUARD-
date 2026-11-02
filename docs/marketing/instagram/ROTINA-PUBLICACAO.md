# Rotina de publicação: blog e Instagram nas datas da agenda

Pedido do Rafael (02/11/2026): os posts aprovados saem sozinhos, um a cada dois dias, às 18h.
Só entra aqui o que o Renan validou e o Rafael aprovou.

## Como cada parte sai

| Parte | Como entra no ar | Depende de alguém? |
|---|---|---|
| Artigo do blog | O `.mdx` já está em `content/blog` com a data e a hora no `date`. O `lib/blog.ts` esconde o post até essa hora, e as páginas do blog revalidam a cada 5 minutos. | Não. Basta o deploy com o arquivo já ter sido feito. |
| Carrossel do Instagram | Uma tarefa agendada às 18h05 de cada data roda esta rotina, que publica pela API da Meta. | Do segredo de rede "Instagram Food Guard" no ambiente (`docs/conectar-instagram.md`). |
| Plano B do Instagram | Se a publicação falhar, o Rafael recebe por e-mail os slides na ordem e a legenda, para postar à mão. | Do segredo de rede do Resend, que já funciona. |

Os slides ficam em `public/instagram/<slug>/` porque a Meta busca as imagens num endereço
público. A agenda com datas, legendas e status está em `agenda.json`.

## Passo a passo (cada data, 18h05)

1. Trabalhe na branch `claude/charming-allen-Nc7aL`: `git fetch origin claude/charming-allen-Nc7aL && git checkout claude/charming-allen-Nc7aL && git pull origin claude/charming-allen-Nc7aL`.
2. A partir de `docs/marketing/instagram/fonte/`, rode `node publicar-instagram.mjs --slug <slug>`
   (o slug vem na mensagem da tarefa agendada).
3. Se sair com erro, rode `node avisar-instagram-manual.mjs <slug>`, que manda o plano B ao Rafael.
   Não tente outro caminho de publicação.
4. Commit e push **só na branch** de `agenda.json`, `publicacoes.log` e `envios.log` (e dos
   arquivos `aviso-instagram-*` se o plano B rodou). Nunca mexa na `main`: o blog já sai sozinho.
5. Responda em uma linha: publicado (com o link do post) ou plano B enviado (com o motivo).

## Para agendar um post novo aprovado

1. Mova o `.mdx` de `docs/rascunhos-blog/` para `content/blog/` e ponha a data no `date`, no
   formato `AAAA-MM-DDT18:00:00-03:00`, dois dias depois da última data da agenda.
2. Copie a capa para `public/capas/<slug>.jpg` e registre em `lib/content/photos.ts`.
3. Copie os slides para `public/instagram/<slug>/` e acrescente a entrada em `agenda.json`.
4. `npm run build` e `npm run lint`, commit, push na branch e na `main` (deploy). O deploy
   precisa sair antes da data, ou os slides não estarão no site quando a Meta for buscar.
5. Crie a tarefa agendada única para 18h05 da data, na sessão de operação, com a mensagem
   "Rode docs/marketing/instagram/ROTINA-PUBLICACAO.md para o slug <slug>".
