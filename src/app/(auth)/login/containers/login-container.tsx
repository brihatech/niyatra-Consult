"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useLogin } from "../hooks/use-login";
import { type LoginInput, loginSchema } from "../schemas/login-schema";
import { LoginForm } from "../ui/login-form";

export function LoginContainer() {
  const { error, loading, handleSubmit } = useLogin();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <LoginForm
      error={error}
      form={form}
      loading={loading}
      onSubmit={handleSubmit}
    />
  );
}
