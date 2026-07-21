import { hash } from "bcryptjs";
import { describe, expect, it } from "vitest";

import { authenticateCandidate, sessionFromRecord } from "@/server/auth/service";

describe("persistent authentication", () => {
  it("accepts the stored bcrypt password and active membership", async () => {
    const passwordHash = await hash("demo123", 4);

    const result = await authenticateCandidate(
      { email: " Owner@ASBarber.be ", password: "demo123" },
      {
        id: "user-1",
        email: "owner@asbarber.be",
        firstName: "Alexandre",
        lastName: "Silva",
        passwordHash,
        memberships: [
          {
            tenantId: "tenant-1",
            role: "OWNER",
            isActive: true,
            tenant: { name: "AS Barber Club", slug: "as-barber-club", deletedAt: null },
          },
        ],
      },
    );

    expect(result).toMatchObject({
      userId: "user-1",
      tenantId: "tenant-1",
      email: "owner@asbarber.be",
      role: "OWNER",
    });
  });

  it("rejects an inactive membership", async () => {
    const passwordHash = await hash("demo123", 4);

    const result = await authenticateCandidate(
      { email: "owner@asbarber.be", password: "demo123" },
      {
        id: "user-1",
        email: "owner@asbarber.be",
        firstName: "Alexandre",
        lastName: "Silva",
        passwordHash,
        memberships: [
          {
            tenantId: "tenant-1",
            role: "OWNER",
            isActive: false,
            tenant: { name: "AS Barber Club", slug: "as-barber-club", deletedAt: null },
          },
        ],
      },
    );

    expect(result).toBeNull();
  });

  it("rejects expired database sessions", () => {
    const result = sessionFromRecord(
      {
        id: "session-1",
        sessionToken: "token",
        tenantId: "tenant-1",
        expires: new Date("2026-07-20T10:00:00.000Z"),
        user: {
          id: "user-1",
          email: "owner@asbarber.be",
          firstName: "Alexandre",
          lastName: "Silva",
          memberships: [
            {
              tenantId: "tenant-1",
              role: "OWNER",
              isActive: true,
              tenant: { name: "AS Barber Club", slug: "as-barber-club", deletedAt: null },
            },
          ],
        },
      },
      new Date("2026-07-20T10:00:01.000Z"),
    );

    expect(result).toBeNull();
  });
});
