import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

export async function POST(req: Request) {
  const { tenantId } = await requireTenant();
  const body = await req.json();
  const { moduleKey, enabled } = body as { moduleKey?: string; enabled?: boolean };

  if (!moduleKey) {
    return NextResponse.json({ message: "Modulo invalido." }, { status: 400 });
  }

  await prisma.moduleSetting.upsert({
    where: { tenantId_moduleKey: { tenantId, moduleKey } },
    update: { enabled: Boolean(enabled) },
    create: { tenantId, moduleKey, enabled: Boolean(enabled) },
  });

  return NextResponse.json({ ok: true });
}
