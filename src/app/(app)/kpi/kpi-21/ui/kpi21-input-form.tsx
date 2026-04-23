"use client";

import type { UseFormReturn } from "react-hook-form";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { type Kpi21Input, kpi21Options } from "../schemas/kpi21-schemas";

interface Kpi21InputFormProps {
  form: UseFormReturn<Kpi21Input>;
  onSubmit: (data: Kpi21Input) => void;
  onReset: () => void;
}

export function Kpi21InputForm({
  form,
  onSubmit,
  onReset,
}: Kpi21InputFormProps) {
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
            <span className="font-bold text-sm">21</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">
              Regularity of Annual General Meeting (AGM)
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
              Regularity of AGM
            </p>
          </div>

          <RadioGroup
            className="flex flex-col gap-3"
            onValueChange={(val) =>
              setValue("regularityOfAGM", val as "A" | "B" | "C" | "D" | "E")
            }
            value={watch("regularityOfAGM")}
          >
            {kpi21Options.map((option) => (
              <div
                className="flex items-center gap-4 rounded-md border bg-white px-4 py-3"
                key={option.value}
              >
                <RadioGroupItem
                  className="mt-0.5"
                  id={`agm-${option.value}`}
                  value={option.value}
                />

                <Label
                  className="flex-1 cursor-pointer leading-snug"
                  htmlFor={`agm-${option.value}`}
                >
                  {option.label}
                </Label>

                <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-mono text-xs">
                  {option.weight}
                </span>
              </div>
            ))}
          </RadioGroup>

          {errors.regularityOfAGM && (
            <p className="text-destructive text-xs">
              {errors.regularityOfAGM.message}
            </p>
          )}

          <div className="-mx-6 flex items-center gap-3 border-t px-6 pt-5 lg:-mx-8 lg:px-8">
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
