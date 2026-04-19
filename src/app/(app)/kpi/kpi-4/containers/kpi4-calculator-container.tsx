"use client";

import { useKpi4Calculator } from "../hooks/use-kpi4-calculator";
import { Kpi4InputForm } from "../ui/kpi4-input-form";
import { Kpi4ResultsDisplay } from "../ui/kpi4-results-display";

export function Kpi4CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi4Calculator();

  return (
    <div className="flex flex-col gap-8 p-6">
      <Kpi4InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi4ResultsDisplay result={result} />}
    </div>
  );
}
