# HTML File Design

_Started 2026-05-19 00:20 UTC_

---

## User

file:///C:/Users/rafae/AppData/Local/Packages/CLAUDE~1/LOCALC~1/Roaming/Claude/LOCAL-~1/DBC7AB~1/1FAB26~1/LOFE5A~1/outputs/index.html

## Assistant

_[tool: list_files]_

_[tool: list_files]_

_[tool: questions_v2]_

Hi! I see the project is called "Food guard" — sounds like a food safety or expiration-tracking app, but I want to make sure I design the right thing.

The file path you pasted (`file:///C:/...`) is on your local machine, so I can't read it from here. Could you tell me a bit more about what you want?

## User

<pasted_text name="Pasted text (750 lines)">
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Food Guard — Jornada, Funil & Arquitetura</title>
<link rel="stylesheet" href="styles.css" />
<style>
  body { background: var(--paper); }
  .diagram-wrap { padding: clamp(2rem, 4vw, 4rem) 0; border-bottom: 1px solid var(--line); }
  .diagram-wrap:last-of-type { border-bottom: 0; }
  .diagram-head { margin-bottom: 2rem; max-width: 70ch; }
  .diagram-head h2 { margin-bottom: 0.75rem; }
  .diagram-head p { color: var(--text-2); font-size: 1rem; line-height: 1.55; }
  .diagram-svg { width: 100%; height: auto; background: var(--paper); border: 1px solid var(--line); border-radius: 16px; }
  .legend { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-top: 1.5rem; }
  .legend__item { font-size: 0.88rem; color: var(--text-2); display: flex; gap: 0.6rem; align-items: flex-start; }
  .legend__swatch { width: 14px; height: 14px; border-radius: 3px; flex-shrink: 0; margin-top: 2px; }
  .nav-anchors {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
    padding: 1rem 0;
    border-bottom: 1px solid var(--line);
    margin-bottom: 2rem;
  }
  .nav-anchors a {
    padding: 0.45rem 0.95rem;
    border: 1px solid var(--line-strong);
    border-radius: 999px;
    font-size: 0.85rem;
    color: var(--text-2);
  }
  .nav-anchors a:hover { background: var(--navy); color: var(--paper); border-color: var(--navy); }
</style>
</head>
<body>

<header class="topbar">
  <div class="topbar__inner">
    <a class="brand" href="index.html">
      <span class="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none"><path d="M9 4v10a3 3 0 0 0 6 0V4" stroke="#0E2A47" stroke-width="2" stroke-linecap="round"/><path d="M12 14v6" stroke="#0E2A47" stroke-width="2" stroke-linecap="round"/></svg>
      </span>
      <span>Food Guard<small>Assessoria</small></span>
    </a>
    <nav class="nav">
      <a href="index.html">Início</a>
      <a href="servicos.html">Serviços</a>
      <a href="sobre.html">Sobre</a>
      <a href="cases.html">Cases</a>
      <a href="contato.html">Contato</a>
    </nav>
  </div>
</header>

<section class="page-head">
  <div class="container">
    <div class="page-head__grid">
      <div>
        <span class="eyebrow">PRD · Visualizações</span>
        <h1 class="display-lg page-head__title">Jornada, funil e arquitetura.</h1>
      </div>
      <p class="lede page-head__lede">
        Três visões que sustentam o PRD: como o cliente entra (jornada), como ele converte (funil) e como o sistema sustenta tudo isso com segurança (arquitetura).
      </p>
    </div>

    <div class="nav-anchors">
      <a href="#jornada">01 · Jornada do usuário</a>
      <a href="#funil">02 · Funil de conversão</a>
      <a href="#arquitetura">03 · Arquitetura técnica & segurança</a>
    </div>
  </div>
</section>

