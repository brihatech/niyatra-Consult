"use client";

import type { UseFormReturn } from "react-hook-form";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  KPI20_GENDER_POLICY_OPTIONS,
  KPI20_SOCIAL_INCLUSION_OPTIONS,
  type Kpi20Input,
} from "../../schemas/kpi-schemas";

interface Kpi20InputFormProps {
  form: UseFormReturn<Kpi20Input>;
  onSubmit: (data: Kpi20Input) => void;
  onReset: () => void;
}

export function Kpi20InputForm({
  form,
  onSubmit,
  onReset,
}: Kpi20InputFormProps) {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pt-6 pb-2 lg:px-9 lg:pt-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-900 text-white shadow-md">
            <span className="font-bold text-sm">20</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">
              Gender Equality and Social Inclusion (GESI)
            </h2>
            <p className="text-muted-foreground text-sm">
              Organizational Management
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-9 rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 lg:px-10">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide">
              Subset 20.1 — Gender Policy Compliance
            </p>
          </div>

          <RadioGroup
            className="ml-9 flex flex-col gap-3"
            onValueChange={(val) =>
              setValue(
                "genderPolicyComplianceLevel",
                val as "A" | "B" | "C" | "D",
              )
            }
            value={watch("genderPolicyComplianceLevel")}
          >
            {KPI20_GENDER_POLICY_OPTIONS.map((option) => (
              <div
                className="flex items-start gap-3 rounded-xl border px-5 py-4"
                key={option.value}
              >
                <RadioGroupItem
                  className="mt-0.5"
                  id={`gender-${option.value}`}
                  value={option.value}
                />
                <Label
                  className="leading-snug"
                  htmlFor={`gender-${option.value}`}
                >
                  {option.label}
                </Label>
                <span className="ml-auto rounded-md bg-muted px-2 py-1 font-mono text-xs">
                  {option.weight}
                </span>
              </div>
            ))}
          </RadioGroup>
          {errors.genderPolicyComplianceLevel && (
            <p className="ml-9 text-destructive text-xs">
              {errors.genderPolicyComplianceLevel.message}
            </p>
          )}

          <div className="mx-9 rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide">
              Subset 20.2 — Social Inclusion Policy Compliance
            </p>
          </div>

          <RadioGroup
            className="ml-9 flex flex-col gap-3"
            onValueChange={(val) =>
              setValue("socialInclusionPolicyComplianceLevel", val as "A" | "B")
            }
            value={watch("socialInclusionPolicyComplianceLevel")}
          >
            {KPI20_SOCIAL_INCLUSION_OPTIONS.map((option) => (
              <div
                className="flex items-start gap-3 rounded-xl border px-5 py-4"
                key={option.value}
              >
                <RadioGroupItem
                  className="mt-0.5"
                  id={`social-${option.value}`}
                  value={option.value}
                />
                <Label
                  className="leading-snug"
                  htmlFor={`social-${option.value}`}
                >
                  {option.label}
                </Label>
                <span className="ml-auto rounded-md bg-muted px-2 py-1 font-mono text-xs">
                  {option.weight}
                </span>
              </div>
            ))}
          </RadioGroup>
          {errors.socialInclusionPolicyComplianceLevel && (
            <p className="ml-9 text-destructive text-xs">
              {errors.socialInclusionPolicyComplianceLevel.message}
            </p>
          )}
          <div className="flex items-center gap-3 border-t px-9 pt-5">
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
