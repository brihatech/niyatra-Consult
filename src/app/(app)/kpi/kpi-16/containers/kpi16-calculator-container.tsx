"use client";

import { useKpi16Calculator } from "../hooks/use-kpi16-calculator";
import { Kpi16InputForm } from "../ui/kpi16-input-form";
import { Kpi16ResultsDisplay } from "../ui/kpi16-results-display";

export function Kpi16CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi16Calculator();

  return (
    <div className="flex flex-col gap-8 p-6">
      <Kpi16InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi16ResultsDisplay result={result} />}
    </div>
  );
}
