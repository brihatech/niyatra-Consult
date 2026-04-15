import { customSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "@/env";

import type { auth } from "./config";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  plugins: [customSessionClient<typeof auth>()],
});

export type Session = typeof authClient.$Infer.Session;
