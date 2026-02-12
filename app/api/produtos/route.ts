import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

export async function GET() {
  const { tenantId } = await requireTenant();
  const products = await prisma.product.findMany({ where: { tenantId } });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const { tenantId } = await requireTenant();
  const body = await req.json();
  const product = await prisma.product.create({
    data: {
      tenantId,
      name: body.name,
      sku: body.sku || null,
      price: Number(body.price || 0),
      stock: Number(body.stock || 0),
      category: body.category || null,
      supplier: body.supplier || null,
    },
  });
  return NextResponse.json(product);
}
