import { useEffect, useRef, useState, useCallback } from "react";
import pillsImage from "@/assets/image_6.png";

const SYMPLA_URL =
  "https://www.sympla.com.br/evento/a-coisa-que-sente---de-objeto-sujeito-com-a-reforma-do-codigo-civil/3404244";

/* ---------------- Matrix Rain (Canvas, mobile-safe) ---------------- */

function MatrixRainCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

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
    const targetMs = 1000 / 30;

    function frame(now: number) {
      const elapsed = now - last;
      if (elapsed >= targetMs) {
        last = now;
        ctx!.fillStyle = "rgba(0,0,0,0.08)";
        ctx!.fillRect(0, 0, width, height);
        ctx!.font = `${fontSize}px "Fira Code", monospace`;
        ctx!.textBaseline = "top";

        for (let i = 0; i < columns; i++) {
          const ch = chars.charAt(Math.floor(Math.random() * chars.length));
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          ctx!.fillStyle = Math.random() > 0.975 ? "#CCFFCC" : "#00FF41";
          ctx!.fillText(ch, x, y);
          if (y > height && Math.random() > 0.975) drops[i] = 0;
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
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}

/* ---------------- Choice Module ---------------- */

export default function ChoiceModule() {
  const [executing, setExecuting] = useState(false);
  const [blueShake, setBlueShake] = useState(false);
  const [screenGlitch, setScreenGlitch] = useState(false);
  const [logStep, setLogStep] = useState(0);
  const redirectedRef = useRef(false);

  // Progressive log lines after red pill activation
  useEffect(() => {
    if (!executing) return;
    const t1 = window.setTimeout(() => setLogStep(1), 400);
    const t2 = window.setTimeout(() => setLogStep(2), 1100);
    const t3 = window.setTimeout(() => setLogStep(3), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [executing]);

  const triggerRed = useCallback(() => {
    if (executing) return;
    setScreenGlitch(true);
    window.setTimeout(() => setScreenGlitch(false), 450);
    setExecuting(true);
    document.body.style.overflow = "hidden";
    if (redirectedRef.current) return;
    redirectedRef.current = true;
    window.setTimeout(() => {
      window.location.href = SYMPLA_URL;
    }, 2500);
  }, [executing]);

  const onRedActivate = (e: React.PointerEvent) => {
    e.preventDefault();
    triggerRed();
  };

  const onBlueActivate = (e: React.PointerEvent) => {
    e.preventDefault();
    setBlueShake(true);
    window.setTimeout(() => setBlueShake(false), 600);
  };

  return (
    <section
      className={`border-t border-[color:var(--neon)]/30 bg-black relative overflow-hidden ${
        screenGlitch ? "screen-glitch" : ""
      }`}
    >
      <div className="px-4 sm:px-8 py-16 max-w-5xl mx-auto">
        {/* Header */}
        <p className="text-[color:var(--terminal)] text-[10px] sm:text-xs mb-3 text-center">
          $ ./choice --module=critical
        </p>
        <h2
          className="crt-glow text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight glitch text-center"
          data-text="// ESCOLHA O SEU CAMINHO_"
          style={{ lineHeight: 1.4 }}
        >
          // ESCOLHA O SEU CAMINHO_
        </h2>
        <p className="mt-3 text-center text-[color:var(--terminal)] text-[10px] sm:text-xs">
          // dois caminhos. apenas um é executável.
        </p>

        {/* Interaction frame */}
        <div
          className="relative mx-auto mt-8 border border-[color:var(--neon)]/50 bg-black/60"
          style={{
            maxWidth: "640px",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow:
              "0 0 30px rgba(0,255,65,0.15), inset 0 0 60px rgba(0,0,0,0.8)",
          }}
        >
          {/* Top status bar */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-[color:var(--neon)]/40 text-[10px] font-mono">
            <span className="text-[color:var(--neon)] crt-glow">
              /dev/choice.bin
            </span>
            <span className="text-[color:var(--terminal)]/70 blink">
              ● AWAITING_INPUT
            </span>
          </div>

          {/* Image + capsule overlay */}
          <div
            className="relative w-full select-none"
            style={{ aspectRatio: "1 / 1" }}
          >
            <img
              src={pillsImage}
              alt="Duas mãos: pílula azul à esquerda (legado), pílula vermelha à direita (patch 2.0)"
              loading="lazy"
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter:
                  "grayscale(1) contrast(2.4) brightness(0.55) sepia(1) hue-rotate(85deg) saturate(7)",
              }}
            />

            {/* Mask: hide existing pill dots in the image with two black blots */}
            <div
              aria-hidden
              className="absolute pointer-events-none rounded-full"
              style={{
                left: "33%",
                top: "52%",
                width: "14%",
                height: "14%",
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.6) 60%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute pointer-events-none rounded-full"
              style={{
                left: "67%",
                top: "52%",
                width: "14%",
                height: "14%",
                transform: "translate(-50%, -50%)",
                background:
                  "radial-gradient(circle, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.6) 60%, transparent 100%)",
              }}
            />

            {/* Scanline overlay */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none scanlines mix-blend-overlay opacity-60"
            />

            {/* Vignette */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
              }}
            />

            {/* ===== BLUE CAPSULE OVERLAY (left, ~33% / 52%) ===== */}
            <div
              className="absolute"
              style={{
                left: "33%",
                top: "52%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <button
                type="button"
                onPointerUp={onBlueActivate}
                aria-label="Pílula azul — sistema legado, opção indisponível"
                className="relative block"
                style={{
                  cursor: "not-allowed",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  touchAction: "manipulation",
                }}
              >
                <div
                  className={`capsule-3d capsule-blue ${blueShake ? "capsule-shake" : ""}`}
                  style={{
                    width: "clamp(50px, 9vw, 60px)",
                    height: "clamp(20px, 3.75vw, 25px)",
                  }}
                />
                {/* Targeting frame */}
                <div className="targeting-frame">
                  <span />
                </div>
              </button>
              {/* Label */}
              <div
                className="absolute left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap font-mono text-[9px] sm:text-[10px] text-[color:var(--neon)] crt-glow"
                style={{ top: "100%" }}
              >
                [ SISTEMA_LEGADO ]
              </div>
              {/* Error balloon */}
              {blueShake && (
                <div
                  role="alert"
                  className="absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap px-2 py-1 font-mono text-[9px] sm:text-[10px] text-[color:var(--bug)] bug-glow border border-[color:var(--bug)] bg-black/90"
                  style={{ animation: "fade-in 0.15s ease-out" }}
                >
                  ! ACESSO_NEGADO: VERSÃO_OBSOLETA
                </div>
              )}
            </div>

            {/* ===== RED CAPSULE OVERLAY (right, ~67% / 52%) ===== */}
            <div
              className="absolute"
              style={{
                left: "67%",
                top: "52%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <button
                type="button"
                onPointerUp={onRedActivate}
                disabled={executing}
                aria-label="Pílula vermelha — executar Patch CC 2.0"
                className="relative block"
                style={{
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  touchAction: "manipulation",
                }}
              >
                <div
                  className="capsule-3d capsule-red"
                  style={{
                    width: "clamp(50px, 9vw, 60px)",
                    height: "clamp(20px, 3.75vw, 25px)",
                  }}
                />
                {/* Ping rings */}
                <span className="ping-ring" aria-hidden />
                <span className="ping-ring delay" aria-hidden />
                {/* Targeting frame */}
                <div className="targeting-frame">
                  <span />
                </div>
              </button>
              {/* Label */}
              <div
                className="absolute left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap font-mono text-[9px] sm:text-[10px] text-[color:var(--bug)] bug-glow font-bold"
                style={{ top: "100%" }}
              >
                [ EXECUTAR_PATCH_2.0 ]
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="flex items-center justify-between px-3 py-1.5 border-t border-[color:var(--neon)]/40 text-[10px] font-mono">
            <span className="text-[color:var(--terminal)]/70">
              capsules: 02 · executable: 01
            </span>
            <span className="text-[color:var(--neon)] crt-glow">
              tap → diagnose
            </span>
          </div>
        </div>

        {/* Helper text */}
        <div className="mt-6 text-center font-mono text-[10px] sm:text-xs text-[color:var(--terminal)]/70">
          // toque sobre uma das cápsulas
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
            style={{ zIndex: 10000, pointerEvents: "none" }}
          >
            <div className="text-center max-w-[92vw] font-mono">
              <div
                className="text-[color:var(--neon)] crt-glow font-bold leading-relaxed"
                style={{ fontSize: "clamp(0.85rem, 2.6vw, 1.25rem)" }}
              >
                {logStep >= 1 && <p>&gt; KERNEL_REWRITING... [OK]</p>}
                {logStep >= 2 && (
                  <p>&gt; ADAPTANDO_REALIDADE_FÁTICA... [100%]</p>
                )}
                {logStep >= 3 && (
                  <p className="blink mt-2 text-[color:var(--bug)] bug-glow">
                    &gt; WAKE UP, NEO.
                  </p>
                )}
              </div>
              <p className="mt-6 text-[color:var(--terminal)] text-xs blink-cursor">
                $ redirecting → sympla.com.br
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
