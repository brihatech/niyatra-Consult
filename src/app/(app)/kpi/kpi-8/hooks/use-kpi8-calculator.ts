"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi8,
  type Kpi8Input,
  type KpiResult,
  kpi8InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi8Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi8Input>({
    resolver: zodResolver(kpi8InputSchema),
    defaultValues: {
      nrwStrategyLevel: undefined,
      totalVolumeSupplied: undefined,
      totalVolumeBilled: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi8Input) => {
    const calculated = calculateKpi8(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
