"use client";

import type { UseFormReturn } from "react-hook-form";
import { Calculator, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { KPI1_QUESTIONS, type Kpi1Input } from "../schemas/kpi-schemas";

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
    <Card className="border-0 bg-card/60 shadow-lg backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-md">
            <span className="font-bold text-sm">1</span>
          </div>
          <div>
            <CardTitle className="font-semibold text-lg tracking-tight">
              Coverage
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Population Coverage and Served
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-6 rounded-md border border-emerald-200 bg-emerald-50/50 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/20">
          <p className="font-medium text-emerald-700 text-xs uppercase tracking-wide dark:text-emerald-400">
            Level and Quality of Water Supply Service
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {KPI1_QUESTIONS.map((q, idx) => {
            const fieldError = errors[q.id];
            return (
              <div className="flex flex-col gap-2" key={q.id}>
                <div className="flex items-start gap-3">
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
                  <div className="relative flex-1">
                    <Input
                      className={fieldError ? "border-destructive" : ""}
                      id={q.id}
                      placeholder="Enter value"
                      step="any"
                      type="number"
                      {...register(q.id, { valueAsNumber: true })}
                    />
                  </div>
                  <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
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
              <Calculator className="size-4" />
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
      </CardContent>
    </Card>
  );
}
