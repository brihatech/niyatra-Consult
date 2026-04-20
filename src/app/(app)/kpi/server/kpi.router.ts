import "server-only";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export const saveKpiEntrySchema = z.object({
  kpiNumber: z.number().int().min(1).max(22),
  inputData: z.record(z.string(), z.any()),
});

export const getKpiEntrySchema = z.object({
  kpiNumber: z.number().int().min(1).max(22),
});

export const kpiRouter = createTRPCRouter({
  saveKpiEntry: protectedProcedure
    .input(saveKpiEntrySchema)
    .mutation(async ({ ctx, input }) => {
      // Find or create KpiSubmission for this user (draft)
      let submission = await db.kpiSubmission.findFirst({
        where: { userId: ctx.session.user.id, status: "draft" },
      });
      if (!submission) {
        submission = await db.kpiSubmission.create({
          data: { userId: ctx.session.user.id },
        });
      }
      // Calculate result (replace with real calculation logic)
      const calculatedResult: {
        score: number;
        details: Record<string, unknown>;
      } = { score: 0, details: {} }; // TODO: implement per-KPI logic
      // Upsert KpiEntry
      const entry = await db.kpiEntry.upsert({
        where: {
          kpiSubmissionId_kpiNumber: {
            kpiSubmissionId: submission.id,
            kpiNumber: input.kpiNumber,
          },
        },
        update: {
          inputData: input.inputData as object,
          calculatedResult: calculatedResult as object,
          completedAt: new Date(),
        },
        create: {
          kpiSubmissionId: submission.id,
          kpiNumber: input.kpiNumber,
          inputData: input.inputData as object,
          calculatedResult: calculatedResult as object,
          completedAt: new Date(),
        },
      });
      return entry.calculatedResult;
    }),

  getKpiEntry: protectedProcedure
    .input(getKpiEntrySchema)
    .query(async ({ ctx, input }) => {
      const submission = await db.kpiSubmission.findFirst({
        where: { userId: ctx.session.user.id, status: "draft" },
      });
      if (!submission) return null;
      const entry = await db.kpiEntry.findUnique({
        where: {
          kpiSubmissionId_kpiNumber: {
            kpiSubmissionId: submission.id,
            kpiNumber: input.kpiNumber,
          },
        },
      });
      return entry;
    }),

  getKpiSummary: protectedProcedure.query(async ({ ctx }) => {
    const submission = await db.kpiSubmission.findFirst({
      where: { userId: ctx.session.user.id, status: "draft" },
      include: { entries: true },
    });
    if (!submission) return null;
    // Aggregate logic (replace with real calculation)
    const totalScore = submission.entries.reduce((sum, e) => {
      if (
        e.calculatedResult &&
        typeof e.calculatedResult === "object" &&
        "score" in e.calculatedResult
      ) {
        // @ts-expect-error: dynamic JSON
        return sum + (e.calculatedResult.score || 0);
      }
      return sum;
    }, 0);
    const averageScore =
      submission.entries.length > 0
        ? totalScore / submission.entries.length
        : 0;
    return {
      totalScore,
      averageScore,
      entries: submission.entries,
    };
  }),
});
