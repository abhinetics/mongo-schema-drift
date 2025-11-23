import { Collection } from "mongodb";

/**
 * sampleDocuments:
 * - random: uses aggregation $sample if available
 * - head: find().limit(n)
 * - skip: sample by skipping intervals
 */
export async function sampleDocuments(col: Collection, limit: number, strategy: "random" | "head" | "skip") {
  const count = await col.countDocuments();
  if (count === 0) return [];

  const take = Math.min(limit, count);

  if (strategy === "random") {
    // $sample requires aggregation and may be expensive for huge collections. Use fallback.
    try {
      const cursor = col.aggregate([{ $sample: { size: take } }], { allowDiskUse: false });
      return await cursor.toArray();
    } catch (err) {
      // fallback to head
    }
  }

  if (strategy === "head") {
    return await col.find({}).limit(take).toArray();
  }

  // skip strategy - evenly spaced sampling
  const step = Math.max(1, Math.floor(count / take));
  const docs = [];
  for (let i = 0; i < take; i++) {
    const doc = await col.find().skip(i * step).limit(1).next();
    if (doc) docs.push(doc);
  }
  return docs;
}
