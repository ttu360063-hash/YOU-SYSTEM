import { Card } from "@/components/ui/card";
import { requireModule } from "@/lib/require-module";

export default async function ServicosPage() {
  await requireModule("servicos");

  return (
    <div className="space-y-6">
      <h1 className="section-title text-2xl font-semibold">Servicos</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <p className="text-xs uppercase text-ink-600">Agenda</p>
          <p className="mt-2 text-sm text-ink-700">Nenhum agendamento.</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase text-ink-600">Ordens de servico</p>
          <p className="mt-2 text-sm text-ink-700">Sem ordens registradas.</p>
        </Card>
      </div>
      <Card className="p-6">
        <p className="text-xs uppercase text-ink-600">Relatorios</p>
        <p className="mt-2 text-sm text-ink-700">Configure seus indicadores.</p>
      </Card>
    </div>
  );
}
