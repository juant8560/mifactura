import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { invoices, users } from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const schema = { invoices, users };

// For query purposes
const client = postgres(connectionString);
export const db = drizzle(client, { schema });
