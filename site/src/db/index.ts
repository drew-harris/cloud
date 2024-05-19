import { env } from "../env";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const queryClient = postgres(env.DATABASE_URL);

export const db = drizzle(queryClient);
