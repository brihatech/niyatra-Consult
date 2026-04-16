## Clean Install

```bash
bun install

docker compose up -d

# wait till all containers ready

bun run prisma:migrate
bun run prisma:generate
bun run prisma:seed
bun run garage:setup
bun run garage:init

bun run dev
```
