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

export function Sidebar({ modules }: { modules: ModuleKey[] }) {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-mist-300 bg-white p-6 lg:block">
      <div className="mb-10">
        <img src="/logo-ys.png" alt="You System" className="h-11" />
      </div>
      <nav className="space-y-2 text-sm">
        {modules.map((module) => (
          <Link
            key={module}
            href={`/dashboard/${module}`}
            className="block rounded-xl px-3 py-2 text-ink-700 hover:bg-mist-100"
          >
            {labels[module]}
          </Link>
        ))}
        <Link href="/assistente" className="block rounded-xl px-3 py-2 text-ink-700 hover:bg-mist-100">
          Assistente IA
        </Link>
      </nav>
    </aside>
  );
}
