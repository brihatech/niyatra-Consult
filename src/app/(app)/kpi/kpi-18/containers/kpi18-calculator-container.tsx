"use client";

import { useKpi18Calculator } from "../hooks/use-kpi18-calculator";
import { Kpi18InputForm } from "../ui/kpi18-input-form";
import { Kpi18ResultsDisplay } from "../ui/kpi18-results-display";

export function Kpi18CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi18Calculator();

  return (
    <div className="flex flex-col gap-8 p-6">
      <Kpi18InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi18ResultsDisplay result={result} />}
    </div>
  );
}
