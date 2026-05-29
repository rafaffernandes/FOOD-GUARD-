# Cinco Ícones

_Started 2026-05-19 21:23 UTC_

---

## User

<system-info comment="Only acknowledge these if relevant">
Project title is now "Food guard (Remix)"
User is viewing file: Food Guard - Site Completo.html
Current date is now May 19, 2026
</system-info>

<pasted_text name="Pasted text (894 lines)">
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Diagnóstico regulatório gratuito · Food Guard</title>
<meta name="description" content="Está em conformidade com a vigilância sanitária? Descubra em 90 segundos. Diagnóstico gratuito com RT nutricionista. Sem compromisso." />
<meta property="og:title" content="Diagnóstico regulatório gratuito · Food Guard" />
<meta property="og:description" content="Em 90 segundos, descubra o gap regulatório da sua operação. Plano de ação + preço incluso. Sem custo." />
<meta property="og:type" content="website" />

<!-- Pixels (placeholders prontos para receber IDs) -->
<!-- Meta Pixel -->
<script>
  /* MetaPixelID = '000000000000000' — substituir antes do go-live */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window,document,'script');
  // window.fbq && fbq('init', 'MetaPixelID');
  // window.fbq && fbq('track', 'PageView');
</script>
<!-- GA4 -->
<script>
  /* GA4MeasurementID = 'G-XXXXXXXXXX' — substituir antes do go-live */
  // window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'GA4MeasurementID');
</script>

