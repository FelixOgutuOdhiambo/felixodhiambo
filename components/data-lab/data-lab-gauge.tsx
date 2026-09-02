"use client";

import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";

/**
 * A radial "gauge" for a single real KPI value. maxScale sets what 100%
 * of the ring represents; it's a display scale, not a data point itself.
 */
export function DataLabGauge({
  value,
  label,
  maxScale = 50,
}: {
  value: number;
  label: string;
  maxScale?: number;
}) {
  const data = [{ value: Math.min(value, maxScale) }];

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative size-40"
        role="img"
        aria-label={`Radial gauge showing ${label} at ${value}%.`}
      >
        <RadialBarChart
          width={160}
          height={160}
          innerRadius="72%"
          outerRadius="100%"
          barSize={12}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, maxScale]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            dataKey="value"
            cornerRadius={6}
            style={{ fill: "var(--primary)" }}
            background={{ fill: "var(--muted)" }}
          />
        </RadialBarChart>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-2xl font-medium">{value}%</span>
        </div>
      </div>
      <p className="mt-1 text-center text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
