#!/usr/bin/env node
import yargs, { ArgumentsCamelCase } from "yargs";
import { hideBin } from "yargs/helpers";
import { scanCollection } from "./scan/scanCollection";
import { compareSchemas } from "./compare/compareSchemas";
import { formatReportPretty } from "./report/formatReport";

interface CLIArgs extends ArgumentsCamelCase {
  source: string;
  target: string;
  db: string;
  collection: string;
  limit: number;
  strategy: "random" | "head" | "skip";
}

async function run() {
  const argv = (await yargs(hideBin(process.argv))
    .option("source", { type: "string", demandOption: true })
    .option("target", { type: "string", demandOption: true })
    .option("db", { type: "string", demandOption: true })
    .option("collection", { type: "string", demandOption: true })
    .option("limit", { type: "number", default: 2000 })
    .option("strategy", {
      type: "string",
      choices: ["random", "head", "skip"],
      default: "random",
    }).argv) as CLIArgs;

  const sourceSchema = await scanCollection({
    uri: argv.source,
    dbName: argv.db,
    collectionName: argv.collection,
    limit: argv.limit,
    sampleStrategy: argv.strategy,
  });

  const targetSchema = await scanCollection({
    uri: argv.target,
    dbName: argv.db,
    collectionName: argv.collection,
    limit: argv.limit,
    sampleStrategy: argv.strategy,
  });

  const report = compareSchemas(sourceSchema, targetSchema);
  console.log(formatReportPretty(report));
}

run().catch((e: unknown) => {
  console.error("Error:", e);
  process.exit(1);
});
