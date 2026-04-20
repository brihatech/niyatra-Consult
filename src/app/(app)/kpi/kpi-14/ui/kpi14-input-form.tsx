"use client";

import type { UseFormReturn } from "react-hook-form";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  KPI14_BILLING_METHOD_OPTIONS,
  type Kpi14Input,
} from "../../schemas/kpi-schemas";

interface Kpi14InputFormProps {
  form: UseFormReturn<Kpi14Input>;
  onSubmit: (data: Kpi14Input) => void;
  onReset: () => void;
}

export function Kpi14InputForm({
  form,
  onSubmit,
  onReset,
}: Kpi14InputFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const selectedMethod = watch("billingMethod");

  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pt-6 pb-2 lg:px-8 lg:pt-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-900 text-white shadow-md">
            <span className="font-bold text-sm">14</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">
              Billing &amp; Collection Efficiency
            </h2>
            <p className="text-muted-foreground text-sm">
              Commercial Operation
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 lg:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* ── Subset 14.1: Billing ──────────────────────── */}
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 14.1 — Billing
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
                  htmlFor="totalKnownConnections"
                >
                  Total number of known connections required to pay charges in
                  the performance evaluation year
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.totalKnownConnections ? "border-destructive" : ""
                  }
                  id="totalKnownConnections"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("totalKnownConnections", {
                    valueAsNumber: true,
                  })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  no.
                </span>
              </div>
              {errors.totalKnownConnections && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.totalKnownConnections.message}
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
                  htmlFor="connectionsBilled"
                >
                  Number of connections billed that year
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.connectionsBilled ? "border-destructive" : ""
                  }
                  id="connectionsBilled"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("connectionsBilled", { valueAsNumber: true })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  no.
                </span>
              </div>
              {errors.connectionsBilled && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.connectionsBilled.message}
                </p>
              )}
            </div>
          </div>

          {/* ── Subset 14.2: Billing Method ───────────────── */}
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 14.2 — Billing Method
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                3
              </span>
              <Label className="font-medium text-sm leading-snug">
                Select the billing method used:
              </Label>
            </div>

            <div className="ml-9">
              <RadioGroup
                className="flex flex-col gap-3"
                onValueChange={(val) =>
                  setValue("billingMethod", val as "A" | "B" | "C")
                }
                value={selectedMethod}
              >
                {KPI14_BILLING_METHOD_OPTIONS.map((option) => (
                  <div
                    className={`flex items-start gap-3 rounded-xl border px-5 py-4 transition-colors ${
                      selectedMethod === option.value
                        ? "border-orange-300 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/20"
                        : "bg-white dark:bg-card"
                    }`}
                    key={option.value}
                  >
                    <RadioGroupItem
                      className="mt-0.5"
                      id={`billing-method-${option.value}`}
                      value={option.value}
                    />
                    <Label
                      className="cursor-pointer text-[15px] leading-snug"
                      htmlFor={`billing-method-${option.value}`}
                    >
                      {option.label}
                    </Label>
                    <span className="ml-auto shrink-0 rounded-md bg-muted px-2 py-1 font-mono text-muted-foreground text-xs">
                      {option.weight}
                    </span>
                  </div>
                ))}
              </RadioGroup>
              {errors.billingMethod && (
                <p className="mt-2 text-destructive text-xs">
                  {errors.billingMethod.message}
                </p>
              )}
            </div>
          </div>

          {/* ── Subset 14.3: Collection ───────────────────── */}
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 14.3 — Collection
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  4
                </span>
                <Label
                  className="font-medium text-sm leading-snug"
                  htmlFor="totalAmountBilled"
                >
                  Total amount billed to the customers in the performance
                  evaluation year
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.totalAmountBilled ? "border-destructive" : ""
                  }
                  id="totalAmountBilled"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("totalAmountBilled", { valueAsNumber: true })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  Rs.
                </span>
              </div>
              {errors.totalAmountBilled && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.totalAmountBilled.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  5
                </span>
                <Label
                  className="font-medium text-sm leading-snug"
                  htmlFor="totalCashCollected"
                >
                  Total cash collected from the total amount billed that year
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.totalCashCollected ? "border-destructive" : ""
                  }
                  id="totalCashCollected"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("totalCashCollected", { valueAsNumber: true })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  Rs.
                </span>
              </div>
              {errors.totalCashCollected && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.totalCashCollected.message}
                </p>
              )}
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
