"use client";

import type { UseFormReturn } from "react-hook-form";
import { Calculator, RotateCcw } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

function SubsetHeader({
  label,
  color,
}: {
  label: string;
  color: "violet" | "blue";
}) {
  const colorMap = {
    violet:
      "border-violet-200 bg-violet-50/50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/20 dark:text-violet-400",
    blue: "border-blue-200 bg-blue-50/50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/20 dark:text-blue-400",
  };
  return (
    <div className={`mt-4 rounded-md border px-4 py-3 ${colorMap[color]}`}>
      <p className="font-medium text-xs uppercase tracking-wide">{label}</p>
    </div>
  );
}

export function Kpi3InputForm({
  form,
  onSubmit,
  onReset,
}: Kpi3InputFormProps) {
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
    <Card className="border-0 bg-card/60 shadow-lg backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-violet-600 text-white shadow-md">
            <span className="font-bold text-sm">3</span>
          </div>
          <div>
            <CardTitle className="font-semibold text-lg tracking-tight">
              Quality (Safety)
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Water Quality &amp; Safety Assessment
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          {/* ── Subset 3.1 ─────────────────────────────────── */}
          <SubsetHeader
            label="Subset 3.1 — Consumer Perceptions (survey on cleanliness & acceptability)"
            color="violet"
          />

          {KPI3_SUBSET31_QUESTIONS.map((q) => {
            questionIdx++;
            const fieldError = errors[q.id];
            return (
              <div key={q.id} className="flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                    {questionIdx}
                  </span>
                  <Label htmlFor={q.id} className="font-medium text-sm leading-snug">
                    {q.question}
                  </Label>
                </div>
                <div className="ml-9 flex items-center gap-3">
                  <Input
                    id={q.id}
                    type="number"
                    step="any"
                    placeholder="Enter percentage"
                    className={fieldError ? "border-destructive" : ""}
                    {...register(q.id, { valueAsNumber: true })}
                  />
                  <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                    {q.unit}
                  </span>
                </div>
                {fieldError && (
                  <p className="ml-9 text-destructive text-xs">{fieldError.message}</p>
                )}
              </div>
            );
          })}

          {/* ── Subset 3.2 ─────────────────────────────────── */}
          <SubsetHeader label="Subset 3.2 — Functional Lab" color="violet" />

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
                value={hasDesignatedLab}
                onValueChange={(val) =>
                  setValue("hasDesignatedLab", val as "yes" | "no")
                }
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="yes" id="lab-yes" />
                  <Label htmlFor="lab-yes" className="cursor-pointer text-sm">Yes</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="no" id="lab-no" />
                  <Label htmlFor="lab-no" className="cursor-pointer text-sm">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {KPI3_SUBSET32_QUESTIONS.map((q) => {
            questionIdx++;
            const fieldError = errors[q.id];
            return (
              <div key={q.id} className="flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                    {questionIdx}
                  </span>
                  <Label htmlFor={q.id} className="font-medium text-sm leading-snug">
                    {q.question}
                  </Label>
                </div>
                <div className="ml-9 flex items-center gap-3">
                  <Input
                    id={q.id}
                    type="number"
                    step="any"
                    placeholder="Enter value"
                    className={fieldError ? "border-destructive" : ""}
                    {...register(q.id, { valueAsNumber: true })}
                  />
                  <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                    {q.unit}
                  </span>
                </div>
                {fieldError && (
                  <p className="ml-9 text-destructive text-xs">{fieldError.message}</p>
                )}
              </div>
            );
          })}

          {/* ── Subset 3.3 ─────────────────────────────────── */}
          <SubsetHeader label="Subset 3.3 — Designated Staff" color="violet" />

          {KPI3_SUBSET33_QUESTIONS.map((q) => {
            questionIdx++;
            const fieldError = errors[q.id];
            return (
              <div key={q.id} className="flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                    {questionIdx}
                  </span>
                  <Label htmlFor={q.id} className="font-medium text-sm leading-snug">
                    {q.question}
                  </Label>
                </div>
                <div className="ml-9 flex items-center gap-3">
                  <Input
                    id={q.id}
                    type="number"
                    step="1"
                    placeholder="Enter count"
                    className={fieldError ? "border-destructive" : ""}
                    {...register(q.id, { valueAsNumber: true })}
                  />
                  <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                    {q.unit}
                  </span>
                </div>
                {fieldError && (
                  <p className="ml-9 text-destructive text-xs">{fieldError.message}</p>
                )}
              </div>
            );
          })}

          {/* ── Subset 3.4 ─────────────────────────────────── */}
          <SubsetHeader label="Subset 3.4 — Parameters" color="violet" />

          {KPI3_SUBSET34_QUESTIONS.map((q) => {
            questionIdx++;
            const fieldError = errors[q.id];
            return (
              <div key={q.id} className="flex flex-col gap-2">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                    {questionIdx}
                  </span>
                  <Label htmlFor={q.id} className="font-medium text-sm leading-snug">
                    {q.question}
                  </Label>
                </div>
                <div className="ml-9 flex items-center gap-3">
                  <Input
                    id={q.id}
                    type="number"
                    step="1"
                    placeholder="Enter count"
                    className={fieldError ? "border-destructive" : ""}
                    {...register(q.id, { valueAsNumber: true })}
                  />
                  <span className="w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-medium text-muted-foreground text-xs">
                    {q.unit}
                  </span>
                </div>
                {fieldError && (
                  <p className="ml-9 text-destructive text-xs">{fieldError.message}</p>
                )}
              </div>
            );
          })}

          {/* ── Subset 3.5 ─────────────────────────────────── */}
          <SubsetHeader label="Subset 3.5 — Test Results" color="violet" />

          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground text-xs">
                {++questionIdx}
              </span>
              <Label className="font-medium text-sm leading-snug">
                Are the test results of the water samples tested in the accredited
                laboratories for the evaluation year in accordance with the quality
                standards for all quality parameters (for last 2 seasons at least)?
              </Label>
            </div>
            <div className="ml-9">
              <RadioGroup
                value={testResults}
                onValueChange={(val) =>
                  setValue("testResultsInAccordance", val as "Y" | "N")
                }
                className="flex gap-6"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="Y" id="test-y" />
                  <Label htmlFor="test-y" className="cursor-pointer text-sm">
                    Yes (Y)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="N" id="test-n" />
                  <Label htmlFor="test-n" className="cursor-pointer text-sm">
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
            <Button type="submit" className="gap-2">
              <Calculator className="size-4" />
              Calculate KPI
            </Button>
            <Button type="button" variant="outline" className="gap-2" onClick={onReset}>
              <RotateCcw className="size-4" />
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
