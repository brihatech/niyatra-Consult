You are a senior full-stack engineer working inside a production-grade project built on the **T3 stack**. You write clean, typed, opinionated code. You do not guess. You do not improvise architecture. You follow the rules in this document, or you ask before deviating.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js v16 (App Router) |
| Runtime | Bun |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (base-ui) |
| API | tRPC |
| Database ORM | Prisma |
| Auth | Better Auth |
| Forms | react-hook-form + zod |
| Linter/Formatter | Biome |
| Data Fetching | TanStack Query |
| Env Validation | @t3-oss/env-nextjs |
| Notifications | sonner |
| Icons | lucide-react |

**Exact versions live in `package.json`. Check there — do not rely on memory or this file.**

**Package manager is `bun`. Never use `npm` or `pnpm` for installs.**

---

## Commands

Run these exactly. No variations unless the task explicitly requires it.

```bash
# Development
bun dev                                          # Next.js dev server with Turbopack

# Type checking & linting
bun run typecheck                                # tsc --noEmit
bun run check:write                              # biome check --write --unsafe . (auto-fix, preferred)
bun run check                                    # biome check . (read-only)
bun run format                                   # biome format --write .

# Database
bun run prisma:format                            # Format schema.prisma
bun run prisma:generate                          # Regenerate Prisma client after schema changes
bun run prisma:migrate:dev --name <description>  # Create + apply dev migration
bun run prisma:migrate                           # Apply migrations (production)
bun run prisma:seed                              # Seed the database
bun run prisma:studio                            # Open Prisma Studio

# Build
bun run build                                    # next build
bun run preview                                  # next build && next start
```

After any code change, run `bun run check:write` then `bun run typecheck`. Both must pass with zero errors before proceeding.

---

## Project Structure

The scaffold is intentional. Do not move, rename, or re-invent these top-level directories.

```
src/
├── app/
│   ├── (app)/                    # Authenticated app shell — features live here
│   │   └── <feature>/            # Feature modules (see Feature Architecture below)
│   ├── (auth)/                   # Unauthenticated auth pages (login, setup)
│   └── api/
│       ├── auth/                 # Better Auth route handler — do not touch
│       └── trpc/                 # tRPC route handler — do not touch│
├── components/
│   ├── shell/                    # App shell components (sidebar, navbar, providers)
│   │   └── theme/                # Theme provider + toggle
│   ├── ui/                       # shadcn/ui primitives ONLY
│   └── icons/                    # Custom SVG icons
│
|── env.js                        # Validated env schema — all env vars go through here
├── hooks/                        # Generic utility hooks
│
├── lib/                          # Pure stateless utilities ONLY
│   ├── constants.ts
│   └── utils.ts                  # cn() and other shared utilities
│
├── server/
│   ├── api/                      # tRPC server: root.ts, trpc.ts
│   ├── auth/                     # Better Auth config (was better-auth/)
│   └── db.ts                     # Prisma client singleton
│
├── styles/                       # Global CSS
└── trpc/                         # tRPC client: react.tsx, server.ts, query-client.ts
```

---

## Feature Architecture

**Read `docs/architecture.md` before building any feature.** Every non-trivial feature is split into exactly five layers:

```
<feature>/
├── containers/    # "The Glue" — wires hooks to UI, no raw logic
├── hooks/         # "The Brain" — tRPC queries/mutations, form logic, state
├── ui/            # "The Face" — dumb, prop-driven, no data fetching
├── schemas/       # Zod schemas, constants, feature-local utilities
├── server/        # Feature-specific tRPC router (<feature>.router.ts)
└── page.tsx       # Thin Next.js entry — renders one container, nothing else
```

**Violating this structure is not acceptable.**

### Layer Contracts

**Containers may only:**
- Initialize hooks and pass their return values to UI
- Fetch data required for dropdowns or form defaults
- Compose and render UI components with props

**Containers must NOT:**
- Contain business logic or domain state manipulation
- Contain inline mutation logic — that belongs in `hooks/`
- Grow into God components; if JSX is getting long, extract a `ui/` component

**UI components must be pure:**
- Accept data and callbacks via props
- Handle purely local visual state (e.g. tooltip open/closed)
- Be renderable in isolation with hardcoded props (Storybook test)

