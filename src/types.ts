export type PrimitiveType = "string" | "number" | "boolean" | "null" | "undefined" | "date" | "object" | "array" | "mixed" | "unknown";

export type TypeSet = Set<PrimitiveType>;

export type InferredSchema = Record<string, TypeSet>;

export interface ScanOptions {
  uri: string;
  dbName: string;
  collectionName: string;
  limit?: number;            // max docs to sample
  sampleStrategy?: "head" | "random" | "skip"; // sampling method
}

export interface CompareReport {
  missingInTarget: string[]; // fields in source but missing in target
  extraInTarget: string[];   // fields in target but missing in source
  typeMismatches: Array<{ field: string; source: string[]; target: string[] }>;
}
