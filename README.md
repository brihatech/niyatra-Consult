# brihatech Next.js Starter

An opinionated Next.js starter template for brihatech. Production-ready patterns, pre-configured for rapid development.

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Runtime | Bun |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| API | tRPC |
| Database | Prisma (PostgreSQL) |
| Auth | Better Auth |
| Forms | react-hook-form + Zod |

## Getting Started

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env

# Run database migrations
bun run prisma:migrate:dev --name init

# Seed the database (optional)
bun run prisma:seed

# Start development server
bun dev
```

## Commands

```bash
bun dev                 # Start dev server with Turbopack
bun run build           # Production build
bun run typecheck       # Type checking
bun run check:write     # Lint + format (auto-fix)
bun run prisma:studio   # Open Prisma Studio
```

## Documentation

- **[AGENTS.md](./AGENTS.md)** — Architecture rules and coding standards
- **[docs/architecture.md](./docs/architecture.md)** — Feature structure (Container/Hook/UI pattern)
- **[docs/dialog_design.md](./docs/dialog_design.md)** — Dialog and form patterns
