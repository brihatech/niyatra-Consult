"use client";

import { useKpi8Calculator } from "../hooks/use-kpi8-calculator";
import { Kpi8InputForm } from "../ui/kpi8-input-form";
import { Kpi8ResultsDisplay } from "../ui/kpi8-results-display";

export function Kpi8CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi8Calculator();

  return (
    <div className="flex flex-col gap-8 py-6">
      <Kpi8InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi8ResultsDisplay result={result} />}
    </div>
  );
}
