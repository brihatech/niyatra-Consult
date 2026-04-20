"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi20,
  type Kpi20Input,
  type KpiResult,
  kpi20InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi20Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi20Input>({
    resolver: zodResolver(kpi20InputSchema),
    defaultValues: {
      genderPolicyComplianceLevel: undefined,
      socialInclusionPolicyComplianceLevel: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi20Input) => {
    setResult(calculateKpi20(data));
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