<link rel="stylesheet" href="styles.css" />
<style>
  body { background: var(--paper); }

  /* HERO landing-specific */
  .lp-hero {
    position: relative;
    padding: clamp(2rem, 4vw, 4rem) 0 clamp(3rem, 5vw, 5rem);
    background:
      radial-gradient(ellipse 70% 50% at 100% 0%, rgba(111, 178, 62, 0.14), transparent 60%),
      radial-gradient(ellipse 50% 35% at 0% 100%, rgba(14, 42, 71, 0.06), transparent 60%),
      var(--paper);
    overflow: hidden;
  }
  .lp-hero__grid {
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
  }
  @media (max-width: 980px) { .lp-hero__grid { grid-template-columns: 1fr; } }

  .lp-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: var(--cream);
    border: 1px solid var(--stone);
    padding: 0.5rem 1rem 0.5rem 0.55rem;
    border-radius: 999px;
    font-size: 0.83rem;
    color: var(--text-2);
    font-weight: 500;
    margin-bottom: 1.5rem;
  }
  .lp-badge .dot {
    width: 9px; height: 9px; border-radius: 50%;
    background: var(--leaf);
    box-shadow: 0 0 0 4px rgba(111, 178, 62, 0.18);
  }

  .lp-title {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(2.5rem, 5.5vw, 4.5rem);
    line-height: 1.0;
    letter-spacing: -0.024em;
    color: var(--navy);
    margin-bottom: 1.5rem;
  }
  .lp-title em {
    font-style: italic;
    color: var(--leaf-dark);
    font-weight: 300;
  }
  .lp-title u {
    text-decoration: none;
    background: linear-gradient(transparent 70%, rgba(111,178,62,0.35) 70%);
    padding: 0 0.1em;
  }

  .lp-lede {
    font-family: var(--font-display);
    font-weight: 300;
    font-size: clamp(1.05rem, 1.4vw, 1.3rem);
    line-height: 1.45;
    color: var(--text-2);
    margin-bottom: 2rem;
    max-width: 44ch;
  }

  .lp-bullets {
    list-style: none;
    display: grid;
    gap: 0.75rem;
    margin-bottom: 2rem;
    padding: 0;
  }
  .lp-bullets li {
    padding-left: 2rem;
    position: relative;
    font-size: 0.98rem;
    color: var(--text);
    font-weight: 500;
  }
  .lp-bullets li::before {
    content: "";
    position: absolute;
    left: 0; top: 0.25em;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: var(--leaf);
    background-image: linear-gradient(135deg, var(--leaf), var(--leaf-dark));
  }
  .lp-bullets li::after {
    content: "";
    position: absolute;
    left: 5px; top: 9px;
    width: 9px; height: 5px;
    border-left: 2px solid var(--paper);
    border-bottom: 2px solid var(--paper);
    transform: rotate(-45deg);
  }

  .lp-cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }
  .lp-cta-row .btn--leaf { padding: 1.05rem 1.85rem; font-size: 1rem; }

  .lp-sub {
    font-size: 0.85rem;
    color: var(--text-3);
    margin-top: 1.25rem;
  }

  /* Right-side form card */
  .lp-card {
    background: var(--paper);
    border: 1px solid var(--stone);
    border-radius: 20px;
    padding: clamp(1.75rem, 3vw, 2.25rem);
    box-shadow: 0 30px 60px -30px rgba(6,22,41,0.25);
    position: relative;
  }
  .lp-card::before {
    content: "GRATUITO";
    position: absolute;
    top: -12px; left: 24px;
    background: var(--leaf);
    color: var(--ink);
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    font-weight: 700;
  }
  .lp-card h3 {
    font-family: var(--font-display);
    font-size: 1.45rem;
    font-weight: 500;
    color: var(--navy);
    margin-bottom: 0.3rem;
    letter-spacing: -0.012em;
  }
  .lp-card p.muted {
    color: var(--text-2);
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }
  .lp-card .steps {
    display: grid;
    gap: 0.85rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--line);
  }
  .lp-step {
    display: grid;
    grid-template-columns: 28px 1fr;
    gap: 0.85rem;
    align-items: start;
  }
  .lp-step__num {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: var(--cream);
    color: var(--navy);
    font-family: var(--font-display);
    font-weight: 500;
    font-size: 0.95rem;
    display: grid;
    place-items: center;
  }
  .lp-step__body strong { display: block; color: var(--navy); font-size: 0.98rem; }
  .lp-step__body span { display: block; color: var(--text-2); font-size: 0.88rem; margin-top: 0.2rem; }

  .lp-card .btn { width: 100%; justify-content: center; }
  .lp-card .micro {
    text-align: center;
    font-size: 0.78rem;
    color: var(--text-3);
    margin-top: 0.85rem;
  }

  /* Risk strip */
  .risk-strip {
    background: var(--ink);
    color: var(--cream);
    padding: clamp(2rem, 3vw, 2.5rem) 0;
  }
  .risk-strip__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  @media (max-width: 800px) { .risk-strip__grid { grid-template-columns: repeat(2, 1fr); } }
  .risk-stat dt {
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(244,239,228,0.5);
    margin-bottom: 0.5rem;
  }
  .risk-stat dd {
    font-family: var(--font-display);
    font-size: clamp(1.85rem, 3vw, 2.6rem);
    font-weight: 500;
    color: var(--leaf);
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .risk-stat dd span { font-family: var(--font-body); color: rgba(244,239,228,0.7); font-size: 0.4em; font-weight: 400; margin-left: 0.2rem; }
  .risk-stat .sub { color: rgba(244,239,228,0.65); font-size: 0.85rem; margin-top: 0.4rem; }

  /* For whom */
  .for-whom {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-top: 2.5rem;
  }
  @media (max-width: 880px) { .for-whom { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .for-whom { grid-template-columns: 1fr; } }
  .whom {
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 1.25rem 1.25rem 1.4rem;
    transition: all 0.25s ease;
  }
  .whom:hover { transform: translateY(-2px); border-color: var(--leaf); }
  .whom__icon {
    width: 36px; height: 36px;
    border-radius: 9px;
    background: var(--cream);
    display: grid;
    place-items: center;
    color: var(--navy);
    margin-bottom: 0.85rem;
  }
  .whom h4 {
    font-family: var(--font-display);
    font-weight: 500;
    color: var(--navy);
    font-size: 1.05rem;
    margin-bottom: 0.25rem;
  }
  .whom p { font-size: 0.85rem; color: var(--text-2); line-height: 1.5; }

  /* Plans preview */
  .plans-mini {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 2rem;
  }
  @media (max-width: 860px) { .plans-mini { grid-template-columns: 1fr; } }
  .plan {
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 1.85rem 1.75rem;
    display: flex;
    flex-direction: column;
    transition: all 0.25s ease;
    position: relative;
  }
  .plan--featured {
    border-color: var(--navy);
    box-shadow: 0 18px 36px -22px rgba(6,22,41,0.35);
    background: var(--cream);
  }
  .plan--featured::before {
    content: "Mais escolhido";
    position: absolute;
    top: -12px; right: 18px;
    background: var(--navy);
    color: var(--paper);
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    font-weight: 600;
    text-transform: uppercase;
  }
  .plan h4 {
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: var(--navy);
    font-weight: 500;
    margin-bottom: 0.4rem;
  }
  .plan .price {
    font-family: var(--font-display);
    font-size: 2.2rem;
    color: var(--navy);
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.018em;
    margin-bottom: 0.4rem;
  }
  .plan .price small { font-family: var(--font-body); font-weight: 500; color: var(--text-3); font-size: 0.85rem; margin-left: 0.2rem; }
  .plan .visit {
    color: var(--leaf-dark);
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.04em;
    margin-bottom: 1rem;
  }
  .plan ul { list-style: none; padding: 0; margin: 0 0 1.5rem; display: grid; gap: 0.55rem; }
  .plan li {
    padding-left: 1.4rem;
    position: relative;
    font-size: 0.88rem;
    color: var(--text-2);
    line-height: 1.45;
  }
  .plan li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--leaf-dark);
    font-weight: 700;
  }

  /* Reviews */
  .reviews {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin-top: 2.5rem;
  }
  @media (max-width: 860px) { .reviews { grid-template-columns: 1fr; } }
  .review {
    background: var(--cream);
    border-radius: 16px;
    padding: 1.5rem 1.6rem;
  }
  .review p {
    font-family: var(--font-display);
    font-size: 1.02rem;
    font-weight: 400;
    color: var(--navy);
    line-height: 1.4;
    margin-bottom: 1rem;
    font-style: italic;
  }
  .review__author { font-size: 0.85rem; color: var(--text-2); }
  .review__author b { color: var(--navy); font-weight: 600; display: block; }

  /* FAQ inline */
  .faq-inline { max-width: 760px; margin: 0 auto; }
  .faq-inline summary { font-size: 1.05rem; }

  /* Floating WhatsApp */
  .wpp-float {
    position: fixed;
    right: 24px; bottom: 24px;
    z-index: 50;
    background: var(--leaf-dark);
    color: var(--paper);
    padding: 0.85rem 1.2rem;
    border-radius: 999px;
    box-shadow: 0 16px 32px -8px rgba(6,22,41,0.4);
    font-weight: 600;
    font-size: 0.92rem;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    transition: transform 0.2s;
  }
  .wpp-float:hover { transform: translateY(-2px); background: var(--leaf); color: var(--ink); }

  /* Diagnostic mock visual (right hero) — replaces stock photo */
  .diag-mock {
    aspect-ratio: 4/5;
    border-radius: 20px;
    padding: 2rem;
    background:
      radial-gradient(ellipse 80% 60% at 100% 0%, rgba(111,178,62,0.18), transparent 60%),
      linear-gradient(135deg, var(--ink) 0%, var(--navy) 100%);
    color: var(--cream);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .diag-mock__head { display: flex; justify-content: space-between; align-items: center; opacity: 0.7; font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; }
  .diag-mock__center { text-align: center; padding: 1rem 0; }
  .diag-mock__score-label { font-size: 0.78rem; letter-spacing: 0.18em; opacity: 0.65; }
  .diag-mock__score { font-family: var(--font-display); font-size: clamp(5rem, 12vw, 8rem); font-weight: 400; line-height: 1; letter-spacing: -0.04em; margin: 0.5rem 0; }
  .diag-mock__score-of { font-size: 0.42em; opacity: 0.6; font-weight: 400; margin-left: 0.2rem; }
  .diag-mock__risk { display: inline-block; padding: 0.4rem 0.85rem; border-radius: 999px; background: rgba(255,179,71,0.18); color: #FFB347; font-size: 0.83rem; font-weight: 600; letter-spacing: 0.04em; }
  .diag-mock__rec {
    background: rgba(244,239,228,0.06);
    border: 1px solid rgba(244,239,228,0.12);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    font-size: 0.85rem;
  }
  .diag-mock__rec b { color: var(--leaf); display: block; font-size: 0.95rem; margin-bottom: 0.15rem; }
  .diag-mock__rec .price { color: var(--cream); font-family: var(--font-display); font-size: 1.6rem; font-weight: 500; line-height: 1; margin-top: 0.5rem; letter-spacing: -0.012em; }

  /* Logo bar */
  .logos-bar {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    justify-content: center;
    flex-wrap: wrap;
    padding: 2rem 0;
    opacity: 0.85;
  }
  .logos-bar span {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 500;
    color: var(--text-3);
    font-size: 1.1rem;
  }
  .logos-bar .bold { font-family: var(--font-body); font-style: normal; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; font-size: 0.95rem; }

  /* Sticky footer CTA mobile */
  @media (max-width: 720px) {
    .lp-cta-sticky {
      position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 49;
      background: var(--navy); color: var(--paper);
      padding: 1rem 1.2rem;
      border-radius: 14px;
      box-shadow: 0 18px 38px -14px rgba(6,22,41,0.55);
      display: flex; justify-content: space-between; align-items: center;
      font-weight: 600;
      gap: 0.85rem;
    }
    .lp-cta-sticky b { font-family: var(--font-display); font-weight: 500; font-size: 1.05rem; }
    .lp-cta-sticky .arr { width: 18px; height: 18px; }
    .wpp-float { bottom: 80px; }
  }
  @media (min-width: 721px) { .lp-cta-sticky { display: none; } }
</style>
</head>
<body>

<!-- Minimal nav (não distrair da conversão) -->
<header class="topbar">
  <div class="topbar__inner">
    <a class="brand" href="index.html">
      <span class="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none"><path d="M9 4v10a3 3 0 0 0 6 0V4" stroke="#0E2A47" stroke-width="2" stroke-linecap="round"/><path d="M12 14v6" stroke="#0E2A47" stroke-width="2" stroke-linecap="round"/></svg>
      </span>
      <span>Food Guard<small>Assessoria</small></span>
    </a>
    <a href="#diagnostico" class="btn btn--primary" onclick="trackCTA('topbar')">
      Começar diagnóstico
      <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
  </div>
</header>

<!-- ============ HERO ============ -->
<section class="lp-hero">
  <div class="container">
    <div class="lp-hero__grid">
      <div>
        <span class="lp-badge">
          <span class="dot" aria-hidden="true"></span>
          Diagnóstico gratuito · 90 segundos · sem ligação
        </span>
        <h1 class="lp-title">
          Sua operação <u>está em conformidade</u> com a vigilância sanitária <em>hoje?</em>
        </h1>
        <p class="lp-lede">
          Em 90 segundos descobrimos o gap regulatório da sua escola, restaurante, padaria ou hotel — e entregamos o plano de ação por escrito. Sem cobrar nada.
        </p>
        <ul class="lp-bullets">
          <li>Score de risco regulatório calculado em tempo real</li>
          <li>Lista do que falta para passar em fiscalização</li>
          <li>Preço fixo dos 3 planos, sem ginga comercial</li>
          <li>Call com o RT Renan Muniz quando você quiser</li>
        </ul>
        <div class="lp-cta-row">
          <a href="#diagnostico" class="btn btn--leaf" onclick="trackCTA('hero_primary')">
            Começar diagnóstico grátis
            <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="https://wa.me/5511900000000?text=Quero+saber+mais+sobre+o+Food+Guard" target="_blank" rel="noopener" class="btn btn--ghost" onclick="trackCTA('hero_whatsapp')">
            Falar no WhatsApp
          </a>
        </div>
        <p class="lp-sub">100% gratuito · sob NDA · sem ligação automática</p>
      </div>

      <!-- Diag mockup -->
      <aside class="diag-mock" aria-hidden="true">
        <div class="diag-mock__head">
          <span>Diagnóstico Food Guard</span>
          <span>Caso típico</span>
        </div>
        <div class="diag-mock__center">
          <div class="diag-mock__score-label">SCORE DE CONFORMIDADE</div>
          <div class="diag-mock__score">42<span class="diag-mock__score-of">/100</span></div>
          <div class="diag-mock__risk">Risco médio · gaps relevantes</div>
        </div>
        <div class="diag-mock__rec">
          <b>Plano recomendado</b>
          Profissional · 2 visitas semanais
          <div class="price">R$ 2.700<small style="font-size:0.55em; opacity:0.6;">/mês</small></div>
        </div>
      </aside>
    </div>
  </div>
</section>

<!-- ============ RISK STRIP ============ -->
<section class="risk-strip">
  <div class="container">
    <span class="eyebrow" style="color: var(--leaf);">Por que importa</span>
    <h2 class="display-md mt-1 mb-3" style="color: var(--cream); max-width: 24ch;">A multa não avisa antes de chegar.</h2>
    <dl class="risk-strip__grid">
      <div class="risk-stat">
        <dt>Multa típica · 1ª autuação</dt>
        <dd>R$ 12k<span>+</span></dd>
        <p class="sub">Pode chegar a R$ 1,5M para indústria</p>
      </div>
      <div class="risk-stat">
        <dt>Tempo médio de adequação tardia</dt>
        <dd>6<span>meses</span></dd>
        <p class="sub">Operando sob risco neste período</p>
      </div>
      <div class="risk-stat">
        <dt>Operações autuadas/ano em SP</dt>
        <dd>30%<span>+</span></dd>
        <p class="sub">Food service e indústria, ANVISA</p>
      </div>
      <div class="risk-stat">
        <dt>Diagnóstico Food Guard</dt>
        <dd>90s</dd>
        <p class="sub">E você sai com o plano em mãos</p>
      </div>
    </dl>
  </div>
</section>

<!-- ============ FOR WHOM ============ -->
<section class="section">
  <div class="container">
    <span class="eyebrow">Para quem</span>
    <h2 class="display-lg mt-1" style="max-width: 18ch;">Se você comanda uma operação que serve alimento, isso é para você.</h2>

    <div class="for-whom">
      <div class="whom">
        <div class="whom__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="currentColor" stroke-width="1.8"/></svg>
        </div>
        <h4>Escolas e creches</h4>
        <p>Refeitório próprio ou terceirizado · RT obrigatório por lei</p>
      </div>
      <div class="whom">
        <div class="whom__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 7h16l-1 13H5L4 7z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" stroke-width="1.8"/></svg>
        </div>
        <h4>Restaurantes</h4>
        <p>Operação à la carte, delivery, dark kitchen · BPF · APPCC</p>
      </div>
      <div class="whom">
        <div class="whom__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </div>
        <h4>Padarias e confeitarias</h4>
        <p>Produção própria · selo de origem · rotulagem nutricional</p>
      </div>
      <div class="whom">
        <div class="whom__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 21V8l9-5 9 5v13M9 21v-7h6v7" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
        </div>
        <h4>Hotéis e buffets</h4>
        <p>Volume alto · operação 24/7 · fiscalização frequente</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ PLANS PREVIEW ============ -->
<section class="section section--cream" id="planos">
  <div class="container">
    <div style="display:flex; justify-content:space-between; align-items:end; gap:2rem; flex-wrap:wrap; margin-bottom:1.5rem;">
      <div>
        <span class="eyebrow">Planos transparentes</span>
        <h2 class="display-lg mt-1" style="max-width:22ch;">Preço fixo. Sem negociação cansativa.</h2>
      </div>
      <p style="max-width:36ch; color:var(--text-2); font-size:0.95rem;">
        Você sai do diagnóstico já com o plano sugerido e o preço. Quer comparar, escolher diferente ou tirar dúvida? A call de 30min com o RT serve para isso.
      </p>
    </div>

    <div class="plans-mini">
      <div class="plan">
        <h4>Essencial</h4>
        <div class="price">R$ 1.500<small>/mês</small></div>
        <div class="visit">1 VISITA / SEMANA</div>
        <ul>
          <li>RT nutricionista designado</li>
          <li>Manual de Boas Práticas</li>
          <li>POPs operacionais</li>
          <li>Treinamento semestral</li>
          <li>Suporte WhatsApp comercial</li>
        </ul>
        <a href="#diagnostico" class="btn btn--ghost" onclick="trackCTA('plan_essencial')">Começar diagnóstico</a>
      </div>

      <div class="plan plan--featured">
        <h4>Profissional</h4>
        <div class="price">R$ 2.700<small>/mês</small></div>
        <div class="visit">2 VISITAS / SEMANA</div>
        <ul>
          <li>Tudo do Essencial +</li>
          <li>Plano APPCC incluso</li>
          <li>Treinamento trimestral</li>
          <li>Auditoria preventiva 2×/ano</li>
          <li>Acompanhamento em fiscalização</li>
        </ul>
        <a href="#diagnostico" class="btn btn--primary" onclick="trackCTA('plan_profissional')">Começar diagnóstico</a>
      </div>

      <div class="plan">
        <h4>Premium</h4>
        <div class="price">R$ 3.800<small>/mês</small></div>
        <div class="visit">3 VISITAS / SEMANA</div>
        <ul>
          <li>Tudo do Profissional +</li>
          <li>RT sênior · Renan Muniz</li>
          <li>APPCC completo</li>
          <li>Treinamento mensal</li>
          <li>Plantão WhatsApp 24/7</li>
          <li>Auditoria trimestral</li>
        </ul>
        <a href="#diagnostico" class="btn btn--ghost" onclick="trackCTA('plan_premium')">Começar diagnóstico</a>
      </div>
    </div>

    <p style="text-align:center; color:var(--text-3); font-size:0.85rem; margin-top:1.5rem;">
      Contrato com carência de 12 meses · multa de 40% sobre meses remanescentes em caso de rescisão antecipada.
    </p>
  </div>
</section>

<!-- ============ REVIEWS ============ -->
<section class="section">
  <div class="container">
    <span class="eyebrow">O que dizem nossos clientes</span>
    <h2 class="display-lg mt-1" style="max-width:18ch;">Operações reais. Resultados auditáveis.</h2>

    <div class="reviews">
      <article class="review">
        <p>"Fui notificada pela vigilância na quinta. Sexta o RT do Food Guard estava na escola. Em 30 dias estávamos 100% adequados."</p>
        <div class="review__author">
          <b>Diretora pedagógica · T.M.*</b>
          Diretora pedagógica · escola particular SP
        </div>
      </article>
      <article class="review">
        <p>"Já tive três consultorias antes. Nenhuma tão prática. O contrato deixa claro o que vão entregar. Renovamos no segundo mês."</p>
        <div class="review__author">
          <b>Dono de rede · M.R.*</b>
          Dono · rede de padarias com 3 unidades
        </div>
      </article>
      <article class="review">
        <p>"Abrimos o restaurante com alvará no prazo. Só foi possível porque o Food Guard cuidou de APPCC e BPF do zero, paralelo às obras."</p>
        <div class="review__author">
          <b>Sócio-gerente · J.C.*</b>
          Sócio-gerente · restaurante autoral
        </div>
      </article>
    </div>
  </div>
</section>

<!-- ============ TRUST LOGOS (placeholder) ============ -->
<section style="padding: 1rem 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);">
  <div class="container">
    <div class="logos-bar">
      <span class="bold">CRN-3</span>
      <span>ANVISA</span>
      <span class="bold">RDC 216</span>
      <span>APPCC</span>
      <span class="bold">CRN/RT</span>
      <span>FSSC 22000</span>
    </div>
  </div>
</section>

<!-- ============ DIAGNOSTIC START CARD ============ -->
<section class="section section--cream" id="diagnostico">
  <div class="container">
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: center;">
      <div style="min-width: 0;">
        <span class="eyebrow">Começar agora</span>
        <h2 class="display-lg mt-1" style="max-width:18ch;">5 perguntas. 90 segundos. <em class="italic-accent">Plano em mãos.</em></h2>
        <p style="color: var(--text-2); font-size: 1.05rem; line-height: 1.55; margin-top: 1rem;">
          Você responde a 5 perguntas em formato múltipla escolha. Ao final, deixa seu contato (nome, telefone, e-mail e cargo). Em 2 segundos o sistema gera o seu diagnóstico, com score, gap detalhado e plano recomendado.
        </p>
        <ul class="lp-bullets" style="margin-top: 1.5rem;">
          <li>Sem ligação automática</li>
          <li>Sem custo, sob NDA padrão</li>
          <li>Diagnóstico no e-mail em PDF</li>
          <li>Opção de agendar call com RT depois</li>
        </ul>
      </div>

      <div class="lp-card">
        <h3>Começar meu diagnóstico</h3>
        <p class="muted">Levar menos de 90 segundos.</p>
        <div class="steps">
          <div class="lp-step">
            <div class="lp-step__num">1</div>
            <div class="lp-step__body">
              <strong>Responda 5 perguntas</strong>
              <span>Sobre seu estabelecimento, RT, documentos, fiscalização, treinamento</span>
            </div>
          </div>
          <div class="lp-step">
            <div class="lp-step__num">2</div>
            <div class="lp-step__body">
              <strong>Deixe seu contato</strong>
              <span>Nome, telefone, e-mail, cargo (Dono · CEO · Diretor · Gerente)</span>
            </div>
          </div>
          <div class="lp-step">
            <div class="lp-step__num">3</div>
            <div class="lp-step__body">
              <strong>Receba o diagnóstico</strong>
              <span>Score, gap detalhado e plano recomendado · em tela e por e-mail</span>
            </div>
          </div>
        </div>
        <a href="diagnostico-fluxo.html" class="btn btn--leaf" onclick="trackCTA('form_card_primary')">
          Começar agora · gratuito
          <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <p class="micro">Ao continuar você concorda com a Política de Privacidade · LGPD</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ FAQ ============ -->
<section class="section">
  <div class="container faq-inline">
    <span class="eyebrow">Perguntas frequentes</span>
    <h2 class="display-lg mt-1 mb-3">Antes de começar.</h2>

    <details class="faq__item" open>
      <summary class="faq__q">É realmente gratuito?</summary>
      <p class="faq__a">Sim. O diagnóstico, o PDF e a call inicial com o RT são gratuitos. Você só paga se contratar um dos planos. Não cobramos taxa de cadastro, taxa de análise nem nada disso.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Quem é o RT nutricionista do Food Guard?</summary>
      <p class="faq__a">Renan Muniz · sócio co-founder, nutricionista sênior com Responsabilidade Técnica registrada no CRN-3. Em todos os planos, há um RT designado e nominalmente responsável pelo seu contrato.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Quanto tempo para implantar a conformidade?</summary>
      <p class="faq__a">Operações sem nada implementado: 60 a 90 dias para entrar em padrão de fiscalização. Operações com base prévia: 30 a 45 dias. O cronograma sai junto com o diagnóstico.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Vocês atendem fora de São Paulo?</summary>
      <p class="faq__a">Sim — remotamente em todo o Brasil, e presencialmente em São Paulo capital e Grande SP. Para outras cidades, deslocamos a equipe conforme o plano contratado.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Como funciona a carência?</summary>
      <p class="faq__a">Todos os planos têm carência de 12 meses. Em caso de rescisão antecipada pelo contratante, há multa de 40% sobre o valor dos meses remanescentes. Por outro lado, se o Food Guard atrasar entrega documentada por mais de 30 dias úteis, você pode rescindir sem multa.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Posso pagar em PIX, boleto ou cartão?</summary>
      <p class="faq__a">Sim, os três métodos. PIX e cartão têm liberação imediata · boleto, em até 2 dias úteis. Cobrança recorrente via cartão é a forma mais comum.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Meus dados estão seguros?</summary>
      <p class="faq__a">Sim. Operamos sob LGPD, com DPO designado (Renan Muniz · dpo@foodguard.com.br), criptografia em repouso e em trânsito, banco de dados com Row Level Security e auditoria contínua. Você pode pedir exclusão dos seus dados a qualquer momento.</p>
    </details>
  </div>
</section>

<!-- ============ FINAL CTA ============ -->
<section class="section">
  <div class="container">
    <div class="cta-band">
      <h2 class="cta-band__title">
        Cada dia sem RT é<br>um dia de <em>risco real.</em>
      </h2>
      <div class="cta-band__actions">
        <a href="#diagnostico" class="btn btn--leaf" onclick="trackCTA('final_band')">
          Diagnóstico gratuito agora
          <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <a href="https://wa.me/5511900000000?text=Vim+pela+land+page+e+quero+conversar" target="_blank" rel="noopener" class="btn btn--inverse" onclick="trackCTA('final_whatsapp')">
          Falar no WhatsApp
        </a>
        <p class="cta-band__sub">Resposta em até 4h úteis · sob NDA</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ FOOTER MINIMAL ============ -->
<footer class="footer" style="padding: 2.5rem 0 1.5rem;">
  <div class="container">
    <div class="footer__bar">
      <span>© 2026 Food Guard Assessoria · CNPJ XX.XXX.XXX/0001-XX</span>
      <span>
        <a href="index.html" style="color: rgba(244,239,228,0.65);">Site institucional</a> ·
        <a href="#" style="color: rgba(244,239,228,0.65);">Política de privacidade</a> ·
        <a href="mailto:dpo@foodguard.com.br" style="color: rgba(244,239,228,0.65);">DPO</a>
      </span>
    </div>
  </div>
</footer>

<!-- ============ FLOATING ELEMENTS ============ -->
<a href="https://wa.me/5511900000000?text=Vim+pela+land+page+do+Food+Guard" target="_blank" rel="noopener" class="wpp-float" onclick="trackCTA('wpp_float')">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.5.8 3.2 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm5.4 14.2c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3 0-1.4.7-2.1 1-2.4.2-.3.5-.4.7-.4h.5c.2 0 .4-.1.6.5.2.6.8 2 .9 2.2.1.1.1.3 0 .5-.1.2-.2.3-.3.5-.2.2-.3.4-.5.6-.2.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.7.8 2 .9.3.2.5.2.6.4.1.1.1.7-.1 1.3z"/></svg>
  Falar agora
</a>

<a href="#diagnostico" class="lp-cta-sticky" onclick="trackCTA('sticky_mobile')">
  <b>Diagnóstico grátis</b>
  <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
</a>

<!-- ============ TRACKING ============ -->
<script>
  // Track CTAs em GA4 + Meta Pixel
  function trackCTA(location) {
    try {
      window.gtag && gtag('event', 'cta_click', { 'cta_location': location });
      window.fbq && fbq('track', 'Lead', { content_name: location });
      window.dataLayer && dataLayer.push({ event: 'cta_click', cta_location: location });
    } catch (e) { /* fail silently */ }
  }

  // Scroll depth
  let depths = [25, 50, 75, 100];
  let fired = new Set();
  window.addEventListener('scroll', () => {
    const sd = Math.round(((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100);
    depths.forEach(d => {
      if (sd >= d && !fired.has(d)) {
        fired.add(d);
        window.gtag && gtag('event', 'scroll_depth', { 'percent': d });
        window.fbq && fbq('trackCustom', 'ScrollDepth', { percent: d });
      }
    });
  });

  // Reveal animations
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { threshold: 0.12 });
  document.querySelectorAll('.section, .lp-hero__grid > *, .plan, .whom, .review').forEach(el => {
    el.classList.add('reveal'); io.observe(el);
  });
</script>

</body>
</html>
</pasted_text>

<pasted_text name="Pasted text (894 lines)">
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Diagnóstico regulatório gratuito · Food Guard</title>
<meta name="description" content="Está em conformidade com a vigilância sanitária? Descubra em 90 segundos. Diagnóstico gratuito com RT nutricionista. Sem compromisso." />
<meta property="og:title" content="Diagnóstico regulatório gratuito · Food Guard" />
<meta property="og:description" content="Em 90 segundos, descubra o gap regulatório da sua operação. Plano de ação + preço incluso. Sem custo." />
<meta property="og:type" content="website" />

<!-- Pixels (placeholders prontos para receber IDs) -->
<!-- Meta Pixel -->
<script>
  /* MetaPixelID = '000000000000000' — substituir antes do go-live */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window,document,'script');
  // window.fbq && fbq('init', 'MetaPixelID');
  // window.fbq && fbq('track', 'PageView');
</script>
<!-- GA4 -->
<script>
  /* GA4MeasurementID = 'G-XXXXXXXXXX' — substituir antes do go-live */
  // window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'GA4MeasurementID');
</script>

<link rel="stylesheet" href="styles.css" />
<style>
  body { background: var(--paper); }

  /* HERO landing-specific */
  .lp-hero {
    position: relative;
    padding: clamp(2rem, 4vw, 4rem) 0 clamp(3rem, 5vw, 5rem);
    background:
      radial-gradient(ellipse 70% 50% at 100% 0%, rgba(111, 178, 62, 0.14), transparent 60%),
      radial-gradient(ellipse 50% 35% at 0% 100%, rgba(14, 42, 71, 0.06), transparent 60%),
      var(--paper);
    overflow: hidden;
  }
  .lp-hero__grid {
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
  }
  @media (max-width: 980px) { .lp-hero__grid { grid-template-columns: 1fr; } }

  .lp-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: var(--cream);
    border: 1px solid var(--stone);
    padding: 0.5rem 1rem 0.5rem 0.55rem;
    border-radius: 999px;
    font-size: 0.83rem;
    color: var(--text-2);
    font-weight: 500;
    margin-bottom: 1.5rem;
  }
  .lp-badge .dot {
    width: 9px; height: 9px; border-radius: 50%;
    background: var(--leaf);
    box-shadow: 0 0 0 4px rgba(111, 178, 62, 0.18);
  }

  .lp-title {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(2.5rem, 5.5vw, 4.5rem);
    line-height: 1.0;
    letter-spacing: -0.024em;
    color: var(--navy);
    margin-bottom: 1.5rem;
  }
  .lp-title em {
    font-style: italic;
    color: var(--leaf-dark);
    font-weight: 300;
  }
  .lp-title u {
    text-decoration: none;
    background: linear-gradient(transparent 70%, rgba(111,178,62,0.35) 70%);
    padding: 0 0.1em;
  }

  .lp-lede {
    font-family: var(--font-display);
    font-weight: 300;
    font-size: clamp(1.05rem, 1.4vw, 1.3rem);
    line-height: 1.45;
    color: var(--text-2);
    margin-bottom: 2rem;
    max-width: 44ch;
  }

  .lp-bullets {
    list-style: none;
    display: grid;
    gap: 0.75rem;
    margin-bottom: 2rem;
    padding: 0;
  }
  .lp-bullets li {
    padding-left: 2rem;
    position: relative;
    font-size: 0.98rem;
    color: var(--text);
    font-weight: 500;
  }
  .lp-bullets li::before {
    content: "";
    position: absolute;
    left: 0; top: 0.25em;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: var(--leaf);
    background-image: linear-gradient(135deg, var(--leaf), var(--leaf-dark));
  }
  .lp-bullets li::after {
    content: "";
    position: absolute;
    left: 5px; top: 9px;
    width: 9px; height: 5px;
    border-left: 2px solid var(--paper);
    border-bottom: 2px solid var(--paper);
    transform: rotate(-45deg);
  }

  .lp-cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }
  .lp-cta-row .btn--leaf { padding: 1.05rem 1.85rem; font-size: 1rem; }

  .lp-sub {
    font-size: 0.85rem;
    color: var(--text-3);
    margin-top: 1.25rem;
  }

  /* Right-side form card */
  .lp-card {
    background: var(--paper);
    border: 1px solid var(--stone);
    border-radius: 20px;
    padding: clamp(1.75rem, 3vw, 2.25rem);
    box-shadow: 0 30px 60px -30px rgba(6,22,41,0.25);
    position: relative;
  }
  .lp-card::before {
    content: "GRATUITO";
    position: absolute;
    top: -12px; left: 24px;
    background: var(--leaf);
    color: var(--ink);
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    font-weight: 700;
  }
  .lp-card h3 {
    font-family: var(--font-display);
    font-size: 1.45rem;
    font-weight: 500;
    color: var(--navy);
    margin-bottom: 0.3rem;
    letter-spacing: -0.012em;
  }
  .lp-card p.muted {
    color: var(--text-2);
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }
  .lp-card .steps {
    display: grid;
    gap: 0.85rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--line);
  }
  .lp-step {
    display: grid;
    grid-template-columns: 28px 1fr;
    gap: 0.85rem;
    align-items: start;
  }
  .lp-step__num {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: var(--cream);
    color: var(--navy);
    font-family: var(--font-display);
    font-weight: 500;
    font-size: 0.95rem;
    display: grid;
    place-items: center;
  }
  .lp-step__body strong { display: block; color: var(--navy); font-size: 0.98rem; }
  .lp-step__body span { display: block; color: var(--text-2); font-size: 0.88rem; margin-top: 0.2rem; }

  .lp-card .btn { width: 100%; justify-content: center; }
  .lp-card .micro {
    text-align: center;
    font-size: 0.78rem;
    color: var(--text-3);
    margin-top: 0.85rem;
  }

  /* Risk strip */
  .risk-strip {
    background: var(--ink);
    color: var(--cream);
    padding: clamp(2rem, 3vw, 2.5rem) 0;
  }
  .risk-strip__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  @media (max-width: 800px) { .risk-strip__grid { grid-template-columns: repeat(2, 1fr); } }
  .risk-stat dt {
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(244,239,228,0.5);
    margin-bottom: 0.5rem;
  }
  .risk-stat dd {
    font-family: var(--font-display);
    font-size: clamp(1.85rem, 3vw, 2.6rem);
    font-weight: 500;
    color: var(--leaf);
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .risk-stat dd span { font-family: var(--font-body); color: rgba(244,239,228,0.7); font-size: 0.4em; font-weight: 400; margin-left: 0.2rem; }
  .risk-stat .sub { color: rgba(244,239,228,0.65); font-size: 0.85rem; margin-top: 0.4rem; }

  /* For whom */
  .for-whom {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-top: 2.5rem;
  }
  @media (max-width: 880px) { .for-whom { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .for-whom { grid-template-columns: 1fr; } }
  .whom {
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 1.25rem 1.25rem 1.4rem;
    transition: all 0.25s ease;
  }
  .whom:hover { transform: translateY(-2px); border-color: var(--leaf); }
  .whom__icon {
    width: 36px; height: 36px;
    border-radius: 9px;
    background: var(--cream);
    display: grid;
    place-items: center;
    color: var(--navy);
    margin-bottom: 0.85rem;
  }
  .whom h4 {
    font-family: var(--font-display);
    font-weight: 500;
    color: var(--navy);
    font-size: 1.05rem;
    margin-bottom: 0.25rem;
  }
  .whom p { font-size: 0.85rem; color: var(--text-2); line-height: 1.5; }

  /* Plans preview */
  .plans-mini {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 2rem;
  }
  @media (max-width: 860px) { .plans-mini { grid-template-columns: 1fr; } }
  .plan {
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 1.85rem 1.75rem;
    display: flex;
    flex-direction: column;
    transition: all 0.25s ease;
    position: relative;
  }
  .plan--featured {
    border-color: var(--navy);
    box-shadow: 0 18px 36px -22px rgba(6,22,41,0.35);
    background: var(--cream);
  }
  .plan--featured::before {
    content: "Mais escolhido";
    position: absolute;
    top: -12px; right: 18px;
    background: var(--navy);
    color: var(--paper);
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    font-weight: 600;
    text-transform: uppercase;
  }
  .plan h4 {
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: var(--navy);
    font-weight: 500;
    margin-bottom: 0.4rem;
  }
  .plan .price {
    font-family: var(--font-display);
    font-size: 2.2rem;
    color: var(--navy);
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.018em;
    margin-bottom: 0.4rem;
  }
  .plan .price small { font-family: var(--font-body); font-weight: 500; color: var(--text-3); font-size: 0.85rem; margin-left: 0.2rem; }
  .plan .visit {
    color: var(--leaf-dark);
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.04em;
    margin-bottom: 1rem;
  }
  .plan ul { list-style: none; padding: 0; margin: 0 0 1.5rem; display: grid; gap: 0.55rem; }
  .plan li {
    padding-left: 1.4rem;
    position: relative;
    font-size: 0.88rem;
    color: var(--text-2);
    line-height: 1.45;
  }
  .plan li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--leaf-dark);
    font-weight: 700;
  }

  /* Reviews */
  .reviews {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin-top: 2.5rem;
  }
  @media (max-width: 860px) { .reviews { grid-template-columns: 1fr; } }
  .review {
    background: var(--cream);
    border-radius: 16px;
    padding: 1.5rem 1.6rem;
  }
  .review p {
    font-family: var(--font-display);
    font-size: 1.02rem;
    font-weight: 400;
    color: var(--navy);
    line-height: 1.4;
    margin-bottom: 1rem;
    font-style: italic;
  }
  .review__author { font-size: 0.85rem; color: var(--text-2); }
  .review__author b { color: var(--navy); font-weight: 600; display: block; }

  /* FAQ inline */
  .faq-inline { max-width: 760px; margin: 0 auto; }
  .faq-inline summary { font-size: 1.05rem; }

  /* Floating WhatsApp */
  .wpp-float {
    position: fixed;
    right: 24px; bottom: 24px;
    z-index: 50;
    background: var(--leaf-dark);
    color: var(--paper);
    padding: 0.85rem 1.2rem;
    border-radius: 999px;
    box-shadow: 0 16px 32px -8px rgba(6,22,41,0.4);
    font-weight: 600;
    font-size: 0.92rem;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    transition: transform 0.2s;
  }
  .wpp-float:hover { transform: translateY(-2px); background: var(--leaf); color: var(--ink); }

  /* Diagnostic mock visual (right hero) — replaces stock photo */
  .diag-mock {
    aspect-ratio: 4/5;
    border-radius: 20px;
    padding: 2rem;
    background:
      radial-gradient(ellipse 80% 60% at 100% 0%, rgba(111,178,62,0.18), transparent 60%),
      linear-gradient(135deg, var(--ink) 0%, var(--navy) 100%);
    color: var(--cream);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .diag-mock__head { display: flex; justify-content: space-between; align-items: center; opacity: 0.7; font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; }
  .diag-mock__center { text-align: center; padding: 1rem 0; }
  .diag-mock__score-label { font-size: 0.78rem; letter-spacing: 0.18em; opacity: 0.65; }
  .diag-mock__score { font-family: var(--font-display); font-size: clamp(5rem, 12vw, 8rem); font-weight: 400; line-height: 1; letter-spacing: -0.04em; margin: 0.5rem 0; }
  .diag-mock__score-of { font-size: 0.42em; opacity: 0.6; font-weight: 400; margin-left: 0.2rem; }
  .diag-mock__risk { display: inline-block; padding: 0.4rem 0.85rem; border-radius: 999px; background: rgba(255,179,71,0.18); color: #FFB347; font-size: 0.83rem; font-weight: 600; letter-spacing: 0.04em; }
  .diag-mock__rec {
    background: rgba(244,239,228,0.06);
    border: 1px solid rgba(244,239,228,0.12);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    font-size: 0.85rem;
  }
  .diag-mock__rec b { color: var(--leaf); display: block; font-size: 0.95rem; margin-bottom: 0.15rem; }
  .diag-mock__rec .price { color: var(--cream); font-family: var(--font-display); font-size: 1.6rem; font-weight: 500; line-height: 1; margin-top: 0.5rem; letter-spacing: -0.012em; }

  /* Logo bar */
  .logos-bar {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    justify-content: center;
    flex-wrap: wrap;
    padding: 2rem 0;
    opacity: 0.85;
  }
  .logos-bar span {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 500;
    color: var(--text-3);
    font-size: 1.1rem;
  }
  .logos-bar .bold { font-family: var(--font-body); font-style: normal; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; font-size: 0.95rem; }

  /* Sticky footer CTA mobile */
  @media (max-width: 720px) {
    .lp-cta-sticky {
      position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 49;
      background: var(--navy); color: var(--paper);
      padding: 1rem 1.2rem;
      border-radius: 14px;
      box-shadow: 0 18px 38px -14px rgba(6,22,41,0.55);
      display: flex; justify-content: space-between; align-items: center;
      font-weight: 600;
      gap: 0.85rem;
    }
    .lp-cta-sticky b { font-family: var(--font-display); font-weight: 500; font-size: 1.05rem; }
    .lp-cta-sticky .arr { width: 18px; height: 18px; }
    .wpp-float { bottom: 80px; }
  }
  @media (min-width: 721px) { .lp-cta-sticky { display: none; } }
</style>
</head>
<body>

<!-- Minimal nav (não distrair da conversão) -->
<header class="topbar">
  <div class="topbar__inner">
    <a class="brand" href="index.html">
      <span class="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none"><path d="M9 4v10a3 3 0 0 0 6 0V4" stroke="#0E2A47" stroke-width="2" stroke-linecap="round"/><path d="M12 14v6" stroke="#0E2A47" stroke-width="2" stroke-linecap="round"/></svg>
      </span>
      <span>Food Guard<small>Assessoria</small></span>
    </a>
    <a href="#diagnostico" class="btn btn--primary" onclick="trackCTA('topbar')">
      Começar diagnóstico
      <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
  </div>
</header>

<!-- ============ HERO ============ -->
<section class="lp-hero">
  <div class="container">
    <div class="lp-hero__grid">
      <div>
        <span class="lp-badge">
          <span class="dot" aria-hidden="true"></span>
          Diagnóstico gratuito · 90 segundos · sem ligação
        </span>
        <h1 class="lp-title">
          Sua operação <u>está em conformidade</u> com a vigilância sanitária <em>hoje?</em>
        </h1>
        <p class="lp-lede">
          Em 90 segundos descobrimos o gap regulatório da sua escola, restaurante, padaria ou hotel — e entregamos o plano de ação por escrito. Sem cobrar nada.
        </p>
        <ul class="lp-bullets">
          <li>Score de risco regulatório calculado em tempo real</li>
          <li>Lista do que falta para passar em fiscalização</li>
          <li>Preço fixo dos 3 planos, sem ginga comercial</li>
          <li>Call com o RT Renan Muniz quando você quiser</li>
        </ul>
        <div class="lp-cta-row">
          <a href="#diagnostico" class="btn btn--leaf" onclick="trackCTA('hero_primary')">
            Começar diagnóstico grátis
            <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="https://wa.me/5511900000000?text=Quero+saber+mais+sobre+o+Food+Guard" target="_blank" rel="noopener" class="btn btn--ghost" onclick="trackCTA('hero_whatsapp')">
            Falar no WhatsApp
          </a>
        </div>
        <p class="lp-sub">100% gratuito · sob NDA · sem ligação automática</p>
      </div>

      <!-- Diag mockup -->
      <aside class="diag-mock" aria-hidden="true">
        <div class="diag-mock__head">
          <span>Diagnóstico Food Guard</span>
          <span>Caso típico</span>
        </div>
        <div class="diag-mock__center">
          <div class="diag-mock__score-label">SCORE DE CONFORMIDADE</div>
          <div class="diag-mock__score">42<span class="diag-mock__score-of">/100</span></div>
          <div class="diag-mock__risk">Risco médio · gaps relevantes</div>
        </div>
        <div class="diag-mock__rec">
          <b>Plano recomendado</b>
          Profissional · 2 visitas semanais
          <div class="price">R$ 2.700<small style="font-size:0.55em; opacity:0.6;">/mês</small></div>
        </div>
      </aside>
    </div>
  </div>
</section>

<!-- ============ RISK STRIP ============ -->
<section class="risk-strip">
  <div class="container">
    <span class="eyebrow" style="color: var(--leaf);">Por que importa</span>
    <h2 class="display-md mt-1 mb-3" style="color: var(--cream); max-width: 24ch;">A multa não avisa antes de chegar.</h2>
    <dl class="risk-strip__grid">
      <div class="risk-stat">
        <dt>Multa típica · 1ª autuação</dt>
        <dd>R$ 12k<span>+</span></dd>
        <p class="sub">Pode chegar a R$ 1,5M para indústria</p>
      </div>
      <div class="risk-stat">
        <dt>Tempo médio de adequação tardia</dt>
        <dd>6<span>meses</span></dd>
        <p class="sub">Operando sob risco neste período</p>
      </div>
      <div class="risk-stat">
        <dt>Operações autuadas/ano em SP</dt>
        <dd>30%<span>+</span></dd>
        <p class="sub">Food service e indústria, ANVISA</p>
      </div>
      <div class="risk-stat">
        <dt>Diagnóstico Food Guard</dt>
        <dd>90s</dd>
        <p class="sub">E você sai com o plano em mãos</p>
      </div>
    </dl>
  </div>
</section>

<!-- ============ FOR WHOM ============ -->
<section class="section">
  <div class="container">
    <span class="eyebrow">Para quem</span>
    <h2 class="display-lg mt-1" style="max-width: 18ch;">Se você comanda uma operação que serve alimento, isso é para você.</h2>

    <div class="for-whom">
      <div class="whom">
        <div class="whom__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="currentColor" stroke-width="1.8"/></svg>
        </div>
        <h4>Escolas e creches</h4>
        <p>Refeitório próprio ou terceirizado · RT obrigatório por lei</p>
      </div>
      <div class="whom">
        <div class="whom__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 7h16l-1 13H5L4 7z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" stroke-width="1.8"/></svg>
        </div>
        <h4>Restaurantes</h4>
        <p>Operação à la carte, delivery, dark kitchen · BPF · APPCC</p>
      </div>
      <div class="whom">
        <div class="whom__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </div>
        <h4>Padarias e confeitarias</h4>
        <p>Produção própria · selo de origem · rotulagem nutricional</p>
      </div>
      <div class="whom">
        <div class="whom__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 21V8l9-5 9 5v13M9 21v-7h6v7" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
        </div>
        <h4>Hotéis e buffets</h4>
        <p>Volume alto · operação 24/7 · fiscalização frequente</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ PLANS PREVIEW ============ -->
<section class="section section--cream" id="planos">
  <div class="container">
    <div style="display:flex; justify-content:space-between; align-items:end; gap:2rem; flex-wrap:wrap; margin-bottom:1.5rem;">
      <div>
        <span class="eyebrow">Planos transparentes</span>
        <h2 class="display-lg mt-1" style="max-width:22ch;">Preço fixo. Sem negociação cansativa.</h2>
      </div>
      <p style="max-width:36ch; color:var(--text-2); font-size:0.95rem;">
        Você sai do diagnóstico já com o plano sugerido e o preço. Quer comparar, escolher diferente ou tirar dúvida? A call de 30min com o RT serve para isso.
      </p>
    </div>

    <div class="plans-mini">
      <div class="plan">
        <h4>Essencial</h4>
        <div class="price">R$ 1.500<small>/mês</small></div>
        <div class="visit">1 VISITA / SEMANA</div>
        <ul>
          <li>RT nutricionista designado</li>
          <li>Manual de Boas Práticas</li>
          <li>POPs operacionais</li>
          <li>Treinamento semestral</li>
          <li>Suporte WhatsApp comercial</li>
        </ul>
        <a href="#diagnostico" class="btn btn--ghost" onclick="trackCTA('plan_essencial')">Começar diagnóstico</a>
      </div>

      <div class="plan plan--featured">
        <h4>Profissional</h4>
        <div class="price">R$ 2.700<small>/mês</small></div>
        <div class="visit">2 VISITAS / SEMANA</div>
        <ul>
          <li>Tudo do Essencial +</li>
          <li>Plano APPCC incluso</li>
          <li>Treinamento trimestral</li>
          <li>Auditoria preventiva 2×/ano</li>
          <li>Acompanhamento em fiscalização</li>
        </ul>
        <a href="#diagnostico" class="btn btn--primary" onclick="trackCTA('plan_profissional')">Começar diagnóstico</a>
      </div>

      <div class="plan">
        <h4>Premium</h4>
        <div class="price">R$ 3.800<small>/mês</small></div>
        <div class="visit">3 VISITAS / SEMANA</div>
        <ul>
          <li>Tudo do Profissional +</li>
          <li>RT sênior · Renan Muniz</li>
          <li>APPCC completo</li>
          <li>Treinamento mensal</li>
          <li>Plantão WhatsApp 24/7</li>
          <li>Auditoria trimestral</li>
        </ul>
        <a href="#diagnostico" class="btn btn--ghost" onclick="trackCTA('plan_premium')">Começar diagnóstico</a>
      </div>
    </div>

    <p style="text-align:center; color:var(--text-3); font-size:0.85rem; margin-top:1.5rem;">
      Contrato com carência de 12 meses · multa de 40% sobre meses remanescentes em caso de rescisão antecipada.
    </p>
  </div>
</section>

<!-- ============ REVIEWS ============ -->
<section class="section">
  <div class="container">
    <span class="eyebrow">O que dizem nossos clientes</span>
    <h2 class="display-lg mt-1" style="max-width:18ch;">Operações reais. Resultados auditáveis.</h2>

    <div class="reviews">
      <article class="review">
        <p>"Fui notificada pela vigilância na quinta. Sexta o RT do Food Guard estava na escola. Em 30 dias estávamos 100% adequados."</p>
        <div class="review__author">
          <b>Diretora pedagógica · T.M.*</b>
          Diretora pedagógica · escola particular SP
        </div>
      </article>
      <article class="review">
        <p>"Já tive três consultorias antes. Nenhuma tão prática. O contrato deixa claro o que vão entregar. Renovamos no segundo mês."</p>
        <div class="review__author">
          <b>Dono de rede · M.R.*</b>
          Dono · rede de padarias com 3 unidades
        </div>
      </article>
      <article class="review">
        <p>"Abrimos o restaurante com alvará no prazo. Só foi possível porque o Food Guard cuidou de APPCC e BPF do zero, paralelo às obras."</p>
        <div class="review__author">
          <b>Sócio-gerente · J.C.*</b>
          Sócio-gerente · restaurante autoral
        </div>
      </article>
    </div>
  </div>
</section>

<!-- ============ TRUST LOGOS (placeholder) ============ -->
<section style="padding: 1rem 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);">
  <div class="container">
    <div class="logos-bar">
      <span class="bold">CRN-3</span>
      <span>ANVISA</span>
      <span class="bold">RDC 216</span>
      <span>APPCC</span>
      <span class="bold">CRN/RT</span>
      <span>FSSC 22000</span>
    </div>
  </div>
</section>

<!-- ============ DIAGNOSTIC START CARD ============ -->
<section class="section section--cream" id="diagnostico">
  <div class="container">
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: center;">
      <div style="min-width: 0;">
        <span class="eyebrow">Começar agora</span>
        <h2 class="display-lg mt-1" style="max-width:18ch;">5 perguntas. 90 segundos. <em class="italic-accent">Plano em mãos.</em></h2>
        <p style="color: var(--text-2); font-size: 1.05rem; line-height: 1.55; margin-top: 1rem;">
          Você responde a 5 perguntas em formato múltipla escolha. Ao final, deixa seu contato (nome, telefone, e-mail e cargo). Em 2 segundos o sistema gera o seu diagnóstico, com score, gap detalhado e plano recomendado.
        </p>
        <ul class="lp-bullets" style="margin-top: 1.5rem;">
          <li>Sem ligação automática</li>
          <li>Sem custo, sob NDA padrão</li>
          <li>Diagnóstico no e-mail em PDF</li>
          <li>Opção de agendar call com RT depois</li>
        </ul>
      </div>

      <div class="lp-card">
        <h3>Começar meu diagnóstico</h3>
        <p class="muted">Levar menos de 90 segundos.</p>
        <div class="steps">
          <div class="lp-step">
            <div class="lp-step__num">1</div>
            <div class="lp-step__body">
              <strong>Responda 5 perguntas</strong>
              <span>Sobre seu estabelecimento, RT, documentos, fiscalização, treinamento</span>
            </div>
          </div>
          <div class="lp-step">
            <div class="lp-step__num">2</div>
            <div class="lp-step__body">
              <strong>Deixe seu contato</strong>
              <span>Nome, telefone, e-mail, cargo (Dono · CEO · Diretor · Gerente)</span>
            </div>
          </div>
          <div class="lp-step">
            <div class="lp-step__num">3</div>
            <div class="lp-step__body">
              <strong>Receba o diagnóstico</strong>
              <span>Score, gap detalhado e plano recomendado · em tela e por e-mail</span>
            </div>
          </div>
        </div>
        <a href="diagnostico-fluxo.html" class="btn btn--leaf" onclick="trackCTA('form_card_primary')">
          Começar agora · gratuito
          <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <p class="micro">Ao continuar você concorda com a Política de Privacidade · LGPD</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ FAQ ============ -->
<section class="section">
  <div class="container faq-inline">
    <span class="eyebrow">Perguntas frequentes</span>
    <h2 class="display-lg mt-1 mb-3">Antes de começar.</h2>

    <details class="faq__item" open>
      <summary class="faq__q">É realmente gratuito?</summary>
      <p class="faq__a">Sim. O diagnóstico, o PDF e a call inicial com o RT são gratuitos. Você só paga se contratar um dos planos. Não cobramos taxa de cadastro, taxa de análise nem nada disso.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Quem é o RT nutricionista do Food Guard?</summary>
      <p class="faq__a">Renan Muniz · sócio co-founder, nutricionista sênior com Responsabilidade Técnica registrada no CRN-3. Em todos os planos, há um RT designado e nominalmente responsável pelo seu contrato.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Quanto tempo para implantar a conformidade?</summary>
      <p class="faq__a">Operações sem nada implementado: 60 a 90 dias para entrar em padrão de fiscalização. Operações com base prévia: 30 a 45 dias. O cronograma sai junto com o diagnóstico.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Vocês atendem fora de São Paulo?</summary>
      <p class="faq__a">Sim — remotamente em todo o Brasil, e presencialmente em São Paulo capital e Grande SP. Para outras cidades, deslocamos a equipe conforme o plano contratado.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Como funciona a carência?</summary>
      <p class="faq__a">Todos os planos têm carência de 12 meses. Em caso de rescisão antecipada pelo contratante, há multa de 40% sobre o valor dos meses remanescentes. Por outro lado, se o Food Guard atrasar entrega documentada por mais de 30 dias úteis, você pode rescindir sem multa.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Posso pagar em PIX, boleto ou cartão?</summary>
      <p class="faq__a">Sim, os três métodos. PIX e cartão têm liberação imediata · boleto, em até 2 dias úteis. Cobrança recorrente via cartão é a forma mais comum.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Meus dados estão seguros?</summary>
      <p class="faq__a">Sim. Operamos sob LGPD, com DPO designado (Renan Muniz · dpo@foodguard.com.br), criptografia em repouso e em trânsito, banco de dados com Row Level Security e auditoria contínua. Você pode pedir exclusão dos seus dados a qualquer momento.</p>
    </details>
  </div>
</section>

<!-- ============ FINAL CTA ============ -->
<section class="section">
  <div class="container">
    <div class="cta-band">
      <h2 class="cta-band__title">
        Cada dia sem RT é<br>um dia de <em>risco real.</em>
      </h2>
      <div class="cta-band__actions">
        <a href="#diagnostico" class="btn btn--leaf" onclick="trackCTA('final_band')">
          Diagnóstico gratuito agora
          <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <a href="https://wa.me/5511900000000?text=Vim+pela+land+page+e+quero+conversar" target="_blank" rel="noopener" class="btn btn--inverse" onclick="trackCTA('final_whatsapp')">
          Falar no WhatsApp
        </a>
        <p class="cta-band__sub">Resposta em até 4h úteis · sob NDA</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ FOOTER MINIMAL ============ -->
<footer class="footer" style="padding: 2.5rem 0 1.5rem;">
  <div class="container">
    <div class="footer__bar">
      <span>© 2026 Food Guard Assessoria · CNPJ XX.XXX.XXX/0001-XX</span>
      <span>
        <a href="index.html" style="color: rgba(244,239,228,0.65);">Site institucional</a> ·
        <a href="#" style="color: rgba(244,239,228,0.65);">Política de privacidade</a> ·
        <a href="mailto:dpo@foodguard.com.br" style="color: rgba(244,239,228,0.65);">DPO</a>
      </span>
    </div>
  </div>
</footer>

<!-- ============ FLOATING ELEMENTS ============ -->
<a href="https://wa.me/5511900000000?text=Vim+pela+land+page+do+Food+Guard" target="_blank" rel="noopener" class="wpp-float" onclick="trackCTA('wpp_float')">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.5.8 3.2 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm5.4 14.2c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3 0-1.4.7-2.1 1-2.4.2-.3.5-.4.7-.4h.5c.2 0 .4-.1.6.5.2.6.8 2 .9 2.2.1.1.1.3 0 .5-.1.2-.2.3-.3.5-.2.2-.3.4-.5.6-.2.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.7.8 2 .9.3.2.5.2.6.4.1.1.1.7-.1 1.3z"/></svg>
  Falar agora
</a>

<a href="#diagnostico" class="lp-cta-sticky" onclick="trackCTA('sticky_mobile')">
  <b>Diagnóstico grátis</b>
  <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
</a>

<!-- ============ TRACKING ============ -->
<script>
  // Track CTAs em GA4 + Meta Pixel
  function trackCTA(location) {
    try {
      window.gtag && gtag('event', 'cta_click', { 'cta_location': location });
      window.fbq && fbq('track', 'Lead', { content_name: location });
      window.dataLayer && dataLayer.push({ event: 'cta_click', cta_location: location });
    } catch (e) { /* fail silently */ }
  }

  // Scroll depth
  let depths = [25, 50, 75, 100];
  let fired = new Set();
  window.addEventListener('scroll', () => {
    const sd = Math.round(((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100);
    depths.forEach(d => {
      if (sd >= d && !fired.has(d)) {
        fired.add(d);
        window.gtag && gtag('event', 'scroll_depth', { 'percent': d });
        window.fbq && fbq('trackCustom', 'ScrollDepth', { percent: d });
      }
    });
  });

  // Reveal animations
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { threshold: 0.12 });
  document.querySelectorAll('.section, .lp-hero__grid > *, .plan, .whom, .review').forEach(el => {
    el.classList.add('reveal'); io.observe(el);
  });
</script>

</body>
</html>
</pasted_text>

<pasted_text name="Pasted text (894 lines)">
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Diagnóstico regulatório gratuito · Food Guard</title>
<meta name="description" content="Está em conformidade com a vigilância sanitária? Descubra em 90 segundos. Diagnóstico gratuito com RT nutricionista. Sem compromisso." />
<meta property="og:title" content="Diagnóstico regulatório gratuito · Food Guard" />
<meta property="og:description" content="Em 90 segundos, descubra o gap regulatório da sua operação. Plano de ação + preço incluso. Sem custo." />
<meta property="og:type" content="website" />

<!-- Pixels (placeholders prontos para receber IDs) -->
<!-- Meta Pixel -->
<script>
  /* MetaPixelID = '000000000000000' — substituir antes do go-live */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window,document,'script');
  // window.fbq && fbq('init', 'MetaPixelID');
  // window.fbq && fbq('track', 'PageView');
</script>
<!-- GA4 -->
<script>
  /* GA4MeasurementID = 'G-XXXXXXXXXX' — substituir antes do go-live */
  // window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'GA4MeasurementID');
</script>

<link rel="stylesheet" href="styles.css" />
<style>
  body { background: var(--paper); }

  /* HERO landing-specific */
  .lp-hero {
    position: relative;
    padding: clamp(2rem, 4vw, 4rem) 0 clamp(3rem, 5vw, 5rem);
    background:
      radial-gradient(ellipse 70% 50% at 100% 0%, rgba(111, 178, 62, 0.14), transparent 60%),
      radial-gradient(ellipse 50% 35% at 0% 100%, rgba(14, 42, 71, 0.06), transparent 60%),
      var(--paper);
    overflow: hidden;
  }
  .lp-hero__grid {
    display: grid;
    grid-template-columns: 1.05fr 1fr;
    gap: clamp(2rem, 5vw, 4rem);
    align-items: center;
  }
  @media (max-width: 980px) { .lp-hero__grid { grid-template-columns: 1fr; } }

  .lp-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: var(--cream);
    border: 1px solid var(--stone);
    padding: 0.5rem 1rem 0.5rem 0.55rem;
    border-radius: 999px;
    font-size: 0.83rem;
    color: var(--text-2);
    font-weight: 500;
    margin-bottom: 1.5rem;
  }
  .lp-badge .dot {
    width: 9px; height: 9px; border-radius: 50%;
    background: var(--leaf);
    box-shadow: 0 0 0 4px rgba(111, 178, 62, 0.18);
  }

  .lp-title {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(2.5rem, 5.5vw, 4.5rem);
    line-height: 1.0;
    letter-spacing: -0.024em;
    color: var(--navy);
    margin-bottom: 1.5rem;
  }
  .lp-title em {
    font-style: italic;
    color: var(--leaf-dark);
    font-weight: 300;
  }
  .lp-title u {
    text-decoration: none;
    background: linear-gradient(transparent 70%, rgba(111,178,62,0.35) 70%);
    padding: 0 0.1em;
  }

  .lp-lede {
    font-family: var(--font-display);
    font-weight: 300;
    font-size: clamp(1.05rem, 1.4vw, 1.3rem);
    line-height: 1.45;
    color: var(--text-2);
    margin-bottom: 2rem;
    max-width: 44ch;
  }

  .lp-bullets {
    list-style: none;
    display: grid;
    gap: 0.75rem;
    margin-bottom: 2rem;
    padding: 0;
  }
  .lp-bullets li {
    padding-left: 2rem;
    position: relative;
    font-size: 0.98rem;
    color: var(--text);
    font-weight: 500;
  }
  .lp-bullets li::before {
    content: "";
    position: absolute;
    left: 0; top: 0.25em;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: var(--leaf);
    background-image: linear-gradient(135deg, var(--leaf), var(--leaf-dark));
  }
  .lp-bullets li::after {
    content: "";
    position: absolute;
    left: 5px; top: 9px;
    width: 9px; height: 5px;
    border-left: 2px solid var(--paper);
    border-bottom: 2px solid var(--paper);
    transform: rotate(-45deg);
  }

  .lp-cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }
  .lp-cta-row .btn--leaf { padding: 1.05rem 1.85rem; font-size: 1rem; }

  .lp-sub {
    font-size: 0.85rem;
    color: var(--text-3);
    margin-top: 1.25rem;
  }

  /* Right-side form card */
  .lp-card {
    background: var(--paper);
    border: 1px solid var(--stone);
    border-radius: 20px;
    padding: clamp(1.75rem, 3vw, 2.25rem);
    box-shadow: 0 30px 60px -30px rgba(6,22,41,0.25);
    position: relative;
  }
  .lp-card::before {
    content: "GRATUITO";
    position: absolute;
    top: -12px; left: 24px;
    background: var(--leaf);
    color: var(--ink);
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    font-weight: 700;
  }
  .lp-card h3 {
    font-family: var(--font-display);
    font-size: 1.45rem;
    font-weight: 500;
    color: var(--navy);
    margin-bottom: 0.3rem;
    letter-spacing: -0.012em;
  }
  .lp-card p.muted {
    color: var(--text-2);
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }
  .lp-card .steps {
    display: grid;
    gap: 0.85rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--line);
  }
  .lp-step {
    display: grid;
    grid-template-columns: 28px 1fr;
    gap: 0.85rem;
    align-items: start;
  }
  .lp-step__num {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: var(--cream);
    color: var(--navy);
    font-family: var(--font-display);
    font-weight: 500;
    font-size: 0.95rem;
    display: grid;
    place-items: center;
  }
  .lp-step__body strong { display: block; color: var(--navy); font-size: 0.98rem; }
  .lp-step__body span { display: block; color: var(--text-2); font-size: 0.88rem; margin-top: 0.2rem; }

  .lp-card .btn { width: 100%; justify-content: center; }
  .lp-card .micro {
    text-align: center;
    font-size: 0.78rem;
    color: var(--text-3);
    margin-top: 0.85rem;
  }

  /* Risk strip */
  .risk-strip {
    background: var(--ink);
    color: var(--cream);
    padding: clamp(2rem, 3vw, 2.5rem) 0;
  }
  .risk-strip__grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  @media (max-width: 800px) { .risk-strip__grid { grid-template-columns: repeat(2, 1fr); } }
  .risk-stat dt {
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(244,239,228,0.5);
    margin-bottom: 0.5rem;
  }
  .risk-stat dd {
    font-family: var(--font-display);
    font-size: clamp(1.85rem, 3vw, 2.6rem);
    font-weight: 500;
    color: var(--leaf);
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .risk-stat dd span { font-family: var(--font-body); color: rgba(244,239,228,0.7); font-size: 0.4em; font-weight: 400; margin-left: 0.2rem; }
  .risk-stat .sub { color: rgba(244,239,228,0.65); font-size: 0.85rem; margin-top: 0.4rem; }

  /* For whom */
  .for-whom {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-top: 2.5rem;
  }
  @media (max-width: 880px) { .for-whom { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .for-whom { grid-template-columns: 1fr; } }
  .whom {
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 14px;
    padding: 1.25rem 1.25rem 1.4rem;
    transition: all 0.25s ease;
  }
  .whom:hover { transform: translateY(-2px); border-color: var(--leaf); }
  .whom__icon {
    width: 36px; height: 36px;
    border-radius: 9px;
    background: var(--cream);
    display: grid;
    place-items: center;
    color: var(--navy);
    margin-bottom: 0.85rem;
  }
  .whom h4 {
    font-family: var(--font-display);
    font-weight: 500;
    color: var(--navy);
    font-size: 1.05rem;
    margin-bottom: 0.25rem;
  }
  .whom p { font-size: 0.85rem; color: var(--text-2); line-height: 1.5; }

  /* Plans preview */
  .plans-mini {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 2rem;
  }
  @media (max-width: 860px) { .plans-mini { grid-template-columns: 1fr; } }
  .plan {
    background: var(--paper);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 1.85rem 1.75rem;
    display: flex;
    flex-direction: column;
    transition: all 0.25s ease;
    position: relative;
  }
  .plan--featured {
    border-color: var(--navy);
    box-shadow: 0 18px 36px -22px rgba(6,22,41,0.35);
    background: var(--cream);
  }
  .plan--featured::before {
    content: "Mais escolhido";
    position: absolute;
    top: -12px; right: 18px;
    background: var(--navy);
    color: var(--paper);
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    font-weight: 600;
    text-transform: uppercase;
  }
  .plan h4 {
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: var(--navy);
    font-weight: 500;
    margin-bottom: 0.4rem;
  }
  .plan .price {
    font-family: var(--font-display);
    font-size: 2.2rem;
    color: var(--navy);
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.018em;
    margin-bottom: 0.4rem;
  }
  .plan .price small { font-family: var(--font-body); font-weight: 500; color: var(--text-3); font-size: 0.85rem; margin-left: 0.2rem; }
  .plan .visit {
    color: var(--leaf-dark);
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.04em;
    margin-bottom: 1rem;
  }
  .plan ul { list-style: none; padding: 0; margin: 0 0 1.5rem; display: grid; gap: 0.55rem; }
  .plan li {
    padding-left: 1.4rem;
    position: relative;
    font-size: 0.88rem;
    color: var(--text-2);
    line-height: 1.45;
  }
  .plan li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--leaf-dark);
    font-weight: 700;
  }

  /* Reviews */
  .reviews {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    margin-top: 2.5rem;
  }
  @media (max-width: 860px) { .reviews { grid-template-columns: 1fr; } }
  .review {
    background: var(--cream);
    border-radius: 16px;
    padding: 1.5rem 1.6rem;
  }
  .review p {
    font-family: var(--font-display);
    font-size: 1.02rem;
    font-weight: 400;
    color: var(--navy);
    line-height: 1.4;
    margin-bottom: 1rem;
    font-style: italic;
  }
  .review__author { font-size: 0.85rem; color: var(--text-2); }
  .review__author b { color: var(--navy); font-weight: 600; display: block; }

  /* FAQ inline */
  .faq-inline { max-width: 760px; margin: 0 auto; }
  .faq-inline summary { font-size: 1.05rem; }

  /* Floating WhatsApp */
  .wpp-float {
    position: fixed;
    right: 24px; bottom: 24px;
    z-index: 50;
    background: var(--leaf-dark);
    color: var(--paper);
    padding: 0.85rem 1.2rem;
    border-radius: 999px;
    box-shadow: 0 16px 32px -8px rgba(6,22,41,0.4);
    font-weight: 600;
    font-size: 0.92rem;
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    transition: transform 0.2s;
  }
  .wpp-float:hover { transform: translateY(-2px); background: var(--leaf); color: var(--ink); }

  /* Diagnostic mock visual (right hero) — replaces stock photo */
  .diag-mock {
    aspect-ratio: 4/5;
    border-radius: 20px;
    padding: 2rem;
    background:
      radial-gradient(ellipse 80% 60% at 100% 0%, rgba(111,178,62,0.18), transparent 60%),
      linear-gradient(135deg, var(--ink) 0%, var(--navy) 100%);
    color: var(--cream);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .diag-mock__head { display: flex; justify-content: space-between; align-items: center; opacity: 0.7; font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; }
  .diag-mock__center { text-align: center; padding: 1rem 0; }
  .diag-mock__score-label { font-size: 0.78rem; letter-spacing: 0.18em; opacity: 0.65; }
  .diag-mock__score { font-family: var(--font-display); font-size: clamp(5rem, 12vw, 8rem); font-weight: 400; line-height: 1; letter-spacing: -0.04em; margin: 0.5rem 0; }
  .diag-mock__score-of { font-size: 0.42em; opacity: 0.6; font-weight: 400; margin-left: 0.2rem; }
  .diag-mock__risk { display: inline-block; padding: 0.4rem 0.85rem; border-radius: 999px; background: rgba(255,179,71,0.18); color: #FFB347; font-size: 0.83rem; font-weight: 600; letter-spacing: 0.04em; }
  .diag-mock__rec {
    background: rgba(244,239,228,0.06);
    border: 1px solid rgba(244,239,228,0.12);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    font-size: 0.85rem;
  }
  .diag-mock__rec b { color: var(--leaf); display: block; font-size: 0.95rem; margin-bottom: 0.15rem; }
  .diag-mock__rec .price { color: var(--cream); font-family: var(--font-display); font-size: 1.6rem; font-weight: 500; line-height: 1; margin-top: 0.5rem; letter-spacing: -0.012em; }

  /* Logo bar */
  .logos-bar {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    justify-content: center;
    flex-wrap: wrap;
    padding: 2rem 0;
    opacity: 0.85;
  }
  .logos-bar span {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 500;
    color: var(--text-3);
    font-size: 1.1rem;
  }
  .logos-bar .bold { font-family: var(--font-body); font-style: normal; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; font-size: 0.95rem; }

  /* Sticky footer CTA mobile */
  @media (max-width: 720px) {
    .lp-cta-sticky {
      position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 49;
      background: var(--navy); color: var(--paper);
      padding: 1rem 1.2rem;
      border-radius: 14px;
      box-shadow: 0 18px 38px -14px rgba(6,22,41,0.55);
      display: flex; justify-content: space-between; align-items: center;
      font-weight: 600;
      gap: 0.85rem;
    }
    .lp-cta-sticky b { font-family: var(--font-display); font-weight: 500; font-size: 1.05rem; }
    .lp-cta-sticky .arr { width: 18px; height: 18px; }
    .wpp-float { bottom: 80px; }
  }
  @media (min-width: 721px) { .lp-cta-sticky { display: none; } }
</style>
</head>
<body>

<!-- Minimal nav (não distrair da conversão) -->
<header class="topbar">
  <div class="topbar__inner">
    <a class="brand" href="index.html">
      <span class="brand__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none"><path d="M9 4v10a3 3 0 0 0 6 0V4" stroke="#0E2A47" stroke-width="2" stroke-linecap="round"/><path d="M12 14v6" stroke="#0E2A47" stroke-width="2" stroke-linecap="round"/></svg>
      </span>
      <span>Food Guard<small>Assessoria</small></span>
    </a>
    <a href="#diagnostico" class="btn btn--primary" onclick="trackCTA('topbar')">
      Começar diagnóstico
      <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </a>
  </div>
</header>

<!-- ============ HERO ============ -->
<section class="lp-hero">
  <div class="container">
    <div class="lp-hero__grid">
      <div>
        <span class="lp-badge">
          <span class="dot" aria-hidden="true"></span>
          Diagnóstico gratuito · 90 segundos · sem ligação
        </span>
        <h1 class="lp-title">
          Sua operação <u>está em conformidade</u> com a vigilância sanitária <em>hoje?</em>
        </h1>
        <p class="lp-lede">
          Em 90 segundos descobrimos o gap regulatório da sua escola, restaurante, padaria ou hotel — e entregamos o plano de ação por escrito. Sem cobrar nada.
        </p>
        <ul class="lp-bullets">
          <li>Score de risco regulatório calculado em tempo real</li>
          <li>Lista do que falta para passar em fiscalização</li>
          <li>Preço fixo dos 3 planos, sem ginga comercial</li>
          <li>Call com o RT Renan Muniz quando você quiser</li>
        </ul>
        <div class="lp-cta-row">
          <a href="#diagnostico" class="btn btn--leaf" onclick="trackCTA('hero_primary')">
            Começar diagnóstico grátis
            <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a href="https://wa.me/5511900000000?text=Quero+saber+mais+sobre+o+Food+Guard" target="_blank" rel="noopener" class="btn btn--ghost" onclick="trackCTA('hero_whatsapp')">
            Falar no WhatsApp
          </a>
        </div>
        <p class="lp-sub">100% gratuito · sob NDA · sem ligação automática</p>
      </div>

      <!-- Diag mockup -->
      <aside class="diag-mock" aria-hidden="true">
        <div class="diag-mock__head">
          <span>Diagnóstico Food Guard</span>
          <span>Caso típico</span>
        </div>
        <div class="diag-mock__center">
          <div class="diag-mock__score-label">SCORE DE CONFORMIDADE</div>
          <div class="diag-mock__score">42<span class="diag-mock__score-of">/100</span></div>
          <div class="diag-mock__risk">Risco médio · gaps relevantes</div>
        </div>
        <div class="diag-mock__rec">
          <b>Plano recomendado</b>
          Profissional · 2 visitas semanais
          <div class="price">R$ 2.700<small style="font-size:0.55em; opacity:0.6;">/mês</small></div>
        </div>
      </aside>
    </div>
  </div>
</section>

<!-- ============ RISK STRIP ============ -->
<section class="risk-strip">
  <div class="container">
    <span class="eyebrow" style="color: var(--leaf);">Por que importa</span>
    <h2 class="display-md mt-1 mb-3" style="color: var(--cream); max-width: 24ch;">A multa não avisa antes de chegar.</h2>
    <dl class="risk-strip__grid">
      <div class="risk-stat">
        <dt>Multa típica · 1ª autuação</dt>
        <dd>R$ 12k<span>+</span></dd>
        <p class="sub">Pode chegar a R$ 1,5M para indústria</p>
      </div>
      <div class="risk-stat">
        <dt>Tempo médio de adequação tardia</dt>
        <dd>6<span>meses</span></dd>
        <p class="sub">Operando sob risco neste período</p>
      </div>
      <div class="risk-stat">
        <dt>Operações autuadas/ano em SP</dt>
        <dd>30%<span>+</span></dd>
        <p class="sub">Food service e indústria, ANVISA</p>
      </div>
      <div class="risk-stat">
        <dt>Diagnóstico Food Guard</dt>
        <dd>90s</dd>
        <p class="sub">E você sai com o plano em mãos</p>
      </div>
    </dl>
  </div>
</section>

<!-- ============ FOR WHOM ============ -->
<section class="section">
  <div class="container">
    <span class="eyebrow">Para quem</span>
    <h2 class="display-lg mt-1" style="max-width: 18ch;">Se você comanda uma operação que serve alimento, isso é para você.</h2>

    <div class="for-whom">
      <div class="whom">
        <div class="whom__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" stroke="currentColor" stroke-width="1.8"/></svg>
        </div>
        <h4>Escolas e creches</h4>
        <p>Refeitório próprio ou terceirizado · RT obrigatório por lei</p>
      </div>
      <div class="whom">
        <div class="whom__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 7h16l-1 13H5L4 7z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" stroke-width="1.8"/></svg>
        </div>
        <h4>Restaurantes</h4>
        <p>Operação à la carte, delivery, dark kitchen · BPF · APPCC</p>
      </div>
      <div class="whom">
        <div class="whom__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M8 12h8M12 8v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        </div>
        <h4>Padarias e confeitarias</h4>
        <p>Produção própria · selo de origem · rotulagem nutricional</p>
      </div>
      <div class="whom">
        <div class="whom__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 21V8l9-5 9 5v13M9 21v-7h6v7" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
        </div>
        <h4>Hotéis e buffets</h4>
        <p>Volume alto · operação 24/7 · fiscalização frequente</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ PLANS PREVIEW ============ -->
<section class="section section--cream" id="planos">
  <div class="container">
    <div style="display:flex; justify-content:space-between; align-items:end; gap:2rem; flex-wrap:wrap; margin-bottom:1.5rem;">
      <div>
        <span class="eyebrow">Planos transparentes</span>
        <h2 class="display-lg mt-1" style="max-width:22ch;">Preço fixo. Sem negociação cansativa.</h2>
      </div>
      <p style="max-width:36ch; color:var(--text-2); font-size:0.95rem;">
        Você sai do diagnóstico já com o plano sugerido e o preço. Quer comparar, escolher diferente ou tirar dúvida? A call de 30min com o RT serve para isso.
      </p>
    </div>

    <div class="plans-mini">
      <div class="plan">
        <h4>Essencial</h4>
        <div class="price">R$ 1.500<small>/mês</small></div>
        <div class="visit">1 VISITA / SEMANA</div>
        <ul>
          <li>RT nutricionista designado</li>
          <li>Manual de Boas Práticas</li>
          <li>POPs operacionais</li>
          <li>Treinamento semestral</li>
          <li>Suporte WhatsApp comercial</li>
        </ul>
        <a href="#diagnostico" class="btn btn--ghost" onclick="trackCTA('plan_essencial')">Começar diagnóstico</a>
      </div>

      <div class="plan plan--featured">
        <h4>Profissional</h4>
        <div class="price">R$ 2.700<small>/mês</small></div>
        <div class="visit">2 VISITAS / SEMANA</div>
        <ul>
          <li>Tudo do Essencial +</li>
          <li>Plano APPCC incluso</li>
          <li>Treinamento trimestral</li>
          <li>Auditoria preventiva 2×/ano</li>
          <li>Acompanhamento em fiscalização</li>
        </ul>
        <a href="#diagnostico" class="btn btn--primary" onclick="trackCTA('plan_profissional')">Começar diagnóstico</a>
      </div>

      <div class="plan">
        <h4>Premium</h4>
        <div class="price">R$ 3.800<small>/mês</small></div>
        <div class="visit">3 VISITAS / SEMANA</div>
        <ul>
          <li>Tudo do Profissional +</li>
          <li>RT sênior · Renan Muniz</li>
          <li>APPCC completo</li>
          <li>Treinamento mensal</li>
          <li>Plantão WhatsApp 24/7</li>
          <li>Auditoria trimestral</li>
        </ul>
        <a href="#diagnostico" class="btn btn--ghost" onclick="trackCTA('plan_premium')">Começar diagnóstico</a>
      </div>
    </div>

    <p style="text-align:center; color:var(--text-3); font-size:0.85rem; margin-top:1.5rem;">
      Contrato com carência de 12 meses · multa de 40% sobre meses remanescentes em caso de rescisão antecipada.
    </p>
  </div>
</section>

<!-- ============ REVIEWS ============ -->
<section class="section">
  <div class="container">
    <span class="eyebrow">O que dizem nossos clientes</span>
    <h2 class="display-lg mt-1" style="max-width:18ch;">Operações reais. Resultados auditáveis.</h2>

    <div class="reviews">
      <article class="review">
        <p>"Fui notificada pela vigilância na quinta. Sexta o RT do Food Guard estava na escola. Em 30 dias estávamos 100% adequados."</p>
        <div class="review__author">
          <b>Diretora pedagógica · T.M.*</b>
          Diretora pedagógica · escola particular SP
        </div>
      </article>
      <article class="review">
        <p>"Já tive três consultorias antes. Nenhuma tão prática. O contrato deixa claro o que vão entregar. Renovamos no segundo mês."</p>
        <div class="review__author">
          <b>Dono de rede · M.R.*</b>
          Dono · rede de padarias com 3 unidades
        </div>
      </article>
      <article class="review">
        <p>"Abrimos o restaurante com alvará no prazo. Só foi possível porque o Food Guard cuidou de APPCC e BPF do zero, paralelo às obras."</p>
        <div class="review__author">
          <b>Sócio-gerente · J.C.*</b>
          Sócio-gerente · restaurante autoral
        </div>
      </article>
    </div>
  </div>
</section>

<!-- ============ TRUST LOGOS (placeholder) ============ -->
<section style="padding: 1rem 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);">
  <div class="container">
    <div class="logos-bar">
      <span class="bold">CRN-3</span>
      <span>ANVISA</span>
      <span class="bold">RDC 216</span>
      <span>APPCC</span>
      <span class="bold">CRN/RT</span>
      <span>FSSC 22000</span>
    </div>
  </div>
</section>

<!-- ============ DIAGNOSTIC START CARD ============ -->
<section class="section section--cream" id="diagnostico">
  <div class="container">
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: center;">
      <div style="min-width: 0;">
        <span class="eyebrow">Começar agora</span>
        <h2 class="display-lg mt-1" style="max-width:18ch;">5 perguntas. 90 segundos. <em class="italic-accent">Plano em mãos.</em></h2>
        <p style="color: var(--text-2); font-size: 1.05rem; line-height: 1.55; margin-top: 1rem;">
          Você responde a 5 perguntas em formato múltipla escolha. Ao final, deixa seu contato (nome, telefone, e-mail e cargo). Em 2 segundos o sistema gera o seu diagnóstico, com score, gap detalhado e plano recomendado.
        </p>
        <ul class="lp-bullets" style="margin-top: 1.5rem;">
          <li>Sem ligação automática</li>
          <li>Sem custo, sob NDA padrão</li>
          <li>Diagnóstico no e-mail em PDF</li>
          <li>Opção de agendar call com RT depois</li>
        </ul>
      </div>

      <div class="lp-card">
        <h3>Começar meu diagnóstico</h3>
        <p class="muted">Levar menos de 90 segundos.</p>
        <div class="steps">
          <div class="lp-step">
            <div class="lp-step__num">1</div>
            <div class="lp-step__body">
              <strong>Responda 5 perguntas</strong>
              <span>Sobre seu estabelecimento, RT, documentos, fiscalização, treinamento</span>
            </div>
          </div>
          <div class="lp-step">
            <div class="lp-step__num">2</div>
            <div class="lp-step__body">
              <strong>Deixe seu contato</strong>
              <span>Nome, telefone, e-mail, cargo (Dono · CEO · Diretor · Gerente)</span>
            </div>
          </div>
          <div class="lp-step">
            <div class="lp-step__num">3</div>
            <div class="lp-step__body">
              <strong>Receba o diagnóstico</strong>
              <span>Score, gap detalhado e plano recomendado · em tela e por e-mail</span>
            </div>
          </div>
        </div>
        <a href="diagnostico-fluxo.html" class="btn btn--leaf" onclick="trackCTA('form_card_primary')">
          Começar agora · gratuito
          <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <p class="micro">Ao continuar você concorda com a Política de Privacidade · LGPD</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ FAQ ============ -->
<section class="section">
  <div class="container faq-inline">
    <span class="eyebrow">Perguntas frequentes</span>
    <h2 class="display-lg mt-1 mb-3">Antes de começar.</h2>

    <details class="faq__item" open>
      <summary class="faq__q">É realmente gratuito?</summary>
      <p class="faq__a">Sim. O diagnóstico, o PDF e a call inicial com o RT são gratuitos. Você só paga se contratar um dos planos. Não cobramos taxa de cadastro, taxa de análise nem nada disso.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Quem é o RT nutricionista do Food Guard?</summary>
      <p class="faq__a">Renan Muniz · sócio co-founder, nutricionista sênior com Responsabilidade Técnica registrada no CRN-3. Em todos os planos, há um RT designado e nominalmente responsável pelo seu contrato.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Quanto tempo para implantar a conformidade?</summary>
      <p class="faq__a">Operações sem nada implementado: 60 a 90 dias para entrar em padrão de fiscalização. Operações com base prévia: 30 a 45 dias. O cronograma sai junto com o diagnóstico.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Vocês atendem fora de São Paulo?</summary>
      <p class="faq__a">Sim — remotamente em todo o Brasil, e presencialmente em São Paulo capital e Grande SP. Para outras cidades, deslocamos a equipe conforme o plano contratado.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Como funciona a carência?</summary>
      <p class="faq__a">Todos os planos têm carência de 12 meses. Em caso de rescisão antecipada pelo contratante, há multa de 40% sobre o valor dos meses remanescentes. Por outro lado, se o Food Guard atrasar entrega documentada por mais de 30 dias úteis, você pode rescindir sem multa.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Posso pagar em PIX, boleto ou cartão?</summary>
      <p class="faq__a">Sim, os três métodos. PIX e cartão têm liberação imediata · boleto, em até 2 dias úteis. Cobrança recorrente via cartão é a forma mais comum.</p>
    </details>
    <details class="faq__item">
      <summary class="faq__q">Meus dados estão seguros?</summary>
      <p class="faq__a">Sim. Operamos sob LGPD, com DPO designado (Renan Muniz · dpo@foodguard.com.br), criptografia em repouso e em trânsito, banco de dados com Row Level Security e auditoria contínua. Você pode pedir exclusão dos seus dados a qualquer momento.</p>
    </details>
  </div>
</section>

<!-- ============ FINAL CTA ============ -->
<section class="section">
  <div class="container">
    <div class="cta-band">
      <h2 class="cta-band__title">
        Cada dia sem RT é<br>um dia de <em>risco real.</em>
      </h2>
      <div class="cta-band__actions">
        <a href="#diagnostico" class="btn btn--leaf" onclick="trackCTA('final_band')">
          Diagnóstico gratuito agora
          <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <a href="https://wa.me/5511900000000?text=Vim+pela+land+page+e+quero+conversar" target="_blank" rel="noopener" class="btn btn--inverse" onclick="trackCTA('final_whatsapp')">
          Falar no WhatsApp
        </a>
        <p class="cta-band__sub">Resposta em até 4h úteis · sob NDA</p>
      </div>
    </div>
  </div>
</section>

<!-- ============ FOOTER MINIMAL ============ -->
<footer class="footer" style="padding: 2.5rem 0 1.5rem;">
  <div class="container">
    <div class="footer__bar">
      <span>© 2026 Food Guard Assessoria · CNPJ XX.XXX.XXX/0001-XX</span>
      <span>
        <a href="index.html" style="color: rgba(244,239,228,0.65);">Site institucional</a> ·
        <a href="#" style="color: rgba(244,239,228,0.65);">Política de privacidade</a> ·
        <a href="mailto:dpo@foodguard.com.br" style="color: rgba(244,239,228,0.65);">DPO</a>
      </span>
    </div>
  </div>
</footer>

<!-- ============ FLOATING ELEMENTS ============ -->
<a href="https://wa.me/5511900000000?text=Vim+pela+land+page+do+Food+Guard" target="_blank" rel="noopener" class="wpp-float" onclick="trackCTA('wpp_float')">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.5.8 3.2 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm5.4 14.2c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3 0-1.4.7-2.1 1-2.4.2-.3.5-.4.7-.4h.5c.2 0 .4-.1.6.5.2.6.8 2 .9 2.2.1.1.1.3 0 .5-.1.2-.2.3-.3.5-.2.2-.3.4-.5.6-.2.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1.2-.2.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.7.8 2 .9.3.2.5.2.6.4.1.1.1.7-.1 1.3z"/></svg>
  Falar agora
</a>

<a href="#diagnostico" class="lp-cta-sticky" onclick="trackCTA('sticky_mobile')">
  <b>Diagnóstico grátis</b>
  <svg class="arr" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
</a>

<!-- ============ TRACKING ============ -->
<script>
  // Track CTAs em GA4 + Meta Pixel
  function trackCTA(location) {
    try {
      window.gtag && gtag('event', 'cta_click', { 'cta_location': location });
      window.fbq && fbq('track', 'Lead', { content_name: location });
      window.dataLayer && dataLayer.push({ event: 'cta_click', cta_location: location });
    } catch (e) { /* fail silently */ }
  }

  // Scroll depth
  let depths = [25, 50, 75, 100];
  let fired = new Set();
  window.addEventListener('scroll', () => {
    const sd = Math.round(((window.scrollY + window.innerHeight) / document.body.scrollHeight) * 100);
    depths.forEach(d => {
      if (sd >= d && !fired.has(d)) {
        fired.add(d);
        window.gtag && gtag('event', 'scroll_depth', { 'percent': d });
        window.fbq && fbq('trackCustom', 'ScrollDepth', { percent: d });
      }
    });
  });

  // Reveal animations
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { threshold: 0.12 });
  document.querySelectorAll('.section, .lp-hero__grid > *, .plan, .whom, .review').forEach(el => {
    el.classList.add('reveal'); io.observe(el);
  });
</script>

</body>
</html>
</pasted_text>

<!-- The user explicitly selected the following skills for this project, as attachments to their message. These are not optional context — they define how you work. Use them. -->
<attached-skill name="Design System (design system)">
[Design System] This project uses the **Design System** design system. This is a binding choice for visual style — every visual must follow it. Don't invent colors, type, spacing, or components not grounded here.

Scope: the design system is a visual style reference only. Its guide may describe example products, brands, or people that are unrelated to the user and unrelated to the subject of this conversation. Never treat anything in the design system as a fact about the user, their work, or the topic they asked about.

    Explore it to find what you need:
    - Always copy out the fonts and colors you need
    - For prototypes and designs, always copy out any relevant components
    - If the design system contains existing mocks of products, and you were asked to design or prototype something similar, copy and fork those mocks to start your design. This helps you make high-quality designs.
    
    Explore it quickly to find relevant UI kits (e.g. mocks of existing products you can copy and fork)

Full system at `/projects/019dfa76-12aa-7c06-9972-fe541cea7306/`. Before producing any visuals, explore it: call `list_files("/projects/019dfa76-12aa-7c06-9972-fe541cea7306/")` to see the structure, then `read_file` the README/base.md or whatever index file it has. Don't guess at the design system's contents.

CSS tokens: the guide may describe tokens in prose, but the exact `--*` names are defined in the design system's stylesheet(s). Before writing any `var(--*)`, look up the real name in the design system's `.css` files (`list_files` + `read_file` under `/projects/019dfa76-12aa-7c06-9972-fe541cea7306/`). Never guess a token name — an unresolved `var()` silently falls back to the browser default.

For assets and UI kits beyond the guide: `read_file("/projects/019dfa76-12aa-7c06-9972-fe541cea7306/<path>")` and `copy_files` to bring them into the current project.
</attached-skill>

## Assistant

_[tool: list_files]_

Recebi o HTML colado (mesma página 3 vezes), mas não veio o pedido junto. O que você quer fazer com essa landing page?

Algumas opções comuns:

1. **Adicionar ao projeto** como `landing.html` (ou outro nome) — só salvar o arquivo
2. **Revisar/melhorar** — eu olho com olhar de designer e proponho ajustes (hierarquia, ritmo visual, copy, conversão)
3. **Criar variações** — 2-3 versões com tratamentos diferentes (hero, cores, layout dos planos, etc.)
4. **Integrar com o site existente** — ajustar para casar com `index.html`, `servicos.html`, etc., reaproveitando o `styles.css`
5. **Construir o fluxo do diagnóstico** (`diagnostico-fluxo.html`) que o CTA referencia mas não existe ainda

Me diz qual caminho (ou me cola o pedido original) e eu sigo.

## User

faça as 5

## Assistant

_[tool: update_todos]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: list_files]_

