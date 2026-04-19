"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi14,
  type Kpi14Input,
  type KpiResult,
  kpi14InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi14Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi14Input>({
    resolver: zodResolver(kpi14InputSchema),
    defaultValues: {
      totalKnownConnections: undefined,
      connectionsBilled: undefined,
      billingMethod: undefined,
      totalAmountBilled: undefined,
      totalCashCollected: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi14Input) => {
    const calculated = calculateKpi14(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
