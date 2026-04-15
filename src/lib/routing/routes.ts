/** Routes accessible to unauthenticated visitors. */
export const PUBLIC_ROUTES = ["/login"] as const;

/** Auth-form routes: redirect away if user is already authenticated. */
export const AUTH_ROUTES = ["/login"] as const;

export const DEFAULT_REDIRECT_ROUTE = "/";
