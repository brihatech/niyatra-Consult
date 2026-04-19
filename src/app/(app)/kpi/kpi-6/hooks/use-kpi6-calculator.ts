"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi6,
  type Kpi6Input,
  type KpiResult,
  kpi6InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi6Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi6Input>({
    resolver: zodResolver(kpi6InputSchema),
    defaultValues: {
      hrLevel: undefined,
      totalMaintenanceRequired: undefined,
      maintenanceCompleted: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi6Input) => {
    const calculated = calculateKpi6(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
