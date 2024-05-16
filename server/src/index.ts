import "dotenv/config";
import { trpcServer } from "@hono/trpc-server"; // Deno 'npm:@hono/trpc-server'

import { cors } from "hono/cors";

import { serve } from "@hono/node-server";
import { appRouter } from "./trpc/app";
import { Hono } from "hono";
import { Env } from "hono";
import { github, lucia } from "./auth";
import { db } from "./db";
import { authRoutes } from "./auth/authRoutes";

declare module "hono" {
  interface Env {
    Variables: {
      lucia: typeof lucia;
      github: typeof github;
      db: typeof db;
    };
  }
}

const app = new Hono<Env>().basePath("/api");

app.use("*", async (c, next) => {
  c.set("lucia", lucia);
  c.set("github", github);
  c.set("db", db);
  await next();
});

app.get("/", (c) => {
  return c.json({ hi: "hello" });
});

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

app.route("/auth", authRoutes);

app.use("*", cors());

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    endpoint: "api/trpc", // Dumbest notation ever
    createContext(_opts, c) {
      return {
        ...c,
        lucia,
        github,
        db,
      };
    },
  }),
);

serve({
  fetch: app.fetch,
  port: 3000,
});

export type MyNum = {
  name: string;
};
