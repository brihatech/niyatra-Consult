"use client";

import type { UseFormReturn } from "react-hook-form";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Kpi9Input } from "../../schemas/kpi-schemas";

interface Kpi9InputFormProps {
  form: UseFormReturn<Kpi9Input>;
  onSubmit: (data: Kpi9Input) => void;
  onReset: () => void;
}

export function Kpi9InputForm({ form, onSubmit, onReset }: Kpi9InputFormProps) {
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
            <span className="font-bold text-sm">9</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">
              Water Tariff &amp; Connection Charge
            </h2>
            <p className="text-muted-foreground text-sm">Affordability</p>
          </div>
        </div>
      </div>

      {/* ── Scrollable Input Area ────────────────────────── */}
      <div className="flex-1 p-6 lg:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* ── Subset 9.1 ─────────────────────────────────── */}
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 9.1 — Water Affordability
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Question 1 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  1
                </span>
                <Label
                  className="font-medium text-sm leading-snug"
                  htmlFor="monthlyTariff20m3"
                >
                  Monthly water tariff for a house or premises connection for
                  20m³ of water use
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.monthlyTariff20m3 ? "border-destructive" : ""
                  }
                  id="monthlyTariff20m3"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("monthlyTariff20m3", { valueAsNumber: true })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  Rs.
                </span>
              </div>
              {errors.monthlyTariff20m3 && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.monthlyTariff20m3.message}
                </p>
              )}
            </div>

            {/* Question 2 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  2
                </span>
                <Label
                  className="font-medium text-sm leading-snug"
                  htmlFor="tdfRecommendedTariff"
                >
                  TDF Recommended Tariff
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.tdfRecommendedTariff ? "border-destructive" : ""
                  }
                  id="tdfRecommendedTariff"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("tdfRecommendedTariff", {
                    valueAsNumber: true,
                  })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  Rs.
                </span>
              </div>
              {errors.tdfRecommendedTariff && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.tdfRecommendedTariff.message}
                </p>
              )}
            </div>
          </div>

          {/* ── Subset 9.2 ─────────────────────────────────── */}
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 9.2 — Connection Affordability
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Question 3 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  3
                </span>
                <Label
                  className="font-medium text-sm leading-snug"
                  htmlFor="connectionCharge"
                >
                  Connection charge for a new domestic pipe connection
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.connectionCharge ? "border-destructive" : ""
                  }
                  id="connectionCharge"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("connectionCharge", { valueAsNumber: true })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  Rs.
                </span>
              </div>
              {errors.connectionCharge && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.connectionCharge.message}
                </p>
              )}
            </div>

            {/* Question 4 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  4
                </span>
                <Label
                  className="font-medium text-sm leading-snug"
                  htmlFor="subsidyAmount"
                >
                  Subsidy in connection charge, if any, provided to low-income
                  households
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={errors.subsidyAmount ? "border-destructive" : ""}
                  id="subsidyAmount"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("subsidyAmount", { valueAsNumber: true })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  Rs.
                </span>
              </div>
              {errors.subsidyAmount && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.subsidyAmount.message}
                </p>
              )}
            </div>

            {/* Question 5 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  5
                </span>
                <Label
                  className="font-medium text-sm leading-snug"
                  htmlFor="avgMonthlyIncomeLowIncome"
                >
                  Average monthly income of low income households in the service
                  area
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.avgMonthlyIncomeLowIncome ? "border-destructive" : ""
                  }
                  id="avgMonthlyIncomeLowIncome"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("avgMonthlyIncomeLowIncome", {
                    valueAsNumber: true,
                  })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  Rs.
                </span>
              </div>
              {errors.avgMonthlyIncomeLowIncome && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.avgMonthlyIncomeLowIncome.message}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="-mx-6 flex items-center gap-3 border-t px-6 pt-5 lg:-mx-8 lg:px-8">
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
