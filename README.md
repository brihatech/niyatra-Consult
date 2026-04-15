## Clean Install

```bash
npm install

docker compose up -d

# wait till all containers ready

bun run prisma:migrate
bun run prisma:generate
bun run .\scripts\seed.ts
bun run garage:setup
bun run garage:init

bun run dev 
