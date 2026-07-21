import { DashboardShell } from "@/components/layout/dashboard-shell";
import { authorize } from "@/domain/auth/permissions";
import { requireSession } from "@/server/auth/authorization";
import { db } from "@/server/db";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  const notificationCount = authorize(session.role, "customers:edit") ? await db.notification.count({ where: { tenantId: session.tenantId, readAt: null, status: "SENT" } }) : 0;
  return <DashboardShell session={session} notificationCount={notificationCount}>{children}</DashboardShell>;
}
