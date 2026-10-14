#!/bin/sh
# Regera tudo: textos, prévias dos e-mails, documento e PDF.
set -e
cd "$(dirname "$0")"
CH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
node gerar.mjs
for f in preview/email-*.html; do
  n=$(basename "$f" .html)
  $CH --headless --no-sandbox --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
    --window-size=640,1400 --virtual-time-budget=3000 --screenshot="preview/$n-raw.png" "file://$PWD/$f" 2>/dev/null
  node -e 'const f=process.argv[1];require("sharp")(f).trim({background:f.includes("confirmacao")?"#eef2f6":"#ffffff",threshold:4}).png().toFile(process.argv[2]).then(()=>{})' "preview/$n-raw.png" "preview/$n.png"
  rm "preview/$n-raw.png"
done
node doc.mjs
$CH --headless --no-sandbox --disable-gpu --no-pdf-header-footer --virtual-time-budget=5000 \
  --print-to-pdf=../plano-sdr.pdf "file://$PWD/../plano-sdr.html" 2>/dev/null
echo pronto