<!-- ========== JORNADA DO USUÁRIO ========== -->
<section class="diagram-wrap" id="jornada">
  <div class="container">
    <div class="diagram-head">
      <span class="eyebrow">01 · Jornada do usuário</span>
      <h2 class="display-md mt-1">Do anúncio ao contrato assinado.</h2>
      <p>Mapa completo da experiência de um dono/gerente de estabelecimento que precisa de RT nutricionista. Cada passo tem um responsável (sistema, IA ou humano) e um SLA implícito.</p>
    </div>

    <svg class="diagram-svg" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Jornada do usuário Food Guard">
      <defs>
        <linearGradient id="bg-journey" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#FBFAF6"/>
          <stop offset="1" stop-color="#F4EFE4"/>
        </linearGradient>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill="#0E2A47"/>
        </marker>
        <marker id="arr-leaf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill="#6FB23E"/>
        </marker>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
          <feOffset dx="0" dy="4" result="off"/>
          <feFlood flood-color="#061629" flood-opacity="0.10"/>
          <feComposite in2="off" operator="in"/>
          <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <rect width="1280" height="720" fill="url(#bg-journey)"/>

      <!-- swimlanes -->
      <g font-family="Inter, sans-serif" font-size="11" letter-spacing="2" font-weight="600" fill="#6B7689">
        <text x="40" y="120">CANAL</text>
        <text x="40" y="245">EXPERIÊNCIA</text>
        <text x="40" y="385">DADOS</text>
        <text x="40" y="540">RESPONSÁVEL</text>
        <text x="40" y="660">SLA</text>
      </g>
      <line x1="135" y1="80" x2="1240" y2="80" stroke="#E0DAC9" stroke-width="1"/>
      <line x1="135" y1="190" x2="1240" y2="190" stroke="#E0DAC9" stroke-width="1"/>
      <line x1="135" y1="330" x2="1240" y2="330" stroke="#E0DAC9" stroke-width="1"/>
      <line x1="135" y1="490" x2="1240" y2="490" stroke="#E0DAC9" stroke-width="1"/>
      <line x1="135" y1="620" x2="1240" y2="620" stroke="#E0DAC9" stroke-width="1"/>

      <!-- 6 stages, columns centered at x = 200, 380, 560, 740, 920, 1100 -->
      <!-- Stage 1: Descoberta -->
      <g transform="translate(135,40)">
        <rect width="160" height="35" rx="6" fill="#0E2A47"/>
        <text x="80" y="22" fill="#F4EFE4" font-family="Fraunces, serif" font-size="14" font-weight="500" text-anchor="middle">01 · Descoberta</text>
      </g>
      <g transform="translate(140,95)" filter="url(#shadow)">
        <rect width="155" height="80" rx="10" fill="#FBFAF6" stroke="#E0DAC9"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0E2A47">Google Ads</text>
        <text x="14" y="40" font-family="Inter, sans-serif" font-size="11" fill="#38465C">"RT nutricionista escola"</text>
        <text x="14" y="55" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0E2A47">Meta Ads</text>
        <text x="14" y="73" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Lookalike donos food svc</text>
      </g>
      <g transform="translate(140,210)">
        <rect width="155" height="105" rx="10" fill="#F4EFE4"/>
        <text x="14" y="22" font-family="Fraunces, serif" font-size="13" font-weight="500" fill="#0E2A47">Vê anúncio</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#38465C">"Está em conformidade?</text>
        <text x="14" y="56" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Diagnóstico em 90s"</text>
        <text x="14" y="80" font-family="Inter, sans-serif" font-size="11" font-style="italic" fill="#6B7689">CTA: começar agora</text>
      </g>
      <g transform="translate(140,350)">
        <rect width="155" height="125" rx="10" fill="#FBFAF6" stroke="#E0DAC9"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0E2A47">CAPTURADO</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#38465C">utm_source / campaign</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">device, geo</text>
        <text x="14" y="74" font-family="Inter, sans-serif" font-size="11" fill="#38465C">timestamp</text>
        <text x="14" y="98" font-family="Inter, sans-serif" font-size="10" font-style="italic" fill="#6B7689">→ session_id criado</text>
      </g>
      <g transform="translate(140,510)">
        <rect width="155" height="90" rx="10" fill="#0E2A47"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#6FB23E">SISTEMA</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Pixel + GA4 + Supabase</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">tracking server-side</text>
      </g>
      <g transform="translate(140,635)">
        <rect width="155" height="55" rx="10" fill="#6FB23E"/>
        <text x="80" y="32" font-family="Fraunces, serif" font-size="14" font-weight="500" fill="#061629" text-anchor="middle">≤ 1.5s LCP</text>
      </g>

      <!-- Stage 2: Landing -->
      <g transform="translate(315,40)">
        <rect width="160" height="35" rx="6" fill="#0E2A47"/>
        <text x="80" y="22" fill="#F4EFE4" font-family="Fraunces, serif" font-size="14" font-weight="500" text-anchor="middle">02 · Landing</text>
      </g>
      <g transform="translate(320,95)" filter="url(#shadow)">
        <rect width="155" height="80" rx="10" fill="#FBFAF6" stroke="#E0DAC9"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0E2A47">Landing dedicada</text>
        <text x="14" y="40" font-family="Inter, sans-serif" font-size="11" fill="#38465C">/diagnostico-gratuito</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Hospedada na Vercel</text>
      </g>
      <g transform="translate(320,210)">
        <rect width="155" height="105" rx="10" fill="#F4EFE4"/>
        <text x="14" y="22" font-family="Fraunces, serif" font-size="13" font-weight="500" fill="#0E2A47">Lê dor + prova</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#38465C">"Multa de até R$1,5M"</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">+180 marcas atendidas</text>
        <text x="14" y="80" font-family="Inter, sans-serif" font-size="11" font-style="italic" fill="#6B7689">CTA único: diagnóstico</text>
      </g>
      <g transform="translate(320,350)">
        <rect width="155" height="125" rx="10" fill="#FBFAF6" stroke="#E0DAC9"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0E2A47">SESSÃO ATIVA</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#38465C">scroll depth</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">tempo na página</text>
        <text x="14" y="74" font-family="Inter, sans-serif" font-size="11" fill="#38465C">click em CTA</text>
        <text x="14" y="98" font-family="Inter, sans-serif" font-size="10" font-style="italic" fill="#6B7689">→ heatmap (Clarity)</text>
      </g>
      <g transform="translate(320,510)">
        <rect width="155" height="90" rx="10" fill="#0E2A47"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#6FB23E">SISTEMA</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Next.js + Edge</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">A/B test framework</text>
      </g>
      <g transform="translate(320,635)">
        <rect width="155" height="55" rx="10" fill="#6FB23E"/>
        <text x="80" y="32" font-family="Fraunces, serif" font-size="14" font-weight="500" fill="#061629" text-anchor="middle">Bounce ≤ 45%</text>
      </g>

      <!-- Stage 3: Diagnóstico -->
      <g transform="translate(495,40)">
        <rect width="160" height="35" rx="6" fill="#6FB23E"/>
        <text x="80" y="22" fill="#061629" font-family="Fraunces, serif" font-size="14" font-weight="500" text-anchor="middle">03 · Diagnóstico</text>
      </g>
      <g transform="translate(500,95)" filter="url(#shadow)">
        <rect width="155" height="80" rx="10" fill="#FBFAF6" stroke="#E0DAC9"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0E2A47">Diagnóstico</text>
        <text x="14" y="40" font-family="Inter, sans-serif" font-size="11" fill="#38465C">5 perguntas + 4 campos</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">+ resultado em tela</text>
      </g>
      <g transform="translate(500,210)">
        <rect width="155" height="105" rx="10" fill="#F4EFE4"/>
        <text x="14" y="22" font-family="Fraunces, serif" font-size="13" font-weight="500" fill="#0E2A47">Responde + recebe</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Score 0–100 calc.</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Gap + plano sugerido</text>
        <text x="14" y="80" font-family="Inter, sans-serif" font-size="11" font-style="italic" fill="#6B7689">CTA: agendar / pagar</text>
      </g>
      <g transform="translate(500,350)">
        <rect width="155" height="125" rx="10" fill="#FBFAF6" stroke="#E0DAC9"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0E2A47">LEAD QUALIFICADO</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#38465C">nome · tel · email</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">cargo · empresa</text>
        <text x="14" y="74" font-family="Inter, sans-serif" font-size="11" fill="#38465C">respostas + score</text>
        <text x="14" y="98" font-family="Inter, sans-serif" font-size="10" font-style="italic" fill="#6B7689">→ Supabase + LEADS.xlsx</text>
      </g>
      <g transform="translate(500,510)">
        <rect width="155" height="90" rx="10" fill="#0E2A47"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#6FB23E">SISTEMA + IA</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">scoring rules engine</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">PDF dinâmico gerado</text>
      </g>
      <g transform="translate(500,635)">
        <rect width="155" height="55" rx="10" fill="#6FB23E"/>
        <text x="80" y="32" font-family="Fraunces, serif" font-size="14" font-weight="500" fill="#061629" text-anchor="middle">≤ 90s ciclo</text>
      </g>

      <!-- Stage 4: Call -->
      <g transform="translate(675,40)">
        <rect width="160" height="35" rx="6" fill="#0E2A47"/>
        <text x="80" y="22" fill="#F4EFE4" font-family="Fraunces, serif" font-size="14" font-weight="500" text-anchor="middle">04 · Call RT</text>
      </g>
      <g transform="translate(680,95)" filter="url(#shadow)">
        <rect width="155" height="80" rx="10" fill="#FBFAF6" stroke="#E0DAC9"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0E2A47">Call de fechamento</text>
        <text x="14" y="40" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Calendly + Meet/Zoom</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">30 min · sem ruído</text>
      </g>
      <g transform="translate(680,210)">
        <rect width="155" height="105" rx="10" fill="#F4EFE4"/>
        <text x="14" y="22" font-family="Fraunces, serif" font-size="13" font-weight="500" fill="#0E2A47">Conversa com RT</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Dúvidas técnicas</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Plano confirmado</text>
        <text x="14" y="80" font-family="Inter, sans-serif" font-size="11" font-style="italic" fill="#6B7689">Link de pagamento sai</text>
      </g>
      <g transform="translate(680,350)">
        <rect width="155" height="125" rx="10" fill="#FBFAF6" stroke="#E0DAC9"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0E2A47">OPORTUNIDADE</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#38465C">plano escolhido</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">valor + condições</text>
        <text x="14" y="74" font-family="Inter, sans-serif" font-size="11" fill="#38465C">notas RT</text>
        <text x="14" y="98" font-family="Inter, sans-serif" font-size="10" font-style="italic" fill="#6B7689">→ status: hot</text>
      </g>
      <g transform="translate(680,510)">
        <rect width="155" height="90" rx="10" fill="#0E2A47"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#6FB23E">HUMANO · RT</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Nutricionista sênior</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Roteiro de closing</text>
      </g>
      <g transform="translate(680,635)">
        <rect width="155" height="55" rx="10" fill="#6FB23E"/>
        <text x="80" y="32" font-family="Fraunces, serif" font-size="14" font-weight="500" fill="#061629" text-anchor="middle">Agenda ≤ 48h</text>
      </g>

      <!-- Stage 5: Pagamento -->
      <g transform="translate(855,40)">
        <rect width="160" height="35" rx="6" fill="#0E2A47"/>
        <text x="80" y="22" fill="#F4EFE4" font-family="Fraunces, serif" font-size="14" font-weight="500" text-anchor="middle">05 · Pagamento</text>
      </g>
      <g transform="translate(860,95)" filter="url(#shadow)">
        <rect width="155" height="80" rx="10" fill="#FBFAF6" stroke="#E0DAC9"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0E2A47">Gateway</text>
        <text x="14" y="40" font-family="Inter, sans-serif" font-size="11" fill="#38465C">PIX · Boleto · Cartão</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Asaas / Pagar.me</text>
      </g>
      <g transform="translate(860,210)">
        <rect width="155" height="105" rx="10" fill="#F4EFE4"/>
        <text x="14" y="22" font-family="Fraunces, serif" font-size="13" font-weight="500" fill="#0E2A47">Paga o plano</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Confirmação na hora</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Recibo + nota fiscal</text>
        <text x="14" y="80" font-family="Inter, sans-serif" font-size="11" font-style="italic" fill="#6B7689">Email + WhatsApp</text>
      </g>
      <g transform="translate(860,350)">
        <rect width="155" height="125" rx="10" fill="#FBFAF6" stroke="#E0DAC9"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0E2A47">CLIENTE ATIVO</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#38465C">payment_id, status</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">plano vigente</text>
        <text x="14" y="74" font-family="Inter, sans-serif" font-size="11" fill="#38465C">ciclo de cobrança</text>
        <text x="14" y="98" font-family="Inter, sans-serif" font-size="10" font-style="italic" fill="#6B7689">→ webhook seguro</text>
      </g>
      <g transform="translate(860,510)">
        <rect width="155" height="90" rx="10" fill="#0E2A47"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#6FB23E">SISTEMA</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Webhook → Supabase</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Conta PJ específica</text>
      </g>
      <g transform="translate(860,635)">
        <rect width="155" height="55" rx="10" fill="#6FB23E"/>
        <text x="80" y="32" font-family="Fraunces, serif" font-size="14" font-weight="500" fill="#061629" text-anchor="middle">Imediato</text>
      </g>

      <!-- Stage 6: Contrato + Onboarding -->
      <g transform="translate(1035,40)">
        <rect width="200" height="35" rx="6" fill="#6FB23E"/>
        <text x="100" y="22" fill="#061629" font-family="Fraunces, serif" font-size="14" font-weight="500" text-anchor="middle">06 · Contrato & Onboarding</text>
      </g>
      <g transform="translate(1040,95)" filter="url(#shadow)">
        <rect width="195" height="80" rx="10" fill="#FBFAF6" stroke="#E0DAC9"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0E2A47">Contrato + visita</text>
        <text x="14" y="40" font-family="Inter, sans-serif" font-size="11" fill="#38465C">D4Sign / Clicksign</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Visita 01 = kickoff</text>
      </g>
      <g transform="translate(1040,210)">
        <rect width="195" height="105" rx="10" fill="#F4EFE4"/>
        <text x="14" y="22" font-family="Fraunces, serif" font-size="13" font-weight="500" fill="#0E2A47">Assina + recebe RT</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Contrato eletrônico</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">RT designado</text>
        <text x="14" y="80" font-family="Inter, sans-serif" font-size="11" font-style="italic" fill="#6B7689">1ª visita agendada</text>
      </g>
      <g transform="translate(1040,350)">
        <rect width="195" height="125" rx="10" fill="#FBFAF6" stroke="#E0DAC9"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0E2A47">CONTA ATIVA</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#38465C">contrato_id assinado</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#38465C">cronograma de visitas</text>
        <text x="14" y="74" font-family="Inter, sans-serif" font-size="11" fill="#38465C">documentos baseline</text>
        <text x="14" y="98" font-family="Inter, sans-serif" font-size="10" font-style="italic" fill="#6B7689">→ painel do cliente</text>
      </g>
      <g transform="translate(1040,510)">
        <rect width="195" height="90" rx="10" fill="#0E2A47"/>
        <text x="14" y="22" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#6FB23E">HUMANO + SISTEMA</text>
        <text x="14" y="42" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">RT + automação contrato</text>
        <text x="14" y="58" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">CRM atualizado</text>
      </g>
      <g transform="translate(1040,635)">
        <rect width="195" height="55" rx="10" fill="#6FB23E"/>
        <text x="100" y="32" font-family="Fraunces, serif" font-size="14" font-weight="500" fill="#061629" text-anchor="middle">Visita ≤ 7 dias úteis</text>
      </g>

      <!-- ARROWS between stages -->
      <g stroke="#0E2A47" stroke-width="1.5" fill="none">
        <path d="M295 135 L320 135" marker-end="url(#arr)"/>
        <path d="M475 135 L500 135" marker-end="url(#arr)"/>
        <path d="M655 135 L680 135" marker-end="url(#arr)"/>
        <path d="M835 135 L860 135" marker-end="url(#arr)"/>
        <path d="M1015 135 L1040 135" marker-end="url(#arr)"/>
      </g>

      <!-- WhatsApp shortcut path (alternative entry) -->
      <g transform="translate(940,705)">
        <rect width="280" height="0" rx="8" fill="#143559"/>
      </g>
    </svg>

    <div class="legend">
      <div class="legend__item"><span class="legend__swatch" style="background:#0E2A47"></span><span><b>Navy</b> · momento padrão da jornada (operado pelo sistema)</span></div>
      <div class="legend__item"><span class="legend__swatch" style="background:#6FB23E"></span><span><b>Verde</b> · momento crítico de conversão ou métrica-âncora (SLA)</span></div>
      <div class="legend__item"><span class="legend__swatch" style="background:#F4EFE4"></span><span><b>Creme</b> · ação do cliente (experiência percebida)</span></div>
      <div class="legend__item"><span class="legend__swatch" style="background:#FBFAF6; border:1px solid #E0DAC9"></span><span><b>Branco</b> · sistemas e dados de bastidor</span></div>
    </div>
  </div>
