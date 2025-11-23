import { InferredSchema, PrimitiveType } from "../types";

function inferPrimitiveType(value: any): PrimitiveType {
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

function walk(obj: any, schema: InferredSchema, prefix = "") {
  if (!obj || typeof obj !== "object") return;
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;
    const pType = inferPrimitiveType(val);
    addType(schema, path, pType);
    if (pType === "object") walk(val, schema, path);
    if (pType === "array") {
      // record the array type itself, then inspect elements
      if (Array.isArray(val)) {
        for (const it of val) {
          if (it && typeof it === "object") {
            // for array of objects, inspect nested paths: use path[] to denote element structure
            walk(it, schema, `${path}[]`);
          } else {
            addType(schema, `${path}[]`, inferPrimitiveType(it));
          }
        }
      }
    }
  }
}

export function inferSchemaFromDocuments(documents: any[]): InferredSchema {
  const schema: InferredSchema = {};
  for (const doc of documents) {
    walk(doc, schema);
  }
  return schema;
}
