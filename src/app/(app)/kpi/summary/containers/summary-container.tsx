"use client";

import { useMemo } from "react";

import { api } from "@/trpc/react";

export function SummaryContainer() {
  const { data, isLoading, error } = api.kpi.getKpiSummary.useQuery();

  // Example: split KPIs by group for table display
  const orgManagementKPIs = useMemo(
    () =>
      data?.entries?.filter((e) => e.kpiNumber >= 21 && e.kpiNumber <= 22) ||
      [],
    [data?.entries],
  );
  const opManagementKPIs = useMemo(
    () => data?.entries?.filter((e) => e.kpiNumber < 21) || [],
    [data?.entries],
  );

  if (isLoading)
    return <div className="p-8 text-center">Loading summary...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-600">Error loading summary.</div>
    );
  if (!data) return <div className="p-8 text-center">No data available.</div>;

  return (
    <div className="mx-auto max-w-3xl py-10">
      <h1 className="mb-6 text-center font-bold text-2xl">KPI Summary</h1>
      <div className="mb-8">
        <h2 className="mb-2 font-semibold text-lg">
          Organizational Management KPIs
        </h2>
        <SummaryTable
          average={data.averageScore}
          entries={orgManagementKPIs}
          total={data.totalScore}
        />
      </div>
      <div className="mb-8">
        <h2 className="mb-2 font-semibold text-lg">
          Operational & Management Efficiency KPIs
        </h2>
        <SummaryTable average={null} entries={opManagementKPIs} total={null} />
      </div>
      {/* Placeholder for graph */}
      <div className="mt-10">
        <h2 className="mb-2 font-semibold text-lg">Performance Graph</h2>
        <div className="rounded border bg-white p-6 text-center text-muted-foreground">
          [Graph will be rendered here]
        </div>
      </div>
    </div>
  );
}

function SummaryTable({
  entries,
  total,
  average,
}: {
  entries: any[];
  total: number | null;
  average: number | null;
}) {
  return (
    <table className="mb-4 min-w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-left">KPI</th>
          <th className="px-4 py-2 text-center">Score</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e) => (
          <tr className="border-b" key={e.kpiNumber}>
            <td className="px-4 py-2">KPI {e.kpiNumber}</td>
            <td className="px-4 py-2 text-center font-bold font-mono">
              {typeof e.calculatedResult === "object" &&
              e.calculatedResult &&
              "score" in e.calculatedResult
                ? e.calculatedResult.score
                : "-"}
            </td>
          </tr>
        ))}
        {total !== null && (
          <tr className="bg-green-50 font-bold">
            <td className="px-4 py-2 text-right">Total</td>
            <td className="px-4 py-2 text-center">{total}</td>
          </tr>
        )}
        {average !== null && (
          <tr className="bg-green-100 font-bold">
            <td className="px-4 py-2 text-right">Average</td>
            <td className="px-4 py-2 text-center">{average}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
