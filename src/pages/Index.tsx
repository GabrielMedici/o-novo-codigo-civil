import { useEffect, useState } from "react";
import ChoiceModule from "@/components/event/ChoiceModule";
import EventMeta from "@/components/event/EventMeta";

const MODULES = [
  {
    id: "MODULE_01",
    title: "INTELIGÊNCIA ARTIFICIAL",
    body: "O Código atual NÃO POSSUI norma sobre responsabilidade de sistemas autônomos. Quem responde quando o algoritmo erra?",
  },
  {
    id: "MODULE_02",
    title: "NOVAS CONFIGURAÇÕES FAMILIARES",
    body: "O código social evoluiu, a lei precisa acompanhar. O STF foi obrigado a preencher o vácuo legislativo.",
  },
  {
    id: "MODULE_03",
    title: "CONTRATOS ELETRÔNICOS",
    body: "Bilhões de contratos digitais. A reforma precisa nativizar o digital e estabelecer regras claras.",
  },
];

const BUGS = [
  { id: "#001", desc: "Ausência de regulação de IA", level: "CRÍTICO" },
  { id: "#002", desc: "Lacuna em famílias não tradicionais", level: "CRÍTICO" },
  { id: "#003", desc: "Contratos digitais sem marco legal", level: "ALTO" },
];

