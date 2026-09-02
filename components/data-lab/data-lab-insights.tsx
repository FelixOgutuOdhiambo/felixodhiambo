import { Lightbulb } from "lucide-react";

export function DataLabInsights({ insights }: { insights: string[] }) {
  if (insights.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No records match the selected filters, so there&apos;s nothing to summarise yet.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {insights.map((insight) => (
        <li
          key={insight}
          className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 text-sm text-foreground/90"
        >
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />
          {insight}
        </li>
      ))}
    </ul>
  );
}
