"use client";

import { useKpi13Calculator } from "../hooks/use-kpi13-calculator";
import { Kpi13InputForm } from "../ui/kpi13-input-form";
import { Kpi13ResultsDisplay } from "../ui/kpi13-results-display";

export function Kpi13CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi13Calculator();

  return (
    <div className="flex flex-col gap-8 p-6">
      <Kpi13InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi13ResultsDisplay result={result} />}
    </div>
  );
}
