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
  {
    id: 3,
    name: "Quality",
    subtitle: "Safety of Water Supply",
    href: "/kpi/kpi-3",
  },
  {
    id: 4,
    name: "Continuity",
    subtitle: "Continuity and Reliability",
    href: "/kpi/kpi-4",
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

// ═══════════════════════════════════════════════════════════════════════
// KPI 3 — Quality (Safety)
// ═══════════════════════════════════════════════════════════════════════

export const kpi3InputSchema = z.object({
  // Subset 3.1 — Consumer Perceptions
  percentageCleanThroughout: z
    .number({ message: "Required" })
    .min(0, "Must be 0-100")
    .max(100, "Must be 0-100"),
  percentageCleanButTurbid: z
    .number({ message: "Required" })
    .min(0, "Must be 0-100")
    .max(100, "Must be 0-100"),
  percentageMurkyOnFairDays: z
    .number({ message: "Required" })
    .min(0, "Must be 0-100")
    .max(100, "Must be 0-100"),

  // Subset 3.2 — Functional Lab
  hasDesignatedLab: z.enum(["yes", "no"], {
    message: "Select Yes or No",
  }),
  samplesTestedPerYear: z
    .number({ message: "Required" })
    .min(0, "Must be 0 or more"),

  // Subset 3.3 — Designated Staff
  labManagementStaff: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
  labTechnicians: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
  chemists: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),

  // Subset 3.4 — Parameters
  parametersChecked: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),

  // Subset 3.5 — Test Results
  testResultsInAccordance: z.enum(["Y", "N"], {
    message: "Select Y or N",
  }),
});

export type Kpi3Input = z.infer<typeof kpi3InputSchema>;

export const KPI3_SUBSET31_QUESTIONS: DataInputQuestion<Kpi3Input>[] = [
  {
    id: "percentageCleanThroughout",
    question:
      "A) Percentage of households that believe the water provided is clean and acceptable throughout the year",
    unit: "%",
    dataSource: "Consumer Survey",
  },
  {
    id: "percentageCleanButTurbid",
    question:
      "B) Percentage of households that believe the water provided is clean and acceptable but turbid or murky on rainy days",
    unit: "%",
    dataSource: "Consumer Survey",
  },
  {
    id: "percentageMurkyOnFairDays",
    question:
      "C) Percentage of households that believe the water provided is clean and acceptable but occasionally murky or colored, even on fair days",
    unit: "%",
    dataSource: "Consumer Survey",
  },
];

export const KPI3_SUBSET32_QUESTIONS: DataInputQuestion<Kpi3Input>[] = [
  {
    id: "samplesTestedPerYear",
    question:
      "How often are water samples tested in a year? (number of times)",
    unit: "no.",
    dataSource: "Lab Records",
  },
];

export const KPI3_SUBSET33_QUESTIONS: DataInputQuestion<Kpi3Input>[] = [
  {
    id: "labManagementStaff",
    question: "How many designated staff are there for lab management?",
    unit: "no.",
    dataSource: "HR Records",
  },
  {
    id: "labTechnicians",
    question: "How many Lab Technicians?",
    unit: "no.",
    dataSource: "HR Records",
  },
  {
    id: "chemists",
    question: "How many Chemists?",
    unit: "no.",
    dataSource: "HR Records",
  },
];

export const KPI3_SUBSET34_QUESTIONS: DataInputQuestion<Kpi3Input>[] = [
  {
    id: "parametersChecked",
    question: "How many parameters are being checked in the laboratory?",
    unit: "no.",
    dataSource: "Lab Records",
  },
];

// Total expected standard water quality parameters
const EXPECTED_PARAMETERS = 18;
// Expected staff counts per category
const EXPECTED_LAB_MANAGEMENT = 2;
const EXPECTED_LAB_TECHNICIANS = 1;
const EXPECTED_CHEMISTS = 1;

