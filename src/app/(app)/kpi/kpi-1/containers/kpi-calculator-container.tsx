"use client";

import { Droplets } from "lucide-react";

import { KpiNav } from "../../ui/kpi-nav";
import { useKpiCalculator } from "../hooks/use-kpi-calculator";
import { KpiInputForm } from "../ui/kpi-input-form";
import { KpiResultsDisplay } from "../ui/kpi-results-display";

export function KpiCalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpiCalculator();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      {/* ── Page Header ──────────────────────────────────── */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
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
        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="flex flex-col gap-8">
        <KpiInputForm form={form} onReset={onReset} onSubmit={onSubmit} />
        {result && <KpiResultsDisplay result={result} />}
      </div>
    </div>
  );
}
