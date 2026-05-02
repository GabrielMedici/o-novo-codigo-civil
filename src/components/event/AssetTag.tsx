import { ReactNode } from "react";

type Props = {
  assetId: string;
  classification?: string;
  status?: string;
  children?: ReactNode;
  className?: string;
  variant?: "paper" | "bordeaux" | "brass";
};

export function AssetTag({
  assetId,
  classification = "BEM SEMOVENTE",
  status = "EM REVISÃO",
  children,
  className = "",
  variant = "paper",
}: Props) {
  const palette =
    variant === "bordeaux"
      ? "bg-bordeaux text-paper border-paper/40"
      : variant === "brass"
      ? "bg-brass text-bordeaux border-bordeaux/40"
      : "bg-paper text-graphite border-graphite/50";

  return (
    <div
      className={`relative border ${palette} ${className}`}
      style={{ boxShadow: "0 1px 0 rgba(48,48,48,.08)" }}
    >
      {/* Punch hole */}
      <div className="absolute left-1/2 -translate-x-1/2 top-3 w-3 h-3 rounded-full border border-current opacity-70" />
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-start justify-between text-[10px] font-mono uppercase tracking-[0.18em] opacity-80">
          <span>Patrimônio · UniCesumar</span>
          <span>Nº {assetId}</span>
        </div>
        <div className="mt-3 border-t border-current/40 pt-3 text-[10px] font-mono uppercase tracking-[0.2em] flex items-center justify-between opacity-80">
          <span>Classif.: {classification}</span>
          <span>Status: {status}</span>
        </div>
        {children && <div className="mt-4">{children}</div>}
      </div>
      <div className="h-6 barcode opacity-80" />
      <div className="px-5 py-2 text-[9px] font-mono uppercase tracking-[0.25em] flex justify-between opacity-70">
        <span>ART. 82 · CC/2002</span>
        <span>REF. PL 4596/2023</span>
      </div>
    </div>
  );
}
