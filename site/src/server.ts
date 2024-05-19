import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server"; // Deno 'npm:@hono/trpc-server'
import { serveStatic } from "@hono/node-server/serve-static";
import { Hono } from "hono";
import { appRouter } from "./trpc/app";
import { handlePage } from "./internal/serverPageHandler";
import { github, lucia } from "./auth";
import { db } from "./db";
import { authMiddleware, authRoutes } from "./auth/authRoutes";
import { User } from "lucia";

declare module "hono" {
  interface Env {
    Variables: {
      lucia: typeof lucia;
      github: typeof github;
      db: typeof db;
      user: User | null;
    };
  }
}

const server = new Hono();
server.use("/assets/*", serveStatic({ root: "./dist/public" }));
server.use("/favicon.ico", serveStatic({ path: "./dist/public/favicon.ico" }));

server.use("*", async (c, next) => {
  c.set("lucia", lucia);
  c.set("github", github);
  c.set("db", db);
  await next();
});

server.use("*", authMiddleware);

server.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext(_opts, c) {
      return {
        ...c.var,
        honoContext: c,
      };
    },
  }),
);

// Free to use this hono server for whatever you want (redirect urls, etc)
server.route("/auth", authRoutes);

server.get("*", handlePage);

if (import.meta.env.PROD) {
  const port = Number(process.env["PORT"] || 3000);
  serve(
    {
      port,
      fetch: server.fetch,
    },
    () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    },
  );
}

export default server;
