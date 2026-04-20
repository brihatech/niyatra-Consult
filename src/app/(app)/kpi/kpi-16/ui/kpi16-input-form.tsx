"use client";

import type { UseFormReturn } from "react-hook-form";
import { Calculator, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  KPI16_COMPLAINTS_OPTIONS,
  type Kpi16Input,
} from "../../schemas/kpi-schemas";

interface Kpi16InputFormProps {
  form: UseFormReturn<Kpi16Input>;
  onSubmit: (data: Kpi16Input) => void;
  onReset: () => void;
}

export function Kpi16InputForm({
  form,
  onSubmit,
  onReset,
}: Kpi16InputFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const selectedLevel = watch("complaintsManagementLevel");

  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pt-6 pb-2 lg:px-8 lg:pt-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-900 text-white shadow-md">
            <span className="font-bold text-sm">16</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">
              Complaints Handling
            </h2>
            <p className="text-muted-foreground text-sm">
              Consumer Satisfaction
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 lg:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 16.1 — Complaints Management
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                1
              </span>
              <Label className="font-medium text-sm leading-snug">
                Select the level that best describes the utility&apos;s
                complaint handling mechanism:
              </Label>
            </div>

            <div className="ml-9">
              <RadioGroup
                className="flex flex-col gap-3"
                onValueChange={(val) =>
                  setValue(
                    "complaintsManagementLevel",
                    val as "A" | "B" | "C" | "D",
                  )
                }
                value={selectedLevel}
              >
                {KPI16_COMPLAINTS_OPTIONS.map((option) => (
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
                      id={`complaints-level-${option.value}`}
                      value={option.value}
                    />
                    <Label
                      className="cursor-pointer text-[15px] leading-snug"
                      htmlFor={`complaints-level-${option.value}`}
                    >
                      {option.label}
                    </Label>
                    <span className="ml-auto shrink-0 rounded-md bg-muted px-2 py-1 font-mono text-muted-foreground text-xs">
                      {option.weight}
                    </span>
                  </div>
                ))}
              </RadioGroup>
              {errors.complaintsManagementLevel && (
                <p className="mt-2 text-destructive text-xs">
                  {errors.complaintsManagementLevel.message}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 16.2 — Redress Ratio
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  2
                </span>
                <Label
                  className="font-medium text-sm leading-snug"
                  htmlFor="totalComplaintsRecorded"
                >
                  Total number of complaints recorded in the complaints handling
                  and redress logbook over the course of a year
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.totalComplaintsRecorded ? "border-destructive" : ""
                  }
                  id="totalComplaintsRecorded"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("totalComplaintsRecorded", {
                    valueAsNumber: true,
                  })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  no.
                </span>
              </div>
              {errors.totalComplaintsRecorded && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.totalComplaintsRecorded.message}
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
                  htmlFor="complaintsResolved"
                >
                  Number of complaints resolved in that year
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.complaintsResolved ? "border-destructive" : ""
                  }
                  id="complaintsResolved"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("complaintsResolved", { valueAsNumber: true })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  no.
                </span>
              </div>
              {errors.complaintsResolved && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.complaintsResolved.message}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 16.3 — Consumers&apos; Perceptions
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
                  htmlFor="percentageAddressedOnTime"
                >
                  A) Percentage of households reporting that their complaints
                  were addressed on time
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.percentageAddressedOnTime ? "border-destructive" : ""
                  }
                  id="percentageAddressedOnTime"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("percentageAddressedOnTime", {
                    valueAsNumber: true,
                  })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  %
                </span>
              </div>
              {errors.percentageAddressedOnTime && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.percentageAddressedOnTime.message}
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
                  htmlFor="percentageAddressedLate"
                >
                  B) Percentage of households reporting that their complaints
                  were addressed, but late
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.percentageAddressedLate ? "border-destructive" : ""
                  }
                  id="percentageAddressedLate"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("percentageAddressedLate", {
                    valueAsNumber: true,
                  })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  %
                </span>
              </div>
              {errors.percentageAddressedLate && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.percentageAddressedLate.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                  6
                </span>
                <Label
                  className="font-medium text-sm leading-snug"
                  htmlFor="percentageNotAddressed"
                >
                  C) Percentage of households reporting that their complaints
                  were not addressed
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.percentageNotAddressed ? "border-destructive" : ""
                  }
                  id="percentageNotAddressed"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("percentageNotAddressed", {
                    valueAsNumber: true,
                  })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  %
                </span>
              </div>
              {errors.percentageNotAddressed && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.percentageNotAddressed.message}
                </p>
              )}
            </div>
          </div>

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
