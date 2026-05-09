import { useEffect, useRef, useState, useCallback } from "react";
import pillsImage from "@/assets/pilulas.png";
import bgVideo from "@/assets/matrix_bg.mp4";

const INSTAGRAM_URL = "https://www.instagram.com/direito_civil2.0"
const SYMPLA_URL =
  "https://www.sympla.com.br/evento/cOdigo-civil-20--o-patch-que-a-lei-precisava---adaptando-a-lei-a-realidade-fatica/3409159";

/* ---------------- Matrix Rain (Canvas) ---------------- */

function MatrixRainCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const safeCanvas = canvas as HTMLCanvasElement;
    const safeCtx = ctx as CanvasRenderingContext2D;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];

    const fontSize = 16;
    const chars =
      "ア0101イ00000ウエオカキ1ク0ケコサシスセソタチツテトナニヌネノ0123456789ABCDEF{}[]<>=+-*/$#@!";

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      safeCanvas.width = Math.floor(width * dpr);
      safeCanvas.height = Math.floor(height * dpr);
      safeCanvas.style.width = width + "px";
      safeCanvas.style.height = height + "px";

      safeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      columns = Math.ceil(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -50);
    }

    resize();
    window.addEventListener("resize", resize);

    let last = performance.now();
    const targetMs = 1000 / 30;

    function frame(now: number) {
      if (now - last >= targetMs) {
        last = now;

        safeCtx.fillStyle = "rgba(0,0,0,0.08)";
        safeCtx.fillRect(0, 0, width, height);
        safeCtx.font = `${fontSize}px "Fira Code", monospace`;
        safeCtx.textBaseline = "top";

        for (let i = 0; i < columns; i++) {
          const ch = chars.charAt(Math.floor(Math.random() * chars.length));
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          safeCtx.fillStyle = Math.random() > 0.975 ? "#CCFFCC" : "#00FF41";
          safeCtx.fillText(ch, x, y);

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
        mixBlendMode: "screen",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}

/* ---------------- Hotspots das pílulas ---------------- */

type PillTone = "blue" | "red";

interface PillConfig {
  x: string;
  y: string;
  rotate: string;
  label: string;
  aria: string;
  tone: PillTone;
}

const STAGE_ASPECT = "3 / 2";
const IMG_POSITION = "center 45%";

const PILLS: Record<"legacy" | "patch", PillConfig> = {
  legacy: {
    x: "25.8%",
    y: "51.0%",
    rotate: "97deg",
    label: "[ MANTER O C.C DE 2002 ]",
    aria: "Pílula azul — sistema legado, opção indisponível",
    tone: "blue",
  },
  patch: {
    x: "75.3%",
    y: "51.6%",
    rotate: "-92deg",
    label: "[ APROVAR A REFORMA ]",
    aria: "Pílula vermelha — executar Patch CC 2.0",
    tone: "red",
  },
};

interface PillHotspotProps {
  config: PillConfig;
  blueShake: boolean;
  executing: boolean;
  onBlueActivate: (e: React.PointerEvent) => void;
  onRedActivate: (e: React.PointerEvent) => void;
}

function PillHotspot({
  config,
  blueShake,
  executing,
  onBlueActivate,
  onRedActivate,
}: PillHotspotProps) {
  const isLegacy = config.tone === "blue";

  return (
    <div
      className="absolute z-10"
      style={{
        left: config.x,
        top: config.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          transform: `rotate(${config.rotate})`,
          transformOrigin: "50% 50%",
        }}
      >
        <button
          type="button"
          onPointerUp={isLegacy ? onBlueActivate : onRedActivate}
          disabled={!isLegacy && executing}
          aria-label={config.aria}
          className={[
            "relative block",
            "w-10.75 h-5 sm:w-22.5 sm:h-12.25",
          ].join(" ")}
          style={{
            cursor: isLegacy ? "not-allowed" : executing ? "default" : "pointer",
            background: "transparent",
            border: "none",
            padding: "0",
            touchAction: "manipulation",
          }}
        >
          {!isLegacy && <span className="ping-ring" aria-hidden />}
          {!isLegacy && <span className="ping-ring delay" aria-hidden />}

          <div className="targeting-frame" aria-hidden>
            <span />
          </div>
        </button>
      </div>

      <div
        className={[
          "absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono",
          "text-[15px] sm:text-[15px]",
          isLegacy
            ? "crt-glow text-neon"
            : "bug-glow font-bold text-bug",
        ].join(" ")}
        style={{
          top: "calc(100% + 12px)",
          textShadow: isLegacy
            ? "0 0 6px rgba(0, 255, 65, 0.9)"
            : "0 0 6px rgba(255, 0, 80, 0.9)",
        }}
      >
        {config.label}
      </div>

      {isLegacy && blueShake && (
        <div
          role="alert"
          className="bug-glow absolute left-1/2 z-20 -translate-x-1/2 whitespace-nowrap border border-bug bg-black/90 px-2 py-1 font-mono text-[9px] text-bug sm:text-[10px]"
          style={{
            bottom: "calc(100% + 6px)",
            animation: "fade-in 0.15s ease-out",
          }}
        >
          ! ACESSO_NEGADO: VERSÃO_OBSOLETA
        </div>
      )}
    </div>
  );
}

/* ---------------- Choice Module ---------------- */

export default function ChoiceModule() {
  // LÓGICA DO COMPONENTE
  const [executing, setExecuting] = useState(false);
  const [blueShake, setBlueShake] = useState(false);
  const [screenGlitch, setScreenGlitch] = useState(false);
  const [logStep, setLogStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!executing) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t1 = window.setTimeout(() => setLogStep(1), 400);
    const t2 = window.setTimeout(() => setLogStep(2), 1100);
    const t3 = window.setTimeout(() => setLogStep(3), 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = previousOverflow;
    };
  }, [executing]);

  const triggerRed = useCallback(() => {
    if (executing) return;
    setExecuting(true);
    document.body.style.overflow = "hidden";
    
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 0.5;
        videoRef.current.playbackRate = 1.2;
        videoRef.current.play().catch(e => console.log("Erro ao tocar vídeo:", e));
      }
    }, 500);

    setTimeout(() => { window.location.href = SYMPLA_URL; }, 11800);
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

  const scrollToPills = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("modulo-de-escolha");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // INTERFACE
  return (
    <section
      className={`relative overflow-hidden border-t border-neon/30 bg-transparent ${
        screenGlitch ? "screen-glitch" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        
        {/* BOTÃO FIXO REFINADO */}
        <div className="fixed top-10 right-6 z-9990 flex flex-col gap-3">
          <button
            onClick={scrollToPills}
            className="glitch-hover group relative inline-flex items-center justify-center overflow-hidden border border-neon bg-black/80 px-4 py-1.5 font-mono text-xs font-bold tracking-wider text-neon backdrop-blur-md transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.2)]"
          >
            <span className="original-text crt-glow relative z-10 uppercase">
              [ Garanta Sua Vaga ]
            </span>
            <span className="bug-text crt-glow relative z-10 uppercase text-neon">
              [ ACORDAR_AGORA ]
            </span>
            <div className="absolute inset-0 z-0 bg-neon opacity-0 transition-opacity group-hover:opacity-10" />
          </button>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="glitch-hover group relative inline-flex items-center justify-center overflow-hidden border border-neon bg-black/80 px-4 py-1.5 font-mono text-xs font-bold tracking-wider text-neon backdrop-blur-md transition-all cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.2)]"
          >
            <span className="crt-glow relative z-10 uppercase">
              [ Instagram ]
            </span>
            <div className="absolute inset-0 z-0 bg-neon opacity-0 transition-opacity group-hover:opacity-10" />
          </a>
        </div>

        <h2
          className="glitch crt-glow text-center text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl text-neon"
          data-text="// ESCOLHA O SEU CAMINHO_"
          style={{ lineHeight: 1.25 }}
        >
          // ESCOLHA O SEU CAMINHO_
        </h2>

        <p className="mt-3 text-center text-[10px] text-terminal sm:text-xs">
          // dois caminhos. apenas um é executável.
        </p>

        <div
          id="modulo-de-escolha"
          className="relative mx-auto mt-8 overflow-hidden border border-neon/50 bg-black/60"
          style={{
            maxWidth: "860px",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 0 30px rgba(0,255,65,0.15), inset 0 0 60px rgba(0,0,0,0.8)",
          }}
        >
          {/* top bar */}
          <div className="flex items-center justify-between border-b border-neon/40 px-3 py-1.5 font-mono text-[10px]">
            <span className="crt-glow text-neon">
              /dev/choice.bin
            </span>
            <span className="blink text-terminal/70">
              ● AGUARDANDO SUA DECISÃO
            </span>
          </div>

          {/* stage */}
          <div
            className="relative w-full select-none overflow-hidden"
            style={{ aspectRatio: STAGE_ASPECT }}
          >
            <img
              src={pillsImage}
              alt="Duas mãos segurando pílulas: azul à esquerda e vermelha à direita"
              loading="lazy"
              draggable={false}
              className="absolute inset-0 h-full w-full"
              style={{
                objectFit: "cover",
                objectPosition: IMG_POSITION,
              }}
            />

            <div
              aria-hidden
              className="scanlines pointer-events-none absolute inset-0 mix-blend-overlay opacity-60"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.88) 100%)",
              }}
            />

            <PillHotspot
              config={PILLS.legacy}
              blueShake={blueShake}
              executing={executing}
              onBlueActivate={onBlueActivate}
              onRedActivate={onRedActivate}
            />

            <PillHotspot
              config={PILLS.patch}
              blueShake={blueShake}
              executing={executing}
              onBlueActivate={onBlueActivate}
              onRedActivate={onRedActivate}
            />
          </div>

          {/* bottom bar */}
          <div className="flex items-center justify-between border-t border-neon/40 px-3 py-1.5 font-mono text-[10px]">
            <span className="text-terminal/70">
              Capsulas: 02 · Executáveis: 01
            </span>
            <span className="crt-glow text-neon">
              tap → diagnose
            </span>
          </div>
        </div>

        <div className="mt-6 text-center font-mono text-lg sm:text-xl text-terminal/70">
        // Toque sobre uma das cápsulas
        </div>
      </div>

      {executing && (
        <>
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "black",
              zIndex: 9997,
              pointerEvents: "none",
            }}
          />

          <video
            src={bgVideo} 
            autoPlay
            muted={isMuted}
            playsInline
            ref={videoRef}
            style={{
              position: "fixed",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.40, 
              zIndex: 9998,
              pointerEvents: "none",
              mixBlendMode: "screen", 
              transform: "scale(1.1)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskSize: "cover",
              maskSize: "cover",
            }}
          />

          <div
            aria-hidden
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 70%)", 
              zIndex: 9999,
              pointerEvents: "none",
            }}
          />

          <MatrixRainCanvas active={executing} />

          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)} 
            className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-neon bg-black/60 text-neon backdrop-blur-md transition-colors hover:bg-neon hover:text-black cursor-pointer"
            aria-label={isMuted ? "Ativar som" : "Desativar som"}
            style={{ zIndex: 10001, pointerEvents: "auto" }}
          >
            {isMuted ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            )}
          </button>

          <div
            role="dialog"
            aria-live="assertive"
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{ zIndex: 10000, pointerEvents: "none" }}
          >
            <div className="max-w-[92vw] text-center font-mono">
              <div
                className="crt-glow font-bold leading-relaxed text-neon"
                style={{ fontSize: "clamp(0.85rem, 2.6vw, 1.25rem)" }}
              >
                {logStep >= 1 && <p>&gt; REESCREVENDO_KERNEL... [OK]</p>}
                {logStep >= 2 && (
                  <p>&gt; ADAPTANDO_REALIDADE_FÁTICA... [99%]</p>
                )}
                {logStep >= 3 && (
                  <p className="blink bug-glow mt-2 text-bug">
                    &gt; WAKE UP, NEO.
                  </p>
                )}
              </div>

              <p className="blink-cursor mt-6 text-xs text-terminal">
                $ seguindo → o_coelho_branco.bin
              </p>
            </div>
          </div>

          {/* BOTÃO E AVISO PARA PULAR A ANIMAÇÃO (SKIP) */}
          <div 
            className="fixed bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full px-4"
            style={{ zIndex: 10001, pointerEvents: "auto" }}
          >
            <p className="text-[10px] sm:text-xl text-terminal/80 font-mono text-center opacity-80">
              Aguarde, você será redirecionado automaticamente...
            </p>
            <button
              onClick={() => { window.location.href = SYMPLA_URL; }}
              className="group relative inline-flex items-center justify-center overflow-hidden border border-neon/50 bg-black/80 px-6 py-2 font-mono text-xs font-bold tracking-wider text-neon backdrop-blur-md transition-all hover:bg-neon hover:text-black cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.15)]"
            >
              <span className="crt-glow relative z-10 uppercase">
                [ Ir Agora ]
              </span>
              <div className="absolute inset-0 z-0 bg-neon opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}