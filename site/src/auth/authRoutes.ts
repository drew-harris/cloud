import { OAuth2RequestError, generateState } from "arctic";
import { Context, Env, Hono, Next } from "hono";
import { nanoid } from "nanoid";
import { getCookie, setCookie } from "hono/cookie";
import { GithubUser } from "./githubType";
import { TB_User } from "~/db/schema";
import { eq } from "drizzle-orm";

export const authMiddleware = async (c: Context<Env>, next: Next) => {
  const cookie = getCookie(c, c.var.lucia.sessionCookieName);
  if (!cookie) {
    c.set("user", null);
    return await next();
  } else {
    const parsed = c.var.lucia.readSessionCookie(cookie);
    if (!parsed) {
      c.set("user", null);
      return await next();
    }
    const session = await c.var.lucia.validateSession(parsed);
    if (session.session) {
      c.set("user", session.user);
    } else {
      c.set("user", null);
      return await next();
    }
  }
  return await next();
};

export const authRoutes = new Hono<Env>();
authRoutes.get("/login", async (c) => {
  const state = generateState();
  const url = await c.var.github.createAuthorizationURL(state);

  setCookie(c, "github_oauth_state", state, {
    path: "/",
    secure: import.meta.env.PROD,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "Lax",
  });

  // Redirect to url
  return c.redirect(url.toString());
});

// Callback url
authRoutes.get("/callback", async (c) => {
  const code = c.req.query("code");
  const state = c.req.query("state");

  const cookieState = getCookie(c, "github_oauth_state");
  if (cookieState !== state) {
    c.status(400);
    return c.text("Invalid state");
  }
  if (!code) {
    c.status(400);
    return c.text("Invalid code");
  }

  try {
    const tokens = await c.var.github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GithubUser = await githubUserResponse.json();
    console.log(githubUser);
    if (!githubUser) {
      return c.redirect("/login");
    }

    const existingUser = await c.var.db
      .select()
      .from(TB_User)
      .where(eq(TB_User.githubId, githubUser.id))
      .then((a) => a.at(0));

    if (existingUser) {
      const session = await c.var.lucia.createSession(existingUser.id, {});
      setCookie(
        c,
        c.var.lucia.sessionCookieName,
        c.var.lucia.createSessionCookie(session.id).serialize(),
        {
          path: "/",
          secure: import.meta.env.PROD,
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "Lax",
        },
      );
      return c.redirect("/dashboard");
    }

    const newUser = await c.var.db
      .insert(TB_User)
      .values([
        {
          githubEmail: githubUser.email,
          githubId: githubUser.id,
          githubUsername: githubUser.name,
          id: nanoid(5),
        },
      ])
      .returning()
      .then((a) => a.at(0));

    if (!newUser) {
      return c.redirect("/login");
    }

    const session = await c.var.lucia.createSession(newUser.id, {});

    setCookie(
      c,
      "session",
      c.var.lucia.createSessionCookie(session.id).serialize(),
      {
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "Lax",
      },
    );

    // return res
    // 	.appendHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize())
    // 	.redirect("/");
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
  }

  return c.redirect("/dashboard");
});