"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi10,
  type Kpi10Input,
  type KpiResult,
  kpi10InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi10Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi10Input>({
    resolver: zodResolver(kpi10InputSchema),
    defaultValues: {
      totalOperatingIncome: undefined,
      totalOmCosts: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi10Input) => {
    const calculated = calculateKpi10(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
