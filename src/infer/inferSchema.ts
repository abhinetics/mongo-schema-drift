import { InferredSchema, PrimitiveType } from "../types";

function inferPrimitiveType(value: unknown): PrimitiveType {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (Array.isArray(value)) return "array";
  if (value instanceof Date) return "date";

  const t = typeof value;
  if (t === "string") return "string";
  if (t === "number") return "number";
  if (t === "boolean") return "boolean";
  if (t === "object") return "object";
  return "unknown";
}

function addType(schema: InferredSchema, path: string, t: PrimitiveType) {
  if (!schema[path]) schema[path] = new Set<PrimitiveType>();
  schema[path].add(t);
}

function walk(obj: unknown, schema: InferredSchema, prefix = ""): void {
  if (!obj || typeof obj !== "object") return;

  const record = obj as Record<string, unknown>;

  for (const key of Object.keys(record)) {
    const val = record[key];
    const path = prefix ? `${prefix}.${key}` : key;

    const pType = inferPrimitiveType(val);
    addType(schema, path, pType);

    if (pType === "object") walk(val, schema, path);

    if (pType === "array" && Array.isArray(val)) {
      for (const item of val) {
        if (item && typeof item === "object") {
          walk(item, schema, `${path}[]`);
        } else {
          addType(schema, `${path}[]`, inferPrimitiveType(item));
        }
      }
    }
  }
}

export function inferSchemaFromDocuments(documents: unknown[]): InferredSchema {
  const schema: InferredSchema = {};

  for (const doc of documents) {
    walk(doc, schema);
  }

  return schema;
}
