export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="relative">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-current/80">
          PATR-
          <span className="text-bordeaux">SUJ</span>
          /001
        </div>
        <div className="serif italic text-2xl leading-none mt-0.5">
          A &ldquo;<span className="not-italic font-bold">Coisa</span>&rdquo;
          <span className="ml-2 text-bordeaux">que sente.</span>
        </div>
      </div>
    </div>
  );
}

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      <rect x="2" y="6" width="60" height="52" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="32" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="10" y1="26" x2="54" y2="26" stroke="currentColor" strokeWidth="0.8" />
      {/* Barcode-ish */}
      {[12, 15, 17, 21, 24, 28, 32, 35, 39, 43, 46, 50].map((x, i) => (
        <line key={i} x1={x} y1="32" x2={x} y2="48" stroke="currentColor" strokeWidth={i % 3 === 0 ? 1.6 : 0.8} />
      ))}
      {/* Glitch break = the questioning */}
      <line x1="28" y1="36" x2="44" y2="36" stroke="#600010" strokeWidth="2" />
      <text x="32" y="58" textAnchor="middle" fontSize="5" fontFamily="monospace" fill="currentColor" letterSpacing="1">
        SUJEITO?
      </text>
    </svg>
  );
}
