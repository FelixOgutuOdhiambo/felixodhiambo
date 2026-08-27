import type { EnrichedMetric, MetricFilters, MetricsSummary } from "./metrics";

/**
 * Every string here is derived directly from the filtered metric set passed
 * in — no hardcoded claims, no numbers that don't trace back to
 * lib/content/impact-metrics.ts. If the inputs are empty, this returns [].
 */
export function generateInsights(
  metrics: EnrichedMetric[],
  summary: MetricsSummary,
  filters: MetricFilters,
  totalCount: number
): string[] {
  if (metrics.length === 0 || !summary.highest) return [];

  const insights: string[] = [];

  const verb = summary.highest.direction === "down" ? "reduced" : "improved";
  insights.push(
    `The largest measured change shown is "${summary.highest.label}", ${verb} by ${summary.highest.value}% during ${summary.highest.projectTitle}.`
  );

  insights.push(
    `${summary.count} measured outcome${summary.count === 1 ? "" : "s"} shown, averaging a ${summary.averageValue}% change across ${summary.projectCount} project${summary.projectCount === 1 ? "" : "s"}.`
  );

  const isUnfiltered =
    filters.projectSlug === "all" &&
    filters.category === "all" &&
    filters.direction === "all";

  if (isUnfiltered) {
    const upCount = metrics.filter((m) => m.direction === "up").length;
    const downCount = metrics.filter((m) => m.direction === "down").length;
    insights.push(
      `Across every documented project, ${upCount} outcome${upCount === 1 ? "" : "s"} increased and ${downCount} decreased, with no result exceeding ${summary.highest.value}%.`
    );
  } else {
    const share = Math.round((metrics.length / totalCount) * 100);
    insights.push(
      `The current filter covers ${metrics.length} of the ${totalCount} total measured outcomes (${share}%).`
    );
  }

  return insights;
}
