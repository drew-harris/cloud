import { TB_Waitlist } from "db";
import { createId } from "shared";
import { z } from "zod";
import { publicProcedure, router } from "~/trpc/base";

export const waitlistRouter = router({
  join: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [inserted] = await ctx.db
        .insert(TB_Waitlist)
        .values([
          {
            email: input.email,
            id: createId("waitlist"),
          },
        ])
        .returning();
      if (!inserted) {
        throw new Error("Failed to insert into waitlist");
      }
      return inserted;
    }),
});
