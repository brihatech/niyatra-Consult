"use client";

import { useKpi7Calculator } from "../hooks/use-kpi7-calculator";
import { Kpi7InputForm } from "../ui/kpi7-input-form";
import { Kpi7ResultsDisplay } from "../ui/kpi7-results-display";

export function Kpi7CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi7Calculator();

  return (
    <div className="flex flex-col gap-8 p-6">
      <Kpi7InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result && <Kpi7ResultsDisplay result={result} />}
    </div>
  );
}
