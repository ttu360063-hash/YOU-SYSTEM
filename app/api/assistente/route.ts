import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

export async function POST(req: Request) {
  const { tenantId } = await requireTenant();
  const body = await req.json();
  const message = (body?.message as string) || "";

  const summary = await prisma.sales.aggregate({
    where: { tenantId },
    _sum: { totalAmount: true },
    _count: { id: true },
  });

  const response = {
    reply: `Recebi: "${message}". Aqui vai um resumo interno (sem modelo externo): ${summary._count.id || 0} vendas e total de R$ ${summary._sum.totalAmount || 0}.`,
    suggestions: [
      "Revisar fluxo de caixa semanal.",
      "Checar clientes com maior valor de compra.",
      "Ajustar metas do time comercial.",
    ],
  };

  return NextResponse.json(response);
}
