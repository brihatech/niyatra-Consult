"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi19,
  type Kpi19Input,
  type KpiResult,
  kpi19InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi19Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi19Input>({
    resolver: zodResolver(kpi19InputSchema),
    defaultValues: {
      totalStaffDetails: undefined,
      trainingCoursesCompletedManagerial: undefined,
      trainingCoursesCompletedAccountant: undefined,
      trainingCoursesCompletedEngineer: undefined,
      trainingCoursesCompletedOther: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi19Input) => {
    setResult(calculateKpi19(data));
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
