-- CreateTable
CREATE TABLE "KpiSubmission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "submittedAt" TIMESTAMP(3),
    "totalScore" DOUBLE PRECISION,
    "averageScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KpiSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KpiEntry" (
    "id" TEXT NOT NULL,
    "kpiSubmissionId" TEXT NOT NULL,
    "kpiNumber" INTEGER NOT NULL,
    "inputData" JSONB NOT NULL,
    "calculatedResult" JSONB NOT NULL,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KpiEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KpiEntry_kpiSubmissionId_kpiNumber_key" ON "KpiEntry"("kpiSubmissionId", "kpiNumber");

-- AddForeignKey
ALTER TABLE "KpiSubmission" ADD CONSTRAINT "KpiSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KpiEntry" ADD CONSTRAINT "KpiEntry_kpiSubmissionId_fkey" FOREIGN KEY ("kpiSubmissionId") REFERENCES "KpiSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
