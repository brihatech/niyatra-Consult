"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi5,
  type Kpi5Input,
  type KpiResult,
  kpi5InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi5Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi5Input>({
    resolver: zodResolver(kpi5InputSchema),
    defaultValues: {
      assetManagementLevel: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi5Input) => {
    const calculated = calculateKpi5(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
