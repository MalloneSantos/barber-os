import { describe, expect, it } from "vitest";

import { authenticateDemoAccount } from "@/server/auth/demo";

describe("demo authentication", () => {
  it("returns the selected persona for valid demo credentials", () => {
    expect(authenticateDemoAccount("owner@asbarber.be", "demo123")).toMatchObject({
      role: "OWNER",
      name: "Alexandre Silva",
    });
  });

  it("rejects an unknown account or password", () => {
    expect(authenticateDemoAccount("owner@asbarber.be", "wrong")).toBeNull();
    expect(authenticateDemoAccount("unknown@asbarber.be", "demo123")).toBeNull();
  });
});