export function calculateKpi3(input: Kpi3Input): KpiResult {
  // ── Subset 3.1: Consumer Perceptions ────────────────────────────
  const a = input.percentageCleanThroughout;
  const b = input.percentageCleanButTurbid;
  const c = input.percentageMurkyOnFairDays;
  const subset31Score = Math.round((a * 0.5 + b * 0.4 + c * 0.1) * 100) / 100;

  // ── Subset 3.2: Functional Lab ──────────────────────────────────
  const hasLab = input.hasDesignatedLab === "yes";
  const subset32Result = hasLab
    ? Math.round((input.samplesTestedPerYear / 365) * 100 * 100) / 100
    : 0;
  // If result >= 100 (daily testing), score = 100; otherwise score = result
  const subset32Score = subset32Result >= 100 ? 100 : subset32Result;

  // ── Subset 3.3: Designated Staff ────────────────────────────────
  const mgmtScore = Math.min(input.labManagementStaff / EXPECTED_LAB_MANAGEMENT, 1);
  const techScore = Math.min(input.labTechnicians / EXPECTED_LAB_TECHNICIANS, 1);
  const chemScore = Math.min(input.chemists / EXPECTED_CHEMISTS, 1);
  const subset33Score =
    Math.round(((mgmtScore + techScore + chemScore) / 3) * 100 * 100) / 100;

  // ── Subset 3.4: Parameters ──────────────────────────────────────
  const subset34Score =
    Math.round((input.parametersChecked / EXPECTED_PARAMETERS) * 100 * 100) / 100;

  // ── Subset 3.5: Test Results ────────────────────────────────────
  const subset35Score = input.testResultsInAccordance === "Y" ? 100 : 0;

  // ── Overall KPI 3 Score = average of 5 subset scores ───────────
  const averageKpiScore =
    Math.round(
      ((subset31Score + subset32Score + subset33Score + subset34Score + subset35Score) / 5) * 100,
    ) / 100;

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "A) Clean throughout the year",
      method: 'Result = "Data" (direct survey input)',
      result: a,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 0.5,
      kpiScore: Math.round(a * 0.5 * 100) / 100,
    },
    {
      name: "B) Clean but turbid on rainy days",
      method: 'Result = "Data" (direct survey input)',
      result: b,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 0.4,
      kpiScore: Math.round(b * 0.4 * 100) / 100,
    },
    {
      name: "C) Murky even on fair days",
      method: 'Result = "Data" (direct survey input)',
      result: c,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 0.1,
      kpiScore: Math.round(c * 0.1 * 100) / 100,
    },
    {
      name: "Functional Lab (sample testing rate)",
      method: `(Samples tested per year / 365) × 100 = ${subset32Result.toFixed(2)}%`,
      result: subset32Result,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 1,
      kpiScore: subset32Score,
    },
    {
      name: "Designated Staff",
      method: `Avg staff ratio: (${mgmtScore.toFixed(2)} + ${techScore.toFixed(2)} + ${chemScore.toFixed(2)}) / 3 × 100`,
      result: subset33Score,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 1,
      kpiScore: subset33Score,
    },
    {
      name: "Parameters Checked",
      method: `(Parameters checked / ${EXPECTED_PARAMETERS} expected) × 100`,
      result: subset34Score,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 1,
      kpiScore: subset34Score,
    },
    {
      name: "Test Results in Accordance",
      method: input.testResultsInAccordance === "Y"
        ? 'Answer = "Y" → Score = 100'
        : 'Answer = "N" → Score = 0',
      result: subset35Score,
      unit: "letter",
      scoringRange: "0 – 100",
      weight: 1,
      kpiScore: subset35Score,
    },
  ];

  return {
    kpiNo: 3,
    kpiName: "Quality (Safety)",
    subsetName: "Water Quality & Safety Assessment",
    subIndicators,
    averageKpiScore,
    subsetScores: [
      { name: "Subset 3.1 — Consumer Perceptions", score: subset31Score, weight: 1 },
      { name: "Subset 3.2 — Functional Lab", score: subset32Score, weight: 1 },
      { name: "Subset 3.3 — Designated Staff", score: subset33Score, weight: 1 },
      { name: "Subset 3.4 — Parameters", score: subset34Score, weight: 1 },
      { name: "Subset 3.5 — Test Results", score: subset35Score, weight: 1 },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 4 — Continuity and Reliability
// ═══════════════════════════════════════════════════════════════════════

export const kpi4InputSchema = z.object({
  // Subset 4.1 — Continuity
  averageSupplyHoursPerDay: z
    .number({ message: "Required" })
    .min(0, "Must be 0-24")
    .max(24, "Must be 0-24"),

  // Subset 4.2 — Accessibility
  waterAccessibleFloor: z
    .number({ message: "Required" })
    .min(0, "Must be 0-5")
    .max(5, "Must be 0-5"),

  // Subset 4.3 — Reliability
  disruptionDays: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
});

export type Kpi4Input = z.infer<typeof kpi4InputSchema>;

export const KPI4_QUESTIONS: DataInputQuestion<Kpi4Input>[] = [
  {
    id: "averageSupplyHoursPerDay",
    question: "Average water supply hours per day",
    unit: "hrs/day",
    dataSource: "Operational Records",
  },
  {
    id: "waterAccessibleFloor",
    question: "Up to which floor water is assessable",
    unit: "floor",
    dataSource: "Service Records",
  },
  {
    id: "disruptionDays",
    question:
      "Number of days on which water supply service had been disrupted for more than 50% of average hours of daily service or the disruption had affected regular service to more than 25% of the users during the evaluation year",
    unit: "day",
    dataSource: "Operational Records",
  },
];

export function calculateKpi4(input: Kpi4Input): KpiResult {
  const weight = 1 / 3;

  // ── Subset 4.1: Continuity ─────────────────────────────────────
  // Score = (Result / 24) × Weight × 100
  const continuityResult = input.averageSupplyHoursPerDay;
  const subset41Score =
    Math.round((continuityResult / 24) * weight * 100 * 100) / 100;

  // ── Subset 4.2: Accessibility ──────────────────────────────────
  // Score = (Result / 5) × Weight × 100
  const accessibilityResult = input.waterAccessibleFloor;
  const subset42Score =
    Math.round((accessibilityResult / 5) * weight * 100 * 100) / 100;

  // ── (a) = Subset 4.1 + Subset 4.2 ─────────────────────────────
  const scoreA = Math.round((subset41Score + subset42Score) * 100) / 100;

  // ── Subset 4.3: Reliability (disruption penalty) ──────────────
  // (b) If Result = 0 → Score = Weight × 100
  //     If Result >= 15 → Score = 0
  //     Otherwise → (15 - Result) / 15 × Weight × 100
  const disruptionResult = input.disruptionDays;
  let subset43Score: number;
  if (disruptionResult === 0) {
    subset43Score = Math.round(weight * 100 * 100) / 100;
  } else if (disruptionResult >= 15) {
    subset43Score = 0;
  } else {
    subset43Score =
      Math.round(
        ((15 - disruptionResult) / 15) * weight * 100 * 100,
      ) / 100;
  }

  // ── KPI Score = (a) + (b) where b rewards fewer disruptions ───
  const averageKpiScore =
    Math.round((scoreA + subset43Score) * 100) / 100;

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "Continuity",
      method: `(${continuityResult} hrs / 24 hrs) × Weight(${weight.toFixed(2)}) × 100`,
      result: continuityResult,
      unit: "hrs/day",
      scoringRange: "0 – 24",
      weight,
      kpiScore: subset41Score,
    },
    {
      name: "Accessibility",
      method: `(${accessibilityResult} floors / 5 floors) × Weight(${weight.toFixed(2)}) × 100`,
      result: accessibilityResult,
      unit: "floor",
      scoringRange: "0 – 5",
      weight,
      kpiScore: subset42Score,
    },
    {
      name: "Reliability (disruption days)",
      method:
        disruptionResult === 0
          ? `Result = 0 → Score = Weight(${weight.toFixed(2)}) × 100 = ${subset43Score.toFixed(2)}`
          : disruptionResult >= 15
            ? `Result ≥ 15 → Score = 0`
            : `(15 - ${disruptionResult}) / 15 × Weight(${weight.toFixed(2)}) × 100 = ${subset43Score.toFixed(2)}`,
      result: disruptionResult,
      unit: "day",
      scoringRange: "0 – 14",
      weight,
      kpiScore: subset43Score,
    },
  ];

  return {
    kpiNo: 4,
    kpiName: "Continuity and Reliability",
    subsetName: "Service Continuity & Disruption Assessment",
    subIndicators,
    averageKpiScore,
    subsetScores: [
      {
        name: "(a) Continuity + Accessibility",
        score: scoreA,
        weight: 1,
      },
      {
        name: "(b) Reliability (fewer disruptions = higher)",
        score: subset43Score,
        weight: 1,
      },
    ],
  };
}
