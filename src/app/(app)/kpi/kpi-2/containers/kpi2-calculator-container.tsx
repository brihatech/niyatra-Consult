"use client";

import { Droplets } from "lucide-react";

import { KpiNav } from "../../ui/kpi-nav";
import { useKpi2Calculator } from "../hooks/use-kpi2-calculator";
import { Kpi2InputForm } from "../ui/kpi2-input-form";
import { Kpi2ResultsDisplay } from "../ui/kpi2-results-display";

export function Kpi2CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi2Calculator();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8">
      {/* ── Page Header ──────────────────────────────────── */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
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
        <div className="h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="flex flex-col gap-8">
        <Kpi2InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
        {result && <Kpi2ResultsDisplay result={result} />}
      </div>
    </div>
  );
}
