"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { CategoryAverage } from "@/lib/analytics/metrics";

const COLORS = ["var(--primary)", "var(--secondary)", "var(--stone)", "var(--navy)"];

function DonutTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: CategoryAverage & { totalOutcomes: number } }[];
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  const share = Math.round((item.count / item.totalOutcomes) * 100);

  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-popover-foreground">{item.category}</p>
      <p className="text-muted-foreground">
        {item.count} outcome{item.count === 1 ? "" : "s"} ({share}% of the total)
      </p>
    </div>
  );
}

export function DataLabCategoryDonut({ data }: { data: CategoryAverage[] }) {
  const totalOutcomes = data.reduce((sum, d) => sum + d.count, 0);
  const withTotal = data.map((d) => ({ ...d, totalOutcomes }));

  return (
    <div
      className="h-[220px] w-full"
      role="img"
      aria-label={`Donut chart showing the share of ${totalOutcomes} measured outcomes across ${data.length} categories.`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={withTotal}
            dataKey="count"
            nameKey="category"
            innerRadius="55%"
            outerRadius="85%"
            paddingAngle={2}
            strokeWidth={0}
          >
            {withTotal.map((entry, i) => (
              <Cell
                key={entry.category}
                style={{ fill: COLORS[i % COLORS.length] }}
              />
            ))}
          </Pie>
          <Tooltip content={<DonutTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
        {withTotal.map((entry, i) => (
          <li key={entry.category} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
              aria-hidden="true"
            />
            {entry.category} ({entry.count})
          </li>
        ))}
      </ul>
    </div>
  );
}
