"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi16,
  type Kpi16Input,
  type KpiResult,
  kpi16InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi16Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi16Input>({
    resolver: zodResolver(kpi16InputSchema),
    defaultValues: {
      complaintsManagementLevel: undefined,
      totalComplaintsRecorded: undefined,
      complaintsResolved: undefined,
      percentageAddressedOnTime: undefined,
      percentageAddressedLate: undefined,
      percentageNotAddressed: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi16Input) => {
    const calculated = calculateKpi16(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
