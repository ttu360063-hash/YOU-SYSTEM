import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

export async function GET() {
  const { tenantId } = await requireTenant();
  const customers = await prisma.customer.findMany({ where: { tenantId } });
  return NextResponse.json(customers);
}

export async function POST(req: Request) {
  const { tenantId } = await requireTenant();
  const body = await req.json();
  const customer = await prisma.customer.create({
    data: {
      tenantId,
      name: body.name,
      email: body.email || null,
      phone: body.phone || null,
      notes: body.notes || null,
    },
  });
  return NextResponse.json(customer);
}