</section>

<!-- ========== FUNIL DE CONVERSÃO ========== -->
<section class="diagram-wrap" id="funil">
  <div class="container">
    <div class="diagram-head">
      <span class="eyebrow">02 · Funil de conversão</span>
      <h2 class="display-md mt-1">Como sair de R$500 em mídia → 3 contratos.</h2>
      <p>Volumetria baseada em benchmarks B2B local services. As taxas indicadas são metas iniciais — devem ser revistas após 14 dias de campanha.</p>
    </div>

    <svg class="diagram-svg" viewBox="0 0 1280 760" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Funil de conversão Food Guard">
      <defs>
        <linearGradient id="step-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#0E2A47"/>
          <stop offset="1" stop-color="#143559"/>
        </linearGradient>
        <linearGradient id="bg-funnel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#FBFAF6"/>
          <stop offset="1" stop-color="#F4EFE4"/>
        </linearGradient>
      </defs>
      <rect width="1280" height="760" fill="url(#bg-funnel)"/>

      <!-- ASIDE METRICS RIGHT -->
      <g transform="translate(910,60)">
        <rect width="320" height="640" rx="16" fill="#061629"/>
        <text x="30" y="40" font-family="Inter, sans-serif" font-size="11" letter-spacing="2.5" font-weight="600" fill="#6FB23E">RESUMO DA CAMPANHA</text>
        <text x="30" y="78" font-family="Fraunces, serif" font-size="22" fill="#F4EFE4" font-weight="500">R$ 1.000</text>
        <text x="30" y="98" font-family="Inter, sans-serif" font-size="12" fill="#8C97AB">budget total inicial (R$500 cada)</text>

        <line x1="30" y1="120" x2="290" y2="120" stroke="#1B3A5E"/>
        <text x="30" y="148" font-family="Inter, sans-serif" font-size="11" letter-spacing="1.5" fill="#8C97AB">META MÊS 1</text>
        <text x="30" y="180" font-family="Fraunces, serif" font-size="36" fill="#6FB23E" font-weight="500">3</text>
        <text x="80" y="180" font-family="Inter, sans-serif" font-size="14" fill="#F4EFE4">contratos fechados</text>

        <line x1="30" y1="210" x2="290" y2="210" stroke="#1B3A5E"/>
        <text x="30" y="238" font-family="Inter, sans-serif" font-size="11" letter-spacing="1.5" fill="#8C97AB">CPL META</text>
        <text x="30" y="268" font-family="Fraunces, serif" font-size="26" fill="#F4EFE4" font-weight="500">R$ 22</text>
        <text x="30" y="288" font-family="Inter, sans-serif" font-size="11" fill="#8C97AB">por lead qualificado</text>

        <line x1="30" y1="310" x2="290" y2="310" stroke="#1B3A5E"/>
        <text x="30" y="338" font-family="Inter, sans-serif" font-size="11" letter-spacing="1.5" fill="#8C97AB">CAC META</text>
        <text x="30" y="368" font-family="Fraunces, serif" font-size="26" fill="#F4EFE4" font-weight="500">R$ 333</text>
        <text x="30" y="388" font-family="Inter, sans-serif" font-size="11" fill="#8C97AB">por contrato fechado</text>

        <line x1="30" y1="410" x2="290" y2="410" stroke="#1B3A5E"/>
        <text x="30" y="438" font-family="Inter, sans-serif" font-size="11" letter-spacing="1.5" fill="#8C97AB">RECEITA ESPERADA M1</text>
        <text x="30" y="478" font-family="Fraunces, serif" font-size="32" fill="#6FB23E" font-weight="500">R$ 4.500+</text>
        <text x="30" y="500" font-family="Inter, sans-serif" font-size="11" fill="#8C97AB">3 contratos · plano base</text>

        <line x1="30" y1="520" x2="290" y2="520" stroke="#1B3A5E"/>
        <text x="30" y="548" font-family="Inter, sans-serif" font-size="11" letter-spacing="1.5" fill="#8C97AB">ROAS DO 1º MÊS</text>
        <text x="30" y="578" font-family="Fraunces, serif" font-size="26" fill="#F4EFE4" font-weight="500">4,5×</text>
        <text x="30" y="598" font-family="Inter, sans-serif" font-size="11" fill="#8C97AB">recorrente; LTV 24m = 36×</text>

        <text x="30" y="628" font-family="Inter, sans-serif" font-size="10" fill="#6B7689" font-style="italic">Ajustar após 14 dias com dados reais.</text>
      </g>

      <!-- FUNNEL STEPS -->
      <g transform="translate(80,80)" font-family="Inter, sans-serif">
        <!-- Step 1 -->
        <g>
          <rect width="780" height="80" rx="10" fill="url(#step-grad)"/>
          <text x="30" y="34" fill="#F4EFE4" font-size="13" letter-spacing="2" font-weight="600">01 · IMPRESSÕES</text>
          <text x="30" y="58" fill="#F4EFE4" font-family="Fraunces, serif" font-size="20" font-weight="500">~30.000</text>
          <text x="200" y="58" fill="#8C97AB" font-size="13">Meta Ads (25k) + Google Search (5k)</text>
          <text x="660" y="34" fill="#6FB23E" font-size="11" letter-spacing="1.5">100%</text>
        </g>

        <!-- Step 2 -->
        <g transform="translate(0,100)">
          <rect width="700" height="80" rx="10" fill="url(#step-grad)"/>
          <text x="30" y="34" fill="#F4EFE4" font-size="13" letter-spacing="2" font-weight="600">02 · CLIQUES</text>
          <text x="30" y="58" fill="#F4EFE4" font-family="Fraunces, serif" font-size="20" font-weight="500">~350</text>
          <text x="160" y="58" fill="#8C97AB" font-size="13">CTR médio 1,2% · CPC R$ 2,85</text>
          <text x="580" y="34" fill="#6FB23E" font-size="11" letter-spacing="1.5">1,2%</text>
        </g>

        <!-- Step 3 -->
        <g transform="translate(0,200)">
          <rect width="540" height="80" rx="10" fill="url(#step-grad)"/>
          <text x="30" y="34" fill="#F4EFE4" font-size="13" letter-spacing="2" font-weight="600">03 · LANDING ENGAJADA</text>
          <text x="30" y="58" fill="#F4EFE4" font-family="Fraunces, serif" font-size="20" font-weight="500">~210</text>
          <text x="160" y="58" fill="#8C97AB" font-size="13">60% scroll &gt; 50% + clique CTA</text>
          <text x="420" y="34" fill="#6FB23E" font-size="11" letter-spacing="1.5">60%</text>
        </g>

        <!-- Step 4 -->
        <g transform="translate(0,300)">
          <rect width="400" height="80" rx="10" fill="url(#step-grad)"/>
          <text x="30" y="34" fill="#F4EFE4" font-size="13" letter-spacing="2" font-weight="600">04 · DIAGNÓSTICO INICIADO</text>
          <text x="30" y="58" fill="#F4EFE4" font-family="Fraunces, serif" font-size="20" font-weight="500">~95</text>
          <text x="160" y="58" fill="#8C97AB" font-size="13">Q1 respondida</text>
          <text x="280" y="34" fill="#6FB23E" font-size="11" letter-spacing="1.5">45%</text>
        </g>

        <!-- Step 5 -->
        <g transform="translate(0,400)">
          <rect width="320" height="80" rx="10" fill="url(#step-grad)"/>
          <text x="30" y="34" fill="#F4EFE4" font-size="13" letter-spacing="2" font-weight="600">05 · LEAD CAPTURADO</text>
          <text x="30" y="58" fill="#F4EFE4" font-family="Fraunces, serif" font-size="20" font-weight="500">~46</text>
          <text x="160" y="58" fill="#8C97AB" font-size="13">5 perg. + dados</text>
          <text x="200" y="34" fill="#6FB23E" font-size="11" letter-spacing="1.5">48%</text>
        </g>

        <!-- Step 6 -->
        <g transform="translate(0,500)">
          <rect width="240" height="80" rx="10" fill="url(#step-grad)"/>
          <text x="30" y="34" fill="#F4EFE4" font-size="13" letter-spacing="2" font-weight="600">06 · CALL AGENDADA</text>
          <text x="30" y="58" fill="#F4EFE4" font-family="Fraunces, serif" font-size="20" font-weight="500">~14</text>
          <text x="120" y="34" fill="#6FB23E" font-size="11" letter-spacing="1.5">30%</text>
        </g>

        <!-- Step 7 -->
        <g transform="translate(0,600)">
          <rect width="160" height="80" rx="10" fill="#6FB23E"/>
          <text x="20" y="34" fill="#061629" font-size="13" letter-spacing="2" font-weight="600">07 · FECHADO</text>
          <text x="20" y="58" fill="#061629" font-family="Fraunces, serif" font-size="22" font-weight="500">3+</text>
          <text x="80" y="34" fill="#0E2A47" font-size="11" letter-spacing="1.5">21%</text>
        </g>

        <!-- conversion arrows -->
        <g font-family="Inter, sans-serif" font-size="11" fill="#6B7689">
          <text x="800" y="125">↓ taxa de clique 1,2%</text>
          <text x="720" y="225">↓ engajou 60% dos cliques</text>
          <text x="560" y="325">↓ 45% começou diagnóstico</text>
          <text x="420" y="425">↓ 48% completou + dados</text>
          <text x="340" y="525">↓ 30% agendou call</text>
          <text x="260" y="625">↓ 21% fechou na call</text>
        </g>
      </g>

      <text x="80" y="745" font-family="Inter, sans-serif" font-size="11" fill="#6B7689" font-style="italic">
        Premissa: 50/50 split Google/Meta · canais qualificados por temas regulatórios em SP capital · landing testada com 2 variantes
      </text>
    </svg>

    <div class="legend">
      <div class="legend__item"><span class="legend__swatch" style="background:#0E2A47"></span><span>Etapas em <b>navy</b> são pontos de gargalo possíveis — cada uma tem KPI próprio.</span></div>
      <div class="legend__item"><span class="legend__swatch" style="background:#6FB23E"></span><span>Etapa em <b>verde</b> é a conversão final medida (contrato fechado).</span></div>
      <div class="legend__item"><span class="legend__swatch" style="background:#061629"></span><span>Painel em <b>preto</b> resume metas, CPL/CAC, ROAS — atualizados quinzenalmente.</span></div>
    </div>
  </div>
