"use client";

import { useKpi15Calculator } from "../hooks/use-kpi15-calculator";
import { Kpi15InputForm } from "../ui/kpi15-input-form";
import { Kpi15ResultsDisplay } from "../ui/kpi15-results-display";

export function Kpi15CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi15Calculator();

  return (
    <div className="flex flex-col gap-8 py-6">
      <Kpi15InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi15ResultsDisplay result={result} />}
    </div>
  );
}
