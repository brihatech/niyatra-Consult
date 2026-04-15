import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import {
  createUserSchema,
  getAllUsersSchema,
  toggleUserStatusSchema,
  updateProfileSchema,
} from "../schemas/user-schemas";

export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
    });
    return user;
  }),

  updateProfile: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          name: input.name,
          image: input.image,
        },
      });
      return result;
    }),

  getAll: protectedProcedure
    .input(getAllUsersSchema)
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 50;
      const { cursor } = input ?? {};

      const items = await ctx.db.user.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { name: "asc" },
      });

      let nextCursor: typeof cursor | undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  create: protectedProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      try {
        const { auth } = await import("@/server/auth/config");

        await auth.api.signUpEmail({
          body: {
            email: input.email,
            password: input.password,
            name: input.name,
          },
        });
        return { success: true };
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user",
        });
      }
    }),

  toggleStatus: protectedProcedure
    .input(toggleUserStatusSchema)
    .mutation(async ({ ctx, input }) => {
      if (input.userId === ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You cannot change your own account status.",
        });
      }

      if (!input.isActive) {
        await ctx.db.session.deleteMany({ where: { userId: input.userId } });
      }

      await ctx.db.user.update({
        where: { id: input.userId },
        data: { isActive: input.isActive },
      });

      return { success: true };
    }),
});
