import "dotenv/config";
import { trpcServer } from "@hono/trpc-server"; // Deno 'npm:@hono/trpc-server'

import { cors } from "hono/cors";

import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { appRouter } from "./trpc";

const app = new Hono().basePath("/api");
app.get("/", (c) => {
  return c.json({ hi: "hello" });
});

app.use("*", cors());

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  }),
);

serve({
  fetch: app.fetch,
  port: 3000,
});

export type MyNum = {
  name: string;
};
