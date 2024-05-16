import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "../db";
import { TB_Session, TB_User } from "../db/schema";
import { GitHub } from "arctic";
import { env } from "../env";

const adapter = new DrizzlePostgreSQLAdapter(db, TB_Session, TB_User);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      githubId: attributes.githubId,
      username: attributes.githubUsername,
      plan: attributes.plan,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  githubId: number;
  githubUsername: string;
  plan: string;
}

export const github = new GitHub(
  env.GITHUB_CLIENT_ID,
  env.GITHUB_CLIENT_SECRET,
  {
    redirectURI: "http://localhost:3000/api/auth/callback",
  },
);
