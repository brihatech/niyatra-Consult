import { z } from "zod";

// ═══════════════════════════════════════════════════════════════════════
// KPI Navigation Definition
// ═══════════════════════════════════════════════════════════════════════

export interface KpiDefinition {
  id: number;
  name: string;
  subtitle: string;
  href: string;
  group: string;
}

export const KPI_GROUPS = [
  "Level and Quality of Water Supply Service",
  "Technical Operation",
  "Financial Management",
  "Commercial Operation",
  "Consumer Satisfaction",
  "Organizational Management",
] as const;

export type KpiGroup = (typeof KPI_GROUPS)[number];

export const KPI_LIST: KpiDefinition[] = [
  {
    id: 1,
    name: "Coverage",
    subtitle: "Population Coverage and Served",
    href: "/kpi/kpi-1",
    group: "Level and Quality of Water Supply Service",
  },
  {
    id: 2,
    name: "Sufficiency",
    subtitle: "Quantity of Water Supply",
    href: "/kpi/kpi-2",
    group: "Level and Quality of Water Supply Service",
  },
  {
    id: 3,
    name: "Quality",
    subtitle: "Safety of Water Supply",
    href: "/kpi/kpi-3",
    group: "Level and Quality of Water Supply Service",
  },
  {
    id: 4,
    name: "Continuity",
    subtitle: "Continuity and Reliability",
    href: "/kpi/kpi-4",
    group: "Level and Quality of Water Supply Service",
  },
  {
    id: 5,
    name: "Asset Management",
    subtitle: "Operational and Management Efficiency",
    href: "/kpi/kpi-5",
    group: "Technical Operation",
  },
  {
    id: 6,
    name: "Maintenance",
    subtitle: "Maintenance Capability",
    href: "/kpi/kpi-6",
    group: "Technical Operation",
  },
  {
    id: 7,
    name: "MTTR",
    subtitle: "Mean Time to Repair",
    href: "/kpi/kpi-7",
    group: "Technical Operation",
  },
  {
    id: 8,
    name: "NRW",
    subtitle: "Non-Revenue Water",
    href: "/kpi/kpi-8",
    group: "Technical Operation",
  },
  {
    id: 9,
    name: "Water Tariff",
    subtitle: "Affordability",
    href: "/kpi/kpi-9",
    group: "Financial Management",
  },
  {
    id: 10,
    name: "Operating Ratio",
    subtitle: "Income vs Cost",
    href: "/kpi/kpi-10",
    group: "Financial Management",
  },
  {
    id: 11,
    name: "CTI",
    subtitle: "Contribution to Investment",
    href: "/kpi/kpi-11",
    group: "Financial Management",
  },
  {
    id: 12,
    name: "Accountability",
    subtitle: "Financial Accountability",
    href: "/kpi/kpi-12",
    group: "Financial Management",
  },
  {
    id: 13,
    name: "Metering Ratio",
    subtitle: "Metering Coverage",
    href: "/kpi/kpi-13",
    group: "Commercial Operation",
  },
  {
    id: 14,
    name: "Billing & Collection",
    subtitle: "Billing and Collection Efficiency",
    href: "/kpi/kpi-14",
    group: "Commercial Operation",
  },
  {
    id: 15,
    name: "Customer Database",
    subtitle: "Customer Database Management",
    href: "/kpi/kpi-15",
    group: "Commercial Operation",
  },
  {
    id: 16,
    name: "Complaints Handling",
    subtitle: "Consumer Satisfaction",
    href: "/kpi/kpi-16",
    group: "Consumer Satisfaction",
  },
  {
    id: 17,
    name: "Consumer Satisfaction Level",
    subtitle: "Consumer Satisfaction",
    href: "/kpi/kpi-17",
    group: "Consumer Satisfaction",
  },
  {
    id: 18,
    name: "Amortization",
    subtitle: "Organizational Management",
    href: "/kpi/kpi-18",
    group: "Organizational Management",
  },
  {
    id: 19,
    name: "Human Resource Development",
    subtitle: "Organizational Management",
    href: "/kpi/kpi-19",
    group: "Organizational Management",
  },
  {
    id: 20,
    name: "Gender Equality and Social Inclusion",
    subtitle: "Organizational Management",
    href: "/kpi/kpi-20",
    group: "Organizational Management",
  },
  {
    id: 21,
    name: "Regularity of Annual General Meeting",
    subtitle: "Organizational Management",
    href: "/kpi/kpi-21",
    group: "Organizational Management",
  },
  {
    id: 22,
    name: "Organizational Maturity",
    subtitle:
      "Environmental sanitation, Relation with LG's, Strategic restructuring",
    href: "/kpi/kpi-22",
    group: "Organizational Management",
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
  chemists: z.number({ message: "Required" }).min(0, "Cannot be negative"),

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
    question: "How often are water samples tested in a year? (number of times)",
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
  const mgmtScore = Math.min(
    input.labManagementStaff / EXPECTED_LAB_MANAGEMENT,
    1,
  );
  const techScore = Math.min(
    input.labTechnicians / EXPECTED_LAB_TECHNICIANS,
    1,
  );
  const chemScore = Math.min(input.chemists / EXPECTED_CHEMISTS, 1);
  const subset33Score =
    Math.round(((mgmtScore + techScore + chemScore) / 3) * 100 * 100) / 100;

  // ── Subset 3.4: Parameters ──────────────────────────────────────
  const subset34Score =
    Math.round((input.parametersChecked / EXPECTED_PARAMETERS) * 100 * 100) /
    100;

  // ── Subset 3.5: Test Results ────────────────────────────────────
  const subset35Score = input.testResultsInAccordance === "Y" ? 100 : 0;

  // ── Overall KPI 3 Score = average of 5 subset scores ───────────
  const averageKpiScore =
    Math.round(
      ((subset31Score +
        subset32Score +
        subset33Score +
        subset34Score +
        subset35Score) /
        5) *
        100,
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
      method:
        input.testResultsInAccordance === "Y"
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
      {
        name: "Subset 3.1 — Consumer Perceptions",
        score: subset31Score,
        weight: 1,
      },
      { name: "Subset 3.2 — Functional Lab", score: subset32Score, weight: 1 },
      {
        name: "Subset 3.3 — Designated Staff",
        score: subset33Score,
        weight: 1,
      },
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
      Math.round(((15 - disruptionResult) / 15) * weight * 100 * 100) / 100;
  }

  // ── KPI Score = (a) + (b) where b rewards fewer disruptions ───
  const averageKpiScore = Math.round((scoreA + subset43Score) * 100) / 100;

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

// ═══════════════════════════════════════════════════════════════════════
// KPI 5 — Asset Management
// ═══════════════════════════════════════════════════════════════════════

export const KPI5_ASSET_OPTIONS = [
  {
    value: "A" as const,
    label: "A) No Inventory of Infrastructure",
    weight: 0,
  },
  {
    value: "B" as const,
    label:
      "B) An inventory book with limited information about infrastructures that has not been updated",
    weight: 0.5,
  },
  {
    value: "C" as const,
    label:
      "C) Manually updated inventory of all infrastructure, complete with information on its location, condition, and O&M records",
    weight: 0.8,
  },
  {
    value: "D" as const,
    label:
      "D) An up-to-date digital inventory of infrastructure, and the Asset Layout Plan has been uploaded to the NWASH MIS",
    weight: 0.9,
  },
  {
    value: "E" as const,
    label:
      "E) An up-to-date digital inventory of infrastructure. The Asset Management Plan, which identifies the risk of significant failures, has been prepared and is being implemented. The NWASH MIS contains the Asset Layout Plan",
    weight: 1,
  },
];

export const kpi5InputSchema = z.object({
  assetManagementLevel: z.enum(["A", "B", "C", "D", "E"], {
    message: "Select an asset management level",
  }),
});

export type Kpi5Input = z.infer<typeof kpi5InputSchema>;

export function calculateKpi5(input: Kpi5Input): KpiResult {
  const selected = KPI5_ASSET_OPTIONS.find(
    (o) => o.value === input.assetManagementLevel,
  );
  const weight = selected?.weight ?? 0;
  const kpiScore = Math.round(weight * 100 * 100) / 100;

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "Asset Management",
      method: `Score = "Weight" corresponding to the "Result" × 100 → ${weight} × 100 = ${kpiScore}`,
      result: weight,
      unit: "letter",
      scoringRange: "A – E",
      weight,
      kpiScore,
    },
  ];

  return {
    kpiNo: 5,
    kpiName: "Asset Management",
    subsetName: "Operational and Management Efficiency",
    subIndicators,
    averageKpiScore: kpiScore,
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 6 — Maintenance Capability
// ═══════════════════════════════════════════════════════════════════════

export const KPI6_HR_OPTIONS = [
  {
    value: "A" as const,
    label:
      "A) Utility has employed the technical person including engineer, sub-engineer and plumber",
    weight: 1,
  },
  {
    value: "B" as const,
    label:
      "B) Utility has employed the technical person including sub-engineer and plumber",
    weight: 0.6,
  },
  {
    value: "C" as const,
    label: "C) Utility have plumbers only",
    weight: 0.4,
  },
  {
    value: "D" as const,
    label: "D) Utility does not have any technical personnel",
    weight: 0.2,
  },
];

export const kpi6InputSchema = z.object({
  // Subset 6.1 — Human Resources for Maintenance
  hrLevel: z.enum(["A", "B", "C", "D"], {
    message: "Select a human resource level",
  }),
  // Subset 6.2 — Number of Maintenance
  totalMaintenanceRequired: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  maintenanceCompleted: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
});

export type Kpi6Input = z.infer<typeof kpi6InputSchema>;

export function calculateKpi6(input: Kpi6Input): KpiResult {
  // ── Subset 6.1: Human Resources ─────────────────────────────────
  const hrOption = KPI6_HR_OPTIONS.find((o) => o.value === input.hrLevel);
  const hrWeight = hrOption?.weight ?? 0;
  const subset61Score = Math.round(hrWeight * 100 * 100) / 100;

  // ── Subset 6.2: Number of Maintenance ───────────────────────────
  const maintenanceResult =
    Math.round(
      (input.maintenanceCompleted / input.totalMaintenanceRequired) * 100 * 100,
    ) / 100;
  const subset62Score = Math.min(maintenanceResult, 100);

  // ── Aggregate KPI Score = (a) × 0.5 + (b) × 0.5 ───────────────
  const averageKpiScore =
    Math.round((subset61Score * 0.5 + subset62Score * 0.5) * 100) / 100;

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "Human Resources for Maintenance",
      method: `Score (a) = Weight corresponding to "${input.hrLevel}" × 100 = ${hrWeight} × 100 = ${subset61Score}`,
      result: hrWeight,
      unit: "letter",
      scoringRange: "A – D",
      weight: 0.5,
      kpiScore: subset61Score,
    },
    {
      name: "Number of Maintenance",
      method: `(Completed ${input.maintenanceCompleted} / Required ${input.totalMaintenanceRequired}) × 100 = ${maintenanceResult.toFixed(2)}%`,
      result: maintenanceResult,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 0.5,
      kpiScore: subset62Score,
    },
  ];

  return {
    kpiNo: 6,
    kpiName: "Maintenance Capability",
    subsetName: "Technical Operation",
    subIndicators,
    averageKpiScore,
    subsetScores: [
      {
        name: "Subset 6.1 — Human Resources",
        score: subset61Score,
        weight: 0.5,
      },
      {
        name: "Subset 6.2 — Number of Maintenance",
        score: subset62Score,
        weight: 0.5,
      },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 7 — Mean Time to Repair (MTTR)
// ═══════════════════════════════════════════════════════════════════════

export const KPI7_RESERVE_FUND_OPTIONS = [
  {
    value: "A" as const,
    label: "A) No reserve fund for unplanned breakdowns",
    weight: 0,
  },
  {
    value: "B" as const,
    label:
      "B) A limited reserve fund, that is adequate only for minor unplanned breakdowns",
    weight: 0.25,
  },
  {
    value: "C" as const,
    label:
      "C) Sufficient reserve fund for unplanned breakdowns and minor natural calamities, such as small landslides or floods",
    weight: 0.5,
  },
  {
    value: "D" as const,
    label:
      "D) An adequate reserve fund for unplanned breakdowns. Major infrastructures are insured against natural calamities such as earthquakes and flooding based on their vulnerability to the disaster",
    weight: 1,
  },
];

export const kpi7InputSchema = z.object({
  // Subset 7.1 — Reserve Fund
  reserveFundLevel: z.enum(["A", "B", "C", "D"], {
    message: "Select a reserve fund level",
  }),
  // Subset 7.2 — Average Repair Time
  totalUnplannedRepairs: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  totalRepairTimeHours: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
});

export type Kpi7Input = z.infer<typeof kpi7InputSchema>;

export function calculateKpi7(input: Kpi7Input): KpiResult {
  // ── Subset 7.1: Reserve Fund ───────────────────────────────────
  const fundOption = KPI7_RESERVE_FUND_OPTIONS.find(
    (o) => o.value === input.reserveFundLevel,
  );
  const fundWeight = fundOption?.weight ?? 0;
  const scoreA = Math.round(fundWeight * 100 * 100) / 100;

  // ── Subset 7.2: Average Repair Time ───────────────────────────
  const avgRepairTime =
    Math.round(
      (input.totalRepairTimeHours / input.totalUnplannedRepairs) * 1000000,
    ) / 1000000;

  let scoreB: number;
  if (avgRepairTime <= 7) {
    scoreB = 0.5 * 100; // 50
  } else if (avgRepairTime >= 24) {
    scoreB = 0;
  } else {
    scoreB = Math.round(((24 - avgRepairTime) / 17) * 0.5 * 100 * 100) / 100;
  }

  // ── Aggregate KPI Score = (a) + (b) ────────────────────────────
  const averageKpiScore = Math.round((scoreA + scoreB) * 100) / 100;

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "Reserve Fund",
      method: `Score (a) = Weight corresponding to "${input.reserveFundLevel}" × 100 = ${fundWeight} × 100 = ${scoreA}`,
      result: fundWeight,
      unit: "letter",
      scoringRange: "A – D",
      weight: fundWeight,
      kpiScore: scoreA,
    },
    {
      name: "Average Repair Time",
      method: `Total time ${input.totalRepairTimeHours}h / ${input.totalUnplannedRepairs} repairs = ${avgRepairTime.toFixed(2)} hr/event`,
      result: avgRepairTime,
      unit: "hr/event",
      scoringRange: "≤ 7 → 0.5, ≥ 24 → 0",
      weight: 0.5,
      kpiScore: scoreB,
    },
  ];

  return {
    kpiNo: 7,
    kpiName: "Mean Time to Repair (MTTR)",
    subsetName: "Technical Operation",
    subIndicators,
    averageKpiScore,
    subsetScores: [
      {
        name: "(a) Reserve Fund",
        score: scoreA,
        weight: 1,
      },
      {
        name: "(b) Average Repair Time",
        score: scoreB,
        weight: 1,
      },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 8 — Non-Revenue Water (NRW)
// ═══════════════════════════════════════════════════════════════════════

export const KPI8_NRW_STRATEGY_OPTIONS = [
  {
    value: "A" as const,
    label: "A) No NRW management strategy",
    weight: 0,
  },
  {
    value: "B" as const,
    label:
      "B) An NRW management strategy is developed, but has not yet put it into practice",
    weight: 0.4,
  },
  {
    value: "C" as const,
    label:
      "C) An NRW management strategy has been developed and is being implemented partially",
    weight: 0.6,
  },
  {
    value: "D" as const,
    label:
      "D) A comprehensive NRW management strategy has been developed, which is being implemented by a team dedicated to keeping NRW below 20%",
    weight: 1,
  },
];

export const kpi8InputSchema = z.object({
  // Subset 8.1 — Management Strategy
  nrwStrategyLevel: z.enum(["A", "B", "C", "D"], {
    message: "Select a management strategy level",
  }),
  // Subset 8.2 — NRW Ratio
  totalVolumeSupplied: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  totalVolumeBilled: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
});

export type Kpi8Input = z.infer<typeof kpi8InputSchema>;

export function calculateKpi8(input: Kpi8Input): KpiResult {
  // ── Subset 8.1: Management Strategy ───────────────────────────
  const strategyOption = KPI8_NRW_STRATEGY_OPTIONS.find(
    (o) => o.value === input.nrwStrategyLevel,
  );
  const strategyWeight = strategyOption?.weight ?? 0;
  const scoreA = Math.round(strategyWeight * 100 * 100) / 100;

  // ── Subset 8.2: NRW Ratio ─────────────────────────────────────
  const nrwRatio =
    Math.round(
      ((input.totalVolumeSupplied - input.totalVolumeBilled) /
        input.totalVolumeSupplied) *
        100 *
        100,
    ) / 100;

  let subset82Score: number;
  if (nrwRatio <= 20) {
    subset82Score = 100;
  } else if (nrwRatio >= 60) {
    subset82Score = 0;
  } else {
    subset82Score = Math.round(((60 - nrwRatio) / 40) * 100 * 100) / 100;
  }

  // ── Aggregate KPI Score = (a) × 0.5 + (b) × 0.5 ───────────────
  const averageKpiScore =
    Math.round((scoreA * 0.5 + subset82Score * 0.5) * 100) / 100;

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "Management Strategy",
      method: `Score (a) = Weight corresponding to "${input.nrwStrategyLevel}" × 100 = ${strategyWeight} × 100 = ${scoreA}`,
      result: strategyWeight,
      unit: "letter",
      scoringRange: "A – D",
      weight: 0.5,
      kpiScore: scoreA,
    },
    {
      name: "NRW Ratio",
      method: `(Supplied ${input.totalVolumeSupplied.toLocaleString()} − Billed ${input.totalVolumeBilled.toLocaleString()}) / Supplied × 100 = ${nrwRatio.toFixed(2)}%`,
      result: nrwRatio,
      unit: "%",
      scoringRange: "≤ 20% → 100, ≥ 60% → 0",
      weight: 0.5,
      kpiScore: subset82Score,
    },
  ];

  return {
    kpiNo: 8,
    kpiName: "Non-Revenue Water (NRW)",
    subsetName: "Technical Operation",
    subIndicators,
    averageKpiScore,
    subsetScores: [
      {
        name: "(a) Management Strategy",
        score: scoreA,
        weight: 0.5,
      },
      {
        name: "(b) NRW Ratio",
        score: subset82Score,
        weight: 0.5,
      },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 9 — Water Tariff and Connection Charge (Affordability)
// ═══════════════════════════════════════════════════════════════════════

export const kpi9InputSchema = z.object({
  // Subset 9.1 — Water Affordability
  monthlyTariff20m3: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
  tdfRecommendedTariff: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  // Subset 9.2 — Connection Affordability
  connectionCharge: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
  subsidyAmount: z.number({ message: "Required" }).min(0, "Cannot be negative"),
  avgMonthlyIncomeLowIncome: z
    .number({ message: "Required" })
    .positive("Must be positive"),
});

export type Kpi9Input = z.infer<typeof kpi9InputSchema>;

export function calculateKpi9(input: Kpi9Input): KpiResult {
  // ── Subset 9.1: Water Affordability ─────────────────────────────
  const waterAffordability =
    Math.round(
      (input.monthlyTariff20m3 / input.tdfRecommendedTariff) * 100 * 100,
    ) / 100;

  // ── Subset 9.2: Connection Affordability ────────────────────────
  const annualIncome = input.avgMonthlyIncomeLowIncome * 12;
  const netConnectionCharge = input.connectionCharge - input.subsidyAmount;
  const connectionRatio =
    Math.round((netConnectionCharge / annualIncome) * 100 * 100) / 100;
  const connectionAffordability =
    Math.round((100 - connectionRatio) * 100) / 100;

  // ── Aggregate KPI Score = (a) × 0.5 + (b) × 0.5 ───────────────
  const averageKpiScore =
    Math.round(
      (waterAffordability * 0.5 + connectionAffordability * 0.5) * 100,
    ) / 100;

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "Water Affordability",
      method: `(Monthly tariff ${input.monthlyTariff20m3} / TDF tariff ${input.tdfRecommendedTariff}) × 100 = ${waterAffordability.toFixed(2)}%`,
      result: waterAffordability,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 0.5,
      kpiScore: waterAffordability,
    },
    {
      name: "Connection Affordability",
      method: `100 − (Connection ${netConnectionCharge.toLocaleString()} / Annual income ${annualIncome.toLocaleString()}) × 100 = ${connectionAffordability.toFixed(2)}%`,
      result: connectionAffordability,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 0.5,
      kpiScore: connectionAffordability,
    },
  ];

  return {
    kpiNo: 9,
    kpiName: "Water Tariff & Connection Charge",
    subsetName: "Affordability",
    subIndicators,
    averageKpiScore,
    subsetScores: [
      {
        name: "(a) Water Affordability",
        score: waterAffordability,
        weight: 0.5,
      },
      {
        name: "(b) Connection Affordability",
        score: connectionAffordability,
        weight: 0.5,
      },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 10 — Operating Ratio
// ═══════════════════════════════════════════════════════════════════════

export const kpi10InputSchema = z.object({
  // Subset 10.1 — Income vs Cost
  totalOperatingIncome: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  totalOmCosts: z.number({ message: "Required" }).min(0, "Cannot be negative"),
});

export type Kpi10Input = z.infer<typeof kpi10InputSchema>;

export function calculateKpi10(input: Kpi10Input): KpiResult {
  // ── Subset 10.1: Operating Ratio ────────────────────────────────
  const operatingRatio =
    Math.round((input.totalOmCosts / input.totalOperatingIncome) * 1000000) /
    1000000;

  let kpiScore: number;
  if (operatingRatio <= 0.7) {
    kpiScore = 100;
  } else if (operatingRatio >= 1.2) {
    kpiScore = 0;
  } else {
    kpiScore = Math.round(((1.2 - operatingRatio) / 0.5) * 100 * 100) / 100;
  }

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "Income vs Cost",
      method: `O&M costs ${input.totalOmCosts.toLocaleString()} / Operating income ${input.totalOperatingIncome.toLocaleString()} = ${operatingRatio.toFixed(2)}`,
      result: operatingRatio,
      unit: "Rs.",
      scoringRange: "≤ 0.70 → 100, ≥ 1.20 → 0",
      weight: 1,
      kpiScore,
    },
  ];

  return {
    kpiNo: 10,
    kpiName: "Operating Ratio",
    subsetName: "Financial Management",
    subIndicators,
    averageKpiScore: kpiScore,
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 11 — Contribution to Investment (CTI)
// ═══════════════════════════════════════════════════════════════════════

export const kpi11InputSchema = z.object({
  // Subset 11.1 — Capital Investment Expenditure
  netCashIncome: z.number({ message: "Required" }).min(0, "Cannot be negative"),
  totalSavings: z.number({ message: "Required" }).min(0, "Cannot be negative"),
  capitalInvestmentSpent: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
});

export type Kpi11Input = z.infer<typeof kpi11InputSchema>;

export function calculateKpi11(input: Kpi11Input): KpiResult {
  // ── Subset 11.1: Capital Investment Expenditure ─────────────────
  const totalAvailable = input.netCashIncome + input.totalSavings;
  const ctiRatio =
    Math.round((input.capitalInvestmentSpent / totalAvailable) * 100 * 100) /
    100;

  let kpiScore: number;
  if (ctiRatio >= 40) {
    kpiScore = 100;
  } else if (ctiRatio < 5) {
    kpiScore = 0;
  } else {
    // Linear interpolation between 5% (score=30) and 40% (score=100)
    kpiScore =
      Math.round((0.3 + ((ctiRatio - 5) / 35) * 0.7) * 100 * 100) / 100;
  }

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "Capital Investment Expenditure",
      method: `Investment ${input.capitalInvestmentSpent.toLocaleString()} / (Income ${input.netCashIncome.toLocaleString()} + Savings ${input.totalSavings.toLocaleString()}) × 100 = ${ctiRatio.toFixed(2)}%`,
      result: ctiRatio,
      unit: "%",
      scoringRange: "≥ 40% → 100, < 5% → 0",
      weight: 1,
      kpiScore,
    },
  ];

  return {
    kpiNo: 11,
    kpiName: "Contribution to Investment (CTI)",
    subsetName: "Financial Management",
    subIndicators,
    averageKpiScore: kpiScore,
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 12 — Financial Accountability
// ═══════════════════════════════════════════════════════════════════════

export const KPI12_ACCOUNTABILITY_OPTIONS = [
  {
    value: "A" as const,
    label: "A) No accounting ledgers",
    weight: 0,
  },
  {
    value: "B" as const,
    label:
      "B) Manual accounting ledgers as well as complete and accurate cashbooks for both their Petty Cash and Account",
    weight: 0.5,
  },
  {
    value: "C" as const,
    label:
      "C) Manual/spreadsheet-based accounting system, and the utility can generate income and expenditure statements (using generally accepted accounting principles) from their financial records",
    weight: 0.65,
  },
  {
    value: "D" as const,
    label:
      "D) Full-function accounting system, limited manual integration, and led by experienced financial manager",
    weight: 0.8,
  },
  {
    value: "E" as const,
    label:
      "E) Fully integrated financial accounting system in accordance with the Nepal Accounting Standard and the Nepal Financial Reporting Standard",
    weight: 1,
  },
];

export const kpi12InputSchema = z.object({
  accountabilityLevel: z.enum(["A", "B", "C", "D", "E"], {
    message: "Select an accountability level",
  }),
});

export type Kpi12Input = z.infer<typeof kpi12InputSchema>;

export function calculateKpi12(input: Kpi12Input): KpiResult {
  const option = KPI12_ACCOUNTABILITY_OPTIONS.find(
    (o) => o.value === input.accountabilityLevel,
  );
  const weight = option?.weight ?? 0;
  const kpiScore = Math.round(weight * 100 * 100) / 100;

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "Financial Accountability",
      method: `Score = Weight corresponding to "${input.accountabilityLevel}" × 100 = ${weight} × 100 = ${kpiScore}`,
      result: weight,
      unit: "letter",
      scoringRange: "A – E",
      weight: 1,
      kpiScore,
    },
  ];

  return {
    kpiNo: 12,
    kpiName: "Financial Accountability",
    subsetName: "Financial Management",
    subIndicators,
    averageKpiScore: kpiScore,
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 13 — Metering Ratio
// ═══════════════════════════════════════════════════════════════════════

export const kpi13InputSchema = z.object({
  totalConnections: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  functionalMeters: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
});

export type Kpi13Input = z.infer<typeof kpi13InputSchema>;

export function calculateKpi13(input: Kpi13Input): KpiResult {
  const meteringRatio =
    Math.round((input.functionalMeters / input.totalConnections) * 100 * 100) /
    100;

  let kpiScore: number;
  if (meteringRatio >= 100) {
    kpiScore = 100;
  } else if (meteringRatio <= 60) {
    kpiScore = 0;
  } else {
    kpiScore = Math.round(((meteringRatio - 60) / 40) * 100 * 100) / 100;
  }

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "Metering Ratio",
      method: `Functional meters ${input.functionalMeters.toLocaleString()} / Total connections ${input.totalConnections.toLocaleString()} × 100 = ${meteringRatio.toFixed(2)}%`,
      result: meteringRatio,
      unit: "%",
      scoringRange: "60–100",
      weight: 1,
      kpiScore,
    },
  ];

  return {
    kpiNo: 13,
    kpiName: "Metering Ratio",
    subsetName: "Commercial Operation",
    subIndicators,
    averageKpiScore: kpiScore,
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 14 — Billing and Collection Efficiency
// ═══════════════════════════════════════════════════════════════════════

export const KPI14_BILLING_METHOD_OPTIONS = [
  {
    value: "A" as const,
    label: "A) Offline and record on register",
    weight: 0,
  },
  {
    value: "B" as const,
    label: "B) Offline but record in software",
    weight: 0.5,
  },
  {
    value: "C" as const,
    label: "C) Online (e-payment)",
    weight: 1,
  },
];

export const kpi14InputSchema = z.object({
  // Subset 14.1 — Billing
  totalKnownConnections: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  connectionsBilled: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
  // Subset 14.2 — Billing Method
  billingMethod: z.enum(["A", "B", "C"], {
    message: "Select a billing method",
  }),
  // Subset 14.3 — Collection
  totalAmountBilled: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  totalCashCollected: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
});

export type Kpi14Input = z.infer<typeof kpi14InputSchema>;

export function calculateKpi14(input: Kpi14Input): KpiResult {
  // ── Subset 14.1: Billing efficiency ───────────────────────────
  const billingRatio =
    Math.round(
      (input.connectionsBilled / input.totalKnownConnections) * 100 * 100,
    ) / 100;

  // ── Subset 14.2: Billing method letter score ───────────────────
  const methodOption = KPI14_BILLING_METHOD_OPTIONS.find(
    (o) => o.value === input.billingMethod,
  );
  const methodWeight = methodOption?.weight ?? 0;
  const methodScore = Math.round(methodWeight * 100 * 100) / 100;

  // ── Subset 14.3: Collection efficiency ─────────────────────────
  const collectionRatio =
    Math.round(
      (input.totalCashCollected / input.totalAmountBilled) * 100 * 100,
    ) / 100;

  // ── Aggregate = (a)×0.4 + method×0.2 + (b)×0.4, capped at 100 ─
  const rawAggregate =
    billingRatio * 0.4 + methodScore * 0.2 + collectionRatio * 0.4;
  const averageKpiScore = Math.min(Math.round(rawAggregate * 100) / 100, 100);

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "Billing Efficiency",
      method: `Connections billed ${input.connectionsBilled.toLocaleString()} / Known connections ${input.totalKnownConnections.toLocaleString()} × 100 = ${billingRatio.toFixed(2)}%`,
      result: billingRatio,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 0.4,
      kpiScore: billingRatio,
    },
    {
      name: "Billing Method",
      method: `Score = Weight of "${input.billingMethod}" × 100 = ${methodWeight} × 100 = ${methodScore}`,
      result: methodWeight,
      unit: "letter",
      scoringRange: "A – C",
      weight: 0.2,
      kpiScore: methodScore,
    },
    {
      name: "Collection Efficiency",
      method: `Cash collected ${input.totalCashCollected.toLocaleString()} / Amount billed ${input.totalAmountBilled.toLocaleString()} × 100 = ${collectionRatio.toFixed(2)}%`,
      result: collectionRatio,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 0.4,
      kpiScore: collectionRatio,
    },
  ];

  return {
    kpiNo: 14,
    kpiName: "Billing & Collection Efficiency",
    subsetName: "Commercial Operation",
    subIndicators,
    averageKpiScore,
    subsetScores: [
      {
        name: "(a) Billing Efficiency",
        score: Math.round(billingRatio * 0.4 * 100) / 100,
        weight: 0.4,
      },
      {
        name: "Billing Method",
        score: Math.round(methodScore * 0.2 * 100) / 100,
        weight: 0.2,
      },
      {
        name: "(b) Collection Efficiency",
        score: Math.round(collectionRatio * 0.4 * 100) / 100,
        weight: 0.4,
      },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 15 — Customer Database Management
// ═══════════════════════════════════════════════════════════════════════

export const KPI15_DATABASE_OPTIONS = [
  {
    value: "A" as const,
    label: "A) Customer and user records are not documented",
    weight: 0,
  },
  {
    value: "B" as const,
    label:
      "B) Names and addresses of the customers of all connections are recorded in the registration book or paper files, but no information on the number of water users per connection",
    weight: 0.5,
  },
  {
    value: "C" as const,
    label:
      "C) Names and addresses of customers of all connections are recorded, including the number of water users on each connection, in the registration book, paper files, or computerized data sheets",
    weight: 0.65,
  },
  {
    value: "D" as const,
    label:
      "D) A customer database is maintained with all essential data about customers, including the number of water users for each connection, but it is not linked to the billing services",
    weight: 0.8,
  },
  {
    value: "E" as const,
    label:
      "E) An accurate and up-to-date customer database is maintained with all essential data about customers, including the water users of each connection. This database is also linked to the billing services",
    weight: 1,
  },
];

export const kpi15InputSchema = z.object({
  databaseLevel: z.enum(["A", "B", "C", "D", "E"], {
    message: "Select a database management level",
  }),
});

export type Kpi15Input = z.infer<typeof kpi15InputSchema>;

export function calculateKpi15(input: Kpi15Input): KpiResult {
  const option = KPI15_DATABASE_OPTIONS.find(
    (o) => o.value === input.databaseLevel,
  );
  const weight = option?.weight ?? 0;
  const kpiScore = Math.round(weight * 100 * 100) / 100;

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "Customer Database Management",
      method: `Score = Weight corresponding to "${input.databaseLevel}" × 100 = ${weight} × 100 = ${kpiScore}`,
      result: weight,
      unit: "letter",
      scoringRange: "A – E",
      weight: 1,
      kpiScore,
    },
  ];

  return {
    kpiNo: 15,
    kpiName: "Customer Database Management",
    subsetName: "Commercial Operation",
    subIndicators,
    averageKpiScore: kpiScore,
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 16 — Complaints Handling
// ═══════════════════════════════════════════════════════════════════════

export const KPI16_COMPLAINTS_OPTIONS = [
  {
    value: "A" as const,
    label: "A) No mechanism for logging consumers' complaints",
    weight: 0,
  },
  {
    value: "B" as const,
    label:
      "B) Complaint logbook is kept, but consumers must visit office to register complaints",
    weight: 0.1,
  },
  {
    value: "C" as const,
    label:
      "C) Assigned employee handles complaints lodged in person, at office, or by phone",
    weight: 0.15,
  },
  {
    value: "D" as const,
    label:
      "D) Dedicated complaint unit receives, routes, and tracks complaints systematically",
    weight: 0.2,
  },
];

export const kpi16InputSchema = z.object({
  complaintsManagementLevel: z.enum(["A", "B", "C", "D"], {
    message: "Select complaints management level",
  }),
  totalComplaintsRecorded: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  complaintsResolved: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
  percentageAddressedOnTime: z
    .number({ message: "Required" })
    .min(0, "Must be 0-100")
    .max(100, "Must be 0-100"),
  percentageAddressedLate: z
    .number({ message: "Required" })
    .min(0, "Must be 0-100")
    .max(100, "Must be 0-100"),
  percentageNotAddressed: z
    .number({ message: "Required" })
    .min(0, "Must be 0-100")
    .max(100, "Must be 0-100"),
});

export type Kpi16Input = z.infer<typeof kpi16InputSchema>;

export function calculateKpi16(input: Kpi16Input): KpiResult {
  const complaintsOption = KPI16_COMPLAINTS_OPTIONS.find(
    (option) => option.value === input.complaintsManagementLevel,
  );
  const complaintsWeight = complaintsOption?.weight ?? 0;
  const scoreA = Math.round(complaintsWeight * 100 * 100) / 100;

  const redressRatio =
    Math.round(
      (input.complaintsResolved / input.totalComplaintsRecorded) * 100 * 100,
    ) / 100;
  const cappedRedressRatio = Math.min(redressRatio, 100);
  const scoreB = Math.round(cappedRedressRatio * 0.2 * 100) / 100;

  const onTime = input.percentageAddressedOnTime;
  const late = input.percentageAddressedLate;
  const notAddressed = input.percentageNotAddressed;

  const scoreC1 = Math.round(onTime * 0.2 * 100) / 100;
  const scoreC2 = Math.round(late * 0.2 * 100) / 100;
  const scoreC3 = Math.round(notAddressed * -0.2 * 100) / 100;

  const scoreC = Math.round((scoreC1 + scoreC2 + scoreC3) * 100) / 100;

  const averageKpiScore =
    Math.round((scoreA + scoreB + scoreC1 + scoreC2 + scoreC3) * 100) / 100;

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "Complaints Management",
      method: `Score (a) = Weight corresponding to "${input.complaintsManagementLevel}" × 100 = ${complaintsWeight} × 100`,
      result: complaintsWeight,
      unit: "letter",
      scoringRange: "A – D",
      weight: 0.2,
      kpiScore: scoreA,
    },
    {
      name: "Redress Ratio",
      method: `(Complaints resolved ${input.complaintsResolved} / Total complaints ${input.totalComplaintsRecorded}) × 100`,
      result: redressRatio,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 0.2,
      kpiScore: scoreB,
    },
    {
      name: "A) Complaints addressed on time",
      method: 'Result = "Data", Score = Result × 0.2',
      result: onTime,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 0.2,
      kpiScore: scoreC1,
    },
    {
      name: "B) Complaints addressed, but late",
      method: 'Result = "Data", Score = Result × 0.2',
      result: late,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 0.2,
      kpiScore: scoreC2,
    },
    {
      name: "C) Complaints not addressed",
      method: 'Result = "Data", Score = Result × (-0.2)',
      result: notAddressed,
      unit: "%",
      scoringRange: "0 – 100",
      weight: -0.2,
      kpiScore: scoreC3,
    },
  ];

  return {
    kpiNo: 16,
    kpiName: "Complaints Handling",
    subsetName: "Consumer Satisfaction",
    subIndicators,
    averageKpiScore,
    subsetScores: [
      {
        name: "(a) Complaints Management",
        score: scoreA,
        weight: 0.2,
      },
      {
        name: "(b) Redress Ratio",
        score: scoreB,
        weight: 0.2,
      },
      {
        name: "(c) Consumers' Perceptions",
        score: scoreC,
        weight: 0.6,
      },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 17 — Consumer Satisfaction Level
// ═══════════════════════════════════════════════════════════════════════

export const KPI17_SURVEY_OPTIONS = [
  {
    value: "A" as const,
    label: "A) User satisfaction survey has not yet been conducted",
    weight: 0,
  },
  {
    value: "B" as const,
    label:
      "B) A user satisfaction survey was conducted in the previous year or during the same year of performance evaluation, but not held regularly",
    weight: 0.4,
  },
  {
    value: "C" as const,
    label:
      "C) User satisfaction surveys are conducted every two years, and the results are made public",
    weight: 0.7,
  },
  {
    value: "D" as const,
    label:
      "D) User satisfaction surveys are conducted annually, and results are made public and reviewed in the annual general meeting",
    weight: 1,
  },
];

export const kpi17InputSchema = z.object({
  satisfactionSurveyLevel: z.enum(["A", "B", "C", "D"], {
    message: "Select consumer satisfaction survey level",
  }),
  satisfiedConsumers: z
    .number({ message: "Required" })
    .min(0, "Must be 0-100")
    .max(100, "Must be 0-100"),
});

export type Kpi17Input = z.infer<typeof kpi17InputSchema>;

export function calculateKpi17(input: Kpi17Input): KpiResult {
  const surveyOption = KPI17_SURVEY_OPTIONS.find(
    (option) => option.value === input.satisfactionSurveyLevel,
  );
  const surveyWeight = surveyOption?.weight ?? 0;

  // (a) Score = "Weight" corresponding to the "Result" × 100
  const scoreA = Math.round(surveyWeight * 100 * 100) / 100;

  // (b) Score = "Result" × "Weight"
  const scoreB = Math.round(input.satisfiedConsumers * 0.7 * 100) / 100;

  // Aggregate Score = (a + b)
  const averageKpiScore = Math.round((scoreA + scoreB) * 100) / 100;

  const subIndicators: SubIndicatorResult[] = [
    {
      name: "Consumer Satisfaction Survey Level",
      method: `Score (a) = Weight corresponding to "${input.satisfactionSurveyLevel}" × 100 = ${surveyWeight} × 100`,
      result: surveyWeight,
      unit: "letter",
      scoringRange: "A – D",
      weight: 1,
      kpiScore: scoreA,
    },
    {
      name: "Satisfied Consumers",
      method: 'Score (b) = "Result" × 0.7',
      result: input.satisfiedConsumers,
      unit: "%",
      scoringRange: "0 – 100",
      weight: 0.7,
      kpiScore: scoreB,
    },
  ];

  return {
    kpiNo: 17,
    kpiName: "Consumer Satisfaction Level",
    subsetName: "Consumer Satisfaction",
    subIndicators,
    averageKpiScore,
    subsetScores: [
      {
        name: "(a) Consumer Satisfaction Survey Level",
        score: scoreA,
        weight: 1,
      },
      { name: "(b) Satisfied Consumers", score: scoreB, weight: 0.7 },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 18 — Amortization
// ═══════════════════════════════════════════════════════════════════════

export const KPI18_DUE_AMOUNT_OPTIONS = [
  { value: "Y" as const, label: "Yes (Y)", weight: 0 },
  { value: "N" as const, label: "No (N)", weight: 1 },
];

export const KPI18_INSTALLMENT_OPTIONS = [
  {
    value: "A" as const,
    label: "A) Utility does not pay any installment",
    weight: 0,
  },
  {
    value: "B" as const,
    label: "B) Utility has paid 2 installments",
    weight: 0.5,
  },
  {
    value: "C" as const,
    label: "C) Utility has paid 6 installments",
    weight: 0.65,
  },
  {
    value: "D" as const,
    label: "D) Utility has paid 10 installments",
    weight: 0.8,
  },
  {
    value: "E" as const,
    label: "E) Utility has paid more than 10 installments",
    weight: 1,
  },
];

export const kpi18InputSchema = z.object({
  hasDueAmount: z.enum(["Y", "N"], { message: "Select due amount status" }),
  tdfInstallmentLevel: z.enum(["A", "B", "C", "D", "E"], {
    message: "Select TDF installment level",
  }),
});

export type Kpi18Input = z.infer<typeof kpi18InputSchema>;

export function calculateKpi18(input: Kpi18Input): KpiResult {
  const dueOption = KPI18_DUE_AMOUNT_OPTIONS.find(
    (option) => option.value === input.hasDueAmount,
  );
  const installmentOption = KPI18_INSTALLMENT_OPTIONS.find(
    (option) => option.value === input.tdfInstallmentLevel,
  );

  const dueWeight = dueOption?.weight ?? 0;
  const installmentWeight = installmentOption?.weight ?? 0;

  const scoreA = Math.round(dueWeight * 100 * 100) / 100;
  const scoreB = Math.round(installmentWeight * 100 * 100) / 100;
  const averageKpiScore = Math.round((scoreA + scoreB) * 100) / 100;

  return {
    kpiNo: 18,
    kpiName: "Amortization",
    subsetName: "Organizational Management",
    subIndicators: [
      {
        name: "Due Amount",
        method: `Score (a) = Weight corresponding to "${input.hasDueAmount}" × 100 = ${dueWeight} × 100`,
        result: dueWeight,
        unit: "letter",
        scoringRange: "Y / N",
        weight: 1,
        kpiScore: scoreA,
      },
      {
        name: "TDF Loan Installment",
        method: `Score (b) = Weight corresponding to "${input.tdfInstallmentLevel}" × 100 = ${installmentWeight} × 100`,
        result: installmentWeight,
        unit: "letter",
        scoringRange: "A – E",
        weight: 1,
        kpiScore: scoreB,
      },
    ],
    averageKpiScore,
    subsetScores: [
      { name: "(a) Due Amount", score: scoreA, weight: 1 },
      { name: "(b) TDF Loan Installment", score: scoreB, weight: 1 },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 19 — Human Resource Development (HRD)
// ═══════════════════════════════════════════════════════════════════════

export const kpi19InputSchema = z.object({
  totalStaffDetails: z
    .number({ message: "Required" })
    .positive("Must be positive"),
  trainingCoursesCompletedManagerial: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
  trainingCoursesCompletedAccountant: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
  trainingCoursesCompletedEngineer: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
  trainingCoursesCompletedOther: z
    .number({ message: "Required" })
    .min(0, "Cannot be negative"),
});

export type Kpi19Input = z.infer<typeof kpi19InputSchema>;

export function calculateKpi19(input: Kpi19Input): KpiResult {
  const totalCompleted =
    input.trainingCoursesCompletedManagerial +
    input.trainingCoursesCompletedAccountant +
    input.trainingCoursesCompletedEngineer +
    input.trainingCoursesCompletedOther;

  const score = Math.round(Math.min(totalCompleted, 100) * 100) / 100;

  return {
    kpiNo: 19,
    kpiName: "Human Resource Development",
    subsetName: "Organizational Management",
    subIndicators: [
      {
        name: "Total Staff Details",
        method: 'Result = "Data"',
        result: input.totalStaffDetails,
        unit: "no.",
        scoringRange: "0 – 100",
        weight: 0,
        kpiScore: 0,
      },
      {
        name: "Percentage of training courses completed",
        method:
          "Result = Managerial + Accountant + Engineer + Other (capped at 100)",
        result: totalCompleted,
        unit: "%",
        scoringRange: "0 – 100",
        weight: 1,
        kpiScore: score,
      },
    ],
    averageKpiScore: score,
  };
}

// ═══════════════════════════════════════════════════════════════════════
// KPI 20 — Gender Equality and Social Inclusion (GESI)
// ═══════════════════════════════════════════════════════════════════════

export const KPI20_GENDER_POLICY_OPTIONS = [
  {
    value: "A" as const,
    label:
      "A) Proportion of women in executive committee is less than 33 percent",
    weight: 0,
  },
  {
    value: "B" as const,
    label:
      "B) Women comprise 33% or more in the committee, but none hold key positions",
    weight: 0.25,
  },
  {
    value: "C" as const,
    label: "C) Women comprise 33% or more and one or more hold key positions",
    weight: 0.4,
  },
  {
    value: "D" as const,
    label:
      "D) More than 33% women in committee and one or more hold key positions including Chair",
    weight: 0.5,
  },
];

export const KPI20_SOCIAL_INCLUSION_OPTIONS = [
  {
    value: "A" as const,
    label:
      "A) Executive committee has no socially excluded or marginalized members",
    weight: 0,
  },
  {
    value: "B" as const,
    label:
      "B) Executive committee includes socially excluded or marginalized people in key positions or as members",
    weight: 0.5,
  },
];

export const kpi20InputSchema = z.object({
  genderPolicyComplianceLevel: z.enum(["A", "B", "C", "D"], {
    message: "Select gender policy compliance level",
  }),
  socialInclusionPolicyComplianceLevel: z.enum(["A", "B"], {
    message: "Select social inclusion policy compliance level",
  }),
});

export type Kpi20Input = z.infer<typeof kpi20InputSchema>;

export function calculateKpi20(input: Kpi20Input): KpiResult {
  const genderOption = KPI20_GENDER_POLICY_OPTIONS.find(
    (option) => option.value === input.genderPolicyComplianceLevel,
  );
  const socialOption = KPI20_SOCIAL_INCLUSION_OPTIONS.find(
    (option) => option.value === input.socialInclusionPolicyComplianceLevel,
  );

  const weightA = genderOption?.weight ?? 0;
  const weightB = socialOption?.weight ?? 0;
  const scoreA = Math.round(weightA * 100 * 100) / 100;
  const scoreB = Math.round(weightB * 100 * 100) / 100;

  // The reference block displays Aggregate = (a) + (b) + (c). c is kept as 0.
  const scoreC = 0;
  const averageKpiScore = Math.round((scoreA + scoreB + scoreC) * 100) / 100;

  return {
    kpiNo: 20,
    kpiName: "Gender Equality and Social Inclusion (GESI)",
    subsetName: "Organizational Management",
    subIndicators: [
      {
        name: "Gender Policy Compliance",
        method: `Score (a) = Weight corresponding to "${input.genderPolicyComplianceLevel}" × 100 = ${weightA} × 100`,
        result: weightA,
        unit: "letter",
        scoringRange: "A – D",
        weight: 0.5,
        kpiScore: scoreA,
      },
      {
        name: "Social Inclusion Policy Compliance",
        method: `Score (b) = Weight corresponding to "${input.socialInclusionPolicyComplianceLevel}" × 100 = ${weightB} × 100`,
        result: weightB,
        unit: "letter",
        scoringRange: "A – B",
        weight: 0.5,
        kpiScore: scoreB,
      },
    ],
    averageKpiScore,
    subsetScores: [
      { name: "(a) Gender Policy Compliance", score: scoreA, weight: 0.5 },
      {
        name: "(b) Social Inclusion Policy Compliance",
        score: scoreB,
        weight: 0.5,
      },
      { name: "(c) Additional GESI Compliance", score: scoreC, weight: 0 },
    ],
  };
}
