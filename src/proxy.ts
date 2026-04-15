import { betterFetch } from "@better-fetch/fetch";
import { type NextRequest, NextResponse } from "next/server";

import type { Session } from "@/server/auth/config";
import {
  AUTH_ROUTES,
  DEFAULT_REDIRECT_ROUTE,
  PUBLIC_ROUTES,
} from "@/lib/routing/routes";

export default async function authProxy(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // Static assets and the auth API itself — never intercept
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Public paths don't need a session
  if ((PUBLIC_ROUTES as readonly string[]).includes(pathname)) {
    return NextResponse.next();
  }

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  // ── Unauthenticated ──────────────────────────────────────────────────────
  if (!session) {
    return redirectToLogin(request);
  }

  // ── Already logged in — bounce away from login ───────────────────────────
  if ((AUTH_ROUTES as readonly string[]).includes(pathname)) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECT_ROUTE, request.url));
  }

  // ── Disabled account ─────────────────────────────────────────────────────
  if (!(session.user as { isActive?: boolean }).isActive) {
    const response = redirectToLogin(request, "account_deactivated");
    // Invalidate the session cookie so the user is fully logged out
    response.cookies.set("better-auth.session_token", "", {
      maxAge: 0,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)).*)",
  ],
};

function redirectToLogin(request: NextRequest, error?: string) {
  const url = new URL("/login", request.url);
  if (error) url.searchParams.set("error", error);
  const { pathname } = request.nextUrl;
  if (!(PUBLIC_ROUTES as readonly string[]).includes(pathname)) {
    url.searchParams.set("callbackUrl", pathname);
  }
  return NextResponse.redirect(url);
}
