import { NextResponse } from "next/server";
import { ModuleKey } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

export async function POST(req: Request) {
  const { tenantId } = await requireTenant();
  const body = await req.json();
  const { moduleKey, enabled } = body as { moduleKey?: string; enabled?: boolean };

  if (!moduleKey || !Object.values(ModuleKey).includes(moduleKey as ModuleKey)) {
    return NextResponse.json({ message: "Modulo invalido." }, { status: 400 });
  }
  const typedModuleKey = moduleKey as ModuleKey;

  await prisma.moduleSetting.upsert({
    where: { tenantId_moduleKey: { tenantId, moduleKey: typedModuleKey } },
    update: { enabled: Boolean(enabled) },
    create: { tenantId, moduleKey: typedModuleKey, enabled: Boolean(enabled) },
  });

  return NextResponse.json({ ok: true });
}
