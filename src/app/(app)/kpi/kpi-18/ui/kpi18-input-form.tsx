"use client";

import type { UseFormReturn } from "react-hook-form";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  KPI18_DUE_AMOUNT_OPTIONS,
  KPI18_INSTALLMENT_OPTIONS,
  type Kpi18Input,
} from "../../schemas/kpi-schemas";

interface Kpi18InputFormProps {
  form: UseFormReturn<Kpi18Input>;
  onSubmit: (data: Kpi18Input) => void;
  onReset: () => void;
}

export function Kpi18InputForm({
  form,
  onSubmit,
  onReset,
}: Kpi18InputFormProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pt-6 pb-2 lg:px-8 lg:pt-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-900 text-white shadow-md">
            <span className="font-bold text-sm">18</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">
              Amortization
            </h2>
            <p className="text-muted-foreground text-sm">
              Organizational Management
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 lg:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide">
              Subset 18.1 — Due Amount
            </p>
          </div>

          <RadioGroup
            className="ml-9 flex flex-col gap-3"
            onValueChange={(val) => setValue("hasDueAmount", val as "Y" | "N")}
            value={watch("hasDueAmount")}
          >
            {KPI18_DUE_AMOUNT_OPTIONS.map((option) => (
              <div
                className="flex items-center gap-3 rounded-xl border px-5 py-4"
                key={option.value}
              >
                <RadioGroupItem
                  id={`due-${option.value}`}
                  value={option.value}
                />
                <Label htmlFor={`due-${option.value}`}>{option.label}</Label>
                <span className="ml-auto rounded-md bg-muted px-2 py-1 font-mono text-xs">
                  {option.weight}
                </span>
              </div>
            ))}
          </RadioGroup>
          {errors.hasDueAmount && (
            <p className="ml-9 text-destructive text-xs">
              {errors.hasDueAmount.message}
            </p>
          )}

          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide">
              Subset 18.2 — TDF Loan Installment
            </p>
          </div>

          <RadioGroup
            className="ml-9 flex flex-col gap-3"
            onValueChange={(val) =>
              setValue(
                "tdfInstallmentLevel",
                val as "A" | "B" | "C" | "D" | "E",
              )
            }
            value={watch("tdfInstallmentLevel")}
          >
            {KPI18_INSTALLMENT_OPTIONS.map((option) => (
              <div
                className="flex items-start gap-3 rounded-xl border px-5 py-4"
                key={option.value}
              >
                <RadioGroupItem
                  className="mt-0.5"
                  id={`tdf-${option.value}`}
                  value={option.value}
                />
                <Label className="leading-snug" htmlFor={`tdf-${option.value}`}>
                  {option.label}
                </Label>
                <span className="ml-auto rounded-md bg-muted px-2 py-1 font-mono text-xs">
                  {option.weight}
                </span>
              </div>
            ))}
          </RadioGroup>
          {errors.tdfInstallmentLevel && (
            <p className="ml-9 text-destructive text-xs">
              {errors.tdfInstallmentLevel.message}
            </p>
          )}

          <div className="flex items-center gap-3 border-t pt-5">
            <Button type="submit">Calculate KPI</Button>
            <Button onClick={onReset} type="button" variant="outline">
              <RotateCcw className="mr-2 size-4" />
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
