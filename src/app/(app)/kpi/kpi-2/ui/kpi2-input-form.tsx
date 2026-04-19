"use client";

import type { UseFormReturn } from "react-hook-form";
import { Calculator, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { KPI2_QUESTIONS, type Kpi2Input } from "../../schemas/kpi-schemas";

interface Kpi2InputFormProps {
  form: UseFormReturn<Kpi2Input>;
  onSubmit: (data: Kpi2Input) => void;
  onReset: () => void;
}

export function Kpi2InputForm({ form, onSubmit, onReset }: Kpi2InputFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const serviceAreaType = watch("serviceAreaType");

  return (
    <div className="flex h-full flex-col">
      {/* ── Header ────────────────────────────────────────── */}
      <div className="px-6 pt-6 pb-2 lg:px-8 lg:pt-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-900 text-white shadow-md">
            <span className="font-bold text-sm">2</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">
              Sufficiency
            </h2>
            <p className="text-muted-foreground text-sm">
              Quantity of Water Supply
            </p>
          </div>
        </div>
      </div>

      {/* ── Scrollable Input Area ────────────────────────── */}
      <div className="flex-1 p-6 lg:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* ── Subset 2.1 ─────────────────────────────────── */}
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 2.1 — Consumer Perceptions
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {KPI2_QUESTIONS.slice(0, 3).map((q, idx) => {
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
          </div>

          {/* ── Subset 2.2 ─────────────────────────────────── */}
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 2.2 — Per Capita Consumption
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {KPI2_QUESTIONS.slice(3).map((q, idx) => {
              const fieldError = errors[q.id];
              return (
                <div className="flex flex-col gap-2" key={q.id}>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                      {idx + 4}
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

            {/* Service Area Type */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  6
                </span>
                <Label className="font-medium text-sm leading-snug">
                  Service Area Type
                </Label>
              </div>
              <div className="ml-9">
                <RadioGroup
                  className="flex gap-6"
                  onValueChange={(val) =>
                    setValue("serviceAreaType", val as "urban" | "rural")
                  }
                  value={serviceAreaType}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem id="urban" value="urban" />
                    <Label className="cursor-pointer text-sm" htmlFor="urban">
                      Urban
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem id="rural" value="rural" />
                    <Label className="cursor-pointer text-sm" htmlFor="rural">
                      Rural
                    </Label>
                  </div>
                </RadioGroup>
                {errors.serviceAreaType && (
                  <p className="mt-1 text-destructive text-xs">
                    {errors.serviceAreaType.message}
                  </p>
                )}
              </div>
            </div>
          </div>

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
