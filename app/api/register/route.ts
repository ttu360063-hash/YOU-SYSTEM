import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/schemas";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Dados invalidos." }, { status: 400 });
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ message: "Email ja cadastrado." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const tenant = await prisma.tenant.create({
    data: {
      name: `${name} Workspace`,
    },
  });

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      defaultTenantId: tenant.id,
      memberships: {
        create: {
          tenantId: tenant.id,
          role: "OWNER",
        },
      },
    },
  });

  return NextResponse.json({ id: user.id });
}
