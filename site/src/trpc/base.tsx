import { TRPCError, initTRPC } from "@trpc/server";
import { User } from "lucia";
import { Context, Env } from "hono";
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
type TRPCContext = Env["Variables"] & {
  honoContext: Context<Env>;
};

const t = initTRPC.context<TRPCContext>().create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

export const authedProcedure = t.procedure.use(async ({ next, ctx }) => {
  let user: User | null = null;
  if (ctx.user) {
    user = ctx.user;
  } else {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }
  await next();
  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});
