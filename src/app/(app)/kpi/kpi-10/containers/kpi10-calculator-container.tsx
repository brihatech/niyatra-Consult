"use client";

import { useKpi10Calculator } from "../hooks/use-kpi10-calculator";
import { Kpi10InputForm } from "../ui/kpi10-input-form";
import { Kpi10ResultsDisplay } from "../ui/kpi10-results-display";

export function Kpi10CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi10Calculator();

  return (
    <div className="flex flex-col gap-8 py-6">
      <Kpi10InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi10ResultsDisplay result={result} />}
    </div>
  );
}
