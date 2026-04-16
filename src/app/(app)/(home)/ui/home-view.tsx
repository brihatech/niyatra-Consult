"use client";

import Link from "next/link";

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
    <div className="flex flex-col items-end justify-center p-4">
      <Button
        className="rounded-xl bg-emerald-600 px-8 py-6 font-bold text-lg text-white shadow-lg hover:bg-emerald-700"
        render={<Link href="/kpi" />}
      >
        KPI Calculator
      </Button>
    </div>
  );
}