</section>

<!-- ========== ARQUITETURA TÉCNICA ========== -->
<section class="diagram-wrap" id="arquitetura">
  <div class="container">
    <div class="diagram-head">
      <span class="eyebrow">03 · Arquitetura técnica & segurança</span>
      <h2 class="display-md mt-1">Stack enxuto, dados blindados.</h2>
      <p>Stack pensado para começar leve e escalar sem refazer. Toda a camada de dados está atrás de RLS (Row Level Security) e cifrada em repouso. Pagamentos passam por gateway certificado — Food Guard não armazena cartão.</p>
    </div>

    <svg class="diagram-svg" viewBox="0 0 1280 760" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Arquitetura técnica e segurança Food Guard">
      <defs>
        <linearGradient id="bg-arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#FBFAF6"/>
          <stop offset="1" stop-color="#F4EFE4"/>
        </linearGradient>
        <marker id="arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#143559"/>
        </marker>
      </defs>
      <rect width="1280" height="760" fill="url(#bg-arch)"/>

      <!-- TOP LAYER: USER + EDGE -->
      <g font-family="Inter, sans-serif">
        <text x="50" y="45" font-size="11" letter-spacing="2.5" font-weight="600" fill="#6B7689">CAMADA 01 · USUÁRIO + BORDA</text>
      </g>

      <g transform="translate(50,60)">
        <rect width="200" height="90" rx="12" fill="#0E2A47"/>
        <text x="20" y="32" font-family="Fraunces, serif" font-size="16" font-weight="500" fill="#F4EFE4">Cliente</text>
        <text x="20" y="52" font-family="Inter, sans-serif" font-size="11" fill="#8C97AB">Browser + mobile</text>
        <text x="20" y="72" font-family="Inter, sans-serif" font-size="11" fill="#8C97AB">WhatsApp Business</text>
      </g>

      <g transform="translate(280,60)">
        <rect width="200" height="90" rx="12" fill="#FBFAF6" stroke="#E0DAC9" stroke-width="1.5"/>
        <text x="20" y="32" font-family="Fraunces, serif" font-size="16" font-weight="500" fill="#0E2A47">Cloudflare</text>
        <text x="20" y="52" font-family="Inter, sans-serif" font-size="11" fill="#38465C">CDN · WAF · DDoS</text>
        <text x="20" y="72" font-family="Inter, sans-serif" font-size="11" fill="#38465C">DNS · Bot mgmt</text>
      </g>

      <g transform="translate(510,60)">
        <rect width="200" height="90" rx="12" fill="#FBFAF6" stroke="#E0DAC9" stroke-width="1.5"/>
        <text x="20" y="32" font-family="Fraunces, serif" font-size="16" font-weight="500" fill="#0E2A47">Vercel Edge</text>
        <text x="20" y="52" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Landing + Site</text>
        <text x="20" y="72" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Next.js · SSR</text>
      </g>

      <g transform="translate(740,60)">
        <rect width="200" height="90" rx="12" fill="#FBFAF6" stroke="#E0DAC9" stroke-width="1.5"/>
        <text x="20" y="32" font-family="Fraunces, serif" font-size="16" font-weight="500" fill="#0E2A47">Painel cliente</text>
        <text x="20" y="52" font-family="Inter, sans-serif" font-size="11" fill="#38465C">App autenticado</text>
        <text x="20" y="72" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Magic link + 2FA</text>
      </g>

      <g transform="translate(970,60)">
        <rect width="240" height="90" rx="12" fill="#143559"/>
        <text x="20" y="32" font-family="Fraunces, serif" font-size="16" font-weight="500" fill="#F4EFE4">WhatsApp Cloud API</text>
        <text x="20" y="52" font-family="Inter, sans-serif" font-size="11" fill="#8C97AB">Meta · template msgs</text>
        <text x="20" y="72" font-family="Inter, sans-serif" font-size="11" fill="#8C97AB">webhook → IA</text>
      </g>

      <!-- LAYER 2: APP / IA -->
      <text x="50" y="195" font-family="Inter, sans-serif" font-size="11" letter-spacing="2.5" font-weight="600" fill="#6B7689">CAMADA 02 · APLICAÇÃO + IA</text>

      <g transform="translate(50,210)">
        <rect width="380" height="120" rx="12" fill="#0E2A47"/>
        <text x="20" y="32" font-family="Fraunces, serif" font-size="16" font-weight="500" fill="#F4EFE4">API Food Guard</text>
        <text x="20" y="56" font-family="Inter, sans-serif" font-size="11" fill="#8C97AB">Next.js Route Handlers · server-only</text>
        <text x="20" y="76" font-family="Inter, sans-serif" font-size="11" fill="#8C97AB">Scoring engine · gerador de diagnóstico</text>
        <text x="20" y="96" font-family="Inter, sans-serif" font-size="11" fill="#8C97AB">Validação Zod · rate limiting · logs</text>
      </g>

      <g transform="translate(460,210)">
        <rect width="280" height="120" rx="12" fill="#143559"/>
        <text x="20" y="32" font-family="Fraunces, serif" font-size="16" font-weight="500" fill="#F4EFE4">IA Qualificadora</text>
        <text x="20" y="56" font-family="Inter, sans-serif" font-size="11" fill="#8C97AB">Claude Haiku · árvore de qualificação</text>
        <text x="20" y="76" font-family="Inter, sans-serif" font-size="11" fill="#8C97AB">Tools: agendar / cotar / handoff</text>
        <text x="20" y="96" font-family="Inter, sans-serif" font-size="11" fill="#8C97AB">Guardrails + system prompt versionado</text>
      </g>

      <g transform="translate(770,210)">
        <rect width="200" height="120" rx="12" fill="#FBFAF6" stroke="#E0DAC9" stroke-width="1.5"/>
        <text x="20" y="32" font-family="Fraunces, serif" font-size="16" font-weight="500" fill="#0E2A47">Calendly</text>
        <text x="20" y="56" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Booking de calls</text>
        <text x="20" y="76" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Sync Google Calendar</text>
        <text x="20" y="96" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Webhook → CRM</text>
      </g>

      <g transform="translate(1000,210)">
        <rect width="210" height="120" rx="12" fill="#FBFAF6" stroke="#E0DAC9" stroke-width="1.5"/>
        <text x="20" y="32" font-family="Fraunces, serif" font-size="16" font-weight="500" fill="#0E2A47">D4Sign · contratos</text>
        <text x="20" y="56" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Assinatura eletrônica</text>
        <text x="20" y="76" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Trilha de auditoria</text>
        <text x="20" y="96" font-family="Inter, sans-serif" font-size="11" fill="#38465C">PDF arquivado</text>
      </g>

      <!-- LAYER 3: DATA + PAYMENTS -->
      <text x="50" y="365" font-family="Inter, sans-serif" font-size="11" letter-spacing="2.5" font-weight="600" fill="#6B7689">CAMADA 03 · DADOS + PAGAMENTOS</text>

      <g transform="translate(50,380)">
        <rect width="380" height="140" rx="12" fill="#6FB23E"/>
        <text x="20" y="32" font-family="Fraunces, serif" font-size="18" font-weight="500" fill="#061629">Supabase</text>
        <text x="20" y="56" font-family="Inter, sans-serif" font-size="11" fill="#0E2A47">Postgres · RLS por papel</text>
        <text x="20" y="76" font-family="Inter, sans-serif" font-size="11" fill="#0E2A47">Auth · Storage · Edge functions</text>
        <text x="20" y="96" font-family="Inter, sans-serif" font-size="11" fill="#0E2A47">Encryption at rest (AES-256)</text>
        <text x="20" y="116" font-family="Inter, sans-serif" font-size="11" fill="#0E2A47">Backup diário · retenção 30 dias</text>
      </g>

      <g transform="translate(460,380)">
        <rect width="280" height="140" rx="12" fill="#FBFAF6" stroke="#E0DAC9" stroke-width="1.5"/>
        <text x="20" y="32" font-family="Fraunces, serif" font-size="16" font-weight="500" fill="#0E2A47">Asaas / Pagar.me</text>
        <text x="20" y="56" font-family="Inter, sans-serif" font-size="11" fill="#38465C">PIX · Boleto · Cartão</text>
        <text x="20" y="76" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Tokenização PCI-DSS</text>
        <text x="20" y="96" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Split / conta PJ destino</text>
        <text x="20" y="116" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Webhook seguro (HMAC)</text>
      </g>

      <g transform="translate(770,380)">
        <rect width="200" height="140" rx="12" fill="#FBFAF6" stroke="#E0DAC9" stroke-width="1.5"/>
        <text x="20" y="32" font-family="Fraunces, serif" font-size="16" font-weight="500" fill="#0E2A47">Resend</text>
        <text x="20" y="56" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Transacional</text>
        <text x="20" y="76" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Diagnóstico PDF</text>
        <text x="20" y="96" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Recibos · contratos</text>
      </g>

      <g transform="translate(1000,380)">
        <rect width="210" height="140" rx="12" fill="#FBFAF6" stroke="#E0DAC9" stroke-width="1.5"/>
        <text x="20" y="32" font-family="Fraunces, serif" font-size="16" font-weight="500" fill="#0E2A47">Storage privado</text>
        <text x="20" y="56" font-family="Inter, sans-serif" font-size="11" fill="#38465C">PDF · imagens</text>
        <text x="20" y="76" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Signed URLs</text>
        <text x="20" y="96" font-family="Inter, sans-serif" font-size="11" fill="#38465C">Acesso por RLS</text>
      </g>

      <!-- LAYER 4: SECURITY GUARDRAILS -->
      <text x="50" y="555" font-family="Inter, sans-serif" font-size="11" letter-spacing="2.5" font-weight="600" fill="#6B7689">CAMADA 04 · GUARDRAILS DE SEGURANÇA, LGPD &amp; AUDITORIA</text>

      <g transform="translate(50,575)">
        <rect width="1160" height="140" rx="12" fill="#061629"/>

        <g transform="translate(25,30)">
          <text font-family="Inter, sans-serif" font-size="11" letter-spacing="1.5" font-weight="600" fill="#6FB23E">LGPD</text>
          <text y="22" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">DPO designado</text>
          <text y="38" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Consent log</text>
          <text y="54" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Right to delete</text>
          <text y="70" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Política pública</text>
        </g>

        <g transform="translate(200,30)">
          <text font-family="Inter, sans-serif" font-size="11" letter-spacing="1.5" font-weight="600" fill="#6FB23E">ACESSO</text>
          <text y="22" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">RLS por papel</text>
          <text y="38" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">2FA painel admin</text>
          <text y="54" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">SSO Google Workspace</text>
          <text y="70" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Revogação imediata</text>
        </g>

        <g transform="translate(375,30)">
          <text font-family="Inter, sans-serif" font-size="11" letter-spacing="1.5" font-weight="600" fill="#6FB23E">SEGREDOS</text>
          <text y="22" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Vault rotacionado</text>
          <text y="38" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">.env nunca em repo</text>
          <text y="54" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Service roles segregadas</text>
          <text y="70" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Tokens TTL curto</text>
        </g>

        <g transform="translate(560,30)">
          <text font-family="Inter, sans-serif" font-size="11" letter-spacing="1.5" font-weight="600" fill="#6FB23E">AUDITORIA</text>
          <text y="22" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Log de acesso 90d</text>
          <text y="38" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Trilha de pgto imutável</text>
          <text y="54" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Alertas anomalia</text>
          <text y="70" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Sentry · BetterStack</text>
        </g>

        <g transform="translate(745,30)">
          <text font-family="Inter, sans-serif" font-size="11" letter-spacing="1.5" font-weight="600" fill="#6FB23E">IA</text>
          <text y="22" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Prompt versionado</text>
          <text y="38" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">PII redaction</text>
          <text y="54" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Handoff humano</text>
          <text y="70" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Sem treinar com dados</text>
        </g>

        <g transform="translate(920,30)">
          <text font-family="Inter, sans-serif" font-size="11" letter-spacing="1.5" font-weight="600" fill="#6FB23E">CONTINUIDADE</text>
          <text y="22" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Backup diário</text>
          <text y="38" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">RPO 24h · RTO 4h</text>
          <text y="54" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Disaster recovery</text>
          <text y="70" font-family="Inter, sans-serif" font-size="11" fill="#F4EFE4">Runbook documentado</text>
        </g>
      </g>

      <!-- arrows -->
      <g stroke="#143559" stroke-width="1.4" fill="none">
        <path d="M250 105 L280 105" marker-end="url(#arr2)"/>
        <path d="M480 105 L510 105" marker-end="url(#arr2)"/>
        <path d="M610 150 L240 210" marker-end="url(#arr2)" stroke-dasharray="4 3"/>
        <path d="M840 150 L600 210" marker-end="url(#arr2)" stroke-dasharray="4 3"/>
        <path d="M1090 150 L600 210" marker-end="url(#arr2)" stroke-dasharray="4 3"/>
        <path d="M240 330 L240 380" marker-end="url(#arr2)"/>
        <path d="M600 330 L600 380" marker-end="url(#arr2)"/>
        <path d="M870 330 L870 380" marker-end="url(#arr2)"/>
        <path d="M1105 330 L1105 380" marker-end="url(#arr2)"/>
      </g>
    </svg>

    <div class="legend">
      <div class="legend__item"><span class="legend__swatch" style="background:#0E2A47"></span><span>Aplicação Food Guard — código próprio sob versionamento Git.</span></div>
      <div class="legend__item"><span class="legend__swatch" style="background:#6FB23E"></span><span>Banco de dados Supabase com RLS — única fonte de verdade.</span></div>
      <div class="legend__item"><span class="legend__swatch" style="background:#143559"></span><span>Integrações de IA / mensageria — sob contrato e auditadas.</span></div>
      <div class="legend__item"><span class="legend__swatch" style="background:#061629"></span><span>Guardrails de segurança — atravessam todas as camadas.</span></div>
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="cta-band">
      <h2 class="cta-band__title">PRD completo + planilhas de mídia<br>vão no <em>documento principal.</em></h2>
      <div class="cta-band__actions">
        <a class="btn btn--leaf" href="index.html">
          Voltar ao site
          <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="container">
    <div class="footer__bar">
      <span>© 2026 Food Guard Assessoria.</span>
      <span>Excelência em Segurança Alimentar</span>
    </div>
  </div>
