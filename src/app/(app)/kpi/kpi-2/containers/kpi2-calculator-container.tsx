"use client";

import { KpiNav } from "../../ui/kpi-nav";
import { useKpi2Calculator } from "../hooks/use-kpi2-calculator";
import { Kpi2InputForm } from "../ui/kpi2-input-form";

export function Kpi2CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi2Calculator();

  return (
    <div className="my-8 flex w-full max-w-[1800px] flex-col gap-8 px-4 lg:flex-row lg:px-8">
      {/* ── Navigation Sidebar (Outside Card) ────────────── */}
      <aside className="w-full shrink-0 lg:w-64">
        <div className="sticky top-8">
          <h1 className="mb-8 font-bold text-3xl text-foreground tracking-tight">
            KPI Calculator
          </h1>
          <KpiNav />
        </div>
      </aside>

      {/* ── Form and Results Area (Inside Card) ──────────── */}
      <main className="flex min-h-[600px] flex-1 flex-col overflow-hidden rounded-xl border bg-background shadow-sm">
        <div className="flex flex-1 flex-col bg-[#fcfcfc] dark:bg-background">
          <Kpi2InputForm
            form={form}
            onReset={onReset}
            onSubmit={onSubmit}
            result={result}
          />
        </div>
      </main>
    </div>
  );
}
