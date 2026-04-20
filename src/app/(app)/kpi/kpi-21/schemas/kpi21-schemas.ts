import { z } from "zod";

export const kpi21Options = [
  {
    value: "A",
    label: "A) So far, no AGM has been held.",
    weight: 0,
  },
  {
    value: "B",
    label: "B) AGMs have occasionally been held, but not on a regular basis.",
    weight: 0.5,
  },
  {
    value: "C",
    label:
      "C) AGM is held once a year. At the meeting, the chairman presents the technical report, and the treasurer presents the financial report.",
    weight: 0.65,
  },
  {
    value: "D",
    label:
      "D) AGM is held each year. At the meeting, the utility distributes and presents an annual report that summarizes its overall performance and audited financial statements.",
    weight: 0.8,
  },
  {
    value: "E",
    label:
      "E) AGM is held each year. During the meeting, the utility distributes and presents an annual report that details the utility's overall performance, audited financial reports, and updated scores on key performance indicators (KPIs). The report is also available online on the utility’s website.",
    weight: 1,
  },
];

export const kpi21InputSchema = z.object({
  regularityOfAGM: z.enum(["A", "B", "C", "D", "E"]),
});

export type Kpi21Input = z.infer<typeof kpi21InputSchema>;
