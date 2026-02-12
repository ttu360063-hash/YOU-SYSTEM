import { Card } from "@/components/ui/card";
import { requireModule } from "@/lib/require-module";

export default async function ProdutosPage() {
  await requireModule("produtos");

  return (
    <div className="space-y-6">
      <h1 className="section-title text-2xl font-semibold">Produtos</h1>
      <Card className="p-6">
        <p className="text-xs uppercase text-ink-600">Cadastro de produtos</p>
        <p className="mt-2 text-sm text-ink-700">Nenhum produto cadastrado.</p>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <p className="text-xs uppercase text-ink-600">Estoque</p>
          <p className="mt-2 text-sm text-ink-700">Sem movimentacoes.</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase text-ink-600">Fornecedores</p>
          <p className="mt-2 text-sm text-ink-700">Cadastre fornecedores principais.</p>
        </Card>
      </div>
    </div>
  );
}
