"use client";

import type { KpiResult } from "../../schemas/kpi-schemas";
import { Kpi17ResultsDisplay } from "../../kpi-17/ui/kpi17-results-display";

interface Kpi18ResultsDisplayProps {
  result: KpiResult;
}

export function Kpi18ResultsDisplay({ result }: Kpi18ResultsDisplayProps) {
  return <Kpi17ResultsDisplay result={result} />;
}
