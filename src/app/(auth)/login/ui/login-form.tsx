"use client";

import type { UseFormReturn } from "react-hook-form";
import { Loader2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { LoginInput } from "../schemas/login-schema";

interface LoginFormProps {
  form: UseFormReturn<LoginInput>;
  error?: string | null;
  loading: boolean;
  onSubmit: (values: LoginInput) => void;
}

export function LoginForm({ form, error, loading, onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      {/* Vercel-style background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#3b82f610,transparent)]" />
      </div>

      <div className="relative z-10 w-full max-w-[350px]">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <Link className="mb-2 transition-transform hover:scale-110" href="/">
            <svg
              aria-label="Vercel Logo"
              className="h-10 w-auto text-foreground"
              fill="currentColor"
              viewBox="0 0 75 65"
            >
              <path d="M37.59.25l36.95 64H.64l36.95-64z" />
            </svg>
          </Link>

          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-2xl tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your credentials to access your dashboard
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {error && (
              <div className="fade-in zoom-in animate-in rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 font-medium text-destructive text-sm duration-200">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label className="font-medium text-sm" htmlFor="email">
                Email
              </Label>
              <Input
                autoComplete="email"
                className="h-10 bg-background transition-colors focus:ring-1 focus:ring-ring"
                disabled={loading}
                id="email"
                placeholder="name@example.com"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-destructive text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label className="font-medium text-sm" htmlFor="password">
                  Password
                </Label>
                <Link
                  className="text-muted-foreground text-xs transition-colors hover:text-foreground"
                  href="#"
                  tabIndex={-1}
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                autoComplete="current-password"
                className="h-10 bg-background transition-colors focus:ring-1 focus:ring-ring"
                disabled={loading}
                id="password"
                placeholder="••••••••"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-destructive text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              className="h-10 w-full font-medium transition-all active:scale-[0.98]"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-border/50 border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                New to the platform?
              </span>
            </div>
          </div>

          <Button
            className="h-10 w-full border-border/50 transition-colors hover:bg-muted/50"
            render={<Link href="#" />}
            variant="outline"
          >
            Create an account
          </Button>
        </div>

        <p className="mt-10 px-8 text-center text-muted-foreground text-xs leading-relaxed">
          By clicking continue, you agree to our{" "}
          <Link
            className="underline underline-offset-4 hover:text-foreground"
            href="#"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            className="underline underline-offset-4 hover:text-foreground"
            href="#"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