</footer>

</body>
</html>
</pasted_text>

## Assistant

_[tool: write_file]_

_[tool: write_file]_

Entendi — você quer ver essa página de visualizações do PRD do Food Guard renderizada. O HTML referencia `styles.css` que ainda não existe. Vou criar o stylesheet inferindo o sistema visual do próprio HTML (Fraunces + Inter, paleta navy/creme/verde-folha) e salvar a página.

_[tool: done]_

_[tool: fork_verifier_agent]_

Pronto. A página `prd.html` foi salva com o `styles.css` correspondente (Fraunces + Inter, paleta navy/creme/verde-folha derivada do próprio HTML).

**Próximos passos sugeridos:**
- As páginas linkadas no menu (`index.html`, `servicos.html`, `sobre.html`, `cases.html`, `contato.html`) ainda não existem — me avise quais quer construir em seguida.
- Os diagramas SVG são responsivos no container mas mantêm o viewBox de 1280px; em telas estreitas eles encolhem (pode ficar denso). Se quiser, posso adaptar a jornada para um layout vertical/cards em mobile.

## User

file:///C:/Users/rafae/AppData/Local/Packages/Claude_pzs8sxrjxfjjc/LocalCache/Roaming/Claude/local-agent-mode-sessions/dbc7abfe-1610-4c0d-919a-ee7a4c96aa42/1fab26d4-9d3f-4232-ad34-b3df8cf9fc5d/local_505f5021-d0bd-4f23-aaaa-8966be09c25a/outputs/index.html