export default function Index() {
  const [bootLine, setBootLine] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setBootLine((n) => (n < 4 ? n + 1 : n)), 450);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="min-h-screen bg-black text-[color:var(--neon)] scanlines selection:bg-[color:var(--neon)] selection:text-black overflow-x-hidden">
      {/* TOP BAR */}
      <header className="border-b border-[color:var(--neon)]/40 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
        <span className="crt-glow">root@cc2.0:~#</span>
        <span className="text-[color:var(--terminal)]">SESSION: 0xCC-2026 · TTY/01</span>
        <span className="blink text-[color:var(--neon)]">● ONLINE</span>
      </header>

      {/* HERO */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 max-w-5xl mx-auto">
        <p className="text-[color:var(--terminal)] text-xs sm:text-sm mb-6">
          $ ./boot --target=civil_law --version=2.0
        </p>
        <h1
          className="glitch crt-glow text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4"
          data-text="CÓDIGO CIVIL 2.0"
        >
          <span className="typing">CÓDIGO CIVIL 2.0</span>
        </h1>
        <p className="text-[color:var(--terminal)] text-sm sm:text-base mb-2">
          // O PATCH QUE A LEI PRECISAVA
        </p>
        <p className="text-[color:var(--neon)] text-base sm:text-xl mt-6 blink-cursor">
          Adaptando a lei à realidade fática
        </p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] sm:text-xs">
          {["KERNEL: OK", "AI_MODULE: NULL", "FAMILY_DEF: LEGACY", "DIGITAL_CTX: UNDEFINED"].map((s, i) => (
            <div
              key={s}
              className={`border px-2 py-1 ${
                i === 0
                  ? "border-[color:var(--neon)] text-[color:var(--neon)]"
                  : "border-[color:var(--bug)]/60 text-[color:var(--bug)] bug-glow"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="border-t border-[color:var(--neon)]/30 bg-black/60">
        <div className="px-4 sm:px-8 py-16 max-w-5xl mx-auto">
          <p className="text-[color:var(--bug)] bug-glow text-xs sm:text-sm mb-4">
            [ERR] system.law.outdated_exception
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 crt-glow">
            // RELATÓRIO DE BUG_
          </h2>

          <div className="border border-[color:var(--neon)]/60 p-4 sm:p-6 space-y-4 bg-black">
            <p className="text-[color:var(--terminal)] text-sm sm:text-base leading-relaxed">
              <span className="text-[color:var(--neon)]">&gt; </span>
              O Código Civil brasileiro foi promulgado em 2002 — antes do iPhone, das redes sociais e da inteligência artificial.
            </p>
            <p className="text-[color:var(--terminal)] text-sm sm:text-base leading-relaxed">
              <span className="text-[color:var(--neon)]">&gt; </span>
              Em mais de duas décadas, o mundo real e o digital atropelaram as normas vigentes. O resultado: um sistema jurídico com{" "}
              <span className="text-[color:var(--bug)] bug-glow">bugs críticos</span>.
            </p>
          </div>

          <div className="mt-6 border border-[color:var(--bug)] bg-[color:var(--bug)]/10 px-4 py-3 text-[color:var(--bug)] bug-glow text-xs sm:text-sm font-bold">
            ⚠ [STATUS: DESATUALIZADO | ÚLTIMA ATUALIZAÇÃO: 10/01/2002]
          </div>
        </div>
      </section>

      {/* TESE */}
      <section className="border-t border-[color:var(--neon)]/30">
        <div className="px-4 sm:px-8 py-16 max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 crt-glow">
            // a lei como sistema operacional da sociedade
          </h2>
          <div className="border border-[color:var(--neon)]/60 p-4 sm:p-6 bg-black space-y-6">
            <p className="text-[color:var(--terminal)] text-sm sm:text-base leading-relaxed">
              Assim como um SO desatualizado trava diante de novos programas, uma lei anacrônica colapsa diante de novas realidades.
              A reforma não é destruição — é um <span className="text-[color:var(--neon)] crt-glow">patch de atualização crítico</span>.
            </p>

            <pre className="text-xs sm:text-sm bg-black border border-[color:var(--neon)]/40 p-4 overflow-x-auto text-[color:var(--neon)] crt-glow">
{`> Lei       = Sistema Operacional
> Sociedade = Hardware em evolução`}
            </pre>
          </div>
        </div>
      </section>

      {/* MÓDULOS */}
      <section className="border-t border-[color:var(--neon)]/30 bg-black">
        <div className="px-4 sm:px-8 py-16 max-w-6xl mx-auto">
          <p className="text-[color:var(--terminal)] text-xs mb-2">$ load --modules=update</p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 crt-glow">
            // MÓDULOS DE ATUALIZAÇÃO_
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MODULES.map((m, i) => (
              <article
                key={m.id}
                className="border border-[color:var(--neon)]/70 p-5 bg-black hover:bg-[color:var(--neon)]/5 transition-colors"
              >
                <header className="flex items-center justify-between text-xs text-[color:var(--terminal)] mb-3">
                  <span className="text-[color:var(--neon)] crt-glow">{m.id}</span>
                  <span className="blink">[LOADED]</span>
                </header>
                <h3 className="text-base sm:text-lg font-bold mb-3 crt-glow">{m.title}</h3>
                <p className="text-sm leading-relaxed text-[color:var(--terminal)]">{m.body}</p>
                <div className="mt-4 h-[2px] bg-[color:var(--neon)]/20 overflow-hidden">
                  <div
                    className="h-full bg-[color:var(--neon)]"
                    style={{ width: `${75 + i * 8}%` }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BUGS TABLE */}
      <section className="border-t border-[color:var(--neon)]/30">
        <div className="px-4 sm:px-8 py-16 max-w-5xl mx-auto">
          <p className="text-[color:var(--terminal)] text-xs sm:text-sm mb-2">
            root@sys:~# tail -n /var/log/syslog_cc2002
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 crt-glow">
            // RELATÓRIO DE BUGS CRÍTICOS_
          </h2>

          <div className="border border-[color:var(--neon)]/70 overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-[color:var(--neon)]/10 border-b border-[color:var(--neon)]/60">
                <tr className="text-left text-[color:var(--neon)] crt-glow">
                  <th className="px-3 py-2">BUG_ID</th>
                  <th className="px-3 py-2">DESCRIÇÃO</th>
                  <th className="px-3 py-2">SEVERIDADE</th>
                </tr>
              </thead>
              <tbody>
                {BUGS.map((b) => (
                  <tr key={b.id} className="border-b border-[color:var(--neon)]/20 hover:bg-[color:var(--bug)]/5">
                    <td className="px-3 py-3 text-[color:var(--terminal)]">BUG {b.id}</td>
                    <td className="px-3 py-3 text-[color:var(--terminal)]">{b.desc}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`border px-2 py-0.5 text-[10px] sm:text-xs font-bold ${
                          b.level === "CRÍTICO"
                            ? "border-[color:var(--bug)] text-[color:var(--bug)] bug-glow"
                            : "border-[color:var(--neon)] text-[color:var(--neon)] crt-glow"
                        }`}
                      >
                        [{b.level}]
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] sm:text-xs text-[color:var(--terminal)] mt-3">
            -- end of log -- {BUGS.length} entries scanned --
          </p>
        </div>
      </section>

      {/* EVENT METADATA + SPEAKERS */}
      <EventMeta />

      {/* CTA — RED PILL */}
      <ChoiceModule />

      {/* FOOTER */}
      <footer className="border-t border-[color:var(--neon)]/40 px-4 py-4 text-[10px] sm:text-xs text-[color:var(--terminal)] flex flex-wrap items-center justify-between gap-2">
        <span>© CC 2.0 — open source civil law</span>
        <span className="text-[color:var(--neon)]">build: {bootLine >= 4 ? "stable" : "compiling..."}</span>
        <span>// EOF</span>
      </footer>
    </main>
  );
}
