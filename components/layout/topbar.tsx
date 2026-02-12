import Link from "next/link";
import { ModuleKey } from "@/lib/modules";

const labels: Record<ModuleKey, string> = {
  vendas: "Vendas",
  produtos: "Produtos",
  servicos: "Servicos",
  financeiro: "Financeiro",
  clientes: "Clientes",
  operacoes: "Operacoes",
};

export function Topbar({ modules }: { modules: ModuleKey[] }) {
  return (
    <header className="flex items-center justify-between border-b border-mist-300 bg-white px-6 py-4">
      <div className="flex items-center gap-4">
        <img src="/logo-ys.png" alt="You System" className="h-10" />
      </div>
      <nav className="hidden gap-4 text-sm lg:flex">
        {modules.map((module) => (
          <Link key={module} href={`/dashboard/${module}`} className="text-ink-700 hover:text-ink-900">
            {labels[module]}
          </Link>
        ))}
        <Link href="/assistente" className="text-ink-700 hover:text-ink-900">
          Assistente IA
        </Link>
      </nav>
    </header>
  );
}
