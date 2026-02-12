import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function DashboardHome() {
  const { tenantId } = await requireTenant();
  const profile = await prisma.companyProfile.findUnique({ where: { tenantId } });
  const layout = await prisma.finalLayout.findUnique({ where: { tenantId } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="section-title text-3xl font-semibold">Dashboard</h1>
        <p className="text-sm text-ink-700">
          {profile ? `Bem-vindo, ${profile.companyName}.` : "Bem-vindo ao You System."}
        </p>
      </div>

      <Card className="p-6">
        <h2 className="section-title text-xl font-semibold">Layout aprovado</h2>
        <p className="text-sm text-ink-700">Hash: {layout?.layoutHash || "Nao definido"}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {layout?.layoutJson && Array.isArray((layout.layoutJson as any).highlights)
            ? (layout.layoutJson as any).highlights.map((item: string) => (
                <Badge key={item}>{item}</Badge>
              ))
            : null}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <p className="text-xs uppercase text-ink-600">Resumo</p>
          <p className="mt-2 text-2xl font-semibold">R$ 0,00</p>
          <p className="text-sm text-ink-600">Sem dados ainda</p>
        </Card>
        <Card className="p-6">
          <p className="text-xs uppercase text-ink-600">Operacoes</p>
          <p className="mt-2 text-2xl font-semibold">0 tarefas</p>
          <p className="text-sm text-ink-600">Comece a registrar atividades</p>
        </Card>
      </div>
    </div>
  );
}
