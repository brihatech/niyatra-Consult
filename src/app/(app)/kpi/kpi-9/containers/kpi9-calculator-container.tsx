"use client";

import { useKpi9Calculator } from "../hooks/use-kpi9-calculator";
import { Kpi9InputForm } from "../ui/kpi9-input-form";
import { Kpi9ResultsDisplay } from "../ui/kpi9-results-display";

export function Kpi9CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi9Calculator();

  return (
    <div className="flex flex-col gap-8 py-6">
      <Kpi9InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi9ResultsDisplay result={result} />}
    </div>
  );
}
