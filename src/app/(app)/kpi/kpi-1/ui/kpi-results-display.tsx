"use client";

import { Award, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { KpiResult } from "../../schemas/kpi-schemas";

interface KpiResultsDisplayProps {
  result: KpiResult;
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (score >= 50) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

function getScoreBadgeVariant(
  score: number,
): "default" | "secondary" | "destructive" {
  if (score >= 80) return "default";
  if (score >= 50) return "secondary";
  return "destructive";
}

export function KpiResultsDisplay({ result }: KpiResultsDisplayProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="border-0 bg-card/60 shadow-lg backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-md">
              <TrendingUp className="size-5" />
            </div>
            <div>
              <CardTitle className="font-semibold text-lg tracking-tight">
                Result Calculation
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                KPI {result.kpiNo}: {result.kpiName} — {result.subsetName}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-emerald-600 hover:bg-emerald-600">
                  <TableHead className="font-semibold text-white">
                    Sub-Indicator
                  </TableHead>
                  <TableHead className="font-semibold text-white">
                    Method
                  </TableHead>
                  <TableHead className="text-right font-semibold text-white">
                    Result
                  </TableHead>
                  <TableHead className="text-center font-semibold text-white">
                    Unit
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.subIndicators.map((sub) => (
                  <TableRow key={sub.name}>
                    <TableCell className="font-medium">{sub.name}</TableCell>
                    <TableCell className="max-w-xs text-muted-foreground text-xs">
                      {sub.method}
                    </TableCell>
                    <TableCell
                      className={`text-right font-mono font-semibold text-sm ${getScoreColor(sub.result)}`}
                    >
                      {sub.result.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="text-xs" variant="outline">
                        {sub.unit}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-card/60 shadow-lg backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500 text-white shadow-md">
              <Award className="size-5" />
            </div>
            <div>
              <CardTitle className="font-semibold text-lg tracking-tight">
                KPI Score Calculation
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Scoring method: If Result × Weight ≥ 100, Score = 100; else
                Score = Result × Weight
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-emerald-600 hover:bg-emerald-600">
                  <TableHead className="font-semibold text-white">
                    Sub-Indicator
                  </TableHead>
                  <TableHead className="text-center font-semibold text-white">
                    Scoring Range
                  </TableHead>
                  <TableHead className="text-center font-semibold text-white">
                    Weight
                  </TableHead>
                  <TableHead className="font-semibold text-white">
                    Calculation Method
                  </TableHead>
                  <TableHead className="text-right font-semibold text-white">
                    KPI Score
                  </TableHead>
                  <TableHead className="text-center font-semibold text-white">
                    Unit
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.subIndicators.map((sub) => (
                  <TableRow key={sub.name}>
                    <TableCell className="font-medium">{sub.name}</TableCell>
                    <TableCell className="text-center text-sm">
                      {sub.scoringRange}
                    </TableCell>
                    <TableCell className="text-center font-mono text-sm">
                      {sub.weight}
                    </TableCell>
                    <TableCell className="max-w-xs text-muted-foreground text-xs">
                      {sub.result * sub.weight >= 100
                        ? `Result (${sub.result.toFixed(2)}) × Weight (${sub.weight}) = ${(sub.result * sub.weight).toFixed(2)} ≥ 100 → Score = 100`
                        : `Result (${sub.result.toFixed(2)}) × Weight (${sub.weight}) = ${(sub.result * sub.weight).toFixed(2)} → Score = ${sub.kpiScore.toFixed(2)}`}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        className="font-mono"
                        variant={getScoreBadgeVariant(sub.kpiScore)}
                      >
                        {sub.kpiScore.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-sm">%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-6 flex items-center justify-end gap-4 rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900 dark:bg-emerald-950/20">
            <span className="font-semibold text-emerald-800 text-sm dark:text-emerald-300">
              Average KPI Score
            </span>
            <div
              className={`rounded-lg px-5 py-2 font-bold text-2xl ${getScoreColor(result.averageKpiScore)}`}
            >
              {result.averageKpiScore.toFixed(2)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
