import { compareSchemas } from "../src/compare/compareSchemas";

test("compare basic schemas", () => {
  const a = { name: new Set(["string"]), age: new Set(["number"]) };
  const b = { name: new Set(["string"]), age: new Set(["string"]), extra: new Set(["string"]) };
  const r = compareSchemas(a as any, b as any);
  expect(r.missingInTarget).toEqual([]);
  expect(r.extraInTarget).toContain("extra");
  expect(r.typeMismatches.some((m: any) => m.field === "age")).toBeTruthy();
});
