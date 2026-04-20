"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi18,
  type Kpi18Input,
  type KpiResult,
  kpi18InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi18Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi18Input>({
    resolver: zodResolver(kpi18InputSchema),
    defaultValues: {
      hasDueAmount: undefined,
      tdfInstallmentLevel: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi18Input) => {
    setResult(calculateKpi18(data));
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
