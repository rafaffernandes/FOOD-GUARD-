# Fonte das mensagens do SDR

`mensagens.mjs` é a única fonte do texto. O WhatsApp e o e-mail saem dele, então
a comunicação é idêntica nos dois canais — muda só a embalagem.

Para regenerar depois de mudar um texto:

```bash
cd docs/marketing/sdr/fonte
node gerar.mjs   # e-mails (../email-*.html) e WhatsApp (../whatsapp-*.txt)
node doc.mjs     # documento de aprovação (../plano-sdr.html)
```

As prévias `email-*.png` e o PDF são renderizados com Chromium headless.
O logo do e-mail é servido de `public/email/logo-food-guard.png`.
