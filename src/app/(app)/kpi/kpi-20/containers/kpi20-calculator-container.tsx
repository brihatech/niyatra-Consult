"use client";

import { useKpi20Calculator } from "../hooks/use-kpi20-calculator";
import { Kpi20InputForm } from "../ui/kpi20-input-form";
import { Kpi20ResultsDisplay } from "../ui/kpi20-results-display";

export function Kpi20CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi20Calculator();

  return (
    <div className="flex flex-col gap-8 p-0 py-6">
      <Kpi20InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi20ResultsDisplay result={result} />}
    </div>
  );
}
