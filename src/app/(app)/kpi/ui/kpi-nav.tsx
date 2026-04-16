"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { KPI_LIST } from "../schemas/kpi-schemas";

export function KpiNav() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full flex-col gap-2">
      {KPI_LIST.map((kpi) => {
        const isActive = pathname === kpi.href;
        return (
          <Link
            className={cn(
              "w-full rounded-md px-4 py-3 text-left font-medium text-sm transition-colors",
              isActive
                ? "bg-[#e27c12] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted/80",
            )}
            href={kpi.href}
            key={kpi.id}
          >
            {kpi.name}
          </Link>
        );
      })}
    </nav>
  );
}
