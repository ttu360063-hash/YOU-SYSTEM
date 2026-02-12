import { Card } from "@/components/ui/card";
import { requireModule } from "@/lib/require-module";

export default async function ClientesPage() {
  await requireModule("clientes");

  return (
    <div className="space-y-6">
      <h1 className="section-title text-2xl font-semibold">Clientes</h1>
      <Card className="p-6">
        <p className="text-xs uppercase text-ink-600">Cadastro de clientes</p>
        <p className="mt-2 text-sm text-ink-700">Nenhum cliente cadastrado.</p>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <p className="text-xs uppercase text-ink-600">Historico de compras</p>
          <p className="mt-2 text-sm text-ink-700">Sem registros.</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase text-ink-600">Informacoes gerais</p>
          <p className="mt-2 text-sm text-ink-700">Complete os dados do cliente.</p>
        </Card>
      </div>
    </div>
  );
}
