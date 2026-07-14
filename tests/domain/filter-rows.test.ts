import { expect, it } from "vitest";

import { filterRows } from "@/domain/search/filter-rows";

it("filters module rows case-insensitively across all columns", () => {
  const rows = [["Henrique Lima", "VIP"], ["Thomas Peeters", "Recorrente"]] as const;
  expect(filterRows(rows, "vip")).toEqual([["Henrique Lima", "VIP"]]);
  expect(filterRows(rows, "THOMAS")).toEqual([["Thomas Peeters", "Recorrente"]]);
});

