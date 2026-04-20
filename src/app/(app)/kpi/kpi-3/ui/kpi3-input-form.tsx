"use client";

import type { UseFormReturn } from "react-hook-form";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  KPI3_SUBSET31_QUESTIONS,
  KPI3_SUBSET32_QUESTIONS,
  KPI3_SUBSET33_QUESTIONS,
  KPI3_SUBSET34_QUESTIONS,
  type Kpi3Input,
} from "../../schemas/kpi-schemas";

interface Kpi3InputFormProps {
  form: UseFormReturn<Kpi3Input>;
  onSubmit: (data: Kpi3Input) => void;
  onReset: () => void;
}

function SubsetHeader({ label }: { label: string }) {
  return (
    <div className="mt-4 rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3 dark:border-orange-900 dark:bg-orange-950/20">
      <p className="font-medium text-orange-700 text-xs uppercase tracking-wide dark:text-orange-400">
        {label}
      </p>
    </div>
  );
}

export function Kpi3InputForm({ form, onSubmit, onReset }: Kpi3InputFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const hasDesignatedLab = watch("hasDesignatedLab");
  const testResults = watch("testResultsInAccordance");
  let questionIdx = 0;

  return (
    <div className="flex h-full flex-col">
      {/* ── Header ────────────────────────────────────────── */}
      <div className="px-6 pt-6 pb-2 lg:px-8 lg:pt-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-900 text-white shadow-md">
            <span className="font-bold text-sm">3</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">
              Quality (Safety)
            </h2>
            <p className="text-muted-foreground text-sm">
              Water Quality &amp; Safety Assessment
            </p>
          </div>
        </div>
      </div>

      {/* ── Scrollable Input Area ────────────────────────── */}
      <div className="flex-1 p-6 lg:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          {/* ── Subset 3.1 ─────────────────────────────────── */}
          <SubsetHeader label="Subset 3.1 — Consumer Perceptions (survey on cleanliness & acceptability)" />

          {KPI3_SUBSET31_QUESTIONS.map((q) => {
            questionIdx++;
            const fieldError = errors[q.id];
            return (
              <div className="flex flex-col gap-2" key={q.id}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                    {questionIdx}
                  </span>
                  <Label
                    className="font-medium text-sm leading-snug"
                    htmlFor={q.id}
                  >
                    {q.question}
                  </Label>
                </div>
                <div className="ml-9 flex items-center gap-3">
                  <Input
                    className={fieldError ? "border-destructive" : ""}
                    id={q.id}
                    placeholder="Enter percentage"
                    step="any"
                    type="number"
                    {...register(q.id, { valueAsNumber: true })}
                  />
                  <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                    {q.unit}
                  </span>
                </div>
                {fieldError && (
                  <p className="ml-9 text-destructive text-xs">
                    {fieldError.message}
                  </p>
                )}
              </div>
            );
          })}

          {/* ── Subset 3.2 ─────────────────────────────────── */}
          <SubsetHeader label="Subset 3.2 — Functional Lab" />

          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                {++questionIdx}
              </span>
              <Label className="font-medium text-sm">
                Is there a Designated Functional Lab within the service area?
              </Label>
            </div>
            <div className="ml-9">
              <RadioGroup
                className="flex gap-6"
                onValueChange={(val) =>
                  setValue("hasDesignatedLab", val as "yes" | "no")
                }
                value={hasDesignatedLab}
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="lab-yes" value="yes" />
                  <Label className="cursor-pointer text-sm" htmlFor="lab-yes">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="lab-no" value="no" />
                  <Label className="cursor-pointer text-sm" htmlFor="lab-no">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {KPI3_SUBSET32_QUESTIONS.map((q) => {
            questionIdx++;
            const fieldError = errors[q.id];
            return (
              <div className="flex flex-col gap-2" key={q.id}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                    {questionIdx}
                  </span>
                  <Label
                    className="font-medium text-sm leading-snug"
                    htmlFor={q.id}
                  >
                    {q.question}
                  </Label>
                </div>
                <div className="ml-9 flex items-center gap-3">
                  <Input
                    className={fieldError ? "border-destructive" : ""}
                    id={q.id}
                    placeholder="Enter value"
                    step="any"
                    type="number"
                    {...register(q.id, { valueAsNumber: true })}
                  />
                  <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                    {q.unit}
                  </span>
                </div>
                {fieldError && (
                  <p className="ml-9 text-destructive text-xs">
                    {fieldError.message}
                  </p>
                )}
              </div>
            );
          })}

          {/* ── Subset 3.3 ─────────────────────────────────── */}
          <SubsetHeader label="Subset 3.3 — Designated Staff" />

          {KPI3_SUBSET33_QUESTIONS.map((q) => {
            questionIdx++;
            const fieldError = errors[q.id];
            return (
              <div className="flex flex-col gap-2" key={q.id}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                    {questionIdx}
                  </span>
                  <Label
                    className="font-medium text-sm leading-snug"
                    htmlFor={q.id}
                  >
                    {q.question}
                  </Label>
                </div>
                <div className="ml-9 flex items-center gap-3">
                  <Input
                    className={fieldError ? "border-destructive" : ""}
                    id={q.id}
                    placeholder="Enter count"
                    step="1"
                    type="number"
                    {...register(q.id, { valueAsNumber: true })}
                  />
                  <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                    {q.unit}
                  </span>
                </div>
                {fieldError && (
                  <p className="ml-9 text-destructive text-xs">
                    {fieldError.message}
                  </p>
                )}
              </div>
            );
          })}

          {/* ── Subset 3.4 ─────────────────────────────────── */}
          <SubsetHeader label="Subset 3.4 — Parameters" />

          {KPI3_SUBSET34_QUESTIONS.map((q) => {
            questionIdx++;
            const fieldError = errors[q.id];
            return (
              <div className="flex flex-col gap-2" key={q.id}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                    {questionIdx}
                  </span>
                  <Label
                    className="font-medium text-sm leading-snug"
                    htmlFor={q.id}
                  >
                    {q.question}
                  </Label>
                </div>
                <div className="ml-9 flex items-center gap-3">
                  <Input
                    className={fieldError ? "border-destructive" : ""}
                    id={q.id}
                    placeholder="Enter count"
                    step="1"
                    type="number"
                    {...register(q.id, { valueAsNumber: true })}
                  />
                  <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                    {q.unit}
                  </span>
                </div>
                {fieldError && (
                  <p className="ml-9 text-destructive text-xs">
                    {fieldError.message}
                  </p>
                )}
              </div>
            );
          })}

          {/* ── Subset 3.5 ─────────────────────────────────── */}
          <SubsetHeader label="Subset 3.5 — Test Results" />

          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                {++questionIdx}
              </span>
              <Label className="font-medium text-sm leading-snug">
                Are the test results of the water samples tested in the
                accredited laboratories for the evaluation year in accordance
                with the quality standards for all quality parameters (for last
                2 seasons at least)?
              </Label>
            </div>
            <div className="ml-9">
              <RadioGroup
                className="flex gap-6"
                onValueChange={(val) =>
                  setValue("testResultsInAccordance", val as "Y" | "N")
                }
                value={testResults}
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="test-y" value="Y" />
                  <Label className="cursor-pointer text-sm" htmlFor="test-y">
                    Yes (Y)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem id="test-n" value="N" />
                  <Label className="cursor-pointer text-sm" htmlFor="test-n">
                    No (N)
                  </Label>
                </div>
              </RadioGroup>
              {errors.testResultsInAccordance && (
                <p className="mt-1 text-destructive text-xs">
                  {errors.testResultsInAccordance.message}
                </p>
              )}
            </div>
          </div>

          {/* ── Actions ────────────────────────────────────── */}
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
