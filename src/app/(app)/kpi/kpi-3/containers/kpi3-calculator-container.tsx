"use client";

import { useKpi3Calculator } from "../hooks/use-kpi3-calculator";
import { Kpi3InputForm } from "../ui/kpi3-input-form";
import { Kpi3ResultsDisplay } from "../ui/kpi3-results-display";

export function Kpi3CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi3Calculator();

  return (
    <div className="flex flex-col gap-8 p-6">
      <Kpi3InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi3ResultsDisplay result={result} />}
    </div>
  );
}
