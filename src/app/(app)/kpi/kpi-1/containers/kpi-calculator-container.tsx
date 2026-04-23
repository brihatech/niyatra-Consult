"use client";

import { useKpiCalculator } from "../hooks/use-kpi-calculator";
import { KpiInputForm } from "../ui/kpi-input-form";
import { KpiResultsDisplay } from "../ui/kpi-results-display";

export function KpiCalculatorContainer() {
  const { form, result, onSubmit, onReset, isLoading } = useKpiCalculator();

  return (
    <div className="flex flex-col gap-8 py-6">
      <KpiInputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {isLoading ? (
        <div className="py-8 text-center text-muted-foreground">Loading...</div>
      ) : result ? (
        <KpiResultsDisplay result={result} />
      ) : null}
    </div>
  );
}
