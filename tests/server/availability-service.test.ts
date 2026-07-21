import { describe, expect, it } from "vitest";

import {
  getAvailableSlotsFromRecords,
  localDateTimeToUtc,
} from "@/server/services/availability";

describe("tenant availability service", () => {
  it("converts a Brussels summer wall-clock time to UTC", () => {
    expect(localDateTimeToUtc("2026-07-21", "10:15", "Europe/Brussels").toISOString()).toBe("2026-07-21T08:15:00.000Z");
  });

  it("combines professionals while removing breaks, blocks and appointments", () => {
    const slots = getAvailableSlotsFromRecords({
      date: "2026-07-21",
      timezone: "Europe/Brussels",
      durationMinutes: 45,
      intervalMinutes: 15,
      staff: [
        {
          id: "staff-1",
          availability: [{ dayOfWeek: 2, startMinute: 540, endMinute: 720, breakStartMinute: 630, breakEndMinute: 660 }],
          timeOff: [],
          appointments: [{ startsAt: new Date("2026-07-21T07:30:00.000Z"), endsAt: new Date("2026-07-21T08:15:00.000Z") }],
        },
        {
          id: "staff-2",
          availability: [{ dayOfWeek: 2, startMinute: 540, endMinute: 720, breakStartMinute: null, breakEndMinute: null }],
          timeOff: [{ startsAt: new Date("2026-07-21T07:00:00.000Z"), endsAt: new Date("2026-07-21T08:00:00.000Z") }],
          appointments: [],
        },
      ],
    });

    expect(slots.find((slot) => slot.time === "09:00")?.staffIds).toEqual([]);
    expect(slots.find((slot) => slot.time === "10:30")?.staffIds).toEqual(["staff-2"]);
    expect(slots.find((slot) => slot.time === "11:15")?.staffIds).toEqual(["staff-1", "staff-2"]);
  });
});
