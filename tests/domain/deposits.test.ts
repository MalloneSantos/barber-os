import { describe, expect, it } from "vitest";

import {
  calculateDeposit,
  resolveCancellation,
} from "@/domain/finance/deposits";

describe("deposit policy", () => {
  it("calculates fixed and percentage deposits in cents", () => {
    expect(
      calculateDeposit({ totalCents: 6_200, type: "FIXED", value: 500 }),
    ).toBe(500);
    expect(
      calculateDeposit({ totalCents: 6_200, type: "PERCENTAGE", value: 25 }),
    ).toBe(1_550);
  });

  it("waives deposit for exempt customers", () => {
    expect(
      calculateDeposit({
        totalCents: 3_100,
        type: "FIXED",
        value: 500,
        customerExempt: true,
      }),
    ).toBe(0);
  });

  it("converts the deposit to credit inside the cancellation window", () => {
    expect(
      resolveCancellation({
        appointmentAt: new Date("2026-07-16T12:00:00Z"),
        cancelledAt: new Date("2026-07-15T09:00:00Z"),
        noticeHours: 24,
        depositCents: 500,
      }),
    ).toEqual({ status: "CONVERTED_TO_CREDIT", creditCents: 500 });
  });

  it("retains the deposit for a late cancellation", () => {
    expect(
      resolveCancellation({
        appointmentAt: new Date("2026-07-16T12:00:00Z"),
        cancelledAt: new Date("2026-07-16T08:00:00Z"),
        noticeHours: 24,
        depositCents: 500,
      }),
    ).toEqual({ status: "RETAINED", creditCents: 0 });
  });
});

