import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { companyProfileSchema } from "@/lib/schemas";
import { requireTenant } from "@/lib/tenant";

export async function POST(req: Request) {
  const { tenantId } = await requireTenant();
  const body = await req.json();
  const parsed = companyProfileSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Dados invalidos." }, { status: 400 });
  }

  const data = parsed.data;

  await prisma.companyProfile.upsert({
    where: { tenantId },
    update: data,
    create: { ...data, tenantId },
  });

  await prisma.tenant.update({
    where: { id: tenantId },
    data: { onboardingStep: 1 },
  });

  return NextResponse.json({ ok: true });
}
