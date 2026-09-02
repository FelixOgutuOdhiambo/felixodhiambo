import type { EnrichedMetric } from "@/lib/analytics/metrics";

export function DataLabTable({ metrics }: { metrics: EnrichedMetric[] }) {
  if (metrics.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No records match the selected filters.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <th scope="col" className="px-4 py-3 font-medium">
              Outcome
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Project
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Category
            </th>
            <th scope="col" className="px-4 py-3 text-right font-medium">
              Change
            </th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((m) => (
            <tr key={m.label} className="border-b border-border last:border-0">
              <td className="px-4 py-3 font-medium text-foreground">{m.label}</td>
              <td className="px-4 py-3 text-muted-foreground">{m.projectTitle}</td>
              <td className="px-4 py-3 text-muted-foreground">{m.category}</td>
              <td
                className={
                  "px-4 py-3 text-right font-mono " +
                  (m.direction === "down" ? "text-secondary" : "text-primary")
                }
              >
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
