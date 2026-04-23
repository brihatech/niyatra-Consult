"use client";

import { useKpi2Calculator } from "../hooks/use-kpi2-calculator";
import { Kpi2InputForm } from "../ui/kpi2-input-form";
import { Kpi2ResultsDisplay } from "../ui/kpi2-results-display";

export function Kpi2CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi2Calculator();

  return (
    <div className="flex flex-col gap-8 py-6">
      <Kpi2InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi2ResultsDisplay result={result} />}
    </div>
  );
}
