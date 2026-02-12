import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireTenant } from "@/lib/tenant";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { ModuleKey } from "@/lib/modules";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const { tenantId } = await requireTenant();
  const profile = await prisma.companyProfile.findUnique({ where: { tenantId } });

  if (!profile) {
    redirect("/onboarding/1");
  }

  const prefs = await prisma.layoutPreferences.findUnique({ where: { tenantId } });
  const modules = await prisma.moduleSetting.findMany({
    where: { tenantId, enabled: true },
    select: { moduleKey: true },
  });
  const moduleKeys = modules.map((m) => m.moduleKey as ModuleKey);

  return (
    <div className="min-h-screen bg-mist-50">
      {prefs?.navigation === "topbar" ? <Topbar modules={moduleKeys} /> : null}
      <div className="flex">
        {prefs?.navigation !== "topbar" ? <Sidebar modules={moduleKeys} /> : null}
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