## Assistant

_[tool: questions_v2]_

Esse caminho `file:///C:/...` é local da sua máquina — não consigo abrir daqui. 

Posso construir a `index.html` (home do site Food Guard Assessoria) seguindo o mesmo design system da `prd.html`? Antes de começar, algumas perguntas rápidas:

## User

Questions answered:
- pages_scope: Todas
- home_sections: Decida por mim
- tone: Acolhedor / parceria de longo prazo
- hero_metaphor: 4
- imagery: Placeholders para fotos reais (cozinha, equipe, vistorias)
- tweaks: Cor de acento (verde × laranja × navy), Layout do hero (variantes), Densidade da home (curta × longa), Tom da copy (formal × direto)

## Assistant

_[tool: update_todos]_

_[tool: copy_starter_component]_

_[tool: str_replace_edit]_

Vou estender o CSS e construir as 5 páginas. Começando pelo CSS:

_[tool: str_replace_edit]_

Agora a página inicial, com os tweaks integrados:

_[tool: write_file]_

## Assistant

_[tool: write_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: write_file]_

_[tool: read_file]_

Good — TweakRadio accepts `{value, label}` objects. Now build the four secondary pages. I'll keep them simpler than the home but stylistically consistent.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: update_todos]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Pronto. As 5 páginas do site Food Guard estão construídas, todas no mesmo design system editorial (Fraunces serif + Inter, paleta creme/navy/verde-folha):

