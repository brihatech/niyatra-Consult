"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi2,
  type Kpi2Input,
  type KpiResult,
  kpi2InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi2Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi2Input>({
    resolver: zodResolver(kpi2InputSchema),
    defaultValues: {
      percentageSufficientAll: undefined,
      percentageSufficientBasic: undefined,
      percentageInsufficient: undefined,
      totalResidentialWaterUsers: undefined,
      totalWaterVolumeBilled: undefined,
      serviceAreaType: "urban",
    },
  });

  const onSubmit = useCallback((data: Kpi2Input) => {
    const calculated = calculateKpi2(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
