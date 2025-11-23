import { inferSchemaFromDocuments } from "../src/infer/inferSchema";

test("infers simple schema", () => {
  const docs = [
    { name: "a", age: 20 },
    { name: "b", age: "21", active: true },
    { name: "c", address: { city: "X" } }
  ];
  const schema = inferSchemaFromDocuments(docs);
  expect(schema["name"]).toBeDefined();
  expect(Array.from(schema["age"]).sort()).toEqual(["number", "string"].sort());
  expect(schema["address.city"]).toBeDefined();
});
