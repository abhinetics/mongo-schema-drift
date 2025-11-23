# mongo-schema-drift — Detect Schema Drift in MongoDB Collections Easily

MongoDB is powerful, flexible, and schemaless — but that flexibility comes with a hidden risk: **schema drift**.  
As your application grows, different documents can silently change shape. Fields appear, disappear, or change type without warning, causing bugs and inconsistencies across environments.

**mongo-schema-drift** is a lightweight Node.js tool that **automatically scans your MongoDB collections, infers their schema, and detects differences between environments**.

Perfect for **MERN developers**, backend engineers, DevOps teams, and anyone running MongoDB in production.

---

## ⭐ Why Use mongo-schema-drift?

- 🚨 **Stop silent schema changes**
- 🔍 Detect missing, new, or conflicting fields
- 🧠 Understand how your MongoDB collections evolve
- 🔐 Safe for production (read-only)
- ⚡ Fast sampling for large collections
- 🛠️ CLI + Node.js API
- ✔ Works with nested objects and arrays

---

## 🔎 What is Schema Drift?

Schema drift happens when documents in the same collection have different shapes, for example:

Day 1:
```json
{ "name": "Abhi", "age": 22 }
```

Day 30:
```json
{ "name": "Abhi", "age": "22", "nickname": "abhi123" }
```

This means:
- `age` changed from **number → string**
- `nickname` was added later

MongoDB won’t warn you.  
But **mongo-schema-drift will**.

---

## 🚀 Features

### ✔ Automatic Schema Inference  
Scans real documents and extracts an accurate schema.

### ✔ Drift Detection  
Find:
- Missing fields
- Newly added fields
- Type mismatches
- Nested field differences
- Array-type inconsistencies

### ✔ Multiple Sampling Strategies  
Choose how to scan:
- `random`
- `head`
- `skip`

### ✔ CLI + Programmatic API  
Use in local dev, CI/CD, or Node apps.

### ✔ Zero Risk  
Only reads data. Never modifies your database.

---

## 📦 Installation

```bash
npm install mongo-schema-drift
```

Or use globally:

```bash
npm install -g mongo-schema-drift
```

---

## 🖥 CLI Usage

Compare the same collection across two MongoDB environments:

```bash
mongo-schema-drift   --source "mongodb://localhost:27017"   --target "mongodb://prod-host:27017"   --db mydb   --collection users
```

### Example Output

```
=== Mongo Schema Drift Report ===

Fields missing in target:
  - address.pincode

Extra fields in target:
  - nickname

Type mismatches:
  - age
     source: number
     target: string
```

---

## 🧩 Node.js API Usage

```ts
import {
  scanCollection,
  compareSchemas,
  formatReportPretty
} from "mongo-schema-drift";

async function run() {
  const source = await scanCollection({
    uri: "mongodb://localhost:27017",
    dbName: "testdb",
    collectionName: "users"
  });

  const target = await scanCollection({
    uri: "mongodb://prod-host:27017",
    dbName: "testdb",
    collectionName: "users"
  });

  const report = compareSchemas(source, target);

  console.log(formatReportPretty(report));
}

run();
```

---

## ⚙️ Options

| Option        | Description                                  |
|---------------|----------------------------------------------|
| `source`      | MongoDB URI for environment A                 |
| `target`      | MongoDB URI for environment B                 |
| `db`          | Database name                                 |
| `collection`  | Collection name                               |
| `limit`       | Max docs to sample (default: 2000)           |
| `strategy`    | Sampling method: `random`, `head`, `skip`     |

---

## 🔐 Safe for Production

- Read-only queries  
- Efficient sampling  
- No schema writes  
- No index changes  
- No performance impact when run with limits

---

## 🧪 Testing

This package includes Jest unit tests.

Run tests:

```bash
npm test
```

---

## 🌍 SEO Keywords (for npm discoverability)

- MongoDB schema drift
- Mongo schema compare
- MongoDB schema diff tool
- Node.js Mongo schema analyzer
- MERN schema checker
- Mongo data structure comparison
- MongoDB schema validation tool
- Detect inconsistent documents MongoDB

---

## 🏁 Use Cases

### 🔧 Development  
Catch frontend/backend changes that break DB structure.

### 📦 Deployment Pipelines  
Compare dev → staging → prod before deployment.

### 🧩 Microservices  
Ensure each service writes consistent data.

### 🗃 Database Migration  
Compare old and new collections safely.

---

## 🧑‍💻 Author  
**Abhijeet Kumar Singh**  
<kumar.abhijeetsingh20@gmail.com>

---

## 📜 License  
MIT License — Free for personal and commercial use.

---

## ⭐ Show Support  
If this tool helped you, star the GitHub repo and share it with other MERN developers!

