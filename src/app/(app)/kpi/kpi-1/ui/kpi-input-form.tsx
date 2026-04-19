"use client";

import type { UseFormReturn } from "react-hook-form";
import { Calculator, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { KPI1_QUESTIONS, type Kpi1Input } from "../../schemas/kpi-schemas";

interface KpiInputFormProps {
  form: UseFormReturn<Kpi1Input>;
  onSubmit: (data: Kpi1Input) => void;
  onReset: () => void;
}

export function KpiInputForm({ form, onSubmit, onReset }: KpiInputFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="flex h-full flex-col">
      {/* ── Header ────────────────────────────────────────── */}
      <div className="px-6 pt-6 pb-2 lg:px-8 lg:pt-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-900 text-white shadow-md">
            <span className="font-bold text-sm">1</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">Coverage</h2>
            <p className="text-muted-foreground text-sm">
              Population Coverage and Served
            </p>
          </div>
        </div>
      </div>

      {/* ── Scrollable Input Area ────────────────────────── */}
      <div className="flex-1 p-6 lg:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {KPI1_QUESTIONS.map((q, idx) => {
            const fieldError = errors[q.id];
            return (
              <div className="flex flex-col gap-2" key={q.id}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                    {idx + 1}
                  </span>
                  <div>
                    <Label
                      className="font-medium text-sm leading-snug"
                      htmlFor={q.id}
                    >
                      {q.question}
                    </Label>
                    <p className="mt-0.5 text-muted-foreground text-xs">
                      Source: {q.dataSource}
                    </p>
                  </div>
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
                  <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                    {q.unit}
                  </span>
                </div>
                {fieldError && (
                  <p className="ml-9 text-destructive text-xs">
                    {fieldError.message}
                  </p>
                )}
              </div>
            );
          })}

          {/* Actions */}
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
