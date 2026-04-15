"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserInfo {
  name: string;
  email: string;
  image?: string | null;
}

interface HomeViewProps {
  user: UserInfo | null | undefined;
  isLoading: boolean;
  onSignOut: () => void;
}

export function HomeView({ user, isLoading, onSignOut }: HomeViewProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans selection:bg-primary/10">
      {/* Vercel-style background patterns */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#3b82f615,transparent)]" />
      </div>

      {/* Navigation */}
      <header className="relative z-10 border-border/40 border-b bg-background/60 backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-2">
            <svg
              aria-label="brihatech Logo"
              className="h-6 w-auto text-foreground"
              fill="currentColor"
              viewBox="0 0 75 65"
            >
              <path d="M37.59.25l36.95 64H.64l36.95-64z" />
            </svg>
            <span className="font-semibold tracking-tight">
              brihatech Starter
            </span>
          </div>

          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
            ) : user ? (
              <div className="flex items-center gap-3">
                <span className="hidden font-medium text-muted-foreground text-sm sm:inline-block">
                  {user.name}
                </span>
                <Avatar className="h-8 w-8 border border-border/50">
                  <AvatarImage alt={user.name} src={user.image ?? ""} />
                  <AvatarFallback className="bg-primary/5 font-bold text-[10px] text-primary">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  className="h-8 border-border/50 px-3 font-semibold text-xs"
                  onClick={onSignOut}
                  size="sm"
                  variant="outline"
                >
                  <LogOut className="mr-2 h-3 w-3" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                className="h-8 px-4 font-semibold text-xs"
                render={<Link href="/login" />}
                size="sm"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 text-center md:py-24">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Content */}
          <div className="fade-in slide-in-from-bottom-8 flex animate-in flex-col gap-6 duration-1000">
            <h1 className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text font-extrabold text-4xl text-transparent leading-[1.1] tracking-tighter sm:text-7xl lg:text-8xl">
              Engineered for <br className="hidden sm:block" />
              scalability & speed.
            </h1>
            <p className="mx-auto max-w-2xl font-medium text-lg text-muted-foreground leading-relaxed sm:text-xl">
              A opinionated NextJS internal starter template for brihatech
              teams. Production-ready patterns, pre-configured for your next
              project.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-border/40 border-t py-12 md:py-16">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-8">
          <p className="font-medium text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} brihatech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              href="https://www.brihatech.com"
              target="_blank"
            >
              Website
            </Link>
            <Link
              className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              href="https://github.com/brihatech"
              target="_blank"
            >
              GitHub
            </Link>
            <Link
              className="text-muted-foreground text-sm transition-colors hover:text-foreground"
              href="https://linkedin.com/company/brihatech"
              target="_blank"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
