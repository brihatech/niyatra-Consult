"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { KPI_LIST } from "../schemas/kpi-schemas";

export function KpiNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-2">
      {KPI_LIST.map((kpi) => {
        const isActive = pathname === kpi.href;
        return (
          <Link
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-2.5 font-medium text-sm transition-all",
              isActive
                ? "border-emerald-300 bg-emerald-50 text-emerald-800 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                : "border-border bg-card/60 text-muted-foreground hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700 dark:hover:border-emerald-900 dark:hover:bg-emerald-950/20 dark:hover:text-emerald-400",
            )}
            href={kpi.href}
            key={kpi.id}
          >
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-md font-bold text-xs",
                isActive
                  ? "bg-emerald-600 text-white"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {kpi.id}
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm">{kpi.name}</span>
              <span className="text-[10px] text-muted-foreground">
                {kpi.subtitle}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