_[tool: update_todos]_

Boa — vejo o sistema. Detalhei a discrepância: o HTML colado usa tokens que **não existem** no `styles.css` (`--font-display`, `--leaf-dark`, `--font-body`, `.btn--primary`, `.btn--inverse`, `italic-accent`). Renderiza, mas com várias fontes/cores caindo no fallback. Os componentes de planos/hero/faq também são *duplicados* dos que já existem na design system.

Aqui está meu plano consolidado das 5 entregas:

| # | Arquivo | O que é |
|---|---|---|
| 1 | `landing-raw.html` | O HTML colado, **só corrigindo os tokens quebrados** para renderizar correto. Preserva o que você escreveu. |
| 2 | `landing.html` | Versão melhorada + integrada (reusa `.hero`, `.plans`, `.faq`, `.diag`, `.trust`, `.footer--lg` do sistema; mesma nav/footer do `index.html`). |
| 3 | `landing-alt-quiet.html` | Variação editorial — silenciosa, confiante, sem urgência agressiva. |
| 4 | `landing-alt-quiz.html` | Variação "quiz-first" — o diagnóstico **é** o hero, inline. |
| 5 | `diagnostico-fluxo.html` | Fluxo de 5 perguntas + contato + tela de resultado com score. |

Pequenas adições ao `styles.css` no fim (risk strip, score card, sticky mobile, quiz). Começo já:

