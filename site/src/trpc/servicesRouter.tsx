import { TB_Service } from "db";
import { eq } from "drizzle-orm";
import { createId } from "shared";
import { ServiceType } from "shared/types";
import { z } from "zod";
import { authedProcedure, router } from "~/trpc/base";

export const servicesRouter = router({
  servicesForProject: authedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const services = await ctx.db
        .select()
        .from(TB_Service)
        .where(eq(TB_Service.projectId, input.id));
      return services;
    }),

  createService: authedProcedure
    .input(
      z.object({
        projectId: z.string(),
        type: z.enum(["isolate", "database"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const service = await ctx.db
        .insert(TB_Service)
        .values([
          {
            id: createId("services"),
            projectId: input.projectId,
            type: input.type,
          },
        ])
        .returning()
        .then((a) => a.at(0));

      if (!service) {
        throw new Error("Failed to create service");
      }
      return service;
    }),
});
