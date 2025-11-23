import { InferredSchema, CompareReport } from "../types";

function setToArray(s?: Set<any>) {
  return s ? Array.from(s).sort() : [];
}

export function compareSchemas(source: InferredSchema, target: InferredSchema): CompareReport {
  const sourceKeys = new Set(Object.keys(source));
  const targetKeys = new Set(Object.keys(target));

  const missingInTarget: string[] = [];
  const extraInTarget: string[] = [];
  const typeMismatches: Array<{ field: string; source: string[]; target: string[] }> = [];

  for (const k of sourceKeys) {
    if (!targetKeys.has(k)) {
      missingInTarget.push(k);
    } else {
      const sTypes = setToArray(source[k]);
      const tTypes = setToArray(target[k]);
      const sKey = sTypes.join(",");
      const tKey = tTypes.join(",");
      if (sKey !== tKey) {
        typeMismatches.push({ field: k, source: sTypes, target: tTypes });
      }
    }
  }

  for (const k of targetKeys) {
    if (!sourceKeys.has(k)) {
      extraInTarget.push(k);
    }
  }

  return {
    missingInTarget,
    extraInTarget,
    typeMismatches
  };
}
