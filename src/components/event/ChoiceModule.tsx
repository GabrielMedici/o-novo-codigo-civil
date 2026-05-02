import { useEffect, useRef, useState, useCallback } from "react";
import pillsImage from "@/assets/image_6.png";
import bgVideo from "@/assets/matrix_bg.mp4"

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

/* Ajuste fino de posição */
const PILLS: Record<"legacy" | "patch", PillConfig> = {
  legacy: {
    x: "25.8%",   // levemente mais para a esquerda
    y: "51.0%",   // um pouquinho mais para cima
    rotate: "97deg",
    label: "[ MANTER O C.C DE 2002 ]",
    aria: "Pílula azul — sistema legado, opção indisponível",
    tone: "blue",
  },
  patch: {
    x: "75.3%",   // um pouco mais para a direita
    y: "51.6%",   // um pouco mais para cima
    rotate: "-92deg",
    label: "[ APROVAR A REFORMA ]",
    aria: "Pílula vermelha — executar Patch CC 2.0",
    tone: "red",
  },
};

interface OvalPillProps {
  color: PillTone;
  shake?: boolean;
}

// Mantido só para eventual reuso; não é mais renderizado.
function OvalPill({ color, shake = false }: OvalPillProps) {
  const isBlue = color === "blue";

  return (
    <div className={`choice-pill-shell ${shake ? "capsule-shake" : ""}`}>
      <div
        className={`choice-pill choice-pill-oval ${
          isBlue ? "choice-pill-blue" : "choice-pill-red"
        }`}
      >
        <div className="choice-pill-highlight" aria-hidden />
        <div className="choice-pill-reflection" aria-hidden />
        <div className="choice-pill-split" aria-hidden />
        <div className="choice-pill-shadow" aria-hidden />
        <div
          className={`choice-pill-glow ${isBlue ? "is-blue" : "is-red"}`}
          aria-hidden
        />
      </div>
    </div>
  );
}

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
        // só centraliza, sem rotate aqui
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* WRAPPER que gira apenas o alvo/círculo */}
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
            // tamanho da hitbox: mobile menor, desktop maior
            "w-[43px] h-[20px] sm:w-[90px] sm:h-[49px]",
          ].join(" ")}
          style={{
            cursor: isLegacy ? "not-allowed" : executing ? "default" : "pointer",
            background: "transparent",
            border: "none",
            padding: "0",           // padding zero para bater com width/height
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

      {/* texto fora do wrapper rotacionado → fica reto */}
      <div
       className={[
         "absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono",
         "text-[15px] sm:text-[15px]",
         isLegacy
           ? "crt-glow text-[color:var(--neon)]"
           : "bug-glow font-bold text-[color:var(--bug)]",
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
          className="bug-glow absolute left-1/2 z-20 -translate-x-1/2 whitespace-nowrap border border-[color:var(--bug)] bg-black/90 px-2 py-1 font-mono text-[9px] text-[color:var(--bug)] sm:text-[10px]"
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
  const [executing, setExecuting] = useState(false);
  const [blueShake, setBlueShake] = useState(false);
  const [screenGlitch, setScreenGlitch] = useState(false);
  const [logStep, setLogStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const redirectedRef = useRef(false);
  
  // Ref para o elemento de vídeo, necessário para interações no triggerRed
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
        videoRef.current.muted = false; // Garante que não esteja mutado
        videoRef.current.volume = 0.5;  // Define um volume inicial visível
        videoRef.current.playbackRate = 1.5; // Configura velocidade do vídeo diretamente
        videoRef.current.play().catch(e => console.log("Erro ao tocar vídeo:", e));
      }
    }, 500);

    setTimeout(() => { window.location.href = SYMPLA_URL; }, 7500);
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

  // Função para rolar suavemente até o módulo de escolha
  const scrollToPills = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("modulo-de-escolha");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      className={`relative overflow-hidden border-t border-[color:var(--neon)]/30 bg-black ${
        screenGlitch ? "screen-glitch" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
        
        {/* BOTÃO FIXO NO TOPO À DIREITA (Mais baixo) */}
        <div className="fixed top-10 right-6 z-[9990]">
          <button
            onClick={scrollToPills}
            className="group relative inline-flex items-center justify-center overflow-hidden border border-[color:var(--neon)] bg-black/80 px-4 py-1.5 font-mono text-xs font-bold tracking-wider text-[color:var(--neon)] backdrop-blur-md transition-all hover:bg-[color:var(--neon)] hover:text-black sm:text-sm cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.2)]"
          >
            <span className="crt-glow relative z-10 uppercase">
              [ Garanta Sua Vaga ]
            </span>
            <div className="absolute inset-0 z-0 bg-[color:var(--neon)] opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        </div>

        <p className="mb-3 text-center text-[10px] text-[color:var(--terminal)] sm:text-xs">
          $ ./Faça sua escolha --modulo=crítico
        </p>

        <h2
          className="glitch crt-glow text-center text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          data-text="// ESCOLHA O SEU CAMINHO_"
          style={{ lineHeight: 1.25 }}
        >
          // ESCOLHA O SEU CAMINHO_
        </h2>

        <p className="mt-3 text-center text-[10px] text-[color:var(--terminal)] sm:text-xs">
          // dois caminhos. apenas um é executável.
        </p>

        <div
          id="modulo-de-escolha" /* <-- ID PARA A ROLAGEM SUAVE */
          className="relative mx-auto mt-8 overflow-hidden border border-[color:var(--neon)]/50 bg-black/60"
          style={{
            maxWidth: "860px",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow:
              "0 0 30px rgba(0,255,65,0.15), inset 0 0 60px rgba(0,0,0,0.8)",
          }}
        >
          {/* top bar */}
          <div className="flex items-center justify-between border-b border-[color:var(--neon)]/40 px-3 py-1.5 font-mono text-[10px]">
            <span className="crt-glow text-[color:var(--neon)]">
              /dev/choice.bin
            </span>
            <span className="blink text-[color:var(--terminal)]/70">
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
                background:
                  "radial-gradient(ellipse at center, transparent 38%, rgba(0,0,0,0.88) 100%)",
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
          <div className="flex items-center justify-between border-t border-[color:var(--neon)]/40 px-3 py-1.5 font-mono text-[10px]">
            <span className="text-[color:var(--terminal)]/70">
              Capsulas: 02 · Executáveis: 01
            </span>
            <span className="crt-glow text-[color:var(--neon)]">
              tap → diagnose
            </span>
          </div>
        </div>

        <div className="mt-6 text-center font-mono text-lg sm:text-xl text-[color:var(--terminal)]/70">
        // Toque sobre uma das cápsulas
        </div>
      </div>

      {executing && (
        <>
          {/* 0. CORTINA PRETA SÓLIDA PARA ESCONDER O SITE */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "black",
              zIndex: 9997, /* Fica imediatamente atrás do vídeo (9998) */
              pointerEvents: "none",
            }}
          />

          {/* 1. VÍDEO DE FUNDO */}
          <video
            src={bgVideo} 
            autoPlay
            loop
            muted={isMuted}
            playsInline
            ref={videoRef}
            style={{
              position: "fixed",
              inset: 0,          /* Crava o elemento no topo, base e laterais absolutas */
              width: "100%",     /* Usa a área ancorada, ignorando vh/vw bugados do mobile */
              height: "100%",
              objectFit: "cover",/* Expande e centraliza cortando as sobras nativamente */
              opacity: 0.17, 
              zIndex: 9998,
              pointerEvents: "none",

              /* A máscara agora agirá sobre a tela inteira com precisão matemática */
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
              WebkitMaskSize: "cover",
              maskSize: "cover",
            }}
          />

          {/* 1.5. SOMBRA PRETA NO TOPO PARA EMENDAR COM O FUNDO */}
          <div
            aria-hidden
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh", /* 60vh = exatamente 3/5 da tela */
              /* Gradiente ajustado: Sólido no topo (50%), escuro até a metade (90%) e some no fim (100%) */
              background: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 70%)", 
              zIndex: 9999,
              pointerEvents: "none",
            }}
          />

          {/* 2. CHUVA DO MATRIX */}
          <MatrixRainCanvas active={executing} />

          {/* 3. BOTÃO DE ÁUDIO */}
          <button
            type="button"
            // onClick corrige o estado no componente pai
            onClick={() => setIsMuted(!isMuted)} 
            className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--neon)] bg-black/60 text-[color:var(--neon)] backdrop-blur-md transition-colors hover:bg-[color:var(--neon)] hover:text-black cursor-pointer"
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

          {/* 4. TEXTOS DE SISTEMA (WAKE UP NEO) */}
          <div
            role="dialog"
            aria-live="assertive"
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{ zIndex: 10000, pointerEvents: "none" }}
          >
            <div className="max-w-[92vw] text-center font-mono">
              <div
                className="crt-glow font-bold leading-relaxed text-[color:var(--neon)]"
                style={{ fontSize: "clamp(0.85rem, 2.6vw, 1.25rem)" }}
              >
                {logStep >= 1 && <p>&gt; REESCREVENDO_KERNEL... [OK]</p>}
                {logStep >= 2 && (
                  <p>&gt; ADAPTANDO_REALIDADE_FÁTICA... [99%]</p>
                )}
                {logStep >= 3 && (
                  <p className="blink bug-glow mt-2 text-[color:var(--bug)]">
                    &gt; WAKE UP, NEO.
                  </p>
                )}
              </div>

              {/* Frase impactante de redirecionamento */}
              <p className="blink-cursor mt-6 text-xs text-[color:var(--terminal)]">
                $ seguindo → o_coelho_branco.bin
              </p>
            </div>
          </div>
        </>
      )}
    </section>
  );
}