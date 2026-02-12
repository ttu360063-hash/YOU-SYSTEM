import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";
import type { ModuleKey } from "@/lib/modules";

export async function requireModule(moduleKey: ModuleKey) {
  const { tenantId } = await requireTenant();
  const setting = await prisma.moduleSetting.findFirst({
    where: { tenantId, moduleKey, enabled: true },
  });
  if (!setting) {
    redirect("/dashboard");
  }
}
