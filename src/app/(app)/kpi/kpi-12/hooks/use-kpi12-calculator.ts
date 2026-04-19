"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi12,
  type Kpi12Input,
  type KpiResult,
  kpi12InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi12Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi12Input>({
    resolver: zodResolver(kpi12InputSchema),
    defaultValues: {
      accountabilityLevel: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi12Input) => {
    const calculated = calculateKpi12(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
