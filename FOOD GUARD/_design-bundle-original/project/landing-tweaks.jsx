// Landing (lead-cap) Tweaks — variant + accent toggle.
const LANDING_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "variant": "bold",
  "accent": "warm"
}/*EDITMODE-END*/;

function LandingTweaks() {
  const [t, setTweak] = useTweaks(LANDING_TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.body.dataset.variant = t.variant;
    document.body.dataset.accent  = t.accent;
  }, [t.variant, t.accent]);

  return (
    <TweaksPanel title="Tweaks · Landing">
      <TweakSection label="Variação visual" />
      <TweakRadio
        label="Tom"
        value={t.variant}
        options={[
          { value: 'bold',  label: 'Bold' },
          { value: 'quiet', label: 'Quiet' }
        ]}
        onChange={(v) => setTweak('variant', v)}
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

      <p style={{margin:'0.85rem 0 0', fontSize:'0.74rem', color:'rgba(255,255,255,0.5)', lineHeight:1.45}}>
        Para comparar todas as variações:{' '}
        <a href="Comparativo.html" style={{color:'#6FB23E'}}>abrir Comparativo</a>
      </p>
      <p style={{margin:'0.5rem 0 0', fontSize:'0.74rem', color:'rgba(255,255,255,0.5)', lineHeight:1.45}}>
        Versão com seções completas:{' '}
        <a href="landing-completa.html" style={{color:'#6FB23E'}}>landing-completa.html</a>
      </p>
    </TweaksPanel>
  );
}

const __landingRoot = ReactDOM.createRoot(document.getElementById('tweaks-root'));
__landingRoot.render(<LandingTweaks />);
