#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { scanCollection } from "./scan/scanCollection";
import { compareSchemas } from "./compare/compareSchemas";
import { formatReportPretty } from "./report/formatReport";

async function run() {
  const argv = await yargs(hideBin(process.argv))
    .option("source", { type: "string", demandOption: true, description: "Source Mongo URI" })
    .option("target", { type: "string", demandOption: true, description: "Target Mongo URI" })
    .option("db", { type: "string", demandOption: true })
    .option("collection", { type: "string", demandOption: true })
    .option("limit", { type: "number", default: 2000 })
    .option("strategy", { type: "string", choices: ["random", "head", "skip"], default: "random" })
    .argv as any;

  const sourceSchema = await scanCollection({
    uri: argv.source,
    dbName: argv.db,
    collectionName: argv.collection,
    limit: argv.limit,
    sampleStrategy: argv.strategy
  });

  const targetSchema = await scanCollection({
    uri: argv.target,
    dbName: argv.db,
    collectionName: argv.collection,
    limit: argv.limit,
    sampleStrategy: argv.strategy
  });

  const report = compareSchemas(sourceSchema, targetSchema);
  console.log(formatReportPretty(report));
}

run().catch((e) => {
  console.error("Error:", e);
  process.exit(1);
});