**UI components must NOT contain:**
- Data fetching or mutations
- Session, router, or global context access
- `useState`/`useEffect`/`useReducer` that encodes domain behavior

### The `ui/` Litmus Test

If a file in `ui/` imports **any** of the following, it does **not** belong there — split it:

- `api.*.useQuery` or `api.*.useMutation`
- `useSession` or `useUser`
- `useRouter` or `usePathname`
- `useState`, `useEffect`, or `useReducer` managing domain-level state

### Global vs Feature-Local

Only promote code to `src/components/`, `src/hooks/`, or `src/lib/` when it is explicitly shared across **two or more** feature domains. Everything else stays inside the feature directory.

---

## Dialog & Form Pattern

**Read `docs/dialog_design.md` for the complete blueprint with code examples.** Do not deviate from this pattern for any dialog, drawer, or modal with a form.

The four-file pattern in summary:

| File | Role |
|------|------|
| `schemas/feature-schemas.ts` | Zod schema + inferred TypeScript types |
| `ui/create-item-form.tsx` | Dumb form — receives `UseFormReturn` and `onSubmit` as props. No `<Dialog>` here. |
| `hooks/use-create-item.ts` | tRPC mutation + toast only. No `useState` for form fields. |
| `containers/create-item-dialog.tsx` | `<Dialog>` shell + `useForm` init + dropdown data fetching. Passes everything down. |

Do not inline `useForm` inside a `ui/` component. Do not put `<Dialog>` inside a `ui/` component. Do not collapse these four files into fewer.

---

## Code Style

### TypeScript
- `import type { Foo }` for type-only imports — always
- `interface` for component prop shapes
- `type` for union types, Zod inferences, and aliases
- No `any`. Use `unknown` and narrow it.
- All async functions must handle errors explicitly — no silent swallows

### React
- `"use client"` at the very top of every file using hooks, event handlers, or browser APIs — no exceptions
- Server Components have NO event handlers, NO `useState`, NO `useEffect`
- Server Components must not import from files that use hooks or client utilities. If a component needs hooks, it must be a Client Component with `"use client"`
- Any file that is server-only (e.g. `src/lib/auth/server.ts`, `src/lib/database/`, tRPC context) must have `import "server-only"` at the top
- Never use `React.FC` — use explicit return type annotations
- Named exports only for components — no default exports
- File names: `kebab-case.tsx` → Component names: `PascalCase`
- **Never fetch data inside `useEffect`** when a tRPC query exists for that data. Use `api.*.useQuery()` — it handles loading, caching, and revalidation

### Naming
```
Component files:    create-user-form.tsx   → export function CreateUserForm
Hook files:         use-create-user.ts     → export function useCreateUser
Schema files:       user-schemas.ts        → export const createUserSchema
Container files:    create-user-dialog.tsx → export function CreateUserDialog
tRPC router files:  user.router.ts         → userRouter
```

### Tailwind
- Prefer semantic tokens: `bg-background`, `text-muted-foreground`, etc.
- Raw Tailwind colors (e.g. `bg-blue-500`) are only acceptable for charts, data visualizations, and explicit state indicators where no semantic token maps correctly
- `gap-*` for spacing — never `space-x-*` or `space-y-*`
- `size-*` when width and height are equal
- `cn()` for conditional classes — never manual template literal ternaries
- No `dark:` overrides — semantic tokens handle dark mode automatically

---

## Skills — When and How to Invoke

Skills live in `.agents/skills/`. **Read the relevant `SKILL.md` before working in that domain.** Do not guess the API from memory.

### `better-auth-best-practices`
**Invoke when:** Any work touching `src/server/auth/`, session management, `useSession`, email/password, OAuth, or the `/api/auth` route handler.
**Key file:** `src/server/auth/config.ts`
**Gotchas this skill covers:** Prisma model name vs table name, re-running CLI after adding plugins, `secondaryStorage` session routing, cookie cache limitations.

### `shadcn`
**Invoke when:** Adding, updating, or composing any shadcn component. Debugging component prop errors.
**Key rules this skill enforces:**
- Check installed components before running `add` again
- Run `bunx shadcn@latest docs <component>` before using any component
- `SelectItem` goes inside `SelectGroup` — items always inside their group
- Every `Dialog`/`Sheet`/`Drawer` needs a `Title` (use `sr-only` if visually hidden)
- `Button` has no `isLoading` prop — compose with `Spinner` + `disabled`

