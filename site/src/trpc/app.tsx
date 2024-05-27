import { publicProcedure, router } from "./base";
import { projectsRouter } from "~/trpc/projectsRouter";

export const appRouter = router({
  whoAmI: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
  projects: projectsRouter,
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
