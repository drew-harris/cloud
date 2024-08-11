import { servicesRouter } from "~/trpc/servicesRouter";
import { publicProcedure, router } from "./base";
import { projectsRouter } from "~/trpc/projectsRouter";
import { waitlistRouter } from "~/trpc/waitlistRouter";
import { databaseRouter } from "~/trpc/databaseRouter";

export const appRouter = router({
  whoAmI: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
  projects: projectsRouter,
  services: servicesRouter,
  waitlist: waitlistRouter,
  databases: databaseRouter,
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
