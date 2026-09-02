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
import { IMPACT_METRICS } from "@/lib/content/impact-metrics";

function ImpactTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: (typeof IMPACT_METRICS)[number] }[];
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;

  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 text-sm shadow-md">
      <p className="font-medium text-popover-foreground">{item.label}</p>
      <p className="text-muted-foreground">
        {item.direction === "down" ? "Reduced" : "Increased"} by {item.value}
        {item.unit}
      </p>
    </div>
  );
}

export function ImpactBarChart() {
  return (
    <div>
      <div className="h-[360px] w-full" role="img" aria-label="Bar chart showing measured percentage impact across Felix Odhiambo's documented projects, ranging from 5% to 50%.">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={IMPACT_METRICS}
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
            <Tooltip
              cursor={{ fill: "var(--muted)" }}
              content={<ImpactTooltip />}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={22}>
              {IMPACT_METRICS.map((entry) => (
                <Cell
                  key={entry.label}
                  style={{
                    fill: entry.value >= 20 ? "var(--primary)" : "var(--secondary)",
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Accessible data table fallback for screen readers / no-JS */}
      <table className="sr-only">
        <caption>Measured percentage impact by initiative</caption>
        <thead>
          <tr>
            <th>Initiative</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {IMPACT_METRICS.map((m) => (
            <tr key={m.label}>
              <td>{m.label}</td>
              <td>
                {m.direction === "down" ? "-" : "+"}
                {m.value}
                {m.unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
