"use client";

import { Droplets } from "lucide-react";

import { useKpi4Calculator } from "../hooks/use-kpi4-calculator";
import { Kpi4InputForm } from "../ui/kpi4-input-form";
import { Kpi4ResultsDisplay } from "../ui/kpi4-results-display";
import { KpiNav } from "../../ui/kpi-nav";

export function Kpi4CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi4Calculator();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      {/* ── Page Header ──────────────────────────────────── */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg">
            <Droplets className="size-6" />
          </div>
          <div>
            <h1 className="font-bold text-2xl tracking-tight">
              KPI Calculator
            </h1>
            <p className="text-muted-foreground text-sm">
              Level and Quality of Water Supply Service
            </p>
          </div>
        </div>
        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-amber-500" />
        <KpiNav />
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="flex flex-col gap-8">
        <Kpi4InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
        {result && <Kpi4ResultsDisplay result={result} />}
      </div>
    </div>
  );
}
