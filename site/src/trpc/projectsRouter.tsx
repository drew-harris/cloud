import { TB_Project } from "db";
import { eq } from "drizzle-orm";
import { createId } from "shared";
import { z } from "zod";
import { authedProcedure, router } from "~/trpc/base";

export const projectsRouter = router({
  createProject: authedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db
        .insert(TB_Project)
        .values([
          {
            id: createId("projects"),
            name: input.name,
            userId: ctx.user.id,
          },
        ])
        .returning()
        .then((a) => a.at(0));
      if (!project) {
        throw new Error("Failed to create project");
      }
      return project;
    }),

  myProjects: authedProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db
      .select()
      .from(TB_Project)
      .where(eq(TB_Project.userId, ctx.user.id));

    return projects;
  }),
});
