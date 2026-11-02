# Rotina de publicação: blog e Instagram nas datas da agenda

Pedido do Rafael (02/11/2026): os posts aprovados saem sozinhos, um a cada dois dias, às 18h.
Só entra aqui o que o Renan validou e o Rafael aprovou.

## Como cada parte sai

| Parte | Como entra no ar | Depende de quê |
|---|---|---|
| Artigo do blog | O `.mdx` está em `content/blog` com data e hora no `date`. O `lib/blog.ts` esconde o post até essa hora, e o blog e o sitemap revalidam a cada 5 minutos. | Do deploy na `main` ter saído **antes** da data. A rotina de publicação não faz deploy. |
| Carrossel do Instagram | Uma tarefa agendada única às 18h05 (Brasília) de cada data abre uma sessão nova e roda o `publicar-instagram.mjs`. | Do segredo de rede "Instagram Food Guard" (`docs/conectar-instagram.md`). Sessão nova a cada disparo, para pegar o segredo mesmo que ele tenha sido salvo depois. |
| Aviso ao Rafael | Publicou: e-mail com o link do post. Falhou: e-mail com os slides na ordem e a legenda, para postar à mão (plano B). | Do segredo de rede do Resend, que já funciona. |

Os slides ficam em `public/instagram/<slug>/` porque a Meta busca as imagens num endereço
público. A agenda com datas, legendas e status está em `agenda.json`.

O publicador não depende de gravar nada no repositório: antes de publicar, ele confere no próprio
Instagram se o post já saiu. Por isso a sessão da tarefa só precisa ler o repositório.

## O que a tarefa das 18h05 faz

1. Clona o repositório (é público; leitura basta) e entra na branch `claude/charming-allen-Nc7aL`:
   `git clone https://github.com/rafaffernandes/FOOD-GUARD-.git && cd FOOD-GUARD- && git checkout claude/charming-allen-Nc7aL`.
   Se o clone falhar, adiciona o repositório à sessão (leitura) e tenta de novo.
2. A partir de `docs/marketing/instagram/fonte/`, roda `node publicar-instagram.mjs --slug <slug>`
   com tempo limite de 10 minutos (o comando espera a Meta processar o carrossel).
3. Lê a saída:
   - **0**: publicado (ou já estava). O Rafael recebe o link por e-mail.
   - **1**: não publicou e o plano B foi para o Rafael por e-mail. Nada mais a fazer.
   - **2**: não publicou e o plano B também falhou. Responda com o erro, que fica registrado no
     histórico da tarefa.
   - **3**: a tarefa disparou antes da hora. Reagende para 18h05 da data da agenda.
4. Nunca publica por outro caminho, nunca roda o comando duas vezes e nunca mexe na `main`.
5. Se a sessão conseguir gravar no repositório, faz commit e push na branch de `agenda.json` e
   `publicacoes.log`. Se não conseguir, tudo bem: o Instagram é a fonte da verdade.

## Para agendar um post novo aprovado

1. Data: a mais tarde entre (a) dois dias depois da última data da agenda e (b) o dia seguinte ao
   deploy, sempre às 18h, no formato `AAAA-MM-DDT18:00:00-03:00`.
2. Mova o `.mdx` de `docs/rascunhos-blog/` para `content/blog/` com essa data no `date`.
3. Copie a capa para `public/capas/<slug>.jpg` e registre em `lib/content/photos.ts`.
4. Copie os slides para `public/instagram/<slug>/` e acrescente a entrada em `agenda.json` com a
   mesma data. Legenda com no máximo 5 hashtags (limite do Instagram desde dez/2025).
5. Na `pautas.json`, troque a pauta para `agendada`, com a data.
6. `npm run build` e `npm run lint`, commit, push na branch e na `main` (deploy). O deploy precisa
   sair antes da data, ou o artigo não entra e a Meta não acha os slides.
7. Crie a tarefa agendada única (create_trigger com `create_new_session_on_fire: true` e
   `run_once_at` = `AAAA-MM-DDT18:05:00-03:00`, sempre com o fuso) com a mensagem
   "Siga docs/marketing/instagram/ROTINA-PUBLICACAO.md (seção 'O que a tarefa das 18h05 faz')
   para o slug <slug>". Anote o id da tarefa no campo `tarefa` da agenda. Para mudar uma data,
   apague a tarefa antiga (delete_trigger) antes de criar a nova.