_[tool: run_script]_

Salvando o raw primeiro (via script, mais limpo para a substituição de tokens), depois construo os demais.

_[tool: run_script]_

Agora a versão integrada (`landing.html`) — reutilizando `.hero--question`, `.trust`, `.steps`, `.plans`, `.diag`, `.cta-band`, `.footer--lg` e `.faq` que já existem na design system. Adiciono só o risk-strip + diag-mock + sticky mobile como utilitários novos no CSS.

_[tool: run_script]_

Agora as duas variações e o fluxo do diagnóstico em paralelo:

_[tool: run_script]_

Agora o fluxo do diagnóstico — quiz de 5 perguntas + contato + tela de resultado com score real calculado:

_[tool: update_todos]_

_[tool: register_assets]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Pronto, as 5 entregas:

| Arquivo | Função |
|---|---|
| `landing-raw.html` | Seu HTML original, só com tokens quebrados corrigidos (`--font-display`→`--serif`, `--leaf-dark`→`--leaf-deep`, `.btn--primary`→`.btn--leaf`, etc). |
| `landing.html` | Versão limpa e integrada — reusa `.hero`, `.trust`, `.steps`, `.plans`, `.diag`, `.cta-band`, `.faq`, `.footer--lg` da design system. Mesma nav/footer do `index.html`. |
| `landing-alt-quiet.html` | Variação editorial — hero cream, sem urgência fabricada, copy mais confiante. |
| `landing-alt-quiz.html` | Variação "quiz-first" — pergunta 1 está embutida no hero como cartão jogável. |
| `diagnostico-fluxo.html` | Quiz completo: 5 perguntas com auto-advance + atalhos de teclado (A-E, ↵, Esc), contato, tela de loading com mensagens progressivas, e resultado com score calculado, gaps detalhados e plano recomendado. |
| `landing-utils.css` | Utilitários novos (diag-mock animado, risk-strip, sticky CTA mobile, variantes quiet/quiz). Não sobrescreve nada existente. |

