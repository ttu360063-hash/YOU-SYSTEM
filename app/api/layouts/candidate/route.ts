import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";

export async function GET(req: Request) {
  const { tenantId } = await requireTenant();
  const { searchParams } = new URL(req.url);
  const candidateId = searchParams.get("id");
  if (!candidateId) {
    return NextResponse.json({ message: "Parametro ausente." }, { status: 400 });
  }

  const candidate = await prisma.layoutCandidate.findFirst({
    where: { id: candidateId, tenantId },
  });

  if (!candidate) {
    return NextResponse.json({ message: "Nao encontrado." }, { status: 404 });
  }

  return NextResponse.json(candidate.layoutJson);
}
