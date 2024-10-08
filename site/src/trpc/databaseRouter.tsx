import { z } from "zod";
import { Database, Grant, Schema } from "@pulumi/postgresql";
import { authedProcedure, publicProcedure, router } from "~/trpc/base";
import { InlineProgramArgs, LocalWorkspace } from "@pulumi/pulumi/automation";
import { Role } from "@pulumi/postgresql/role";
import { createId } from "shared";
import { TB_Database } from "db";
import { env } from "~/env";
import { eq } from "drizzle-orm";

const createRandomLetters = (length: number) => {
  return Array.from({ length }, () => Math.random().toString(36)[2]).join("");
};

export const databaseRouter = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("RUnning muataoin");
      const dbId = createId("database");
      const name = input.name || createRandomLetters(8);
      const password = createRandomLetters(8);

      const [possible] = await ctx.db
        .select()
        .from(TB_Database)
        .where(eq(TB_Database.name, input.name));
      if (possible) {
        throw new Error("database already exists");
      }

      const createDatabaseProgram = async () => {
        // Create role
        const role = new Role("role", {
          name: name,
          password: password,
          inherit: false,
          superuser: false,
          login: true,
        });

        // Create database
        const database = new Database("database", {
          name,
          owner: role.name,
        });

        // Create schema
        const schema = new Schema("schema", {
          name: `${name}_schema`,
          database: database.name,
        });

        // Revoke public schema usage from the new role
        const revokePublicSchemaUsage = new Grant(
          "revoke_public_schema_usage",
          {
            database: database.name,
            role: role.name,
            schema: "public",
            objectType: "schema",
            privileges: [],
          },
        );

        // Revoke connect on postgres database
        const revokeConnectPostgres = new Grant("revoke_connect_postgres", {
          database: "postgres",
          role: role.name,
          objectType: "database",
          privileges: [],
        });

        // Grant connect on the new database
        const grantConnectNewDb = new Grant("grant_connect_new_db", {
          database: database.name,
          role: role.name,
          objectType: "database",
          privileges: ["CONNECT"],
        });

        // Grant access to the private schema for the new user
        const grantSchemaAccess = new Grant("grant_schema_access", {
          objectType: "schema",
          database: database.name,
          privileges: ["USAGE", "CREATE"],
          role: role.name,
          schema: schema.name,
        });

        // Grant table-level access within the private schema
        const grantTableAccess = new Grant("grant_table_access", {
          objectType: "table",
          database: database.name,
          privileges: ["SELECT", "INSERT", "UPDATE", "DELETE"],
          role: role.name,
          schema: schema.name,
        });

        return {
          url: database.urn,
        };
      };

      let args: InlineProgramArgs = {
        stackName: dbId,
        projectName: "free-enterprise-dbs",
        program: createDatabaseProgram,
      };

      console.log("got args");

      const stack = await LocalWorkspace.createOrSelectStack(args, {
        envVars: {
          PULUMI_CONFIG_PASSPHRASE: "notsecure",
          AWS_ACCESS_KEY_ID: "drew",
          AWS_SECRET_ACCESS_KEY: "drewdrew",
          AWS_DEFAULT_REGION: "us-west-2",
        },
      });

      stack.setAllConfig({
        "postgresql:host": {
          value: env.PUL_DATABASE_HOST,
        },
        "postgresql:username": {
          value: "postgres",
        },
        "postgresql:password": {
          value: env.PUL_DATABASE_PASSWORD,
        },
        "postgresql:superuser": {
          value: "true",
        },
        "postgresql:sslmode": {
          value: "disable",
        },
      });

      console.log("set stack config");

      const result = await stack.up({
        onOutput: (output) => {
          console.log(output);
        },
      });

      const inserted = await ctx.db.insert(TB_Database).values([
        {
          id: dbId,
          name: name,
        },
      ]);

      const databaseUrl = `postgresql://${name}:${password}@db.drewh.net/${name}`;

      console.log("Great job drew you made it to the end!!!");

      return {
        result,
        inserted,
        databaseUrl,
      };
    }),

  getAll: authedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.select().from(TB_Database);
    return result;
  }),

  destroy: authedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let stack = await LocalWorkspace.selectStack(
        {
          projectName: "free-enterprise-dbs",
          stackName: input.id,
          program: async () => {},
        },
        {
          envVars: {
            PULUMI_CONFIG_PASSPHRASE: "notsecure",
            AWS_ACCESS_KEY_ID: "drew",
            AWS_SECRET_ACCESS_KEY: "drewdrew",
            AWS_DEFAULT_REGION: "us-west-2",
          },
        },
      );

      const result = await stack.destroy();

      await ctx.db.delete(TB_Database).where(eq(TB_Database.id, input.id));

      return result;
    }),
});
