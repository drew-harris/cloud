import { publicProcedure, router } from "./trpc";
export const appRouter = router({
  testRoute: publicProcedure.query(async () => {
    return "Poopy";
  }),
  // ...
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
