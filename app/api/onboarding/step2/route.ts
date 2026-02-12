import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { layoutPreferencesSchema } from "@/lib/schemas";
import { requireTenant } from "@/lib/tenant";

export async function POST(req: Request) {
  const { tenantId } = await requireTenant();
  const body = await req.json();
  const parsed = layoutPreferencesSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Dados invalidos." }, { status: 400 });
  }

  await prisma.layoutPreferences.upsert({
    where: { tenantId },
    update: parsed.data,
    create: { ...parsed.data, tenantId },
  });

  await prisma.tenant.update({
    where: { id: tenantId },
    data: { onboardingStep: 2 },
  });

  return NextResponse.json({ ok: true });
}
