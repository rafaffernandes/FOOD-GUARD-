# Como conectar o Instagram para o Claude publicar

Objetivo: o carrossel aprovado sai sozinho no `@foodguardassessoria` às terças e sábados,
18h, sem ninguém apertar botão. Não existe conector pronto do Instagram para o Claude, então
a ligação é feita pela API oficial da Meta, com um token guardado nas configurações do
ambiente.

**Regra de segurança:** o token nunca é colado no chat, nem no código, nem em e-mail. Ele vai
direto para a área de segredos do ambiente (passo 4).

## Parte 1. O que você faz na Meta (uma vez, cerca de 30 minutos)

1. **Confirme a conta.** O `@foodguardassessoria` precisa ser conta profissional (comercial ou
   criador de conteúdo). Você informou que é comercial e ligada ao Facebook.
2. **Crie o app.** Entre em developers.facebook.com com o Facebook do dono da conta, vá em
   "Meus apps" e crie um app do tipo empresa.
3. **Adicione o Instagram.** No app, adicione o produto Instagram e escolha a opção de API com
   login do Instagram (a que publica conteúdo). Adicione o `@foodguardassessoria` como conta de
   teste do app e aceite o convite pelo Instagram (Configurações, Apps e sites).
4. **Gere o token.** Na mesma tela, gere o token de acesso da conta com a permissão de
   publicação de conteúdo e troque-o pelo token de longa duração (vale 60 dias e pode ser
   renovado). Anote também o ID da conta do Instagram que aparece ali.

Os nomes dos menus mudam de tempos em tempos na Meta. Se algo estiver diferente, me descreva a
tela, sem mandar o token, que eu te guio.

Segundo guias de terceiros, com o app em modo de desenvolvimento e a sua própria conta como
testadora, a publicação funciona sem a análise da Meta. Isso não está confirmado na
documentação oficial. Se a Meta pedir análise do app, eu preparo o pedido com você.

## Parte 2. Onde guardar o token (você faz, 5 minutos)

No Claude, no menu do ambiente que fica no título da sessão, clique em **Editar**:

1. **Segredos de rede** (em versões antigas do app, "Credenciais de API"): crie
   - `INSTAGRAM_ACCESS_TOKEN` com o token de longa duração
   - `INSTAGRAM_USER_ID` com o ID da conta do Instagram
   Se essa seção não aparecer, crie os dois como variáveis de ambiente, com os mesmos nomes.
2. **Acesso à rede**: libere `graph.instagram.com` e `graph.facebook.com` em domínios
   permitidos, mantendo marcada a opção dos gerenciadores de pacote.
3. Abra uma **sessão nova**. O ambiente só lê segredos e rede no começo da sessão.

## Parte 3. O que eu faço depois

1. Testo a conexão lendo os dados da conta e o limite de publicações por dia, sem publicar
   nada.
2. Com a sua autorização, publico um primeiro carrossel aprovado e confiro no perfil.
3. Crio a rotina de terça e sábado, 18h: ela lê no Gmail se o post da data foi aprovado por
   você e pelo Renan, publica o carrossel com a legenda e coloca o artigo no blog. O que não
   tiver as duas aprovações não sai.
4. Coloco a renovação do token na mesma rotina, antes de ele vencer, com aviso por e-mail se
   falhar.

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
