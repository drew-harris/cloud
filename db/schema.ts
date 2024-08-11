import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { DeploymentStatus, JobType, ServiceType } from "shared/types";

export const TB_User = pgTable("users", {
  id: text("id").primaryKey(),
  githubId: integer("github_id").notNull(),
  name: text("name"),
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

export const TB_SignUpCode = pgTable("sign_up_codes", {
  code: text("code").notNull().primaryKey(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const TB_Session = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => TB_User.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const TB_Project = pgTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => TB_User.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const TB_Service = pgTable("services", {
  id: text("id").primaryKey().unique(),
  // TODO: Make the type use the
  type: text("id").$type<ServiceType>().notNull(),
  projectId: text("project_id")
    .notNull()
    .references(() => TB_Project.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});

export const TB_Deploy = pgTable("deployments", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => TB_Project.id, { onDelete: "cascade" }),
  serviceId: text("service_id")
    .notNull()
    .references(() => TB_Service.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  status: text("status").$type<DeploymentStatus>().notNull().default("pending"),
});

export const TB_Waitlist = pgTable("waitlist", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  note: text("note").default(""),
  submittedAt: timestamp("submitted_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});

export const TB_Database = pgTable("databases", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
});
