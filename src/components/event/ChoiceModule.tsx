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
  const [redHover, setRedHover] = useState(false);
  const redirectedRef = useRef(false);

  const triggerRed = useCallback(() => {
    if (executing) return;
    setExecuting(true);
    document.body.style.overflow = "hidden";
    if (redirectedRef.current) return;
    redirectedRef.current = true;
    window.setTimeout(() => {
      window.location.href = SYMPLA_URL;
    }, 3000);
  }, [executing]);

  const onRedActivate = (e: React.PointerEvent) => {
    e.preventDefault();
    triggerRed();
  };

  const onBlueActivate = (e: React.PointerEvent) => {
    e.preventDefault();
    setBlueErr(true);
    window.setTimeout(() => setBlueErr(false), 2400);
  };

  return (
    <section className="border-t border-[color:var(--neon)]/30 bg-black relative overflow-hidden">
      <div className="px-4 sm:px-8 py-16 max-w-5xl mx-auto">
        {/* Header */}
        <p className="text-[color:var(--terminal)] text-[10px] sm:text-xs mb-3 text-center">
          $ ./choice --module=critical
        </p>
        <h2
          className="crt-glow text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight glitch text-center"
          data-text="// ESCOLHA O SEU CAMINHO_"
        >
          // ESCOLHA O SEU CAMINHO_
        </h2>
        <p className="mt-3 text-center text-[color:var(--terminal)] text-[10px] sm:text-xs">
          // dois caminhos. apenas um é executável.
        </p>

        {/* Above-image terminal text (red hover state) */}
        <div className="mt-8 min-h-[24px] text-center font-mono text-xs sm:text-sm">
          {redHover && !executing && (
            <span className="text-[color:var(--bug)] bug-glow blink font-bold">
              &gt; WAKE UP, NEO. A REALIDADE CHAMA_
            </span>
          )}
        </div>

        {/* Interaction frame */}
        <div
          className="relative mx-auto mt-3 border border-[color:var(--neon)]/50 bg-black/60"
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

          {/* Image + hotspots */}
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
                  "grayscale(1) contrast(3) brightness(0.7) sepia(1) hue-rotate(90deg) saturate(10)",
              }}
            />

            {/* Scanline overlay on top of treated image */}
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

            {/* BLUE HOTSPOT — left pill (~33% x, ~52% y) */}
            <button
              type="button"
              onPointerUp={onBlueActivate}
              aria-label="Pílula azul — opção indisponível"
              className="absolute group"
              style={{
                left: "33%",
                top: "52%",
                width: "16%",
                aspectRatio: "1 / 1",
                transform: "translate(-50%, -50%)",
                cursor: "not-allowed",
                background: "transparent",
                border: "none",
                padding: 0,
                touchAction: "manipulation",
              }}
            >
              <span
                aria-hidden
                className={`block w-full h-full rounded-full transition-all duration-200 ${
                  blueErr ? "blink" : ""
                }`}
                style={{
                  background: blueErr
                    ? "radial-gradient(circle, rgba(255,0,60,0.85) 0%, rgba(255,0,60,0.3) 50%, transparent 70%)"
                    : "transparent",
                  boxShadow: blueErr
                    ? "0 0 30px 8px rgba(255,0,60,0.9), 0 0 60px 16px rgba(255,0,60,0.5)"
                    : "none",
                  mixBlendMode: "screen",
                }}
              />
              {/* Targeting brackets on hover */}
              <span
                aria-hidden
                className="absolute inset-[-12%] border border-[color:var(--bug)]/0 group-hover:border-[color:var(--bug)]/80 transition-colors duration-150"
                style={{
                  clipPath:
                    "polygon(0 0, 25% 0, 25% 4%, 4% 4%, 4% 25%, 0 25%, 0 75%, 4% 75%, 4% 96%, 25% 96%, 25% 100%, 0 100%, 0 100%, 75% 100%, 75% 96%, 96% 96%, 96% 75%, 100% 75%, 100% 25%, 96% 25%, 96% 4%, 75% 4%, 75% 0, 100% 0, 100% 0)",
                }}
              />
            </button>

            {/* RED HOTSPOT — right pill (~67% x, ~52% y) */}
            <button
              type="button"
              onPointerUp={onRedActivate}
              onPointerEnter={() => setRedHover(true)}
              onPointerLeave={() => setRedHover(false)}
              disabled={executing}
              aria-label="Pílula vermelha — executar Patch 2.0"
              className="absolute group"
              style={{
                left: "67%",
                top: "52%",
                width: "16%",
                aspectRatio: "1 / 1",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                background: "transparent",
                border: "none",
                padding: 0,
                touchAction: "manipulation",
              }}
            >
              <span
                aria-hidden
                className="block w-full h-full rounded-full pulse-pill"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,0,60,0.55) 0%, rgba(255,0,60,0.18) 55%, transparent 75%)",
                  mixBlendMode: "screen",
                }}
              />
              <span
                aria-hidden
                className="absolute inset-[-12%] border border-[color:var(--bug)]/40 group-hover:border-[color:var(--bug)] transition-colors duration-150"
                style={{
                  clipPath:
                    "polygon(0 0, 25% 0, 25% 4%, 4% 4%, 4% 25%, 0 25%, 0 75%, 4% 75%, 4% 96%, 25% 96%, 25% 100%, 0 100%, 0 100%, 75% 100%, 75% 96%, 96% 96%, 96% 75%, 100% 75%, 100% 25%, 96% 25%, 96% 4%, 75% 4%, 75% 0, 100% 0, 100% 0)",
                }}
              />
            </button>

            {/* When red hovered: darken the rest */}
            {redHover && !executing && (
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(circle at 67% 52%, transparent 8%, rgba(0,0,0,0.65) 30%)",
                }}
              />
            )}
          </div>

          {/* Bottom status bar */}
          <div className="flex items-center justify-between px-3 py-1.5 border-t border-[color:var(--neon)]/40 text-[10px] font-mono">
            <span className="text-[color:var(--terminal)]/70">
              capsules: 02 · executable: 01
            </span>
            <span className="text-[color:var(--neon)] crt-glow">
              hover/tap → diagnose
            </span>
          </div>
        </div>

        {/* Below-image terminal text */}
        <div className="mt-6 min-h-[64px] text-center font-mono text-xs sm:text-sm space-y-2">
          {blueErr && (
            <div className="text-[color:var(--bug)] bug-glow font-bold blink">
              [ERRO: OBSOLESCÊNCIA DETECTADA - OPÇÃO NÃO DISPONÍVEL]_
            </div>
          )}
          {redHover && !executing && !blueErr && (
            <div className="text-[color:var(--neon)] crt-glow font-bold blink">
              &gt; CLIQUE PARA EXECUTAR_
            </div>
          )}
          {!blueErr && !redHover && (
            <>
              <div className="text-[color:var(--terminal)]/70">
                &gt; left.capsule = legacy.sys · right.capsule = patch.cc2.0
              </div>
              <div className="text-[color:var(--terminal)]/50 text-[10px]">
                // toque ou clique sobre uma das pílulas
              </div>
            </>
          )}
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
