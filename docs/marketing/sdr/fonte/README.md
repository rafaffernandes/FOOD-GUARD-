# Fonte das mensagens do SDR

`mensagens.mjs` é a única fonte do texto. O WhatsApp e o e-mail saem dele, então
a comunicação é idêntica nos dois canais. Muda só a embalagem.

Para regenerar depois de mudar um texto:

```bash
cd docs/marketing/sdr/fonte
NODE_PATH=../../../../node_modules ./render.sh
```

O script gera, em `docs/marketing/sdr/`:

- `whatsapp-*.txt`: o texto de cada mensagem, pronto para colar;
- `email-1/2/3-*.html`: e-mails de prospecção, com cara de e-mail pessoal e a
  marca só na assinatura (o layout de newsletter cai em Promoções no Gmail);
- `email-confirmacao.html`: e-mail de visita agendada, com o layout completo da
  marca, para quem já respondeu;
- `assinatura-email.html`: assinatura para instalar no Gmail;
- `plano-sdr.html` e `plano-sdr.pdf`: o documento de aprovação.

As prévias dos e-mails ficam em `preview/` e são renderizadas com o Chromium
headless. Os logos dos e-mails são servidos de `public/email/`.
