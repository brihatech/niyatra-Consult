"use client";

import { useKpi19Calculator } from "../hooks/use-kpi19-calculator";
import { Kpi19InputForm } from "../ui/kpi19-input-form";
import { Kpi19ResultsDisplay } from "../ui/kpi19-results-display";

export function Kpi19CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi19Calculator();

  return (
    <div className="flex flex-col gap-8 py-6">
      <Kpi19InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi19ResultsDisplay result={result} />}
    </div>
  );
}
