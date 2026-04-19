"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { KPI_GROUPS, KPI_LIST } from "../schemas/kpi-schemas";

export function KpiSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex w-full flex-col gap-5">
      {KPI_GROUPS.map((group) => {
        const groupKpis = KPI_LIST.filter((kpi) => kpi.group === group);
        if (groupKpis.length === 0) return null;

        return (
          <div className="flex flex-col gap-2" key={group}>
            {/* Group Header */}
            <p className="-pl-2 font-bold text-[11px] text-neutral-950 uppercase tracking-wider">
              {group}
            </p>

            {/* KPI Links */}
            {groupKpis.map((kpi) => {
              const isActive = pathname === kpi.href;
              return (
                <Link
                  className={cn(
                    "w-full rounded-md px-4 py-3 text-left font-medium text-sm transition-colors",
                    isActive
                      ? "bg-gray-950 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-950 dark:text-neutral-950 dark:hover:bg-neutral-950/80",
                  )}
                  href={kpi.href}
                  key={kpi.id}
                >
                  {kpi.name}
                </Link>
              );
            })}
          </div>
        );
      })}
    </nav>
  );
}
