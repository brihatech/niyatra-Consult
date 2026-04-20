"use client";

import { useKpiCalculator } from "../hooks/use-kpi-calculator";
import { KpiInputForm } from "../ui/kpi-input-form";
import { KpiResultsDisplay } from "../ui/kpi-results-display";

export function KpiCalculatorContainer() {
  const { form, result, onSubmit, onReset, isLoading } = useKpiCalculator();

  return (
    <div className="flex flex-col gap-8 p-6">
      <KpiInputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {isLoading ? (
        <div className="text-center text-muted-foreground py-8">Loading...</div>
      ) : result ? (
        <KpiResultsDisplay result={result} />
      ) : null}
    </div>
  );
}