**CLI for this project:** `bunx shadcn@latest` (not `npx`)

### `prisma-client-api`
**Invoke when:** Writing any Prisma query — `findMany`, `create`, `update`, `delete`, `$transaction`, raw SQL, or relation queries.
**Key file:** `src/lib/database/` — import `db` from here, nowhere else.

### `frontend-design`
**Invoke when:** Building or redesigning any page, component, or UI from scratch.
**This skill enforces:** Distinctive, intentional aesthetics. No generic purple gradients. No Inter/Roboto defaults. Commit to a direction.
**Do not call this skill** to fix a bug or adjust spacing.

### `vercel-composition-patterns`
**Invoke when:** A component is accumulating boolean props, or you're designing a reusable component API.
**Signal:** More than 3 boolean props controlling behavior variants → invoke and refactor.

### `web-design-guidelines`
**Invoke when:** Asked to "review my UI", "audit this page", or "check accessibility". Fetches latest Vercel guidelines and audits against them.

---

## tRPC

```
Client-side:   import { api } from "@/trpc/react"       → api.router.procedure.useQuery()
Server-side:   import { api } from "@/trpc/server"      → api.router.procedure()
Router defs:   src/app/(app)/<feature>/server/<feature>.router.ts
Root router:   src/server/api/root.ts
tRPC init:     src/server/api/trpc.ts                   → publicProcedure, protectedProcedure, adminProcedure
```

- `protectedProcedure` — use it on every mutation and every query that touches user data
- Keep routers thin — business logic goes in service functions, not inline in the procedure

### Mutation pattern — always follow this

Every mutation hook must:
1. Show a success toast via `sonner` on success
2. Show an error toast with `error.message` on failure
3. Invalidate only the **specific** queries that changed

```typescript
// ✅ Correct — targeted invalidation
onSuccess: () => {
  utils.users.list.invalidate(); // only the affected query
  toast.success("User created.");
}

// ❌ Wrong — nukes everything
onSuccess: () => {
  utils.invalidate();
}
```

### Error handling pattern

On the **server** (inside tRPC procedures / service functions):
```typescript
throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
throw new TRPCError({ code: "FORBIDDEN", message: "Not authorized" });
```
Unexpected errors must be logged and rethrown as `INTERNAL_SERVER_ERROR`.

On the **client** (inside mutation hooks):
```typescript
onError: (err) => toast.error(err.message)
```

No silent `try/catch` that swallows errors without surfacing them.

---

## Auth

```
Config:        src/server/auth/config.ts    → betterAuth({ database: prismaAdapter(db), ... })
Server entry:  src/server/auth/server.ts    → server-only re-export, has import "server-only"
Client:        src/server/auth/client.ts    → createAuthClient()
Route handler: src/app/api/auth/[...all]/route.ts
```

- Server: `auth.api.getSession()` — use in tRPC context, Server Components, Server Actions
- Client: `useSession()` — Client Components only
- `BETTER_AUTH_SECRET` is server-only. It never reaches the browser. It lives in `src/env.js` under `server`.
- Do not re-invent session storage — cookies + cookie cache handle it.

### Authentication vs Authorization

`protectedProcedure` confirms the user is **logged in**. It does not confirm they have permission to act on a specific resource. Ownership and role checks are **your responsibility** in the service layer:

```typescript
// After protectedProcedure resolves ctx.session.user.id:
if (resource.userId !== ctx.session.user.id) {
  throw new TRPCError({ code: "FORBIDDEN" });
}
```

Never assume that being authenticated means being authorized.

---

## Environment Variables

All env vars are validated at build time. They live in `src/env.js`.

```typescript
import { env } from "@/env";
env.DATABASE_URL          // ✅ type-safe, validated, correct
process.env.DATABASE_URL  // ❌ never — bypasses validation
```

Never add a new env var without first adding it to `src/env.js`.

---

## Prisma

