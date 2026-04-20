import { customSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "@/env";

import type { auth } from "./config";

export const authClient = createAuthClient({
  // Use current browser origin in dev so auth calls stay same-origin
  // even if Next.js runs on a different local port (e.g. :3001).
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : env.NEXT_PUBLIC_BASE_URL,
  plugins: [customSessionClient<typeof auth>()],
});

export type Session = typeof authClient.$Infer.Session;
