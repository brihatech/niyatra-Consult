"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi9,
  type Kpi9Input,
  type KpiResult,
  kpi9InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi9Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi9Input>({
    resolver: zodResolver(kpi9InputSchema),
    defaultValues: {
      monthlyTariff20m3: undefined,
      tdfRecommendedTariff: undefined,
      connectionCharge: undefined,
      subsidyAmount: undefined,
      avgMonthlyIncomeLowIncome: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi9Input) => {
    const calculated = calculateKpi9(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
