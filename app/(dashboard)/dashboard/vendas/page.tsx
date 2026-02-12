import { Card } from "@/components/ui/card";
import { requireModule } from "@/lib/require-module";

export default async function VendasPage() {
  await requireModule("vendas");

  return (
    <div className="space-y-6">
      <h1 className="section-title text-2xl font-semibold">Vendas</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <p className="text-xs uppercase text-ink-600">Grafico de vendas</p>
          <p className="mt-2 text-sm text-ink-700">Em breve: visualizacao completa.</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase text-ink-600">Ticket medio</p>
          <p className="mt-2 text-2xl font-semibold">R$ 0,00</p>
        </Card>
      </div>
      <Card className="p-6">
        <p className="text-xs uppercase text-ink-600">Historico de vendas</p>
        <p className="mt-2 text-sm text-ink-700">Nenhuma venda registrada.</p>
      </Card>
    </div>
  );
}
