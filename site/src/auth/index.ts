import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db } from "../db";
import { GitHub } from "arctic";
import { env } from "../env";
import { TB_Session, TB_User } from "db";

const adapter = new DrizzlePostgreSQLAdapter(db, TB_Session, TB_User);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: import.meta.env.PROD,
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
    redirectURI: import.meta.env.PROD
      ? "https://drewh.cloud/auth/callback"
      : "http://localhost:3000/auth/callback",
  },
);
