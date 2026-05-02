const SPEAKERS = [
  {
    handle: "@helena.vasconcellos",
    name: "Dra. Helena Vasconcellos",
    role: "Civilista",
    tag: "MODULE: civil_law.core",
  },
  {
    handle: "@marco.reis",
    name: "Prof. Marco Antônio Reis",
    role: "Direito Animal",
    tag: "MODULE: animal_rights.patch",
  },
  {
    handle: "@camila.furtado",
    name: "Dra. Camila Furtado",
    role: "Magistratura TJ-PR",
    tag: "MODULE: judiciary.runtime",
  },
  {
    handle: "@eduardo.leitao",
    name: "Prof. Eduardo Leitão",
    role: "Filosofia do Direito",
    tag: "MODULE: kernel.philosophy",
  },
];

const META = [
  { k: "DATE", v: "25/10/2026" },
  { k: "TIME", v: "19:30h" },
  { k: "LOCATION", v: "UniCesumar — Auditório Dona Etelvina" },
  { k: "CERT", v: "4H" },
];

export default function EventMeta() {
  return (
    <section className="border-t border-[color:var(--neon)]/30 bg-black">
      <div className="px-4 sm:px-8 py-16 max-w-6xl mx-auto">
        <p className="text-[color:var(--terminal)] text-xs mb-2">
          $ cat /etc/event/manifest.json
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 crt-glow">
          // METADADOS_DO_EVENTO_
        </h2>

        {/* META GRID */}
        <div className="border border-[color:var(--neon)]/70 bg-black overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[color:var(--neon)]/40">
            {META.map((m) => (
              <div key={m.k} className="px-4 py-4">
                <div className="text-[10px] text-[color:var(--terminal)]/70 font-mono tracking-widest mb-1">
                  &gt; {m.k}
                </div>
                <div className="text-sm sm:text-base text-[color:var(--neon)] crt-glow font-mono break-words">
                  {m.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SPEAKERS */}
        <p className="text-[color:var(--terminal)] text-xs mt-12 mb-2">
          $ ls -la /usr/share/speakers/ | grep .user
        </p>
        <h3 className="text-xl sm:text-2xl font-bold mb-6 crt-glow">
          // FICHAS_DE_USUÁRIO_
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPEAKERS.map((s, i) => (
            <article
              key={s.handle}
              className="border border-[color:var(--neon)]/70 bg-black hover:bg-[color:var(--neon)]/5 transition-colors"
            >
              {/* header bar */}
              <header className="flex items-center justify-between px-3 py-1.5 bg-[color:var(--neon)]/10 border-b border-[color:var(--neon)]/40">
                <span className="text-[10px] text-[color:var(--neon)] crt-glow font-mono">
                  USR_{String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] text-[color:var(--terminal)]/70 font-mono blink">
                  ● VERIFIED
                </span>
              </header>

              <div className="p-4">
                {/* Avatar — ASCII frame */}
                <div className="mb-3 flex items-center justify-center h-20 border border-[color:var(--neon)]/40 bg-black">
                  <pre
                    className="text-[10px] leading-tight text-[color:var(--neon)] crt-glow font-mono text-center select-none"
                    aria-hidden
                  >
{`  ┌─────┐
  │ ◉ ◉ │
  │  ─  │
  └─────┘`}
                  </pre>
                </div>

                <div className="text-[10px] font-mono text-[color:var(--terminal)]/70 mb-1 break-all">
                  {s.handle}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-[color:var(--neon)] crt-glow leading-tight">
                  {s.name}
                </h4>
                <div className="mt-2 inline-block border border-[color:var(--neon)]/60 px-2 py-0.5 text-[10px] text-[color:var(--neon)] crt-glow font-mono">
                  {s.role}
                </div>
                <div className="mt-3 text-[10px] text-[color:var(--terminal)]/60 font-mono">
                  // {s.tag}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="text-[10px] text-[color:var(--terminal)]/60 mt-4 font-mono">
          -- {SPEAKERS.length} usuários que já acordaram carregados · Autênticação: OK --
        </p>
      </div>
    </section>
  );
}
