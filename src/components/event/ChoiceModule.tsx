import { useEffect, useRef, useState, useCallback } from "react";

const SYMPLA_URL =
  "https://www.sympla.com.br/evento/a-coisa-que-sente---de-objeto-sujeito-com-a-reforma-do-codigo-civil/3404244";

/* ---------------- Matrix Rain (Canvas, 60fps, mobile-safe) ---------------- */

function MatrixRainCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Cap DPR for mobile perf
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];
    const fontSize = 16;
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF{}[]<>=+-*/$#@!";

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -50);
    }
    resize();
    window.addEventListener("resize", resize);

    let last = performance.now();
    const targetMs = 1000 / 30; // 30fps is plenty for rain & saves battery on mobile

    function frame(now: number) {
      const elapsed = now - last;
      if (elapsed >= targetMs) {
        last = now;

        // Trail effect
        ctx!.fillStyle = "rgba(0,0,0,0.08)";
        ctx!.fillRect(0, 0, width, height);

        ctx!.font = `${fontSize}px "Fira Code", monospace`;
        ctx!.textBaseline = "top";

        for (let i = 0; i < columns; i++) {
          const ch = chars.charAt(Math.floor(Math.random() * chars.length));
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // Leading char: bright white-green, trail: neon green
          if (Math.random() > 0.975) {
            ctx!.fillStyle = "#CCFFCC";
          } else {
            ctx!.fillStyle = "#00FF41";
          }
          ctx!.fillText(ch, x, y);

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      }
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!active) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "#000",
        zIndex: 99998,
        pointerEvents: "none",
      }}
    />
  );
}

/* ---------------- Choice Module ---------------- */

