import { Card } from "@/components/ui/card";
import { requireModule } from "@/lib/require-module";

export default async function OperacoesPage() {
  await requireModule("operacoes");

  return (
    <div className="space-y-6">
      <h1 className="section-title text-2xl font-semibold">Operacoes / Processos</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <p className="text-xs uppercase text-ink-600">Tarefas</p>
          <p className="mt-2 text-sm text-ink-700">Nenhuma tarefa cadastrada.</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase text-ink-600">Projetos</p>
          <p className="mt-2 text-sm text-ink-700">Sem projetos ativos.</p>
        </Card>
      </div>
      <Card className="p-6">
        <p className="text-xs uppercase text-ink-600">Checklists</p>
        <p className="mt-2 text-sm text-ink-700">Crie checklists operacionais.</p>
      </Card>
    </div>
  );
}
