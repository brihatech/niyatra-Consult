import { HydrateClient } from "@/trpc/server";

import { HomeContainer } from "./containers/home-container";

export default async function Home() {
  return (
    <HydrateClient>
      <HomeContainer />
    </HydrateClient>
  );
}
