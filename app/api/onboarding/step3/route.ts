import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";
import { generateLayout } from "@/lib/layout-generator";

export async function POST() {
  const { tenantId } = await requireTenant();

  const profile = await prisma.companyProfile.findUnique({ where: { tenantId } });
  const prefs = await prisma.layoutPreferences.findUnique({ where: { tenantId } });

  if (!profile || !prefs) {
    return NextResponse.json({ message: "Onboarding incompleto." }, { status: 400 });
  }

  const existing = await prisma.layoutCandidate.findMany({
    where: { tenantId },
    select: { layoutHash: true },
  });

  const layout = generateLayout(profile, prefs, existing.map((l) => l.layoutHash));

  const candidate = await prisma.layoutCandidate.create({
    data: {
      tenantId,
      layoutHash: layout.layoutHash,
      layoutJson: layout as unknown as object,
    },
  });

  await prisma.tenant.update({
    where: { id: tenantId },
    data: { onboardingStep: 3 },
  });

  return NextResponse.json({ candidateId: candidate.id, layout });
}
