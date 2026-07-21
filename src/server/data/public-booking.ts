import { db } from "@/server/db";
import { getAvailableSlotsFromRecords, localDateTimeToUtc } from "@/server/services/availability";

const activeStatuses = ["PENDING", "CONFIRMED", "CHECKED_IN", "IN_PROGRESS"] as const;

function nextDate(date: string) {
  const value = new Date(`${date}T12:00:00.000Z`);
  value.setUTCDate(value.getUTCDate() + 1);
  return value.toISOString().slice(0, 10);
}

export function getBookableDates(timezone: string, now = new Date()) {
  return Array.from({ length: 8 }, (_, index) => {
    const date = new Date(now.getTime() + (index + 1) * 86_400_000);
    const value = new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
    const label = new Intl.DateTimeFormat("pt-BR", { timeZone: timezone, weekday: "short", day: "2-digit", month: "short" }).format(date).replace(".", "");
    return { value, label };
  });
}

export async function getPublicBookingCatalog(slug: string) {
  return db.tenant.findFirst({
    where: { slug, deletedAt: null },
    select: {
      id: true,
      name: true,
      slug: true,
      timezone: true,
      currency: true,
      description: true,
      address: true,
      city: true,
      phone: true,
      cancellationNoticeHours: true,
      defaultDepositCents: true,
      services: {
        where: { isActive: true, deletedAt: null },
        orderBy: [{ category: { sortOrder: "asc" } }, { name: "asc" }],
        select: { id: true, name: true, description: true, priceCents: true, durationMinutes: true, depositRequired: true },
      },
      staff: {
        where: { isBookable: true, deletedAt: null },
        orderBy: { displayName: "asc" },
        select: { id: true, displayName: true, title: true, imageUrl: true, services: { select: { serviceId: true } } },
      },
      reviews: {
        where: { isPublic: true },
        orderBy: { createdAt: "desc" },
        take: 6,
        select: { id: true, rating: true, comment: true, customer: { select: { firstName: true, lastName: true } } },
      },
    },
  });
}

export async function getPublicAvailability(input: { slug: string; date: string; serviceId: string; staffId?: string }) {
  const tenant = await db.tenant.findFirst({ where: { slug: input.slug, deletedAt: null }, select: { id: true, timezone: true } });
  if (!tenant) return null;
  const service = await db.service.findFirst({ where: { id: input.serviceId, tenantId: tenant.id, isActive: true, deletedAt: null }, select: { id: true, durationMinutes: true } });
  if (!service) return null;

  const startsAt = localDateTimeToUtc(input.date, "00:00", tenant.timezone);
  const endsAt = localDateTimeToUtc(nextDate(input.date), "00:00", tenant.timezone);
  const staff = await db.staff.findMany({
    where: {
      tenantId: tenant.id,
      deletedAt: null,
      isBookable: true,
      ...(input.staffId && input.staffId !== "any" ? { id: input.staffId } : {}),
      services: { some: { tenantId: tenant.id, serviceId: service.id } },
    },
    select: {
      id: true,
      availability: { where: { tenantId: tenant.id }, select: { dayOfWeek: true, startMinute: true, endMinute: true, breakStartMinute: true, breakEndMinute: true } },
      timeOff: { where: { tenantId: tenant.id, startsAt: { lt: endsAt }, endsAt: { gt: startsAt } }, select: { startsAt: true, endsAt: true } },
      appointments: { where: { tenantId: tenant.id, deletedAt: null, status: { in: [...activeStatuses] }, startsAt: { lt: endsAt }, endsAt: { gt: startsAt } }, select: { startsAt: true, endsAt: true } },
    },
  });

  const slots = getAvailableSlotsFromRecords({ date: input.date, timezone: tenant.timezone, durationMinutes: service.durationMinutes, intervalMinutes: 15, staff }).filter((slot) => slot.staffIds.length > 0);
  return { tenantId: tenant.id, serviceId: service.id, timezone: tenant.timezone, slots };
}