**Decisões de design que vale registrar:**
- Removi 4 componentes duplicados que o seu HTML original recriava: `.plan`, `.faq`, `.diag`, `.footer` já existem prontos e melhores no `styles.css`. Aproveitei.
- O card de score no hero (`.diag-mock`) ganhou barras animadas + indicador "tempo real" pulsando — vira a peça visual central, sem precisar de foto de estoque.
- Sticky CTA mobile + WhatsApp float não competem: o float vai pra cima do sticky em telas <720px.
- O fluxo do diagnóstico tem teclado completo (A-E pra opção, ↵ avança, Esc volta), persistência via localStorage, e o score é calculado de verdade a partir dos pesos das respostas (range 15-100). Plano recomendado vem da faixa: ≥70 Essencial, 45-69 Conformidade, <45 Premium.

**Próximos passos sugeridos:**
- Trocar os logos placeholder em `.trust__logos` por SVGs reais quando você tiver.
- Adicionar IDs reais do Meta Pixel + GA4 nos comments do `<head>`.
- Decidir qual variação fica como padrão (ou expor como Tweak) — posso fazer essa parte se quiser.

## User

Verifier agent check completed

## Assistant

Verificação passou. Tudo no ar e funcional.

## User

continue

## Assistant

_[tool: read_file]_

