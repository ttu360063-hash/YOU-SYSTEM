import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

export async function GET() {
  const { tenantId } = await requireTenant();
  const tasks = await prisma.task.findMany({ where: { tenantId } });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const { tenantId } = await requireTenant();
  const body = await req.json();
  const task = await prisma.task.create({
    data: {
      tenantId,
      title: body.title,
      status: body.status || "Pendente",
    },
  });
  return NextResponse.json(task);
}
