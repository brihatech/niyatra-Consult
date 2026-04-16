"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  kpi4InputSchema,
  calculateKpi4,
  type Kpi4Input,
  type KpiResult,
} from "../../schemas/kpi-schemas";

export function useKpi4Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi4Input>({
    resolver: zodResolver(kpi4InputSchema),
    defaultValues: {
      averageSupplyHoursPerDay: undefined,
      waterAccessibleFloor: undefined,
      disruptionDays: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi4Input) => {
    const calculated = calculateKpi4(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
