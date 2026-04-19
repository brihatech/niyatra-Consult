"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  calculateKpi3,
  type Kpi3Input,
  type KpiResult,
  kpi3InputSchema,
} from "../../schemas/kpi-schemas";

export function useKpi3Calculator() {
  const [result, setResult] = useState<KpiResult | null>(null);

  const form = useForm<Kpi3Input>({
    resolver: zodResolver(kpi3InputSchema),
    defaultValues: {
      percentageCleanThroughout: undefined,
      percentageCleanButTurbid: undefined,
      percentageMurkyOnFairDays: undefined,
      hasDesignatedLab: "yes",
      samplesTestedPerYear: undefined,
      labManagementStaff: undefined,
      labTechnicians: undefined,
      chemists: undefined,
      parametersChecked: undefined,
      testResultsInAccordance: undefined,
    },
  });

  const onSubmit = useCallback((data: Kpi3Input) => {
    const calculated = calculateKpi3(data);
    setResult(calculated);
  }, []);

  const onReset = useCallback(() => {
    form.reset();
    setResult(null);
  }, [form]);

  return { form, result, onSubmit, onReset };
}
