"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi7,
  type Kpi7Input,
  type KpiResult,
  kpi7InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi7Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi7Input>({
    resolver: zodResolver(kpi7InputSchema),
    defaultValues: {
      reserveFundLevel: undefined,
      totalUnplannedRepairs: undefined,
      totalRepairTimeHours: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi7Input) => {
    const calculated = calculateKpi7(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
