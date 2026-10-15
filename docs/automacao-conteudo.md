# Automação de conteúdo: blog e Instagram

Pedido do Rafael (15/10/2026): publicar toda terça e todo sábado às 18h, no blog
e no Instagram, sem ele apertar botão. Backlog de conteúdo, curadoria do Renan
com pelo menos duas semanas de antecedência e aprovação do Rafael todo sábado de
manhã, por e-mail.

## O fluxo

```
semana N        Renan valida (duas semanas antes)
semana N+1      Rafael aprova no sábado de manhã (o que o Renan já validou)
terça e sábado  18h: Instagram publica sozinho; o artigo entra no ar sozinho
```

| Quando | O que acontece | Quem faz |
|---|---|---|
| Sábado, 8h | E-mail ao Renan com o conteúdo de daqui a duas semanas, com as fontes de cada afirmação técnica | Automático |
| Sábado, 8h | E-mail ao Rafael com o conteúdo da semana seguinte, já validado pelo Renan | Automático |
| Resposta no e-mail | Aprovar ou pedir ajuste, por link assinado | Renan e Rafael |
| Terça e sábado, 18h | Carrossel sai no Instagram; artigo entra no blog | Automático |
| Toda semana | Escrever o conteúdo de daqui a duas semanas | Claude, a partir do backlog |

Só o item da última linha usa IA, e é ele que consome o uso do Claude. A
publicação e os e-mails são código comum, sem custo por execução.

## As peças

1. **Fila de conteúdo** (tabela no Supabase): cada peça tem data, canal, texto,
   imagens, status (`rascunho`, `com_renan`, `validado`, `aprovado`,
   `publicado`) e o histórico de quem aprovou e quando.
2. **Rotas do site**:
   - `/api/curadoria/enviar` (sábado de manhã): monta e envia os dois e-mails.
   - `/api/curadoria/responder`: recebe o clique em "aprovar" ou "pedir ajuste".
   - `/api/instagram/publicar` (terça e sábado, 18h): publica o que está
     `aprovado` para aquele dia.
3. **Imagens do carrossel**: geradas na identidade visual da marca, em JPEG
   1080 x 1350 (a API do Instagram só aceita JPEG). O gerador já existe em
   `docs/marketing/instagram/fonte/render-carrossel.mjs`.
4. **Blog**: o artigo aprovado entra no ar na data marcada, sem novo deploy.
5. **Agendador**: um workflow do GitHub Actions chama as rotas nos horários
   certos, com uma chave secreta. É gratuito. No plano gratuito da Vercel (Hobby)
   o cron roda no máximo uma vez por dia e em qualquer minuto da hora marcada (um
   job de 18h pode disparar entre 18h00 e 18h59); o plano Pro roda por minuto.
   Por isso o GitHub Actions, que dispara perto do horário, com alguns minutos de
   atraso possíveis.
6. **E-mail**: sai pelo Resend, que já entrega os relatórios do diagnóstico. São
   dois destinatários conhecidos, não é prospecção.

## O que precisa de decisão ou de ação do Rafael

| Item | O que fazer |
|---|---|
| Conta do Instagram | Conta profissional (comercial ou criador). Foi informado que é comercial e ligada ao Facebook. |
| App na Meta | Criar um app em developers.facebook.com e dar permissão de publicação à conta. Passo a passo abaixo. |
| Token | A Meta entrega um token que vale 60 dias e pode ser renovado. A renovação é automática, mas o primeiro token vem do Rafael. |
| E-mail do Renan | Ainda não informado. |
| Publicar sozinho em produção | O sistema só publica o que foi aprovado por link. Precisa da autorização do Rafael para ligar o agendador. |
| Plano da Vercel | O plano atual basta. Ver `docs/pendencias-tecnicas.md`, seção 3. |

### Conectar o Instagram (passo a passo, feito pelo Rafael)

Os detalhes mudam na Meta de tempos em tempos; confira na tela. Resumo:

1. Entrar em developers.facebook.com com a conta do Facebook ligada ao Instagram
   e criar um app do tipo empresa.
2. Adicionar o produto Instagram e escolher a API de publicação de conteúdo.
3. Adicionar a conta `@foodguardassessoria` como conta de teste do app. Segundo
   guias de terceiros, enquanto o app está em modo de desenvolvimento e a conta é
   a do próprio dono do app, a publicação funciona sem a análise da Meta. Isso
   não está confirmado na documentação oficial; se a Meta pedir análise do app, é
   uma etapa a mais, que o Claude ajuda a preparar.
4. Gerar o token de acesso com a permissão de publicação e trocá-lo por um token
   de 60 dias.
5. Passar para o Claude: o token, o ID da conta do Instagram e o ID do app. Eles
   vão como variáveis de ambiente na Vercel, nunca no código.

Limites que a Meta documenta: só imagens JPEG, até 8 MB, proporção entre 4:5 e
1,91:1, as imagens precisam estar em endereço público no momento da publicação.
O carrossel aceita até 10 imagens (informação de fontes secundárias). Há um
limite diário de publicações por API, e as fontes divergem (de 25 a 100 por 24
horas); a própria API informa o valor da conta. Em qualquer caso, está muito
acima de duas publicações por semana.

## Riscos que valem saber

- **Token expira em 60 dias.** A renovação roda sozinha, e o sistema avisa o
  Rafael por e-mail se ela falhar, antes de uma publicação ficar de fora.
- **Falha na publicação.** Se o Instagram recusar o post, o sistema não tenta de
  novo em loop: marca como `falhou` e avisa por e-mail com o motivo.
- **Conteúdo técnico.** Nada vai ao ar sem a validação do Renan. Esta é a regra
  que protege a marca, e o sistema não tem como contorná-la.
- **Agendamento nativo do Instagram.** As fontes divergem: algumas dizem que a
  API aceita publicar com data futura, outras que não. Não dependemos disso. O
  sistema publica na hora, no horário marcado, e não deixa o post agendado na
  Meta. Se o agendamento nativo se confirmar, dá para usá-lo como segunda
  garantia.
