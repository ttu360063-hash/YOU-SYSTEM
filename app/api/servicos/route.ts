import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

export async function GET() {
  const { tenantId } = await requireTenant();
  const services = await prisma.service.findMany({ where: { tenantId } });
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const { tenantId } = await requireTenant();
  const body = await req.json();
  const service = await prisma.service.create({
    data: {
      tenantId,
      name: body.name,
      description: body.description || null,
      price: Number(body.price || 0),
      durationMin: body.durationMin ? Number(body.durationMin) : null,
    },
  });
  return NextResponse.json(service);
}
