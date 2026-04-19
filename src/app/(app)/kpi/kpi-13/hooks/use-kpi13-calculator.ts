"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi13,
  type Kpi13Input,
  type KpiResult,
  kpi13InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi13Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi13Input>({
    resolver: zodResolver(kpi13InputSchema),
    defaultValues: {
      totalConnections: undefined,
      functionalMeters: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi13Input) => {
    const calculated = calculateKpi13(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
