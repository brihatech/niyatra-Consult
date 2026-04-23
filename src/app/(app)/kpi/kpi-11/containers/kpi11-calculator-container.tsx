"use client";

import { useKpi11Calculator } from "../hooks/use-kpi11-calculator";
import { Kpi11InputForm } from "../ui/kpi11-input-form";
import { Kpi11ResultsDisplay } from "../ui/kpi11-results-display";

export function Kpi11CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi11Calculator();

  return (
    <div className="flex flex-col gap-8 py-6">
      <Kpi11InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi11ResultsDisplay result={result} />}
    </div>
  );
}
