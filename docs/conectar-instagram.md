# Como conectar o Instagram para o Claude publicar

Objetivo: o carrossel aprovado sai sozinho no `@foodguardassessoria` nas datas da agenda
(`docs/marketing/instagram/agenda.json`), às 18h, sem ninguém apertar botão. Não existe conector pronto do Instagram para o Claude, então
a ligação é feita pela API oficial da Meta, com um token guardado como **segredo de rede** do
ambiente do Claude.

**Regra de segurança:** o token nunca é colado no chat, nem no código, nem em e-mail. Ele vai
direto para o formulário de segredos (Parte 2). Depois de salvo, ninguém consegue vê-lo de novo,
nem você nem o Claude: o proxy do ambiente coloca o token em cada chamada à Meta, do lado de
fora da sessão.

## Parte 1. O que você faz na Meta (uma vez, cerca de 30 minutos)

Faça pelo computador. São dois logins diferentes, e é isso que costuma confundir:

- **Facebook pessoal**: entra no site de desenvolvedores e é o dono do app. Pode ser o seu
  Facebook de sempre. O e-mail `foodguardassessoria@gmail.com` não precisa ter Facebook.
- **Instagram da Food Guard** (`@foodguardassessoria`): só aparece no passo D, quando você liga
  a conta ao app, com o usuário e a senha do Instagram.

**A. Conferir a conta do Instagram (2 minutos)**
1. No app do Instagram, entre no `@foodguardassessoria`.
2. Perfil → menu (☰) → **Tipo de conta e ferramentas**: precisa estar como **conta
   profissional** (comercial ou criador). Se aparecer a opção "Mudar para conta profissional",
   a conta ainda é pessoal: mude para **Empresa**.

**B. Virar desenvolvedor (5 minutos, só na primeira vez)**
1. Acesse **developers.facebook.com** e clique em **Entrar**, com o **seu Facebook pessoal**.
2. Se aparecer **Começar** ou "Registrar-se como desenvolvedor", siga: aceite os termos,
   confirme o celular por SMS e escolha a profissão que quiser. Não tem custo.

**C. Criar o app (5 minutos)**
1. Clique em **Meus apps** → **Criar app**.
2. Nome do app: `Food Guard Publicação`. E-mail de contato: o seu.
3. Caso de uso: escolha a opção do **Instagram** (gerenciar mensagens e conteúdo no
   Instagram). Se ela não aparecer, escolha **Outro** e, no tipo, **Empresa**.
4. Se pedir um portfólio empresarial, pode pular ("não quero conectar agora").
5. Conclua com **Criar app** (pode pedir a senha do Facebook de novo).

Apps criados a partir de 2026 não têm mais a "Configuração da API com login do Instagram":
o painel avisa que o app usa a **API setup with Unified login** (login unificado). É esse o
caminho abaixo. Ele usa um portfólio empresarial e gera um token de usuário do sistema que **não
expira**. Passos D a G conferidos com o painel em 03/11/2026 e com um guia de terceiros
(github.com/SchulzWill/weekpost, docs/setup.md).

**D. Portfólio empresarial com o Instagram dentro (10 minutos)**
1. Em **business.facebook.com**, entre com o seu Facebook. Se ainda não houver portfólio da
   Food Guard, crie um (**Criar portfólio empresarial**, nome "Food Guard").
2. No portfólio: **Configurações** → **Contas** → **Contas do Instagram** → **Adicionar** →
   entre com o usuário e a senha do Instagram da Food Guard.
3. No painel do app (developers.facebook.com): **Casos de uso** → **Personalizar** no caso do
   Instagram. Se pedir, conecte o app ao portfólio da Food Guard.
4. No menu da esquerda do app: **Configurações do app** → **Básico** → **URL da Política de
   Privacidade** = `https://foodguardassessoria.com.br/privacidade` → **Salvar alterações**.

**E. Pôr a conta como testadora (5 minutos)**
1. Menu da esquerda do app → **Funções do app** → **Funções** → **Adicionar pessoas** →
   **Testador do Instagram** → `foodguardassessoria` → **Adicionar**.
2. Aceite em **instagram.com** (logado no `@foodguardassessoria`): **Configurações** →
   **Apps e sites** → aba **Convites de testador** → **Aceitar**. A conta precisa ser pública, e
   o convite pode levar alguns minutos para aparecer.

**F. Criar a configuração (5 minutos)**
Em **Casos de uso** → **Personalizar** → **API setup with Unified login** → **1. Configure seu
app** → **Criar nova configuração**:
- **Token de acesso:** deixe "Token de acesso do usuário do sistema (SUAT)".
- **Expiração:** deixe "Nunca".
- **Ativos:** marque a conta do Instagram da Food Guard. Pule a conta de anúncios.
- **Permissões:** deixe só `instagram_basic` e `instagram_content_publish`. Tire
  `ads_management`, `ads_read` e `instagram_manage_comments`. Tire também
  `instagram_manage_messages` se o painel deixar; se não deixar, tudo bem.
- O campo de URL de redirecionamento, se aparecer, pode ficar em branco ou com o endereço do site.
- **Salvar.**

