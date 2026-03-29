import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// this file is intended to run only on the server.  importing it
// in a client-side bundle will throw so we catch that early.
if (typeof window !== "undefined") {
  throw new Error("Attempted to load server-only database helper on the client");
}

// require a normal (non-public) environment variable so it never
// gets exposed to the browser.  Next.js automatically makes
// variables prefixed with NEXT_PUBLIC available to client code.
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}
const sql = neon(connectionString);

export const db = drizzle(sql, { schema });
