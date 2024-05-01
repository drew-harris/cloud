import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ hi: "hello" });
});

serve({
  fetch: app.fetch,
  port: 3000,
});

export type MyNum = {
  name: string;
};
