import { Metric } from "@/components/metric";
import type { MetricsSummary } from "@/lib/analytics/metrics";

export function DataLabMetrics({ summary }: { summary: MetricsSummary }) {
  if (summary.count === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No records match the selected filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      <Metric value={String(summary.count)} label="Outcomes shown" />
      <Metric value={`${summary.averageValue}%`} label="Average change" />
      <Metric
        value={summary.highest ? `${summary.highest.value}%` : "N/A"}
        label="Largest change"
      />
      <Metric value={String(summary.projectCount)} label="Projects represented" />
    </div>
  );
}
