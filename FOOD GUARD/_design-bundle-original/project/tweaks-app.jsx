// Food Guard — Tweaks app
// Wires the design knobs to body data-* attributes and hero modifier class.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "warm",
  "heroLayout": "question",
  "density": "full",
  "tone": "warm"
}/*EDITMODE-END*/;

function FoodGuardTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply to <body> + hero class so plain CSS rules pick them up.
  React.useEffect(() => {
    document.body.dataset.accent = t.accent;
    document.body.dataset.density = t.density;
    document.body.dataset.tone = t.tone;
  }, [t.accent, t.density, t.tone]);

  React.useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    hero.classList.remove('hero--editorial', 'hero--question');
    if (t.heroLayout === 'editorial') hero.classList.add('hero--editorial');
    if (t.heroLayout === 'question') hero.classList.add('hero--question');
  }, [t.heroLayout]);

  return (
    <TweaksPanel title="Tweaks · Food Guard">
      <TweakSection label="Tom da copy" />
      <TweakRadio
        label="Tom"
        value={t.tone}
        options={[
          { value: 'warm',   label: 'Acolhedor' },
          { value: 'direct', label: 'Direto' }
        ]}
        onChange={(v) => setTweak('tone', v)}
      />

      <TweakSection label="Hero" />
      <TweakRadio
        label="Layout"
        value={t.heroLayout}
        options={[
          { value: 'split',     label: 'Split' },
          { value: 'editorial', label: 'Editorial' },
          { value: 'question',  label: 'Pergunta' }
        ]}
        onChange={(v) => setTweak('heroLayout', v)}
      />

      <TweakSection label="Densidade" />
      <TweakRadio
        label="Página"
        value={t.density}
        options={[
          { value: 'short', label: 'Curta' },
          { value: 'full',  label: 'Completa' }
        ]}
        onChange={(v) => setTweak('density', v)}
      />

      <TweakSection label="Cor de acento" />
      <TweakRadio
        label="Paleta"
        value={t.accent}
        options={[
          { value: 'leaf', label: 'Verde' },
          { value: 'warm', label: 'Laranja' },
          { value: 'navy', label: 'Navy' }
        ]}
        onChange={(v) => setTweak('accent', v)}
      />
    </TweaksPanel>
  );
}

const __fgRoot = ReactDOM.createRoot(document.getElementById('tweaks-root'));
__fgRoot.render(<FoodGuardTweaks />);
