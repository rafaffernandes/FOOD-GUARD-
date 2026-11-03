# Plano de postagem do Instagram

Decidido em 03/11/2026, a pedido do Rafael ("vc toma as decisões agora").

**Objetivo:** alcançar donos e gestores de food service em São Paulo e Grande SP que ainda não
seguem a Food Guard, e levar quem se interessar para o artigo do blog e para o diagnóstico.

**Ponto de partida (03/11):** 9 seguidores, 2 posts (carrossel), nenhum reel e nenhuma métrica
de alcance, porque o token ainda não tem a permissão `instagram_manage_insights`.

## As decisões

1. **Dois formatos, dois papéis.** O reel é o formato que o Instagram mais mostra para quem
   ainda não segue: é ele que traz gente nova. O carrossel com artigo é o que a pessoa salva,
   lê com calma e usa para ir ao blog e ao diagnóstico.
2. **Todo carrossel aprovado vira um reel.** O gerador (`fonte/render-reel.mjs`) monta um vídeo
   vertical de ~25 s com as mesmas afirmações do carrossel. Como não entra nenhuma afirmação
   nova, o reel não precisa de nova validação técnica.
3. **Sem rosto e sem voz.** A Food Guard fala como marca: texto na identidade visual, com a
   origem de cada ponto (norma ou sugestão).
4. **Frequência: 6 publicações por semana**, 3 carrosséis com artigo e 3 reels. Domingo livre.
5. **Horários: 15h nos dias úteis e 10h no sábado.** É uma hipótese, porque ainda não há dado
   da conta: 15h cai no intervalo entre o almoço e o jantar, quando quem toca cozinha consegue
   olhar o celular; no sábado, o horário é antes do movimento do almoço. Os 3 carrosséis desta
   semana ficam às 18h, como já estavam agendados.
6. **Uma chamada principal por post.** Reel: seguir. Carrossel: salvar. Os dois levam ao link
   da bio (artigo e diagnóstico). No máximo 5 hashtags (limite do Instagram desde dez/2025).

## A grade da semana (a partir de 16/11)

| Dia | Hora | Formato | Conteúdo |
|---|---|---|---|
| Segunda | 15h | Carrossel + artigo | Post 1 da semana |
| Terça | 15h | Reel | Reel do post 1 |
| Quarta | 15h | Carrossel + artigo | Post 2 |
| Quinta | 15h | Reel | Reel do post 2 |
| Sexta | 15h | Carrossel + artigo | Post 3 |
| Sábado | 10h | Reel | Reel do post 3 |

O ciclo: a rotina de segunda produz os 3 posts e manda para aprovação; aprovados durante a
semana, eles saem na semana seguinte, cada um com o seu reel no dia seguinte.

## As próximas duas semanas

| Data | Hora | O quê | Situação |
|---|---|---|---|
| qua 04/11 | 18h | Carrossel + artigo: Equipe nova e temporários | Agendado |
| sex 06/11 | 18h | Carrossel + artigo: Controle de pragas | Agendado |
| dom 08/11 | 18h | Carrossel + artigo: Controle de temperatura | Agendado |
| seg 09/11 | 11h58 | Rotina produz os 3 posts da semana de 16/11 e manda para aprovação | Automático |
| ter 10/11 | 15h | Reel: Equipe nova e temporários | Agendado |
| qui 12/11 | 15h | Reel: Controle de pragas | Agendado |
| sáb 14/11 | 10h | Reel: Controle de temperatura | Agendado |
| a partir de seg 16/11 | | Grade completa | Depende da aprovação dos posts de 09/11 |

Em 11/11 e 13/11 não sai carrossel: os posts novos ainda estarão em aprovação.

## O que ajuda e é feito à mão

- **Bio:** uma frase que diga o que a Food Guard faz e o link para o site. Sugestão:
  "Consultoria nutricional para food service · O que a vigilância sanitária cobra, explicado ·
  Diagnóstico gratuito ↓". A API não altera a bio.
- **Stories:** no dia de cada carrossel, a enquete e o link do artigo. Os textos já vêm prontos
  no pacote de aprovação (campo `stories`). O link em story só sai à mão.
- **Responder comentários** no mesmo dia: o Instagram entrega mais o que gera conversa.

## Como saber se está funcionando

1. **Liberar as métricas:** no painel da Meta, em Permissões e recursos, adicionar
   `instagram_manage_insights`, gerar um token novo e trocar o segredo "Instagram Food Guard"
   (apagar e criar de novo).
2. Com isso, o e-mail de segunda passa a trazer, por post: alcance, quanto do alcance veio de
   quem não segue, salvamentos e seguidores ganhos.
3. **Revisão em 07/12**, depois de 4 semanas (cerca de 12 reels e 12 carrosséis): ajustar os
   horários e a proporção entre reel e carrossel pelos números, não pela hipótese.