**G. Gerar o token (2 minutos)**
1. Na mesma página, desça até **Gerar tokens de acesso** → **Adicionar conta** → entre com o
   Instagram da Food Guard e autorize.
2. Clique em **Gerar token**, escolha o portfólio e a conta, e copie o token. A Meta mostra uma
   vez só. Vá direto para a Parte 2, sem colar o token em lugar nenhum (nem no chat).
3. Anote o **número da conta** que aparece ao lado do `@foodguardassessoria` (o id do
   Instagram). Esse número **não é segredo**: pode mandar no chat, que eu coloco na agenda.

Os nomes dos menus mudam de tempos em tempos na Meta. Se algo estiver diferente, me descreva a
tela, sem mandar o token, que eu te guio.

Segundo guias de terceiros, com o app em modo de desenvolvimento e a sua própria conta como
testadora, a publicação funciona sem a análise da Meta. Isso não está confirmado na
documentação oficial. Se a Meta pedir análise do app, eu preparo o pedido com você.

## Parte 2. No Claude: guardar o token (5 minutos)

Faça pelo computador, em claude.ai/code ou no app Claude para desktop, com a sessão do Claude
aberta. Os nomes aparecem em português ou em inglês, conforme o idioma do app; os dois estão
abaixo.

1. No topo da tela, clique na **setinha ao lado do título da sessão**.
2. Clique em **Editar ambiente na nuvem** (*Edit cloud environment*). Abre a janela de
   configuração do ambiente: nome, acesso à rede, variáveis, script de configuração e segredos.
3. Desça até a seção **Segredos de rede** (*Network secrets*; em versões antigas do app,
   *Credenciais de API*).
4. Clique em **Adicionar segredo** (*Add secret*) e preencha assim:

   | Campo | O que colocar |
   |---|---|
   | Tipo de segredo (*Secret type*) | Deixe o que já vem: **Bearer** |
   | Nome (*Name*) | `Instagram Food Guard` |
   | Sites permitidos (*Allowed websites*) | `graph.instagram.com` e `graph.facebook.com` (os dois) |
   | Cabeçalhos (*Custom headers*) | A linha já vem com nome `Authorization` e prefixo `Bearer`: não mexa. No campo **Valor** (*Value*), cole o token da Parte 1 |

5. Clique em **Adicionar** (*Add*). O segredo aparece na lista com os dois sites. Ele já fica
   salvo, sem precisar do botão de salvar alterações da janela.
6. Confira a lista. Se aparecer **Não enviado** (*Not sent*) embaixo do segredo, leia a nota que
   aparece ali e me conte o que ela diz (sem o token).

O que você **não** precisa fazer:

- **Acesso à rede:** não mexa. Os sites listados num segredo de rede ficam liberados sozinhos.
- **ID da conta:** não precisa guardar. Eu leio pela própria API.
- **Variável de ambiente:** não use para o token. Variável fica visível para quem usa o
  ambiente; o segredo de rede não.

Se o formulário vier mais curto, pedindo um **Host** (acontece no plano Team, para quem não é
administrador da organização): coloque `graph.instagram.com` no Host, escolha o tipo **Token** e
cole o token em **Valor**.

Quando terminar, me escreva **"instagram configurado"** aqui no chat.

## Parte 3. O que eu faço depois

1. **Teste sem publicar:** numa sessão nova (é ela que pega o segredo recém-salvo), rodo
   `node docs/marketing/instagram/fonte/publicar-instagram.mjs --teste`, que só lê o nome da conta
   e a cota de publicações. Se responder `@foodguardassessoria`, a ligação está feita. Não
   publico nada fora da agenda.
2. **Publicação:** segue a `docs/marketing/instagram/agenda.json`. Uma tarefa agendada única às
   18h05 de cada data publica o carrossel (`docs/marketing/instagram/ROTINA-PUBLICACAO.md`). O
   artigo do blog sai sozinho pela data do `.mdx`. Você recebe um e-mail com o link de cada post
   publicado, ou com os slides e a legenda se algo falhar.
3. **Aprovação:** só entra na agenda o que o Renan validou e você aprovou. As tarefas automáticas
   não leem o Gmail, então a aprovação chega pelo chat ("aprovado", com quais posts).
4. **Validade do token:** com o login unificado e a expiração "Nunca", o token não vence. Se a
   configuração mostrar outro prazo, eu crio um lembrete antes do vencimento, e aí você gera um
   token novo (Parte 1, passo G), apaga o segredo antigo na lista (ícone de lixeira) e cria outro
   igual (Parte 2).

## Como as imagens chegam à Meta

A API do Instagram só aceita JPEG e busca a imagem num endereço público na hora de publicar. Os
slides ficam no próprio site, em `public/instagram/<slug>/`, e entram no ar no deploy feito antes
da data. Não dependem do GitHub.

## Enquanto a conexão não fica pronta

Nas datas da agenda, o artigo sai no blog do mesmo jeito, e você recebe por e-mail os slides na
ordem e a legenda. Você posta no Meta Business Suite (cerca de 5 minutos): carrossel, os 8 slides
na ordem do nome do arquivo e a legenda colada.
