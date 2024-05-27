import { env } from "../env";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "db";

const queryClient = postgres(env.DATABASE_URL);

export const db = drizzle(queryClient, {
  schema: schema,
});
