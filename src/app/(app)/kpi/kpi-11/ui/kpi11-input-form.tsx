"use client";

import type { UseFormReturn } from "react-hook-form";
import { Calculator, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Kpi11Input } from "../../schemas/kpi-schemas";

interface Kpi11InputFormProps {
  form: UseFormReturn<Kpi11Input>;
  onSubmit: (data: Kpi11Input) => void;
  onReset: () => void;
}

export function Kpi11InputForm({
  form,
  onSubmit,
  onReset,
}: Kpi11InputFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pt-6 pb-2 lg:px-8 lg:pt-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-900 text-white shadow-md">
            <span className="font-bold text-sm">11</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">
              Contribution to Investment (CTI)
            </h2>
            <p className="text-muted-foreground text-sm">
              Capital Investment Expenditure
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 lg:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 11.1 — Capital Investment Expenditure
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  1
                </span>
                <Label
                  className="font-medium text-sm leading-snug"
                  htmlFor="netCashIncome"
                >
                  Net cash income in the performance evaluation year
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={errors.netCashIncome ? "border-destructive" : ""}
                  id="netCashIncome"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("netCashIncome", { valueAsNumber: true })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  Rs.
                </span>
              </div>
              {errors.netCashIncome && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.netCashIncome.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  2
                </span>
                <Label
                  className="font-medium text-sm leading-snug"
                  htmlFor="totalSavings"
                >
                  Total savings up to the end of the previous year
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={errors.totalSavings ? "border-destructive" : ""}
                  id="totalSavings"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("totalSavings", { valueAsNumber: true })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  Rs.
                </span>
              </div>
              {errors.totalSavings && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.totalSavings.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  3
                </span>
                <Label
                  className="font-medium text-sm leading-snug"
                  htmlFor="capitalInvestmentSpent"
                >
                  Total amount spent on capital investments by utility from
                  earnings and savings over the last three years
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.capitalInvestmentSpent ? "border-destructive" : ""
                  }
                  id="capitalInvestmentSpent"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("capitalInvestmentSpent", {
                    valueAsNumber: true,
                  })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  Rs.
                </span>
              </div>
              {errors.capitalInvestmentSpent && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.capitalInvestmentSpent.message}
                </p>
              )}
            </div>
          </div>

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
