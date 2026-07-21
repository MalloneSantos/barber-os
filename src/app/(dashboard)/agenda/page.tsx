import { authorize } from "@/domain/auth/permissions";
import { AgendaWorkspace } from "@/components/dashboard/agenda-workspace";
import { requirePermission } from "@/server/auth/authorization";
import { db } from "@/server/db";
import { getBookableDates } from "@/server/data/public-booking";

function initials(name: string) { return name.split(" ").map((part) => part[0]).slice(0, 2).join(""); }
function minuteLabel(value: number) { return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`; }

export default async function AgendaPage() {
  const session = await requirePermission("appointments:view");
  const tenant = await db.tenant.findUniqueOrThrow({ where: { id: session.tenantId }, select: { timezone: true, slug: true } });
  const ownStaff = session.role === "PROFESSIONAL" ? await db.staff.findFirst({ where: { tenantId: session.tenantId, userId: session.userId, deletedAt: null }, select: { id: true } }) : null;
  const appointments = await db.appointment.findMany({ where: { tenantId: session.tenantId, deletedAt: null, ...(ownStaff ? { staffId: ownStaff.id } : {}) }, orderBy: { startsAt: "asc" }, include: { customer: true, staff: true, services: { include: { service: true } } }, take: 200 });
  const today = new Date();
  const todayValue = new Intl.DateTimeFormat("en-CA", { timeZone: tenant.timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(today);
  const todayLabel = new Intl.DateTimeFormat("pt-BR", { timeZone: tenant.timezone, weekday: "short", day: "2-digit", month: "short" }).format(today).replace(".", "");
  const days = [{ value: todayValue, label: todayLabel }, ...getBookableDates(tenant.timezone).slice(0, 6)];
  const rows = appointments.map((item) => ({ id: item.id, dateKey: new Intl.DateTimeFormat("en-CA", { timeZone: tenant.timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(item.startsAt), time: new Intl.DateTimeFormat("pt-BR", { timeZone: tenant.timezone, hour: "2-digit", minute: "2-digit" }).format(item.startsAt), end: new Intl.DateTimeFormat("pt-BR", { timeZone: tenant.timezone, hour: "2-digit", minute: "2-digit" }).format(item.endsAt), customer: `${item.customer.firstName} ${item.customer.lastName}`, service: item.services.map((entry) => entry.service.name).join(", "), staff: item.staff.displayName, staffInitials: initials(item.staff.displayName), status: item.status, cancellable: ["PENDING", "CONFIRMED", "CHECKED_IN"].includes(item.status) }));
  const canManageTeam = authorize(session.role, "team:edit");
  const staffManagement = canManageTeam ? await db.staff.findMany({
    where: { tenantId: session.tenantId, deletedAt: null },
    orderBy: { displayName: "asc" },
    select: {
      id: true,
      displayName: true,
      availability: { orderBy: { dayOfWeek: "asc" } },
      timeOff: { where: { endsAt: { gte: today } }, orderBy: { startsAt: "asc" }, take: 30 },
    },
  }) : [];
  const dateTime = new Intl.DateTimeFormat("pt-BR", { timeZone: tenant.timezone, dateStyle: "short", timeStyle: "short" });
  const availabilityManagement = canManageTeam ? {
    staff: staffManagement.map((member) => ({ id: member.id, name: member.displayName })),
    availability: staffManagement.flatMap((member) => member.availability.map((item) => ({ id: item.id, staffName: member.displayName, dayOfWeek: item.dayOfWeek, hours: `${minuteLabel(item.startMinute)}–${minuteLabel(item.endMinute)}`, breakHours: item.breakStartMinute !== null && item.breakEndMinute !== null ? `Intervalo ${minuteLabel(item.breakStartMinute)}–${minuteLabel(item.breakEndMinute)}` : "Sem intervalo" }))),
    timeOff: staffManagement.flatMap((member) => member.timeOff.map((item) => ({ id: item.id, staffName: member.displayName, period: `${dateTime.format(item.startsAt)} – ${dateTime.format(item.endsAt)}`, reason: item.reason ?? "Indisponibilidade" }))),
  } : undefined;
  return <AgendaWorkspace appointments={rows} days={days} tenantSlug={tenant.slug} canEdit={authorize(session.role, "appointments:edit")} availabilityManagement={availabilityManagement} />;
}
