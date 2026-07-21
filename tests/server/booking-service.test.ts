import { describe, expect, it } from "vitest";

import { BookingError, selectBookingSlot } from "@/server/services/booking";

const slots = [
  { time: "10:00", startsAt: "2026-07-21T08:00:00.000Z", endsAt: "2026-07-21T08:45:00.000Z", staffIds: ["staff-a", "staff-b"] },
];

describe("booking slot selection", () => {
  it("respects the requested eligible professional", () => {
    expect(selectBookingSlot(slots, "10:00", "staff-b").staffId).toBe("staff-b");
  });

  it("uses the first available professional for an any-professional booking", () => {
    expect(selectBookingSlot(slots, "10:00", "any").staffId).toBe("staff-a");
  });

  it("returns a stable conflict when the slot is no longer available", () => {
    expect(() => selectBookingSlot(slots, "11:00", "any")).toThrowError(new BookingError("SLOT_CONFLICT"));
  });
});
