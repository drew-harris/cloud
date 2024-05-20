import { publicProcedure, router } from "./base";

export const appRouter = router({
  whoAmI: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
