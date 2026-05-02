import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="serif text-7xl font-bold text-graphite">404</h1>
        <h2 className="mt-4 font-mono text-sm uppercase tracking-[0.25em] text-graphite/70">
          Página não encontrada
        </h2>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block bg-bordeaux text-paper font-mono text-[11px] uppercase tracking-[0.25em] px-5 py-3 hover:bg-graphite transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}