import { Card } from "@/components/ui/card";
import { requireModule } from "@/lib/require-module";

export default async function FinanceiroPage() {
  await requireModule("financeiro");

  return (
    <div className="space-y-6">
      <h1 className="section-title text-2xl font-semibold">Financeiro</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-xs uppercase text-ink-600">A pagar</p>
          <p className="mt-2 text-2xl font-semibold">R$ 0,00</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase text-ink-600">A receber</p>
          <p className="mt-2 text-2xl font-semibold">R$ 0,00</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase text-ink-600">Fluxo de caixa</p>
          <p className="mt-2 text-2xl font-semibold">R$ 0,00</p>
        </Card>
      </div>
      <Card className="p-6">
        <p className="text-xs uppercase text-ink-600">Relatorios</p>
        <p className="mt-2 text-sm text-ink-700">Configure seus relatorios financeiros.</p>
      </Card>
    </div>
  );
}
