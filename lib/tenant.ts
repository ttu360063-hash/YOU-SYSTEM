import { getSession } from "@/lib/auth";

export async function requireTenant() {
  const session = await getSession();
  const tenantId = session?.user?.tenantId;
  if (!tenantId) {
    throw new Error("Tenant not found for user session");
  }
  return { session, tenantId };
}