- **index.html** — Home com hero split (foto + painel navy com selo verde), trust strip, dores, como funciona, stats, planos, cases, equipe, formulário de diagnóstico, FAQ e footer expandido. **Tweaks** ativos: tom (acolhedor × direto), layout do hero (split / editorial / pergunta), densidade (curta × completa) e cor de acento (verde / laranja / navy).
- **servicos.html** — Os 3 planos detalhados + serviços avulsos + o que sempre está incluído.
- **sobre.html** — História com drop cap, 4 princípios, equipe técnica.
- **cases.html** — 3 cases em destaque alternados (imagem ↔ texto) com métricas-resultado e depoimento.
- **contato.html** — Cartões de contato (WhatsApp / e-mail / endereço / horário) + formulário grande sobre fundo escuro.

**Próximos passos quando você quiser:**
- Trocar os placeholders de fotos (cozinha, equipe, unidades dos cases) por imagens reais.
- Validar os números (+180 marcas, 15 anos, 100% aprovação) e ajustar.
- Adicionar logos reais dos clientes no trust strip da home (hoje só nomes).

## User

Verifier agent check completed

## Assistant

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Vou corrigir a sobreposição do selo no título do hero:

_[tool: grep]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Selo do hero corrigido — agora o título tem `padding-right` no variant split para o texto quebrar antes do selo. Aguardando verificação.

