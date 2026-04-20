import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";

import { env } from "@/env";
import { db } from "@/server/db";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: env.BETTER_AUTH_BASE_URL,
  trustedOrigins: [
    env.BETTER_AUTH_BASE_URL,
    env.NEXT_PUBLIC_BASE_URL,
    "http://localhost:3000",
    "http://localhost:3001",
  ],
  plugins: [
    customSession(async ({ user, session }) => {
      const dbUser = await db.user.findUnique({
        where: { id: user.id },
        select: { isActive: true },
      });
      return {
        user: {
          ...user,
          isActive: dbUser?.isActive ?? false,
        },
        session,
      };
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
