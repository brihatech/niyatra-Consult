"use client";

import type { UseFormReturn } from "react-hook-form";
import { Calculator, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  KPI7_RESERVE_FUND_OPTIONS,
  type Kpi7Input,
} from "../../schemas/kpi-schemas";

interface Kpi7InputFormProps {
  form: UseFormReturn<Kpi7Input>;
  onSubmit: (data: Kpi7Input) => void;
  onReset: () => void;
}

export function Kpi7InputForm({ form, onSubmit, onReset }: Kpi7InputFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const selectedLevel = watch("reserveFundLevel");

  return (
    <div className="flex h-full flex-col">
      {/* ── Header ────────────────────────────────────────── */}
      <div className="px-6 pt-6 pb-2 lg:px-8 lg:pt-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-900 text-white shadow-md">
            <span className="font-bold text-sm">7</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">
              Mean Time to Repair (MTTR)
            </h2>
            <p className="text-muted-foreground text-sm">Technical Operation</p>
          </div>
        </div>
      </div>

      {/* ── Scrollable Input Area ────────────────────────── */}
      <div className="flex-1 p-6 lg:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* ── Subset 7.1 ─────────────────────────────────── */}
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 7.1 — Reserve Fund
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                1
              </span>
              <Label className="font-medium text-sm leading-snug">
                Select the level that best describes the utility&apos;s reserve
                fund for unplanned breakdowns:
              </Label>
            </div>

            <div className="ml-9">
              <RadioGroup
                className="flex flex-col gap-3"
                onValueChange={(val) =>
                  setValue("reserveFundLevel", val as "A" | "B" | "C" | "D")
                }
                value={selectedLevel}
              >
                {KPI7_RESERVE_FUND_OPTIONS.map((option) => (
                  <div
                    className={`flex items-start gap-3 rounded-xl border px-5 py-4 transition-colors ${
                      selectedLevel === option.value
                        ? "border-orange-300 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/20"
                        : "bg-white dark:bg-card"
                    }`}
                    key={option.value}
                  >
                    <RadioGroupItem
                      className="mt-0.5"
                      id={`fund-${option.value}`}
                      value={option.value}
                    />
                    <Label
                      className="cursor-pointer text-[15px] leading-snug"
                      htmlFor={`fund-${option.value}`}
                    >
                      {option.label}
                    </Label>
                    <span className="ml-auto shrink-0 rounded-md bg-muted px-2 py-1 font-mono text-muted-foreground text-xs">
                      {option.weight}
                    </span>
                  </div>
                ))}
              </RadioGroup>
              {errors.reserveFundLevel && (
                <p className="mt-2 text-destructive text-xs">
                  {errors.reserveFundLevel.message}
                </p>
              )}
            </div>
          </div>

          {/* ── Subset 7.2 ─────────────────────────────────── */}
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 7.2 — Average Repair Time
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Question 2 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  2
                </span>
                <Label
                  className="font-medium text-sm leading-snug"
                  htmlFor="totalUnplannedRepairs"
                >
                  Total number of unplanned repairs actually performed during
                  the performance evaluation year
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.totalUnplannedRepairs ? "border-destructive" : ""
                  }
                  id="totalUnplannedRepairs"
                  placeholder="Enter value"
                  step="1"
                  type="number"
                  {...register("totalUnplannedRepairs", {
                    valueAsNumber: true,
                  })}
                />
                <span className="w-20 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  number
                </span>
              </div>
              {errors.totalUnplannedRepairs && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.totalUnplannedRepairs.message}
                </p>
              )}
            </div>

            {/* Question 3 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  3
                </span>
                <Label
                  className="font-medium text-sm leading-snug"
                  htmlFor="totalRepairTimeHours"
                >
                  Total time spent on all unplanned repairs performed that year
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.totalRepairTimeHours ? "border-destructive" : ""
                  }
                  id="totalRepairTimeHours"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("totalRepairTimeHours", {
                    valueAsNumber: true,
                  })}
                />
                <span className="w-20 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  hour
                </span>
              </div>
              {errors.totalRepairTimeHours && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.totalRepairTimeHours.message}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
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
      </div>
    </div>
  );
}
