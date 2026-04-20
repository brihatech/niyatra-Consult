import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { api } from "@/trpc/react";

import { type Kpi22Input, kpi22InputSchema } from "../schemas/kpi22-schemas";

export function useKpi22Calculator() {
  const form = useForm<Kpi22Input>({
    resolver: zodResolver(kpi22InputSchema),
    defaultValues: {
      sanitationA: undefined,
      sanitationB: undefined,
      sanitationC: undefined,
      sanitationD: undefined,
      sanitationE: undefined,
      lgA: undefined,
      lgB: undefined,
      restructuringA: undefined,
      restructuringB: undefined,
      restructuringC: undefined,
    },
  });

  // Fetch existing entry from backend
  const {
    data: entry,
    refetch,
    isLoading,
  } = api.kpi.getKpiEntry.useQuery(
    { kpiNumber: 22 },
    { refetchOnWindowFocus: false },
  );

  // Save entry to backend
  const saveMutation = api.kpi.saveKpiEntry.useMutation({
    onSuccess: () => refetch(),
  });

  // Pre-fill form if entry exists
  useEffect(() => {
    if (entry?.inputData) {
      form.reset(entry.inputData as Kpi22Input);
    }
  }, [entry?.inputData, form.reset]);

  const onSubmit = (data: Kpi22Input) => {
    saveMutation.mutate({ kpiNumber: 22, inputData: data });
  };

  const onReset = () => {
    form.reset();
    // Optionally, could clear backend entry here
    refetch();
  };

  // Result and details come from backend-calculatedResult (type-safe)
  let result: number | null = null;
  let details: unknown[] = [];
  const calc = entry?.calculatedResult;
  if (
    calc &&
    typeof calc === "object" &&
    "score" in calc &&
    "details" in calc
  ) {
    // @ts-expect-error: dynamic JSON
    result = calc.score ?? null;
    // @ts-expect-error: dynamic JSON
    details = calc.details ?? [];
  }

  return { form, result, details, onSubmit, onReset, isLoading };
}
