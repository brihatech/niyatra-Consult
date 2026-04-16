"use client";

import type { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  KPI2_QUESTIONS,
  type Kpi2Input,
  type KpiResult,
} from "../../schemas/kpi-schemas";
import { Kpi2ResultsDisplay } from "./kpi2-results-display";

interface Kpi2InputFormProps {
  form: UseFormReturn<Kpi2Input>;
  onSubmit: (data: Kpi2Input) => void;
  onReset: () => void;
  result?: KpiResult | null;
}

export function Kpi2InputForm({
  form,
  onSubmit,
  onReset,
  result,
}: Kpi2InputFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const serviceAreaType = watch("serviceAreaType");
  type NumericKpi2Field = Exclude<keyof Kpi2Input, "serviceAreaType">;

  const stepNumberField = (field: NumericKpi2Field, delta: number) => {
    const currentValue = form.getValues(field);
    const currentNumber =
      typeof currentValue === "number" && Number.isFinite(currentValue)
        ? currentValue
        : 0;
    const nextValue = Math.max(0, currentNumber + delta);

    setValue(field, nextValue, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* ── Scrollable Input Area ────────────────────────── */}
      <div className="flex-1 p-6 lg:p-8">
        <form
          className="space-y-6"
          id="kpi2-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Subset 2.1 */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground text-lg">
              Subset 2.1 — Consumer Perceptions
            </h3>
            <div className="space-y-4">
              {KPI2_QUESTIONS.slice(0, 3).map((q) => {
                const fieldError = errors[q.id];
                return (
                  <div
                    className="flex flex-col items-start justify-between gap-4 rounded-xl border bg-white px-5 py-4 shadow-sm xl:flex-row xl:items-center dark:bg-card"
                    key={q.id}
                  >
                    {/* Left: Label */}
                    <div className="flex-1 pr-4">
                      <label
                        className="block cursor-pointer font-medium text-[15px] text-gray-900 leading-snug dark:text-gray-100"
                        htmlFor={q.id}
                      >
                        {q.question}
                      </label>
                      <p className="mt-1 text-gray-500 text-sm dark:text-gray-400">
                        Source: {q.dataSource}
                      </p>
                      {fieldError && (
                        <p className="mt-1 font-medium text-red-500 text-sm">
                          {fieldError.message}
                        </p>
                      )}
                    </div>

                    {/* Right: Input and Unit */}
                    <div className="flex shrink-0 items-center">
                      <div className="relative flex items-center">
                        <Button
                          className="h-10 rounded-r-none border border-r-0 bg-gray-50/50 px-3 text-gray-500"
                          onClick={() =>
                            stepNumberField(q.id as NumericKpi2Field, -1)
                          }
                          tabIndex={-1}
                          type="button"
                          variant="ghost"
                        >
                          −
                        </Button>
                        <Input
                          className={`h-10 w-28 rounded-none border-x-0 text-center shadow-none focus-visible:border-[#e67e22] focus-visible:ring-0 ${
                            fieldError ? "border-red-500" : "border-gray-200"
                          }`}
                          id={q.id}
                          placeholder="0"
                          step="any"
                          type="number"
                          {...register(q.id, { valueAsNumber: true })}
                        />
                        <Button
                          className="h-10 rounded-l-none border border-l-0 bg-gray-50/50 px-3 text-gray-500"
                          onClick={() =>
                            stepNumberField(q.id as NumericKpi2Field, 1)
                          }
                          tabIndex={-1}
                          type="button"
                          variant="ghost"
                        >
                          +
                        </Button>
                      </div>
                      <span className="ml-3 w-12 text-left font-medium text-gray-500 text-sm">
                        {q.unit}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subset 2.2 */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground text-lg">
              Subset 2.2 — Per Capita Consumption
            </h3>
            <div className="space-y-4">
              {KPI2_QUESTIONS.slice(3).map((q) => {
                const fieldError = errors[q.id];
                return (
                  <div
                    className="flex flex-col items-start justify-between gap-4 rounded-xl border bg-white px-5 py-4 shadow-sm xl:flex-row xl:items-center dark:bg-card"
                    key={q.id}
                  >
                    <div className="flex-1 pr-4">
                      <label
                        className="block cursor-pointer font-medium text-[15px] text-gray-900 leading-snug dark:text-gray-100"
                        htmlFor={q.id}
                      >
                        {q.question}
                      </label>
                      <p className="mt-1 text-gray-500 text-sm dark:text-gray-400">
                        Source: {q.dataSource}
                      </p>
                      {fieldError && (
                        <p className="mt-1 font-medium text-red-500 text-sm">
                          {fieldError.message}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center">
                      <div className="relative flex items-center">
                        <Button
                          className="h-10 rounded-r-none border border-r-0 bg-gray-50/50 px-3 text-gray-500"
                          onClick={() =>
                            stepNumberField(q.id as NumericKpi2Field, -1)
                          }
                          tabIndex={-1}
                          type="button"
                          variant="ghost"
                        >
                          −
                        </Button>
                        <Input
                          className={`h-10 w-28 rounded-none border-x-0 text-center shadow-none focus-visible:border-[#e67e22] focus-visible:ring-0 ${
                            fieldError ? "border-red-500" : "border-gray-200"
                          }`}
                          id={q.id}
                          placeholder="0"
                          step="any"
                          type="number"
                          {...register(q.id, { valueAsNumber: true })}
                        />
                        <Button
                          className="h-10 rounded-l-none border border-l-0 bg-gray-50/50 px-3 text-gray-500"
                          onClick={() =>
                            stepNumberField(q.id as NumericKpi2Field, 1)
                          }
                          tabIndex={-1}
                          type="button"
                          variant="ghost"
                        >
                          +
                        </Button>
                      </div>
                      <span className="ml-3 w-12 text-left font-medium text-gray-500 text-sm">
                        {q.unit}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Service Area Type */}
              <div className="flex flex-col items-start justify-between gap-4 rounded-xl border bg-white px-5 py-4 shadow-sm md:flex-row md:items-center dark:bg-card">
                <div className="flex-1 pr-4">
                  <span className="block font-medium text-[15px] text-gray-900 leading-snug dark:text-gray-100">
                    Service Area Type
                  </span>
                  {errors.serviceAreaType && (
                    <p className="mt-1 font-medium text-red-500 text-sm">
                      {errors.serviceAreaType.message}
                    </p>
                  )}
                </div>
                <div className="flex h-10 shrink-0 items-center pr-[60px]">
                  <RadioGroup
                    className="flex gap-6"
                    onValueChange={(val) =>
                      setValue("serviceAreaType", val as "urban" | "rural")
                    }
                    value={serviceAreaType}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="urban" value="urban" />
                      <Label
                        className="cursor-pointer text-[15px]"
                        htmlFor="urban"
                      >
                        Urban
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="rural" value="rural" />
                      <Label
                        className="cursor-pointer text-[15px]"
                        htmlFor="rural"
                      >
                        Rural
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        </form>

        {result && (
          <div className="mt-8">
            <h3 className="mb-4 font-semibold text-gray-900 text-lg dark:text-gray-100">
              Detailed Results Breakdown
            </h3>
            <Kpi2ResultsDisplay result={result} />
          </div>
        )}
      </div>

      {/* ── Fixed Bottom Footer ────────────────────────────── */}
      <div className="relative z-10 flex w-full flex-col items-center justify-between gap-6 border-t bg-white px-6 py-5 sm:flex-row lg:px-8 dark:bg-card">
        {/* Result Display */}
        <div className="flex w-full items-end gap-6 sm:w-auto">
          <div className="flex w-40 flex-col gap-1.5">
            <span className="font-medium text-[13px] text-gray-600 dark:text-gray-400">
              Average Score*
            </span>
            <div className="flex h-10 w-full items-center rounded-md border border-gray-200 bg-gray-50 px-3 py-2 font-semibold text-gray-900">
              {result ? result.averageKpiScore.toFixed(2) : "—"}
            </div>
          </div>

          <div className="flex w-40 flex-col gap-1.5">
            <span className="font-medium text-[13px] text-gray-600 dark:text-gray-400">
              Percent (%)*
            </span>
            <div className="flex h-10 w-full items-center rounded-md border border-gray-200 bg-gray-50 px-3 py-2 font-semibold text-gray-900">
              {result
                ? `${Math.round((result.averageKpiScore / 100) * 100)}%`
                : "—"}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="ml-auto flex shrink-0 items-center gap-3 pt-2 sm:pt-0">
          <Button
            className="h-10 border-transparent bg-gray-100 px-4 font-medium text-gray-600 hover:bg-gray-200"
            onClick={onReset}
            type="button"
            variant="outline"
          >
            Reset
          </Button>
          <Button
            className="h-10 px-8 font-semibold text-[15px] text-white shadow-sm transition-opacity hover:opacity-90"
            form="kpi2-form"
            style={{ backgroundColor: "#e67e22" }}
            type="submit"
          >
            Calculate
          </Button>
        </div>
      </div>
    </div>
  );
}
