"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { EnrichedMetric } from "@/lib/analytics/metrics";

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: EnrichedMetric }[];
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;

  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-popover-foreground">{item.label}</p>
      <p className="text-muted-foreground">
        {item.direction === "down" ? "Reduced" : "Increased"} by {item.value}
        {item.unit} · {item.projectTitle}
      </p>
    </div>
  );
}

export function DataLabPrimaryChart({
  metrics,
  onSelectProject,
  selectedProjectSlug,
}: {
  metrics: EnrichedMetric[];
  onSelectProject: (slug: string) => void;
  selectedProjectSlug: string;
}) {
  if (metrics.length === 0) {
    return (
      <div className="flex h-[320px] items-center justify-center rounded-lg border border-dashed border-border">
        <p className="text-sm text-muted-foreground">
          No records match the selected filters.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div
        className="h-[360px] w-full"
        role="img"
        aria-label={`Bar chart of ${metrics.length} measured outcomes, ranging from ${Math.min(...metrics.map((m) => m.value))}% to ${Math.max(...metrics.map((m) => m.value))}%. Click a bar to filter by its project.`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={metrics}
            layout="vertical"
            margin={{ top: 4, right: 24, bottom: 4, left: 4 }}
          >
            <CartesianGrid
              horizontal={false}
              stroke="var(--border)"
              strokeDasharray="3 3"
            />
            <XAxis
              type="number"
              unit="%"
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="label"
              width={168}
              tick={{ fill: "var(--foreground)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip cursor={{ fill: "var(--muted)" }} content={<ChartTooltip />} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={22}>
              {metrics.map((entry) => (
                <Cell
                  key={entry.label}
                  onClick={() => onSelectProject(entry.projectSlug)}
                  className="cursor-pointer"
                  style={{
                    fill:
                      selectedProjectSlug !== "all" &&
                      entry.projectSlug === selectedProjectSlug
                        ? "var(--primary)"
                        : entry.value >= 20
                          ? "var(--primary)"
                          : "var(--secondary)",
                    opacity:
                      selectedProjectSlug === "all" ||
                      entry.projectSlug === selectedProjectSlug
                        ? 1
                        : 0.35,
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <table className="sr-only">
        <caption>Measured outcomes for the current filter selection</caption>
        <thead>
          <tr>
            <th>Outcome</th>
            <th>Change</th>
            <th>Project</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m) => (
            <tr key={m.label}>
              <td>{m.label}</td>
              <td>
                {m.direction === "down" ? "-" : "+"}
                {m.value}
                {m.unit}
              </td>
              <td>{m.projectTitle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
