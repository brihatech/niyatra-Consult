"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/server/auth/client";

import type { LoginInput } from "../schemas/login-schema";

export function useLogin() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: LoginInput) => {
    setError(null);
    setLoading(true);

    try {
      const { error: authError } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (authError) {
        setError(authError.message || "Failed to log in");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    handleSubmit,
  };
}