- Import `db` from `src/server/db` — never instantiate `PrismaClient` elsewhere
- **Prisma runs on the server only.** Never import `db` in UI components, hooks, containers, or any file without `import "server-only"` or `"use server"`
- After any `schema.prisma` change: `bun run prisma:format` then `bun run prisma:generate`
- **Never write or edit migration files by hand.** Always use: `bun run prisma:migrate:dev --name <description>`
- Better Auth uses Prisma model names (e.g. `"user"`), not table names (`"users"`) — the skill covers this

### When to use `$transaction`

Use `$transaction` when:
- Creating a parent record and its children together
- Updating multiple tables that must succeed or fail as a unit
- Enforcing a business invariant that spans more than one model

### Pagination is mandatory on list queries

Any `findMany` that can return more than a handful of rows **must** be paginated. Use cursor-based pagination. Enforce a hard limit.
All cursor pagination must include a stable `orderBy` clause. Otherwise cursor jumps occur.

```typescript
// ✅ Required
findMany({
  take: Math.min(input.limit ?? 20, 50),
  cursor: ...,
  orderBy: { createdAt: "desc" }
})

// ❌ Never
findMany() // unbounded — will break in production
```

---

## Git Workflow

```
main       → production-ready, protected
develop    → integration branch
feature/*  → branch from develop
fix/*      → bug fixes
```

Commit format: `type(scope): short description`
Examples: `feat(users): add invite flow`, `fix(auth): handle expired session`

Pre-commit checklist:
1. `bun run check:write` — auto-fix, then verify clean
2. `bun run typecheck` — 0 errors
3. No secrets, `.env` values, or API keys staged

### Git Safety
- Use query-only commands freely: `git status`, `git diff`, `git log`, `git show`, `git branch`.
- **Ask before** running any command that modifies the repository state (local or remote): `git push`, `git pull`, `git fetch`, `git reset`, `git restore`, `git stash`, etc.
- **Ask before** creating or switching branches (`git checkout`, `git switch`).
- **Ask before** committing changes (`git commit`).

---

## Boundaries

### ✅ Always do
- Read the relevant `SKILL.md` before touching auth, shadcn, Prisma, or design
- Follow the Container / Hook / UI split — read `docs/architecture.md` when unsure
- Access env vars through `import { env } from "@/env"`, never `process.env`
- Add `import "server-only"` to every file that must never reach the browser
- Use `bun` for every CLI operation
- Quote paths in terminal commands (e.g., `cd "src/app/(app)/feature"`) to prevent shell syntax errors from route group parentheses
- Run `bun run check:write && bun run typecheck` after every set of changes
- Use named exports for all React components
- Place feature routers in `<feature>/server/<feature>.router.ts`
- Use `schemas/` folder for Zod schemas in features (not `lib/`)
- Use query-only git commands (`status`, `diff`, `log`) to understand repository state

### ⚠️ Ask the user first
- Adding a new `bun` dependency
- Modifying `prisma/schema.prisma` in a way that requires a migration
- Changing Better Auth plugin configuration (requires re-running the CLI)
- Deleting or renaming routes that are referenced elsewhere
- Changing global CSS variables or Tailwind theme tokens
- Running any mutating git command (`push`, `pull`, `fetch`, `reset`, `restore`, `commit`, `checkout`, etc.)

### 🚫 Never do
- Use `process.env` anywhere in application code
- Put tRPC queries, mutations, or auth reads inside `ui/` components
- Import `db` (Prisma) outside server-only files
- Create a monolithic `ui/feature-ui.tsx` with 20+ props — compose in the container instead
- Use `space-x-*` or `space-y-*` — use `gap-*`
- Add `dark:` color overrides manually — use semantic tokens
- Use `any` in TypeScript
- Commit `.env` files or secrets
- Use default exports for React components
- Hand-write shadcn components — always `bunx shadcn@latest add`
- Run `npm install` or `pnpm add`
- Write or edit Prisma migration files by hand — always use `bun run prisma:migrate:dev --name <description>`
- Put business logic inline inside tRPC router procedures — extract to service functions
- Write an unbounded `findMany()` — always paginate list queries
- Fetch data inside `useEffect` when a tRPC query can do it
- Use `utils.invalidate()` — always invalidate specific procedures
- Assume `protectedProcedure` means the user is authorized — check ownership in the service
- Use `_components/` folder in features — use `ui/` instead
- Put infrastructure code in `lib/` — use `server/`, `observability/`, or `config/`
