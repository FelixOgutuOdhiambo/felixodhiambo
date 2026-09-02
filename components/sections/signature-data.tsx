import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { ImpactBarChart } from "@/components/charts/impact-bar-chart";
import { EMISSIONS_HEADLINE_STATS } from "@/lib/content/impact-metrics";
import {
  DEFAULT_FILTERS,
  getEnrichedMetrics,
  summariseMetrics,
} from "@/lib/analytics/metrics";
import { generateInsights } from "@/lib/analytics/insights";

export function SignatureData() {
  const metrics = getEnrichedMetrics();
  const summary = summariseMetrics(metrics);
  const [headlineInsight] = generateInsights(
    metrics,
    summary,
    DEFAULT_FILTERS,
    metrics.length
  );

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="In The Data"
          title="Measured impact, by initiative"
          description="Every figure below is a documented result from a specific role or project, traceable back to its case study, not a dashboard mock-up."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <FadeIn>
            <div className="rounded-lg border border-border bg-card p-6">
              <ImpactBarChart />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex h-full flex-col rounded-lg border border-border bg-muted/40 p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Research Project
              </p>
              <h3 className="mt-2 font-serif text-xl font-medium text-balance">
                European Aviation Emissions Analytics
              </h3>
              <p className="mt-2 text-sm text-muted-foreground text-pretty">
                A Eurocontrol-based pipeline quantifying CO₂ emissions across
                European aviation: Notebook → Lakehouse → SQL → Semantic
                Model → Power BI.
              </p>

              <dl className="mt-6 space-y-4">
                {EMISSIONS_HEADLINE_STATS.map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-2">
                    <dt className="font-serif text-2xl font-medium text-primary">
                      {stat.value}
                    </dt>
                    <dd className="text-sm text-muted-foreground">
                      {stat.unit}, {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                href="/projects/european-aviation-emissions"
                className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary hover:underline"
              >
                Read the full case study
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.15}>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-lg border border-primary/20 bg-primary/5 p-6 sm:flex-row sm:items-center">
            <p className="text-sm text-foreground/90">{headlineInsight}</p>
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/data-lab">
                Explore the Data Lab
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
