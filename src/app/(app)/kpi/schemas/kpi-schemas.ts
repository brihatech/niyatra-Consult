import { z } from "zod";

// ═══════════════════════════════════════════════════════════════════════
// KPI Navigation Definition
// ═══════════════════════════════════════════════════════════════════════

export interface KpiDefinition {
  id: number;
  name: string;
  subtitle: string;
  href: string;
}

export const KPI_LIST: KpiDefinition[] = [
  {
    id: 1,
    name: "Coverage",
    subtitle: "Population Coverage and Served",
    href: "/kpi/kpi-1",
  },
  {
    id: 2,
    name: "Sufficiency",
    subtitle: "Quantity of Water Supply",
    href: "/kpi/kpi-2",
  },
];

// ═══════════════════════════════════════════════════════════════════════
// Shared Types
// ═══════════════════════════════════════════════════════════════════════

export interface SubIndicatorResult {
  name: string;
  method: string;
  result: number;
  unit: string;
  scoringRange: string;
  weight: number;
  kpiScore: number;
}

export interface KpiResult {
  kpiNo: number;
  kpiName: string;
  subsetName: string;
  subIndicators: SubIndicatorResult[];
  averageKpiScore: number;
  subsetScores?: { name: string; score: number; weight: number }[];
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 1 — Coverage
// ═══════════════════════════════════════════════════════════════════════

export const kpi1InputSchema = z.object({
  totalHouseholdsInServiceArea: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  totalHouseholdsServed: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  productionCapacity: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  designDischarge: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  presentWaterConsumption: z
    .number({ message: "Required" })
    .positive("Must be positive"),
});

export type Kpi1Input = z.infer<typeof kpi1InputSchema>;

export interface DataInputQuestion<T> {
  id: keyof T;
  question: string;
  unit: string;
  dataSource: string;
}

export const KPI1_QUESTIONS: DataInputQuestion<Kpi1Input>[] = [
  {
    id: "totalHouseholdsInServiceArea",
    question:
      "Total number of households in the utility's service area as per DPR/Legislation",
    unit: "HH",
    dataSource: "DPR/Legislation",
  },
  {
    id: "totalHouseholdsServed",
    question:
      "Total number of households served by the utility's functional house or premises connections, community taps and public taps in the performance evaluation year",
    unit: "HH",
    dataSource: "Service Records",
  },
  {
    id: "productionCapacity",
    question: "Production Capacity of the system as per DPR report",
    unit: "Cum",
    dataSource: "DPR Report",
  },
  {
    id: "designDischarge",
    question: "Design Discharge of the WSS",
    unit: "LPCD",
    dataSource: "Design Documents",
  },
  {
    id: "presentWaterConsumption",
    question: "Present Water Consumption",
    unit: "LPCD",
    dataSource: "Meter Readings",
  },
];

function calculateKpiScore(result: number, weight: number): number {
  const product = result * weight;
  return product >= 100 ? 100 : Math.round(product * 100) / 100;
}

export function calculateKpi1(input: Kpi1Input): KpiResult {
  const coverageResult =
    (input.totalHouseholdsServed / input.totalHouseholdsInServiceArea) * 100;
  const coverageScore = calculateKpiScore(coverageResult, 1);

  const productionResult = input.productionCapacity;
  const productionScore = calculateKpiScore(productionResult, 1);

  const waterConsumptionResult =
    (input.presentWaterConsumption / input.designDischarge) * 100;
  const waterConsumptionScore = calculateKpiScore(waterConsumptionResult, 1);

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "Coverage Rate",
      method:
        "(Total number of households served by functioning connections / Total number of households in the service area) × 100",
      result: Math.round(coverageResult * 100) / 100,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 1,
      kpiScore: coverageScore,
    },
    {
      name: "Production Capacity",
      method: "Production Capacity of the system as per DPR report",
      result: Math.round(productionResult * 100) / 100,
      unit: "Cum",
      scoringRange: "0 – 100",
      weight: 1,
      kpiScore: productionScore,
    },
    {
      name: "Water Consumption Ratio",
      method: "(Present Water Consumption / Design Discharge of the WSS) × 100",
      result: Math.round(waterConsumptionResult * 100) / 100,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 1,
      kpiScore: waterConsumptionScore,
    },
  ];

  const averageKpiScore =
    Math.round(
      (subIndicators.reduce((sum, s) => sum + s.kpiScore, 0) /
        subIndicators.length) *
        100,
    ) / 100;

  return {
    kpiNo: 1,
    kpiName: "Coverage",
    subsetName: "Population Coverage and Served",
    subIndicators,
    averageKpiScore,
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 2 — Sufficiency (Quantity)
// ═══════════════════════════════════════════════════════════════════════

export const kpi2InputSchema = z.object({
  // Subset 2.1 — Consumer Perceptions
  percentageSufficientAll: z
    .number({ message: "Required" })
    .min(0, "Must be 0-100")
    .max(100, "Must be 0-100"),
  percentageSufficientBasic: z
    .number({ message: "Required" })
    .min(0, "Must be 0-100")
    .max(100, "Must be 0-100"),
  percentageInsufficient: z
    .number({ message: "Required" })
    .min(0, "Must be 0-100")
    .max(100, "Must be 0-100"),

  // Subset 2.2 — Per Capita Consumption
  totalResidentialWaterUsers: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  totalWaterVolumeBilled: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  serviceAreaType: z.enum(["urban", "rural"], {
    message: "Select service area type",
  }),
});

export type Kpi2Input = z.infer<typeof kpi2InputSchema>;

export const KPI2_QUESTIONS: DataInputQuestion<Kpi2Input>[] = [
  {
    id: "percentageSufficientAll",
    question:
      "A) Percentage of households reporting that the water available from a functioning house/premises connection or a community or public tap is sufficient for all of their everyday use",
    unit: "%",
    dataSource: "Consumer Survey",
  },
  {
    id: "percentageSufficientBasic",
    question:
      "B) Percentage of households reporting that the water available from a functioning house/premises connection or a community or public tap is enough for drinking, cooking, and personal hygiene but insufficient for other uses",
    unit: "%",
    dataSource: "Consumer Survey",
  },
  {
    id: "percentageInsufficient",
    question:
      "C) Percentage of households reporting that the water available from a functioning house/premises connection or a community or public tap is not enough for drinking",
    unit: "%",
    dataSource: "Consumer Survey",
  },
  {
    id: "totalResidentialWaterUsers",
    question:
      "Total number of residential water users served by functioning connections during the evaluation year",
    unit: "Person",
    dataSource: "Service Records",
  },
  {
    id: "totalWaterVolumeBilled",
    question: "Total volume of water billed to residential customers that year",
    unit: "m³",
    dataSource: "Billing Records",
  },
];

function calculatePccScore(
  pcc: number,
  serviceAreaType: "urban" | "rural",
): number {
  if (serviceAreaType === "urban") {
    if (pcc >= 100) return 100;
    if (pcc <= 20) return 0;
    return Math.round(((pcc - 19.99) / 80) * 100 * 100) / 100;
  }
  // rural
  if (pcc >= 45) return 100;
  if (pcc <= 20) return 0;
  return Math.round(((pcc - 19.99) / 25) * 100 * 100) / 100;
}

export function calculateKpi2(input: Kpi2Input): KpiResult {
  const a = input.percentageSufficientAll;
  const b = input.percentageSufficientBasic;
  const c = input.percentageInsufficient;

  // Subset 2.1: Weighted Score = A×0.75 + B×0.25 + C×0
  const subset21Score = Math.round((a * 0.75 + b * 0.25 + c * 0) * 100) / 100;

  // Subset 2.2: Per Capita Consumption
  const pcc =
    Math.round(
      ((input.totalWaterVolumeBilled * 1000) /
        365 /
        input.totalResidentialWaterUsers) *
        100,
    ) / 100;
  const pccScore = calculatePccScore(pcc, input.serviceAreaType);

  // Overall KPI 2 Score:
  // If A = 100 → KPI Score = 100
  // Else KPI Score = (a_weighted × 0.5) + (b_weighted × 0.5)
  let averageKpiScore: number;
  if (a === 100) {
    averageKpiScore = 100;
  } else {
    averageKpiScore =
      Math.round((subset21Score * 0.5 + pccScore * 0.5) * 100) / 100;
  }

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "A) Sufficient for all uses",
      method: 'Result = "Data" (direct survey input)',
      result: a,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 0.75,
      kpiScore: Math.round(a * 0.75 * 100) / 100,
    },
    {
      name: "B) Sufficient for basic needs only",
      method: 'Result = "Data" (direct survey input)',
      result: b,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 0.25,
      kpiScore: Math.round(b * 0.25 * 100) / 100,
    },
    {
      name: "C) Insufficient for drinking",
      method: 'Result = "Data" (direct survey input)',
      result: c,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 0,
      kpiScore: 0,
    },
    {
      name: "Per Capita Consumption (PCC)",
      method: `(Total water volume billed × 1000 / 365) / Total residential water users = ${pcc.toFixed(2)} lpcd`,
      result: pcc,
      unit: "lpcd",
      scoringRange: "0 – 100",
      weight: 0.5,
      kpiScore: pccScore,
    },
  ];

  return {
    kpiNo: 2,
    kpiName: "Sufficiency (Quantity)",
    subsetName: "Consumer Perceptions & Per Capita Consumption",
    subIndicators,
    averageKpiScore,
    subsetScores: [
      {
        name: "Subset 2.1 — Consumer Perceptions",
        score: subset21Score,
        weight: 0.5,
      },
      {
        name: "Subset 2.2 — Per Capita Consumption",
        score: pccScore,
        weight: 0.5,
      },
    ],
  };
}
