import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { api } from "@/trpc/react";

import { type Kpi21Input, kpi21InputSchema } from "../schemas/kpi21-schemas";

export function useKpi21Calculator() {
  const form = useForm<Kpi21Input>({
    resolver: zodResolver(kpi21InputSchema),
    defaultValues: { regularityOfAGM: undefined },
  });

  // Fetch existing entry from backend
  const {
    data: entry,
    refetch,
    isLoading,
  } = api.kpi.getKpiEntry.useQuery(
    { kpiNumber: 21 },
    { refetchOnWindowFocus: false },
  );

  // Save entry to backend
  const saveMutation = api.kpi.saveKpiEntry.useMutation({
    onSuccess: () => refetch(),
  });

  // Pre-fill form if entry exists
  useEffect(() => {
    if (entry?.inputData) {
      form.reset(entry.inputData as Kpi21Input);
    }
  }, [entry?.inputData, form.reset]);

  const onSubmit = (data: Kpi21Input) => {
    saveMutation.mutate({ kpiNumber: 21, inputData: data });
  };

  const onReset = () => {
    form.reset();
    refetch();
  };

  // Result and details come from backend-calculatedResult (type-safe)
  let result: number | null = null;
  let details: unknown[] = [];
  const calc = entry?.calculatedResult;
  if (calc && typeof calc === "object" && "score" in calc) {
    // @ts-expect-error: dynamic JSON
    result = calc.score ?? null;
    // @ts-expect-error: dynamic JSON
    details = calc.details ?? [];
  }

  return { form, result, details, onSubmit, onReset, isLoading };
}
