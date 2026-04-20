"use client";

import type { UseFormReturn } from "react-hook-form";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  KPI12_ACCOUNTABILITY_OPTIONS,
  type Kpi12Input,
} from "../../schemas/kpi-schemas";

interface Kpi12InputFormProps {
  form: UseFormReturn<Kpi12Input>;
  onSubmit: (data: Kpi12Input) => void;
  onReset: () => void;
}

export function Kpi12InputForm({
  form,
  onSubmit,
  onReset,
}: Kpi12InputFormProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const selectedLevel = watch("accountabilityLevel");

  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pt-6 pb-2 lg:px-8 lg:pt-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-900 text-white shadow-md">
            <span className="font-bold text-sm">12</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">
              Financial Accountability
            </h2>
            <p className="text-muted-foreground text-sm">
              Financial Management
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 lg:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 12.1 — Financial Accountability
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                1
              </span>
              <Label className="font-medium text-sm leading-snug">
                Select the level that best describes the utility&apos;s
                financial accounting system:
              </Label>
            </div>

            <div className="ml-9">
              <RadioGroup
                className="flex flex-col gap-3"
                onValueChange={(val) =>
                  setValue(
                    "accountabilityLevel",
                    val as "A" | "B" | "C" | "D" | "E",
                  )
                }
                value={selectedLevel}
              >
                {KPI12_ACCOUNTABILITY_OPTIONS.map((option) => (
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
                      id={`accountability-${option.value}`}
                      value={option.value}
                    />
                    <Label
                      className="cursor-pointer text-[15px] leading-snug"
                      htmlFor={`accountability-${option.value}`}
                    >
                      {option.label}
                    </Label>
                    <span className="ml-auto shrink-0 rounded-md bg-muted px-2 py-1 font-mono text-muted-foreground text-xs">
                      {option.weight}
                    </span>
                  </div>
                ))}
              </RadioGroup>
              {errors.accountabilityLevel && (
                <p className="mt-2 text-destructive text-xs">
                  {errors.accountabilityLevel.message}
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
