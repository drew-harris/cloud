import { ExampleJob, JobType } from "shared/types";
import { publicProcedure, router } from "./base";
import { createId } from "shared";

export const appRouter = router({
  whoAmI: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),

  testJob: publicProcedure.mutation(({ ctx }) => {
    const job = ctx.queue.add(createId("jobs"), {
      type: JobType.EXAMPLE1,
      originalUrl: "lhiselifj",
    } satisfies ExampleJob);

    return job;
  }),
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
