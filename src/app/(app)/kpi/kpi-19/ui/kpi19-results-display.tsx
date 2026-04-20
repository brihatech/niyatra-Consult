"use client";

import type { KpiResult } from "../../schemas/kpi-schemas";
import { Kpi17ResultsDisplay } from "../../kpi-17/ui/kpi17-results-display";

interface Kpi19ResultsDisplayProps {
  result: KpiResult;
}

export function Kpi19ResultsDisplay({ result }: Kpi19ResultsDisplayProps) {
  return <Kpi17ResultsDisplay result={result} />;
}
