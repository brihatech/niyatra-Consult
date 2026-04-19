"use client";

import type { UseFormReturn } from "react-hook-form";
import { Calculator, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Kpi13Input } from "../../schemas/kpi-schemas";

interface Kpi13InputFormProps {
  form: UseFormReturn<Kpi13Input>;
  onSubmit: (data: Kpi13Input) => void;
  onReset: () => void;
}

export function Kpi13InputForm({
  form,
  onSubmit,
  onReset,
}: Kpi13InputFormProps) {
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
            <span className="font-bold text-sm">13</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">
              Metering Ratio
            </h2>
            <p className="text-muted-foreground text-sm">
              Commercial Operation
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 lg:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
              Subset 13.1 — Metering Ratio
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
                  htmlFor="totalConnections"
                >
                  Total connections provided in the distribution system up to
                  the end of the performance evaluation year
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.totalConnections ? "border-destructive" : ""
                  }
                  id="totalConnections"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("totalConnections", { valueAsNumber: true })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  no.
                </span>
              </div>
              {errors.totalConnections && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.totalConnections.message}
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
                  htmlFor="functionalMeters"
                >
                  Number of connections with functional water meters in that
                  year
                </Label>
              </div>
              <div className="ml-9 flex items-center gap-3">
                <Input
                  className={
                    errors.functionalMeters ? "border-destructive" : ""
                  }
                  id="functionalMeters"
                  placeholder="Enter value"
                  step="any"
                  type="number"
                  {...register("functionalMeters", { valueAsNumber: true })}
                />
                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                  no.
                </span>
              </div>
              {errors.functionalMeters && (
                <p className="ml-9 text-destructive text-xs">
                  {errors.functionalMeters.message}
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
