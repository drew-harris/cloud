import { generateState } from "arctic";
import { Env, Hono } from "hono";
import { setCookie } from "hono/cookie";

export const authRoutes = new Hono<Env>();
authRoutes.get("/login", async (c) => {
  const state = generateState();
  const url = await c.var.github.createAuthorizationURL(state);

  setCookie(c, "github_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  // Redirect to url
  return c.redirect(url.toString());
});
