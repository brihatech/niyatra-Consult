"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/server/auth/client";

export function useHome() {
  const router = useRouter();
  const session = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return {
    user: session.data?.user,
    isLoading: session.isPending,
    handleSignOut,
  };
}
