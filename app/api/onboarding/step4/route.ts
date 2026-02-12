import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";
import { computeModules } from "@/lib/modules";

export async function POST(req: Request) {
  const { tenantId } = await requireTenant();
  const body = await req.json();
  const candidateId = body?.candidateId as string | undefined;

  if (!candidateId) {
    return NextResponse.json({ message: "Layout invalido." }, { status: 400 });
  }

  const candidate = await prisma.layoutCandidate.findFirst({
    where: { id: candidateId, tenantId },
  });

  if (!candidate) {
    return NextResponse.json({ message: "Layout nao encontrado." }, { status: 404 });
  }

  const profile = await prisma.companyProfile.findUnique({ where: { tenantId } });
  if (!profile) {
    return NextResponse.json({ message: "Perfil nao encontrado." }, { status: 404 });
  }

  await prisma.finalLayout.upsert({
    where: { tenantId },
    update: {
      layoutJson: candidate.layoutJson,
      layoutHash: candidate.layoutHash,
    },
    create: {
      tenantId,
      layoutJson: candidate.layoutJson,
      layoutHash: candidate.layoutHash,
    },
  });

  const modules = computeModules(profile);
  await prisma.moduleSetting.deleteMany({ where: { tenantId } });
  await prisma.moduleSetting.createMany({
    data: modules.map((key) => ({ tenantId, moduleKey: key, enabled: true })),
  });

  await prisma.tenant.update({
    where: { id: tenantId },
    data: { onboardingStep: 4 },
  });

  return NextResponse.json({ ok: true, modules });
}
