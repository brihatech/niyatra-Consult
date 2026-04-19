"use client";

import { KpiNav } from "./kpi-nav";

export function KpiIndex() {
  return (
    <div className="flex flex-col items-start gap-6 pt-16 pl-2">
      <h1 className="mb-2 font-bold text-2xl">KPI List</h1>
      <div className="flex w-full max-w-xs flex-col gap-4">
        <KpiNav />
      </div>
    </div>
  );
}
