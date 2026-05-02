import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn("pt-20 pb-12 flex flex-col items-center justify-center", className)}>
      <div className="relative inline-block">
        {/* Título Principal com brilho CRT */}
        <h1 
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-neon crt-glow" 
          style={{ lineHeight: 1.1 }}
        >
          CÓDIGO CIVIL 2.0
        </h1>
        
        {/* Selo de Versão/Patch (estilo bug/glitch) */}
        <div className="absolute -bottom-2 right-0 bg-neon text-black text-[10px] font-bold px-1 py-0.5 leading-none uppercase tracking-widest animate-pulse shadow-[0_0_10px_#00ff41]">
          v2.0_patch_fatico
        </div>
      </div>

      {/* Subtítulo estilo terminal */}
      <p className="mt-6 text-terminal text-sm sm:text-base font-mono tracking-[0.2em] opacity-80 uppercase">
        <span className="text-neon/60 mr-2">$</span>
        // A atualização que a lei precisava _
      </p>
    </div>
  );
}