## User

Verifier agent check completed

## Assistant

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Padding aumentado e selo levemente reduzido. Aguardando verificação.

## User

Verifier agent check completed

## Assistant

Tudo certo agora — o selo do hero não colide mais com o título nem com o subtítulo. O site Food Guard está completo:

- **index.html** (Home) com tweaks de tom, hero, densidade e cor de acento
- **servicos.html**, **sobre.html**, **cases.html**, **contato.html**
- **prd.html** (visualizações da jornada/funil/arquitetura, da rodada anterior)

## User

Save as standalone HTML: index.html

## Assistant

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: super_inline_html]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: get_webview_logs]_

Clean — só o aviso padrão do Babel. Vou entregar:

_[tool: present_fs_item_for_download]_

Pronto — arquivo único, abre offline. As outras páginas (`servicos.html`, `sobre.html`, `cases.html`, `contato.html`, `prd.html`) ficam só no projeto; o standalone é a home com os tweaks.

## User

Assessoria nutricional · ( manteremos apenas esse nome 
Ao lado de quem cuida da comida das pessoas.
A gente assume a responsabilidade técnica do seu estabelecimento — do diagnóstico inicial às visitas mensais — para você cozinhar tranquilo, sabendo que tudo está em conformidade.

## Assistant

_[tool: str_replace_edit]_

Feito. Eyebrow agora é só "Assessoria nutricional".

## User

Ao lado de quem cuida da comida das pessoas.
A gente assume a responsabilidade técnica do seu estabelecimento — do diagnóstico inicial às visitas mensais — para você cozinhar tranquilo, sabendo que tudo está em conformidade. acredito que podemos mudar e deixar mais atrativo e comercial

## Assistant

_[tool: str_replace_edit]_

Que tal mais focado no benefício + um número-âncora?Pronto. Versão acolhedora agora é:

**Título:** "Sua cozinha protegida, *seu sono em paz.*"
**Subtítulo:** "Assumimos a RT nutricionista do seu CNPJ a partir de R$ 890/mês — com visitas mensais, manuais customizados e treinamentos inclusos. Em 7 dias úteis sua operação está blindada contra multa e vigilância."

Mais commercial: benefício emocional no título, número-âncora (R$ 890) e prazo (7 dias) no subtítulo. Se quiser explorar outras direções (mais provocativa, mais técnica, ou destacando ROI/economia de multa), me avise.

## User

ainda nao esta comercial. o tom ainda esta intimidador. precisa ser atrativo. os preços nao aparecem de primeira.so apos a geraçao do lead com o prreecnimento dos dados

## Assistant

_[tool: str_replace_edit]_

Entendi — vou refazer o tom pra ficar convidativo e tirar todos os preços antes do lead.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Agora preciso esconder os preços dos planos (home + serviços), só liberados após o diagnóstico:Pronto. Mudanças aplicadas:

**Tom — agora convidativo, não intimidador:**
- Hero: "Mais tempo pra cozinhar, *menos pra burocracia.*" + lede focada em ganho, sem preço.
- Seção de "dores" virou "**O que muda com a Food Guard**" — três benefícios positivos (equipe segura, vigilância como rotina, continuidade garantida). Removidas as menções a multa/R$ 1,5M.

**Preços ocultos até o lead:**
- Cards de planos (home + serviços) agora mostram **posicionamento** ("Pra começar com tudo em dia", "Pra crescer com segurança", "Pra redes e operações complexas") em vez de valor.
- CTA dos planos virou **"Quero conhecer"** apontando direto pro diagnóstico (`#diagnostico`), que é onde o lead é gerado.

Se quiser, posso adicionar uma frase pequena nos cards tipo "*Proposta personalizada após diagnóstico*" pra reforçar isso.

## User

assim ficou perfeito. tom acoledor hero pergunta pagina completa e cor de assente na palheta laranja. mantenha o deseign assim

## Assistant

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Configuração salva como padrão. Toda vez que a página abrir, ela já carrega com:
- Tom acolhedor
- Hero variant "pergunta"
- Densidade completa
- Acento laranja

## User

Save as standalone HTML: index.html

## Assistant

_[tool: super_inline_html]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: present_fs_item_for_download]_

Pronto — versão atualizada com hero pergunta, tom acolhedor, densidade completa e acento laranja como padrão.

