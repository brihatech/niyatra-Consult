"use client";

import { useKpi14Calculator } from "../hooks/use-kpi14-calculator";
import { Kpi14InputForm } from "../ui/kpi14-input-form";
import { Kpi14ResultsDisplay } from "../ui/kpi14-results-display";

export function Kpi14CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi14Calculator();

  return (
    <div className="flex flex-col gap-8 p-6">
      <Kpi14InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi14ResultsDisplay result={result} />}
    </div>
  );
}
