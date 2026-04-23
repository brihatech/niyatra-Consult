"use client";

import { useKpi6Calculator } from "../hooks/use-kpi6-calculator";
import { Kpi6InputForm } from "../ui/kpi6-input-form";
import { Kpi6ResultsDisplay } from "../ui/kpi6-results-display";

export function Kpi6CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi6Calculator();

  return (
    <div className="flex flex-col gap-8 py-6">
      <Kpi6InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi6ResultsDisplay result={result} />}
    </div>
  );
}
