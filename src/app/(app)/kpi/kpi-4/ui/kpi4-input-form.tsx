"use client";

import type { UseFormReturn } from "react-hook-form";
import { Calculator, RotateCcw } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPI4_QUESTIONS, type Kpi4Input } from "../../schemas/kpi-schemas";

interface Kpi4InputFormProps {
  form: UseFormReturn<Kpi4Input>;
  onSubmit: (data: Kpi4Input) => void;
  onReset: () => void;
}

export function Kpi4InputForm({ form, onSubmit, onReset }: Kpi4InputFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const subsetLabels: Record<number, string> = {
    0: "Subset 4.1 — Continuity",
    1: "Subset 4.2 — Accessibility",
    2: "Subset 4.3 — Reliability",
  };

  return (
    <Card className="border-0 bg-card/60 shadow-lg backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-orange-600 text-white shadow-md">
            <span className="font-bold text-sm">4</span>
          </div>
          <div>
            <CardTitle className="font-semibold text-lg tracking-tight">
              Continuity and Reliability
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Service Continuity &amp; Disruption Assessment
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          {KPI4_QUESTIONS.map((q, idx) => {
            const fieldError = errors[q.id];
            return (
              <div key={q.id} className="flex flex-col gap-2">
                {/* Subset header */}
                <div className="mt-2 rounded-md border border-orange-200 bg-orange-50/50 px-4 py-2.5 dark:border-orange-900 dark:bg-orange-950/20">
                  <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
                    {subsetLabels[idx]}
                  </p>
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                    {idx + 1}
                  </span>
                  <Label
                    htmlFor={q.id}
                    className="font-medium text-sm leading-snug"
                  >
                    {q.question}
                  </Label>
                </div>
                <div className="ml-9 flex items-center gap-3">
                  <Input
                    id={q.id}
                    type="number"
                    step="any"
                    placeholder="Enter value"
                    className={fieldError ? "border-destructive" : ""}
                    {...register(q.id, { valueAsNumber: true })}
                  />
                  <span className="w-16 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                    {q.unit}
                  </span>
                </div>
                {fieldError && (
                  <p className="ml-9 text-destructive text-xs">
                    {fieldError.message}
                  </p>
                )}
                <p className="ml-9 text-muted-foreground text-xs">
                  Source: {q.dataSource}
                </p>
              </div>
            );
          })}

          <div className="flex items-center gap-3 border-t pt-5">
            <Button type="submit" className="gap-2">
              <Calculator className="size-4" />
              Calculate KPI
            </Button>
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={onReset}
            >
              <RotateCcw className="size-4" />
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
