"use client";

import type { UseFormReturn } from "react-hook-form";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  type Kpi22Input,
  kpi22LGQuestions,
  kpi22RestructuringQuestions,
  kpi22SanitationQuestions,
} from "../schemas/kpi22-schemas";

interface Kpi22InputFormProps {
  form: UseFormReturn<Kpi22Input>;
  onSubmit: (data: Kpi22Input) => void;
  onReset: () => void;
}

export function Kpi22InputForm({
  form,
  onSubmit,
  onReset,
}: Kpi22InputFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  function renderSection(
    title: string,
    questions: { id: string; label: string; weight: number }[],
  ) {
    return (
      <div className="mb-6">
        <div className="mb-2 rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3">
          <p className="font-medium text-orange-700 text-xs uppercase tracking-wide">
            {title}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {questions.map((q, _idx) => (
            <div
              className="flex items-center gap-4 rounded-md border bg-white px-4 py-3"
              key={q.id}
            >
              <Label
                className="min-w-0 max-w-3xl flex-1 break-words text-sm leading-snug"
                htmlFor={q.id}
              >
                {q.label}
              </Label>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1">
                  <input
                    id={`${q.id}-yes`}
                    type="radio"
                    value="yes"
                    {...register(q.id as keyof Kpi22Input)}
                    className="accent-green-600"
                  />
                  <span className="text-xs">Yes</span>
                </label>
                <label className="flex items-center gap-1">
                  <input
                    id={`${q.id}-no`}
                    type="radio"
                    value="no"
                    {...register(q.id as keyof Kpi22Input)}
                    className="accent-red-600"
                  />
                  <span className="text-xs">No</span>
                </label>
              </div>
              <span className="ml-2 w-14 shrink-0 rounded-md bg-muted px-2 py-1.5 text-center font-mono text-xs">
                {q.weight}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <form
        className="flex flex-col gap-6 p-6 lg:p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {renderSection("Environmental sanitation", kpi22SanitationQuestions)}
        {renderSection("Relation with LG's", kpi22LGQuestions)}
        {renderSection("Strategic restructuring", kpi22RestructuringQuestions)}
        <div className="flex items-center gap-3 border-t pt-5">
          <Button type="submit">Calculate KPI</Button>
          <Button onClick={onReset} type="button" variant="outline">
            <RotateCcw className="mr-2 size-4" />
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
