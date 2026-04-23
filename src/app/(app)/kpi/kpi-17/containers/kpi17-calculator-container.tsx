"use client";

import { useKpi17Calculator } from "../hooks/use-kpi17-calculator";
import { Kpi17InputForm } from "../ui/kpi17-input-form";
import { Kpi17ResultsDisplay } from "../ui/kpi17-results-display";

export function Kpi17CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi17Calculator();

  return (
    <div className="flex flex-col gap-8 py-6">
      <Kpi17InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi17ResultsDisplay result={result} />}
    </div>
  );
}
