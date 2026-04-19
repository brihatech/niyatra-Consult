"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi11,
  type Kpi11Input,
  type KpiResult,
  kpi11InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi11Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi11Input>({
    resolver: zodResolver(kpi11InputSchema),
    defaultValues: {
      netCashIncome: undefined,
      totalSavings: undefined,
      capitalInvestmentSpent: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi11Input) => {
    const calculated = calculateKpi11(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
