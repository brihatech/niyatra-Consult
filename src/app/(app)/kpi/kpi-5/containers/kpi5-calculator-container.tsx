"use client";

import { useKpi5Calculator } from "../hooks/use-kpi5-calculator";
import { Kpi5InputForm } from "../ui/kpi5-input-form";
import { Kpi5ResultsDisplay } from "../ui/kpi5-results-display";

export function Kpi5CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi5Calculator();

  return (
    <div className="flex flex-col gap-8 py-6">
      <Kpi5InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi5ResultsDisplay result={result} />}
    </div>
  );
}
