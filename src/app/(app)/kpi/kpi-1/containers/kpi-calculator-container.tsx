"use client";

import { useKpiCalculator } from "../hooks/use-kpi-calculator";
import { KpiInputForm } from "../ui/kpi-input-form";
import { KpiResultsDisplay } from "../ui/kpi-results-display";

export function KpiCalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpiCalculator();

  return (
    <div className="flex flex-col gap-8 p-6">
      <KpiInputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <KpiResultsDisplay result={result} />}
    </div>
  );
}
