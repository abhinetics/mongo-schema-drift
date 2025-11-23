import { CompareReport } from "../types";

export function formatReportPretty(r: CompareReport): string {
  const lines: string[] = [];
  lines.push("=== Mongo Schema Drift Report ===");
  lines.push("");

  if (r.missingInTarget.length) {
    lines.push("Fields missing in target:");
    for (const f of r.missingInTarget) lines.push(`  - ${f}`);
    lines.push("");
  }

  if (r.extraInTarget.length) {
    lines.push("Extra fields in target:");
    for (const f of r.extraInTarget) lines.push(`  - ${f}`);
    lines.push("");
  }

  if (r.typeMismatches.length) {
    lines.push("Type mismatches:");
    for (const m of r.typeMismatches) {
      lines.push(`  - ${m.field}`);
      lines.push(`     source: ${m.source.join(", ")}`);
      lines.push(`     target: ${m.target.join(", ")}`);
    }
    lines.push("");
  }

  if (!r.missingInTarget.length && !r.extraInTarget.length && !r.typeMismatches.length) {
    lines.push("No drift detected ✅");
  }

  return lines.join("\n");
}
