import { IMPACT_METRICS, type ImpactMetric } from "@/lib/content/impact-metrics";
import { getProjectBySlug } from "@/lib/content/projects";

export type MetricFilters = {
  projectSlug: string; // "all" | a project slug
  category: string; // "all" | a project category
  direction: "all" | ImpactMetric["direction"];
};

export const DEFAULT_FILTERS: MetricFilters = {
  projectSlug: "all",
  category: "all",
  direction: "all",
};

export type EnrichedMetric = ImpactMetric & {
  projectTitle: string;
  category: string;
};

/** Joins each real impact metric with its source project's title/category. */
export function getEnrichedMetrics(): EnrichedMetric[] {
  return IMPACT_METRICS.map((metric) => {
    const project = getProjectBySlug(metric.projectSlug);
    return {
      ...metric,
      projectTitle: project?.title ?? metric.projectSlug,
      category: project?.category ?? "Uncategorised",
    };
  });
}

export function getFilterOptions(metrics: EnrichedMetric[]) {
  const projects = Array.from(
    new Map(metrics.map((m) => [m.projectSlug, m.projectTitle])).entries()
  ).map(([slug, title]) => ({ slug, title }));

  const categories = Array.from(new Set(metrics.map((m) => m.category)));

  return { projects, categories };
}

export function filterMetrics(
  metrics: EnrichedMetric[],
  filters: MetricFilters
): EnrichedMetric[] {
  return metrics.filter((m) => {
    if (filters.projectSlug !== "all" && m.projectSlug !== filters.projectSlug) {
      return false;
    }
    if (filters.category !== "all" && m.category !== filters.category) {
      return false;
    }
    if (filters.direction !== "all" && m.direction !== filters.direction) {
      return false;
    }
    return true;
  });
}

export type MetricsSummary = {
  count: number;
  averageValue: number;
  highest: EnrichedMetric | null;
  lowest: EnrichedMetric | null;
  projectCount: number;
};

export function summariseMetrics(metrics: EnrichedMetric[]): MetricsSummary {
  if (metrics.length === 0) {
    return {
      count: 0,
      averageValue: 0,
      highest: null,
      lowest: null,
      projectCount: 0,
    };
  }

  const sorted = [...metrics].sort((a, b) => b.value - a.value);
  const total = metrics.reduce((sum, m) => sum + m.value, 0);
  const projectCount = new Set(metrics.map((m) => m.projectSlug)).size;

  return {
    count: metrics.length,
    averageValue: Math.round((total / metrics.length) * 10) / 10,
    highest: sorted[0],
    lowest: sorted[sorted.length - 1],
    projectCount,
  };
}

export type CategoryAverage = {
  category: string;
  average: number;
  count: number;
};

/** Average measured change per category, from the full unfiltered dataset. */
export function averageByCategory(metrics: EnrichedMetric[]): CategoryAverage[] {
  const groups = new Map<string, number[]>();
  for (const m of metrics) {
    const values = groups.get(m.category) ?? [];
    values.push(m.value);
    groups.set(m.category, values);
  }

  return Array.from(groups.entries()).map(([category, values]) => ({
    category,
    average: Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10,
    count: values.length,
  }));
}
