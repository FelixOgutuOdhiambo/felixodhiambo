// Every value here is sourced directly from a documented result in
// lib/content/projects.ts or lib/content/experience.ts — nothing invented.
export type ImpactMetric = {
  label: string;
  value: number;
  unit: "%";
  direction: "up" | "down";
  projectSlug: string;
};

const RAW_IMPACT_METRICS: ImpactMetric[] = [
  {
    label: "Data inaccuracy reduction",
    value: 50,
    unit: "%",
    direction: "down",
    projectSlug: "data-quality-error-detection",
  },
  {
    label: "Safety KPI reporting (SMS)",
    value: 25,
    unit: "%",
    direction: "up",
    projectSlug: "astral-safety-operations-analytics",
  },
  {
    label: "Scheduling efficiency (Azure)",
    value: 15,
    unit: "%",
    direction: "up",
    projectSlug: "jambojet-network-analytics",
  },
  {
    label: "Data collection accuracy",
    value: 10,
    unit: "%",
    direction: "up",
    projectSlug: "data-quality-error-detection",
  },
  {
    label: "Seasonal demand capture",
    value: 8,
    unit: "%",
    direction: "up",
    projectSlug: "jambojet-network-analytics",
  },
  {
    label: "Turnaround time",
    value: 7,
    unit: "%",
    direction: "down",
    projectSlug: "jambojet-network-analytics",
  },
  {
    label: "On-time performance (OTP)",
    value: 5,
    unit: "%",
    direction: "up",
    projectSlug: "jambojet-network-analytics",
  },
];

export const IMPACT_METRICS: ImpactMetric[] = [...RAW_IMPACT_METRICS].sort(
  (a, b) => b.value - a.value
);

export const EMISSIONS_HEADLINE_STATS = [
  { value: "2.8B", unit: "tonnes CO₂", label: "quantified across the dataset" },
  { value: "135M", unit: "flights", label: "analysed across Europe" },
  { value: "20.93t", unit: "avg / flight", label: "CO₂ per flight" },
] as const;
