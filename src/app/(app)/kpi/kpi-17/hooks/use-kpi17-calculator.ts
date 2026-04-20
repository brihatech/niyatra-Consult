"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi17,
  type Kpi17Input,
  type KpiResult,
  kpi17InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi17Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi17Input>({
    resolver: zodResolver(kpi17InputSchema),
    defaultValues: {
      satisfactionSurveyLevel: undefined,
      satisfiedConsumers: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi17Input) => {
    const calculated = calculateKpi17(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
