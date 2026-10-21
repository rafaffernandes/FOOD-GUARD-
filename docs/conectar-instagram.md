# Como conectar o Instagram para o Claude publicar

Objetivo: o carrossel aprovado sai sozinho no `@foodguardassessoria` às terças e sábados,
18h, sem ninguém apertar botão. Não existe conector pronto do Instagram para o Claude, então
a ligação é feita pela API oficial da Meta, com um token guardado como **segredo de rede** do
ambiente do Claude.

**Regra de segurança:** o token nunca é colado no chat, nem no código, nem em e-mail. Ele vai
direto para o formulário de segredos (Parte 2). Depois de salvo, ninguém consegue vê-lo de novo,
nem você nem o Claude: o proxy do ambiente coloca o token em cada chamada à Meta, do lado de
fora da sessão.

## Parte 1. O que você faz na Meta (uma vez, cerca de 30 minutos)

1. **Confirme a conta.** O `@foodguardassessoria` precisa ser conta profissional (comercial ou
   criador de conteúdo). Você informou que é comercial e ligada ao Facebook.
2. **Crie o app.** Entre em developers.facebook.com com o Facebook do dono da conta, vá em
   "Meus apps" e crie um app do tipo empresa.
3. **Adicione o Instagram.** No app, adicione o produto Instagram e escolha a opção de API com
   login do Instagram (a que publica conteúdo). Adicione o `@foodguardassessoria` como conta de
   teste do app e aceite o convite pelo Instagram (Configurações, Apps e sites).
4. **Gere o token.** Na mesma tela (configuração da API com login do Instagram), gere o token de
   acesso da conta, marcando a permissão de publicação de conteúdo
   (`instagram_business_content_publish`). Segundo a documentação da Meta, o token gerado no
   painel do app já vale 60 dias, então não precisa trocar por outro. Copie o token e vá direto
   para a Parte 2, sem colar em lugar nenhum no caminho.

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

1. **Teste sem publicar:** leio o nome de usuário da conta e o limite de publicações por dia.
   Se responder `@foodguardassessoria`, a ligação está feita. Se o segredo não chegar nesta
   sessão, abro uma sessão nova e testo de novo.
2. **Primeira publicação:** com a sua autorização, publico um carrossel já aprovado e confiro no
   perfil.
3. **Rotina de terça e sábado, 18h:** ela publica o carrossel com a legenda e coloca o artigo no
   blog, mas só o que estiver marcado como `aprovado` em `docs/marketing/instagram/pautas.json`.
   Quem marca é você: quando você e o Renan aprovarem o e-mail de segunda, me escreva
   "aprovado quarta e sábado" (ou o ajuste) e eu marco. O que não estiver marcado não sai.
   As rotinas automáticas não conseguem ler o Gmail nesta conta, por isso a aprovação passa por
   você no chat.
4. **Validade do token:** ele vence 60 dias depois de gerado, e o segredo de rede não pode ser
   editado. O e-mail de segunda avisa dez dias antes. Aí você gera um token novo na Meta (Parte
   1, passo 4), apaga o segredo antigo na lista (ícone de lixeira) e cria outro igual (Parte 2).

## Como as imagens chegam à Meta

A API do Instagram só aceita JPEG e busca a imagem num endereço público na hora de publicar.
Hoje os slides ficam no repositório do GitHub, que é **público**. Funciona, mas significa que
qualquer pessoa pode ver tudo o que está lá, inclusive documentos internos (plano do SDR,
preços, pendências). Vale decidir se o repositório fica público. Se virar privado, as imagens
passam a ser servidas pelo próprio site da Food Guard.

## Enquanto a conexão não fica pronta

Os slides e a legenda de cada post saem no e-mail de aprovação. Você agenda no Meta Business
Suite (cerca de 10 minutos por post), escolhendo carrossel, subindo os 8 slides na ordem e
colando a legenda.
