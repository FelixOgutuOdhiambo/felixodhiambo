"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CategoryAverage } from "@/lib/analytics/metrics";

function CategoryTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: CategoryAverage }[];
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;

  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-popover-foreground">{item.category}</p>
      <p className="text-muted-foreground">
        Average {item.average}% across {item.count} outcome{item.count === 1 ? "" : "s"}
      </p>
    </div>
  );
}

export function DataLabCategoryChart({ data }: { data: CategoryAverage[] }) {
  return (
    <div
      className="h-[220px] w-full"
      role="img"
      aria-label={`Bar chart of average measured change by category, across ${data.length} categories.`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 24, bottom: 4, left: 4 }}
        >
          <CartesianGrid horizontal={false} stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis
            type="number"
            unit="%"
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="category"
            width={168}
            tick={{ fill: "var(--foreground)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip cursor={{ fill: "var(--muted)" }} content={<CategoryTooltip />} />
          <Bar
            dataKey="average"
            radius={[0, 4, 4, 0]}
            maxBarSize={20}
            style={{ fill: "var(--navy)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
