"use client";

import type { UseFormReturn } from "react-hook-form";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="flex h-full flex-col">
      {/* ── Header ────────────────────────────────────────── */}
      <div className="px-6 pt-6 pb-2 lg:px-8 lg:pt-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-900 text-white shadow-md">
            <span className="font-bold text-sm">4</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">
              Continuity and Reliability
            </h2>
            <p className="text-muted-foreground text-sm">
              Service Continuity &amp; Disruption Assessment
            </p>
          </div>
        </div>
      </div>

      {/* ── Scrollable Input Area ────────────────────────── */}
      <div className="flex-1 p-6 lg:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {KPI4_QUESTIONS.map((q, idx) => {
            const fieldError = errors[q.id];
            return (
              <div className="flex flex-col gap-2" key={q.id}>
                {/* Subset header */}
                <div className="mt-2 rounded-md border border-orange-200 bg-orange-50/50 px-4 py-2.5 dark:border-orange-900 dark:bg-orange-950/20">
                  <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
                    {subsetLabels[idx]}
                  </p>
                </div>

                <div className="mt-2 flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                    {idx + 1}
                  </span>
                  <Label
                    className="font-medium text-sm leading-snug"
                    htmlFor={q.id}
                  >
                    {q.question}
                  </Label>
                </div>
                <div className="ml-9 flex items-center gap-3">
                  <Input
                    className={fieldError ? "border-destructive" : ""}
                    id={q.id}
                    placeholder="Enter value"
                    step="any"
                    type="number"
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
            <Button className="gap-2" type="submit">
              Calculate KPI
            </Button>
            <Button
              className="gap-2"
              onClick={onReset}
              type="button"
              variant="outline"
            >
              <RotateCcw className="size-4" />
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
