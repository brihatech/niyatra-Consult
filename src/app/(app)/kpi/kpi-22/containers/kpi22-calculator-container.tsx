"use client";

import { useKpi22Calculator } from "../hooks/use-kpi22-calculator";
import { Kpi22InputForm } from "../ui/kpi22-input-form";

export function Kpi22CalculatorContainer() {
  const { form, result, details, onSubmit, onReset, isLoading } =
    useKpi22Calculator();

  return (
    <div className="flex flex-col gap-8 p-0 py-6">
      <Kpi22InputForm form={form} onReset={onReset} onSubmit={onSubmit} />
      {isLoading ? (
        <div className="py-8 text-center text-muted-foreground">Loading...</div>
      ) : result !== null && Array.isArray(details) && details.length > 0 ? (
        <div className="mt-2 rounded-md border bg-muted/50 p-0">
          <div className="flex flex-col gap-1 border-b bg-orange-100/80 px-6 py-3">
            <span className="flex items-center gap-2 font-bold text-base text-orange-700">
              Result Calculation
            </span>
            <span className="text-muted-foreground text-xs">
              KPI 22: Organizational Maturity
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="px-4 py-2 text-left font-semibold">
                    Sub-Indicator
                  </th>
                  <th className="px-4 py-2 text-center font-semibold">
                    Answer
                  </th>
                  <th className="px-4 py-2 text-center font-semibold">
                    Weight
                  </th>
                  <th className="px-4 py-2 text-center font-semibold">Score</th>
                </tr>
              </thead>
              <tbody>
                {details.map((row: any, idx: number) => (
                  <tr className="border-b" key={idx}>
                    <td className="w-2/5 px-4 py-2 align-top">{row.label}</td>
                    <td className="px-4 py-2 text-center align-top font-mono capitalize">
                      {row.answer}
                    </td>
                    <td className="px-4 py-2 text-center align-top font-mono">
                      {row.weight}
                    </td>
                    <td className="px-4 py-2 text-center align-top font-bold font-mono text-green-700">
                      {row.score}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t bg-white px-6 py-4 text-right font-bold text-green-700 text-lg">
            Aggregate KPI Score <span className="ml-2 text-2xl">{result}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
