"use client";

import { useHome } from "../hooks/use-home";
import { HomeView } from "../ui/home-view";

export function HomeContainer() {
  const { user, isLoading, handleSignOut } = useHome();

  return (
    <HomeView isLoading={isLoading} onSignOut={handleSignOut} user={user} />
  );
}
