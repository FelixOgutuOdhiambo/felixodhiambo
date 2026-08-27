const STEPS = [
  "Collection",
  "Verification",
  "Categorisation",
  "Aggregation",
  "Visualisation",
];

export function Methodology() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center gap-2">
          <span className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-xs">
            {step}
          </span>
          {i < STEPS.length - 1 && (
            <span className="text-muted-foreground" aria-hidden="true">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
