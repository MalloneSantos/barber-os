import { describe, expect, it } from "vitest";

import {
  generateAvailableSlots,
  hasAppointmentConflict,
} from "@/domain/appointments/availability";

describe("appointment availability", () => {
  it("creates slots around a work break and existing appointment", () => {
    const slots = generateAvailableSlots({
      date: "2026-07-15",
      workStart: "09:00",
      workEnd: "13:30",
      slotIntervalMinutes: 30,
      serviceDurationMinutes: 45,
      breaks: [{ start: "10:30", end: "11:00" }],
      appointments: [{ start: "11:30", end: "12:15" }],
      blocks: [],
    });

    expect(slots).toEqual(["09:00", "09:30", "12:30"]);
  });

  it("detects overlap while allowing adjacent appointments", () => {
    const appointments = [{ start: "10:00", end: "10:45" }];

    expect(hasAppointmentConflict("10:30", "11:15", appointments)).toBe(true);
    expect(hasAppointmentConflict("10:45", "11:30", appointments)).toBe(false);
  });
});
