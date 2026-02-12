import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

export async function GET() {
  const { tenantId } = await requireTenant();
  const sales = await prisma.sale.findMany({ where: { tenantId }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(sales);
}

export async function POST(req: Request) {
  const { tenantId } = await requireTenant();
  const body = await req.json();
  const sale = await prisma.sale.create({
    data: {
      tenantId,
      totalAmount: Number(body.totalAmount || 0),
      customerId: body.customerId || null,
      notes: body.notes || null,
    },
  });
  return NextResponse.json(sale);
}
