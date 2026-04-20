"use client";

import type { KpiResult } from "../../schemas/kpi-schemas";
import { Kpi17ResultsDisplay } from "../../kpi-17/ui/kpi17-results-display";

interface Kpi20ResultsDisplayProps {
  result: KpiResult;
}

export function Kpi20ResultsDisplay({ result }: Kpi20ResultsDisplayProps) {
  return <Kpi17ResultsDisplay result={result} />;
}
