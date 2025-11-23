import { MongoClient } from "mongodb";
import { ScanOptions, InferredSchema } from "../types";
import { inferSchemaFromDocuments } from "../infer/inferSchema";
import { sampleDocuments } from "../util/sampler";

export async function scanCollection(opts: ScanOptions): Promise<InferredSchema> {
  const client = new MongoClient(opts.uri, { maxPoolSize: 5 });
  await client.connect();
  try {
    const db = client.db(opts.dbName);
    const col = db.collection(opts.collectionName);
    const docs = await sampleDocuments(col, opts.limit ?? 2000, opts.sampleStrategy ?? "random");
    return inferSchemaFromDocuments(docs);
  } finally {
    await client.close();
  }
}
