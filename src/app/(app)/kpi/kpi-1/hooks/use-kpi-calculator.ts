import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { api } from "@/trpc/react";

import {
  type Kpi1Input,
  type KpiResult,
  kpi1InputSchema,
} from "../../schemas/kpi-schemas";

function isKpiResult(value: unknown): value is KpiResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<KpiResult>;
  return (
    typeof candidate.kpiNo === "number" &&
    typeof candidate.kpiName === "string" &&
    typeof candidate.subsetName === "string" &&
    Array.isArray(candidate.subIndicators) &&
    typeof candidate.averageKpiScore === "number"
  );
}

export function useKpiCalculator() {
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

  // Fetch existing entry from backend
  const {
    data: entry,
    refetch,
    isLoading,
  } = api.kpi.getKpiEntry.useQuery(
    { kpiNumber: 1 },
    { refetchOnWindowFocus: false },
  );

  // Save entry to backend
  const saveMutation = api.kpi.saveKpiEntry.useMutation({
    onSuccess: () => refetch(),
  });

  // Pre-fill form if entry exists
  useEffect(() => {
    if (entry?.inputData) {
      form.reset(entry.inputData as Kpi1Input);
    }
  }, [entry?.inputData, form.reset]);

  const onSubmit = (data: Kpi1Input) => {
    saveMutation.mutate({ kpiNumber: 1, inputData: data });
  };

  const onReset = () => {
    form.reset();
    refetch();
  };

  // Result and details come from backend-calculatedResult (type-safe)
  const calc = entry?.calculatedResult;
  const result = isKpiResult(calc) ? calc : null;

  return { form, result, onSubmit, onReset, isLoading };
}
