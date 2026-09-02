import { Metric } from "@/components/metric";
import { FadeIn } from "@/components/fade-in";

const METRICS = [
  { value: "5+", label: "Years in aviation data & analytics" },
  { value: "25%", label: "Improvement in safety KPI reporting (SMS)" },
  { value: "15%", label: "Scheduling efficiency gained via Azure-based planning" },
  { value: "1,500+", label: "Delay records mined and automated with R" },
];

export function ProofStrip() {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {METRICS.map((metric) => (
              <Metric key={metric.label} {...metric} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
