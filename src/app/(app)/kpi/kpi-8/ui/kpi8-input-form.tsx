"use client";

import type { UseFormReturn } from "react-hook-form";
import { Calculator, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  KPI8_NRW_STRATEGY_OPTIONS,
  type Kpi8Input,
} from "../../schemas/kpi-schemas";

interface Kpi8InputFormProps {
  form: UseFormReturn<Kpi8Input>;
  onSubmit: (data: Kpi8Input) => void;
  onReset: () => void;
}

export function Kpi8InputForm({ form, onSubmit, onReset }: Kpi8InputFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const selectedLevel = watch("nrwStrategyLevel");

  return (
    <div className="flex h-full flex-col">
      {/* ── Header ────────────────────────────────────────── */}
      <div className="px-6 pt-6 pb-2 lg:px-8 lg:pt-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-900 text-white shadow-md">
            <span className="font-bold text-sm">8</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">
              Non-Revenue Water (NRW)
            </h2>
            <p className="text-muted-foreground text-sm">Technical Operation</p>
          </div>
        </div>
      </div>

      {/* ── Scrollable Input Area ────────────────────────── */}
      <div className="flex-1 p-6 lg:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* ── Subset 8.1 ─────────────────────────────────── */}
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 8.1 — Management Strategy
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                1
              </span>
              <Label className="font-medium text-sm leading-snug">
                Select the level that best describes the utility&apos;s NRW
                management strategy:
              </Label>
            </div>

            <div className="ml-9">
              <RadioGroup
                className="flex flex-col gap-3"
                onValueChange={(val) =>
                  setValue("nrwStrategyLevel", val as "A" | "B" | "C" | "D")
                }
                value={selectedLevel}
              >
                {KPI8_NRW_STRATEGY_OPTIONS.map((option) => (
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
                      id={`nrw-${option.value}`}
                      value={option.value}
                    />
                    <Label
                      className="cursor-pointer text-[15px] leading-snug"
                      htmlFor={`nrw-${option.value}`}
                    >
                      {option.label}
                    </Label>
                    <span className="ml-auto shrink-0 rounded-md bg-muted px-2 py-1 font-mono text-muted-foreground text-xs">
                      {option.weight}
                    </span>
                  </div>
                ))}
              </RadioGroup>
              {errors.nrwStrategyLevel && (
                <p className="mt-2 text-destructive text-xs">
                  {errors.nrwStrategyLevel.message}
                </p>
              )}
            </div>
          </div>

          {/* ── Subset 8.2 ─────────────────────────────────── */}
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 8.2 — NRW Ratio
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
                  htmlFor="totalVolumeSupplied"
                >
                  Total volume of water supplied into the distribution system
                  over the course of the performance evaluation year (as per
                  SCADA/valve/logbook)
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.totalVolumeSupplied ? "border-destructive" : ""
                  }
                  id="totalVolumeSupplied"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("totalVolumeSupplied", {
                    valueAsNumber: true,
                  })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  m³
                </span>
              </div>
              {errors.totalVolumeSupplied && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.totalVolumeSupplied.message}
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
                  htmlFor="totalVolumeBilled"
                >
                  Total volume of water billed to the customers that year
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.totalVolumeBilled ? "border-destructive" : ""
                  }
                  id="totalVolumeBilled"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("totalVolumeBilled", {
                    valueAsNumber: true,
                  })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  m³
                </span>
              </div>
              {errors.totalVolumeBilled && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.totalVolumeBilled.message}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="-mx-6 flex items-center gap-3 border-t px-6 pt-5 lg:-mx-8 lg:px-8">
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
