import { describe, expect, it } from "vitest";

import { parseAvailabilityWindow, timeToMinutes } from "@/domain/scheduling/availability-rules";

describe("availability rules", () => {
  it("converts a local clock value to minutes since midnight", () => {
    expect(timeToMinutes("09:30")).toBe(570);
    expect(timeToMinutes("23:59")).toBe(1439);
  });

  it("accepts a valid workday with a break", () => {
    expect(parseAvailabilityWindow({ start: "09:00", end: "19:00", breakStart: "13:00", breakEnd: "14:00" })).toEqual({
      startMinute: 540,
      endMinute: 1140,
      breakStartMinute: 780,
      breakEndMinute: 840,
    });
  });

  it("rejects inverted workdays and breaks outside the workday", () => {
    expect(() => parseAvailabilityWindow({ start: "18:00", end: "09:00", breakStart: "", breakEnd: "" })).toThrow("INVALID_WORKDAY");
    expect(() => parseAvailabilityWindow({ start: "09:00", end: "18:00", breakStart: "08:00", breakEnd: "10:00" })).toThrow("INVALID_BREAK");
  });
});
