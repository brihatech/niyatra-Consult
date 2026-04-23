"use client";

import { useKpi12Calculator } from "../hooks/use-kpi12-calculator";
import { Kpi12InputForm } from "../ui/kpi12-input-form";
import { Kpi12ResultsDisplay } from "../ui/kpi12-results-display";

export function Kpi12CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi12Calculator();

  return (
    <div className="flex flex-col gap-8 py-6">
      <Kpi12InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi12ResultsDisplay result={result} />}
    </div>
  );
}