_[tool: copy_starter_component]_

Bom — tem sistema de Tweaks no projeto. Vou continuar com duas coisas úteis: (1) uma página de **comparativo lado a lado** das 3 variações pra você decidir, e (2) **Tweaks** ativos no `landing.html` pra alternar paleta/variante ao vivo.

_[tool: write_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: grep]_

_[tool: grep]_

_[tool: write_file]_

Fixing — usei nomes errados de export. Vou reescrever simples:

_[tool: show_html]_

_[tool: str_replace_edit]_

Vou agora adicionar Tweaks ao `landing.html` pra alternar paleta/variante ao vivo. Depois entrego e deixo o verifier checar tudo.

_[tool: write_file]_

_[tool: grep]_

Confirmado — `TweakRadio`, `TweakToggle`, `TweakSection`, `useTweaks` todos disponíveis. Finalizando:

_[tool: register_assets]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Adicionado:

| Arquivo | Função |
|---|---|
| `Comparativo.html` | Canvas pan/zoom com as **4 landings + fluxo** em browser-chrome mockado. Hover em cada cartão mostra uma nota explicando o que difere. Clique abre fullscreen, drag reordena. |
| `landing-tweaks.jsx` | Tweaks da landing principal: alterna **Bold ↔ Quiet** ao vivo, troca paleta (verde/laranja/navy), liga/desliga risk-strip e sticky mobile, controla densidade. |

