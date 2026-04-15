##### DEPENDENCIES
FROM oven/bun:1-alpine AS deps
WORKDIR /app

COPY package.json bun.lock ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN bun install --frozen-lockfile


##### BUILDER
FROM deps AS builder
WORKDIR /app

COPY . .

ARG NEXT_PUBLIC_BASE_URL
ARG NODE_ENV=production
ARG DATABASE_URL=postgresql://fake:fake@localhost:5432/fake
ARG BETTER_AUTH_SECRET=buildtime_dummy_secret_value_to_satisfy_validation

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
    NODE_ENV=$NODE_ENV \
    DATABASE_URL=$DATABASE_URL \
    BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET \
    NEXT_TELEMETRY_DISABLED=1

RUN bunx prisma generate
RUN SKIP_ENV_VALIDATION=1 bun run build && \
    rm -rf .next/cache


##### Runtime
FROM oven/bun:1-alpine AS runner
WORKDIR /app

RUN getent group nextjs-starter || addgroup -S nextjs-starter && adduser -S webapp -G nextjs-starter

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000   

# Install Prisma CLI using the version specified in package.json so prisma/config exists at runtime
COPY package.json ./
RUN bun add prisma
ENV PATH="/app/node_modules/.bin:${PATH}"

COPY --from=builder --chown=webapp:nextjs-starter /app/prisma ./prisma
COPY --from=builder --chown=webapp:nextjs-starter /app/prisma.config.ts ./

COPY --from=builder --chown=webapp:nextjs-starter /app/.next/standalone ./
COPY --from=builder --chown=webapp:nextjs-starter /app/.next/static ./.next/static
COPY --from=builder --chown=webapp:nextjs-starter /app/public ./public

# Prisma runtime requirements
COPY --from=builder --chown=webapp:nextjs-starter /app/prisma ./prisma

# ---- Entrypoint ----
COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER webapp

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["bun", "server.js"]
