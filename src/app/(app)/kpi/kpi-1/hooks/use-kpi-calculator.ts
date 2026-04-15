"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi1,
  type Kpi1Input,
  type KpiResult,
  kpi1InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpiCalculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi1Input>({
    resolver: zodResolver(kpi1InputSchema),
    defaultValues: {
      totalHouseholdsInServiceArea: undefined,
      totalHouseholdsServed: undefined,
      productionCapacity: undefined,
      designDischarge: undefined,
      presentWaterConsumption: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi1Input) => {
    const calculated = calculateKpi1(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