export default function ChoiceModule() {
  const [executing, setExecuting] = useState(false);
  const [blueErr, setBlueErr] = useState(false);
  const redirectedRef = useRef(false);

  const triggerRed = useCallback(() => {
    if (executing) return;
    setExecuting(true);
    // lock body scroll for the dramatic moment
    document.body.style.overflow = "hidden";
    if (redirectedRef.current) return;
    redirectedRef.current = true;
    window.setTimeout(() => {
      window.location.href = SYMPLA_URL;
    }, 2600);
  }, [executing]);

  // Single-tap on mobile: use onPointerUp so iOS/Android fire instantly without 300ms delay
  const onRedActivate = (e: React.PointerEvent | React.MouseEvent) => {
    e.preventDefault();
    triggerRed();
  };

  const onBlueActivate = (e: React.PointerEvent | React.MouseEvent) => {
    e.preventDefault();
    setBlueErr(true);
    window.setTimeout(() => setBlueErr(false), 2200);
  };

  return (
    <section className="border-t border-[color:var(--neon)]/30 bg-black relative overflow-hidden">
      <div className="mx-3 sm:mx-6 my-10 border border-[color:var(--neon)] relative overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-8 pt-8 sm:pt-12 text-center relative z-10">
          <p className="text-[color:var(--terminal)] text-[10px] sm:text-xs mb-3">
            $ ./choice --module=critical
          </p>
          <h2
            className="crt-glow text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight glitch"
            data-text="// ESCOLHA O SEU SISTEMA_"
          >
            // ESCOLHA O SEU SISTEMA_
          </h2>
          <p className="mt-4 text-[color:var(--bug)] bug-glow text-xs sm:text-sm blink font-bold">
            &gt; WAKE UP, NEO. A REALIDADE CHAMA_
          </p>
          <p className="mt-2 text-[color:var(--terminal)] text-[10px] sm:text-xs">
            // dois caminhos. apenas um é executável.
          </p>
        </div>

        {/* Capsules */}
        <div className="relative z-10 mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 px-4 sm:px-10 pb-12 sm:pb-16 max-w-5xl mx-auto">
          {/* BLUE — legacy */}
          <div className="flex flex-col items-stretch">
            <button
              type="button"
              onPointerUp={onBlueActivate}
              aria-label="Manter sistema legado (acesso negado)"
              className={`group relative w-full px-4 sm:px-6 py-6 sm:py-8 border-2 transition-all duration-300 backdrop-blur-md text-center select-none
                ${
                  blueErr
                    ? "border-[#1a3a8a] bg-[#0a1a3a]/80"
                    : "border-[#1e4fc4] bg-[#0a1a3a]/30 hover:bg-[#0a1a3a]/60"
                }`}
              style={{
                boxShadow: blueErr
                  ? "0 0 24px rgba(30,79,196,0.4), inset 0 0 30px rgba(30,79,196,0.15)"
                  : "0 0 18px rgba(30,79,196,0.45), inset 0 0 24px rgba(30,79,196,0.18)",
              }}
            >
              <div className="text-[10px] sm:text-xs text-[#7faaff]/80 font-mono mb-2">
                [ CAPSULE_01 // legacy.sys ]
              </div>
              <div
                className="font-mono font-bold text-base sm:text-xl tracking-wider"
                style={{
                  color: "#9bc1ff",
                  textShadow: "0 0 8px rgba(30,79,196,0.9), 0 0 16px rgba(30,79,196,0.5)",
                }}
              >
                [ MANTER_SISTEMA_LEGADO ]
              </div>
              <div className="mt-3 text-[10px] sm:text-xs text-[#7faaff]/70 font-mono">
                version: cc/2002 · status: deprecated
              </div>
            </button>
            <div className="mt-3 min-h-[44px] text-center text-[10px] sm:text-xs font-mono">
              {blueErr ? (
                <div className="border border-[color:var(--bug)] bg-[color:var(--bug)]/10 text-[color:var(--bug)] bug-glow px-3 py-2 inline-block font-bold">
                  ERRO: OBSOLESCÊNCIA DETECTADA
                </div>
              ) : (
                <span className="text-[color:var(--terminal)]/60">
                  // hover/toque para diagnóstico
                </span>
              )}
            </div>
          </div>

          {/* RED — patch 2.0 (CTA) */}
          <div className="flex flex-col items-stretch">
            <button
              type="button"
              onPointerUp={onRedActivate}
              disabled={executing}
              aria-label="Executar Patch 2.0 — inscrição"
              className="group relative w-full px-4 sm:px-6 py-6 sm:py-8 border-2 transition-all duration-300 backdrop-blur-md text-center select-none
                border-[color:var(--bug)] bg-[color:var(--bug)]/10 hover:bg-[color:var(--bug)]/20
                hover:scale-[1.03] active:scale-[0.98] cta-pulse cursor-pointer disabled:cursor-wait"
              style={{
                touchAction: "manipulation",
              }}
            >
              <div className="text-[10px] sm:text-xs text-[color:var(--bug)]/90 font-mono mb-2 bug-glow">
                [ CAPSULE_02 // patch.cc2.0 ]
              </div>
              <div
                className="font-mono font-bold text-base sm:text-xl tracking-wider text-[color:var(--bug)] bug-glow"
              >
                [ EXECUTAR_PATCH_2.0 ]
              </div>
              <div className="mt-3 text-[10px] sm:text-xs text-[color:var(--bug)]/80 font-mono blink">
                ● ready · click to deploy
              </div>
            </button>
            <div className="mt-3 min-h-[44px] text-center text-[10px] sm:text-xs font-mono space-y-0.5">
              <div className="text-[color:var(--neon)] crt-glow">&gt; target: REFORMA.EXE</div>
              <div className="text-[color:var(--neon)] crt-glow">&gt; certified: 4H · UniCesumar</div>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN MATRIX OVERLAY */}
      {executing && (
        <>
          <MatrixRainCanvas active={executing} />
          <div
            role="dialog"
            aria-live="assertive"
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{ zIndex: 99999, pointerEvents: "none" }}
          >
            <div className="text-center max-w-[92vw]">
              <p
                className="text-[color:var(--neon)] crt-glow font-bold blink leading-tight font-mono"
                style={{ fontSize: "clamp(1.25rem, 5vw, 3rem)" }}
              >
                SISTEMA HACKEADO.
              </p>
              <p
                className="mt-2 text-[color:var(--neon)] crt-glow font-bold leading-tight font-mono"
                style={{ fontSize: "clamp(1rem, 4vw, 2.25rem)" }}
              >
                APLICANDO PATCH CC 2.0...
              </p>
              <p className="mt-6 text-[color:var(--terminal)] text-xs sm:text-sm font-mono blink-cursor">
                $ redirecting → sympla.com.br
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