Agora você consegue:
1. Abrir `Comparativo.html` pra decidir qual variação fica como padrão
2. Toggle "Tweaks" na barra superior em `landing.html` e testar variações sem mexer no código

## User

Verifier agent check completed

## Assistant

Tudo verificado. Quando quiser bater o martelo numa variação, abre `Comparativo.html` ou liga Tweaks no `landing.html` e decide.

## User

siga o recomendado. porem como e uma land page de capitura de geraçao de lead. nao tem seçoes nessa land page

## Assistant

_[tool: copy_files]_

Faz total sentido — landing de captura é uma tela só, sem distrações. Vou:

1. Preservar a atual como `landing-completa.html` (pra reuso no site institucional)
2. Refazer `landing.html` enxuta: hero único com headline + Q1 do quiz inline → ao clicar, vai direto pro fluxo com a resposta pré-preenchida
3. Tirar planos, FAQ, reviews, "for whom", risk-strip, footer largo

_[tool: write_file]_

_[tool: write_file]_

_[tool: register_assets]_

_[tool: done]_

_[tool: get_webview_logs]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: fork_verifier_agent]_

Tudo carregado — Tweaks só renderiza visualmente quando você ativa o toggle (comportamento esperado). O warning do `#root` foi falso positivo (a página usa `#tweaks-root`, não `#root`).Pronto:

