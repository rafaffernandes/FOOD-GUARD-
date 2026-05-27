---
name: deploy
description: Publica o estado atual do Food Guard na Vercel. Compila, lintra, commita, faz push duplo (branch + main) e devolve o link de produção. Use quando o usuário pedir para "subir", "publicar", "deploy" ou "manda o link".
---

# /deploy — Publicar o Food Guard

Roteiro padrão de publicação. **NÃO** tente abrir túneis públicos (ngrok, localtunnel, cloudflared) — o sandbox bloqueia. O link de teste é sempre a Vercel.

## Pré-requisitos

- Branch ativa: `claude/company-website-design-CwX8o` (a designada pra este ambiente).
- Repositório: `rafaffernandes/FOOD-GUARD-`.
- Domínio público (produção, ligado à `main`): https://food-guard-cnhl.vercel.app/

## Passos (executar em ordem)

1. **Verificar build e lint locais.**
   ```bash
   npm run build 2>&1 | grep -E "Compiled|Failed|error|✓ Generating" | head
   npm run lint 2>&1 | tail -2
   ```
   Só prosseguir se ambos estiverem limpos.

2. **Confirmar branch e mudanças pendentes.**
   ```bash
   git branch --show-current
   git status --short
   ```

3. **Commit + push na branch de trabalho.**
   ```bash
   git add -A
   git commit -m "<mensagem clara: o que mudou e por quê>

   https://claude.ai/code/session_01EUNaYs6CdHTvrbUMzKioFc"
   git push origin claude/company-website-design-CwX8o 2>&1 | tail -2
   ```

4. **Push também na `main` (gatilho do deploy automático na Vercel).**
   ```bash
   git push origin claude/company-website-design-CwX8o:main 2>&1 | tail -2
   ```
   A Vercel republica em ~1–2 min.

5. **Entregar o link.** Responder ao usuário com:
   - URL: **https://food-guard-cnhl.vercel.app/**
   - Lembrete: abrir em **aba anônima** ou usar **`Ctrl + Shift + R`** (cache).

## Se o push falhar com 403

Permissão de escrita do GitHub App ainda não foi concedida. **Não tentar tunnel
ou alternativas**: pedir ao usuário para reautorizar em
`https://github.com/settings/installations` com `Contents: Read and write`.

## Verificação opcional (quando rede liberar)

- Aba "Deployments" do projeto na Vercel deve mostrar o último commit em
  **Ready** e ambiente **Production**.
- Se o usuário disser "ainda mostra o velho", lembrá-lo do hard refresh ou
  conferir se a publicação está como "Preview"; nesse caso, **Promote to
  Production** no menu da publicação.

## O que NÃO fazer

- Sugerir `ngrok`/`localtunnel`/`cloudflared` (bloqueado).
- Empurrar pra outras branches sem permissão.
- Usar `--no-verify` ou `--amend` em commits já publicados.
- Inventar URLs de "preview" no localhost — não são acessíveis ao usuário.
