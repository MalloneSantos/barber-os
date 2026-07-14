import { describe, expect, it } from "vitest";

import { authorize, assertTenant } from "@/domain/auth/permissions";
import {
  calculateAverageTicket,
  calculateOccupancy,
} from "@/domain/finance/metrics";
import { calculateLoyaltyPoints } from "@/domain/loyalty/points";
import { rankWaitlist } from "@/domain/waitlist/ranking";

describe("tenant and permission policies", () => {
  it("rejects a resource from another tenant", () => {
    expect(() => assertTenant("tenant-a", "tenant-b")).toThrowError(
      "TENANT_MISMATCH",
    );
  });

  it("allows only roles with the requested permission", () => {
    expect(authorize("OWNER", "finance:view")).toBe(true);
    expect(authorize("RECEPTIONIST", "finance:view")).toBe(false);
    expect(authorize("RECEPTIONIST", "appointments:edit")).toBe(true);
  });
});

describe("growth metrics", () => {
  it("calculates loyalty points from visits and spend", () => {
    expect(
      calculateLoyaltyPoints({ spendCents: 3_100, visitPoints: 10, euroRate: 1 }),
    ).toBe(41);
  });

  it("calculates average ticket without dividing by zero", () => {
    expect(calculateAverageTicket([2_900, 3_100, 3_300])).toBe(3_100);
    expect(calculateAverageTicket([])).toBe(0);
  });

  it("calculates occupancy from booked and available minutes", () => {
    expect(calculateOccupancy({ bookedMinutes: 330, availableMinutes: 480 })).toBe(
      68.75,
    );
  });
});

describe("waitlist ranking", () => {
  it("prioritizes compatibility, loyalty and then entry time", () => {
    const ranked = rankWaitlist([
      { id: "a", compatibility: 80, loyaltyPoints: 500, joinedAt: "2026-07-14T10:00:00Z" },
      { id: "b", compatibility: 100, loyaltyPoints: 120, joinedAt: "2026-07-14T11:00:00Z" },
      { id: "c", compatibility: 100, loyaltyPoints: 640, joinedAt: "2026-07-14T12:00:00Z" },
    ]);

    expect(ranked.map((entry) => entry.id)).toEqual(["c", "b", "a"]);
  });
});