- **`landing.html`** agora é uma página de captura única — barra de marca fina, hero com headline + Q1 inline do quiz (5 opções, navegação por teclado A-E), micro footer só com legais. Sem planos, sem FAQ, sem risk-strip, sem reviews.
- Clicar em qualquer opção do quiz vai direto para `diagnostico-fluxo.html?q1=<val>` (a resposta já entra como primeira do funil).
- **`landing-completa.html`** preserva a versão anterior com todas as seções, caso você queira reusar pro site institucional.
- Tweaks ainda funcionam (Bold ↔ Quiet, paletas verde/laranja/navy).

## User

Verifier agent check completed

## Assistant

Tudo aprovado. Quando quiser fazer A/B com a Quiet, é só ligar Tweaks no canto da tela.

## User

adiconar um botao de diagnostico gratis. mudar a chamda pra açao. Em 90 segundos descobrimos o gap regulatório da sua escola, restaurante, padaria ou hotel — e entregamos o plano de ação por escrito. Sem custo, sem ligação automática. para "Descubra as pendências regulatórias do seu negócio em 90 segundos. Receba um plano de ação personalizado, sem custo e sem compromisso. Clique e comece agora!"

o questionario so aparece apos clicar no botao. 

abaixo deve ter uma dash com numeros reais do por que contratar a food guard.

abaixo deve ter uma fag completa com possiveis perguntas

## Assistant

_[tool: write_file]_

Faz sentido — refazendo a landing como CTA pura, com stats dashboard e FAQ completo abaixo. Quiz abre em modal ao clicar.

_[tool: str_replace_edit]_

Agora ajustar o `diagnostico-fluxo.html` pra esconder a barra de topo quando aberto em modal (`?embed=1`):

## User

Save as standalone HTML: landing.html

## Assistant

## User

Save as standalone HTML: landing.html

## Assistant

