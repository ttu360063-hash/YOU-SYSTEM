import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

export async function GET() {
  const { tenantId } = await requireTenant();
  const entries = await prisma.financeEntry.findMany({ where: { tenantId } });
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  const { tenantId } = await requireTenant();
  const body = await req.json();
  const entry = await prisma.financeEntry.create({
    data: {
      tenantId,
      type: body.type || "Entrada",
      amount: Number(body.amount || 0),
      description: body.description || null,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
    },
  });
  return NextResponse.json(entry);
}
