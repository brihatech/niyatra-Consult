"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi15,
  type Kpi15Input,
  type KpiResult,
  kpi15InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi15Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi15Input>({
    resolver: zodResolver(kpi15InputSchema),
    defaultValues: {
      databaseLevel: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi15Input) => {
    const calculated = calculateKpi15(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
