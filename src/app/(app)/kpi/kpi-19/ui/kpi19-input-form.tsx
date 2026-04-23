"use client";

import type { UseFormReturn } from "react-hook-form";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Kpi19Input } from "../../schemas/kpi-schemas";

interface Kpi19InputFormProps {
  form: UseFormReturn<Kpi19Input>;
  onSubmit: (data: Kpi19Input) => void;
  onReset: () => void;
}

export function Kpi19InputForm({
  form,
  onSubmit,
  onReset,
}: Kpi19InputFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pt-6 pb-2 lg:px-8 lg:pt-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-gray-900 text-white shadow-md">
            <span className="font-bold text-sm">19</span>
          </div>
          <div>
            <h2 className="font-semibold text-lg tracking-tight">
              Human Resource Development (HRD)
            </h2>
            <p className="text-muted-foreground text-sm">
              Organizational Management
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 lg:p-8">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide">
              Subset 19.1 — Total Staff Details
            </p>
          </div>

          <div className="ml-9 flex items-center gap-3">
            <Input
              className={errors.totalStaffDetails ? "border-destructive" : ""}
              placeholder="Enter total staff count"
              type="number"
              {...register("totalStaffDetails", { valueAsNumber: true })}
            />
            <span className="w-14 rounded-md bg-muted px-2 py-1.5 text-center text-xs">
              No
            </span>
          </div>

          <div className="rounded-md border border-orange-200 bg-orange-50/50 px-4 py-3">
            <p className="font-medium text-orange-700 text-xs uppercase tracking-wide">
              Subset 19.2 — Percentage of Training Courses Completed
            </p>
          </div>

          <div className="ml-9 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <Label className="w-28 text-xs" htmlFor="training-managerial">
                Managerial
              </Label>
              <Input
                className={
                  errors.trainingCoursesCompletedManagerial
                    ? "border-destructive"
                    : ""
                }
                id="training-managerial"
                placeholder="0"
                type="number"
                {...register("trainingCoursesCompletedManagerial", {
                  valueAsNumber: true,
                })}
              />
              <span className="w-14 rounded-md bg-muted px-2 py-1.5 text-center text-xs">
                No
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Label className="w-28 text-xs" htmlFor="training-accountant">
                Accountant
              </Label>
              <Input
                className={
                  errors.trainingCoursesCompletedAccountant
                    ? "border-destructive"
                    : ""
                }
                id="training-accountant"
                placeholder="0"
                type="number"
                {...register("trainingCoursesCompletedAccountant", {
                  valueAsNumber: true,
                })}
              />
              <span className="w-14 rounded-md bg-muted px-2 py-1.5 text-center text-xs">
                No
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Label className="w-28 text-xs" htmlFor="training-engineer">
                Engineer
              </Label>
              <Input
                className={
                  errors.trainingCoursesCompletedEngineer
                    ? "border-destructive"
                    : ""
                }
                id="training-engineer"
                placeholder="0"
                type="number"
                {...register("trainingCoursesCompletedEngineer", {
                  valueAsNumber: true,
                })}
              />
              <span className="w-14 rounded-md bg-muted px-2 py-1.5 text-center text-xs">
                No
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Label className="w-28 text-xs" htmlFor="training-other">
                Other
              </Label>
              <Input
                className={
                  errors.trainingCoursesCompletedOther
                    ? "border-destructive"
                    : ""
                }
                id="training-other"
                placeholder="0"
                type="number"
                {...register("trainingCoursesCompletedOther", {
                  valueAsNumber: true,
                })}
              />
              <span className="w-14 rounded-md bg-muted px-2 py-1.5 text-center text-xs">
                No
              </span>
            </div>
          </div>

          <div className="-mx-6 flex items-center gap-3 border-t px-6 pt-5 lg:-mx-8 lg:px-8">
            <Button type="submit">Calculate KPI</Button>
            <Button onClick={onReset} type="button" variant="outline">
              <RotateCcw className="mr-2 size-4" />
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
