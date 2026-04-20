"use client";

import { useKpi21Calculator } from "../hooks/use-kpi21-calculator";
import { Kpi21InputForm } from "../ui/kpi21-input-form";

export function Kpi21CalculatorContainer() {
  const { form, result, onSubmit, onReset } = useKpi21Calculator();

  // Find selected option for display
  const selectedValue = form.watch("regularityOfAGM");
  const selectedOption = selectedValue
    ? require("../schemas/kpi21-schemas").kpi21Options.find(
        (o: any) => o.value === selectedValue,
      )
    : null;

  return (
    <div className="flex flex-col gap-8 p-0 py-6">
      <Kpi21InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {result !== null && selectedOption && (
        <div className="mt-2 rounded-md border bg-muted/50 p-0">
          <div className="flex flex-col gap-1 border-b bg-orange-100/80 px-6 py-3">
            <span className="flex items-center gap-2 font-bold text-base text-orange-700">
              Result Calculation
            </span>
            <span className="text-muted-foreground text-xs">
              KPI 21: Regularity of Annual General Meeting — Organizational
              Management
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-4 py-2 text-left font-semibold">
                    Sub-Indicator
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">Method</th>
                  <th className="px-4 py-2 text-center font-semibold">
                    Result
                  </th>
                  <th className="px-4 py-2 text-center font-semibold">
                    Weight
                  </th>
                  <th className="px-4 py-2 text-center font-semibold">
                    KPI Score
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="w-1/4 px-4 py-2 align-top font-medium">
                    Regularity of AGM
                  </td>
                  <td className="w-2/5 px-4 py-2 align-top">
                    {selectedOption.label}
                  </td>
                  <td className="px-4 py-2 text-center align-top font-mono">
                    {selectedOption.weight * 100}
                  </td>
                  <td className="px-4 py-2 text-center align-top font-mono">
                    {selectedOption.weight}
                  </td>
                  <td className="px-4 py-2 text-center align-top font-bold font-mono text-green-700">
                    {result.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="border-t bg-white px-6 py-4 text-right font-bold text-green-700 text-lg">
            Aggregate KPI Score{" "}
            <span className="ml-2 text-2xl">{result.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
