import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const TB_User = pgTable("user", {
  id: text("id").primaryKey(),
  githubId: text("github_id").notNull(),
  githubUsername: text("github_username").notNull(),
  githubEmail: text("github_email").notNull(),
  plan: text("plan").notNull().default("demo"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const TB_SignUpCode = pgTable("sign_up_code", {
  code: text("code").notNull().primaryKey(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const TB_Session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => TB_User.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
