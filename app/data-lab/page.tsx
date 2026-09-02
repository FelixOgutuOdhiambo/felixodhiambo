import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { DataLab } from "@/components/data-lab/data-lab";
import { Methodology } from "@/components/data-lab/methodology";
import { AboutThisData } from "@/components/data-lab/about-this-data";
import { PROJECTS } from "@/lib/content/projects";
import { getEnrichedMetrics } from "@/lib/analytics/metrics";

export const metadata: Metadata = {
  title: "Interactive Data Lab",
  description:
    "Explore every measured, verified outcome from Felix Ogutu Odhiambo's aviation analytics projects, filterable by project, category, and direction.",
};

export default function DataLabPage() {
  const relatedSlugs = Array.from(
    new Set(getEnrichedMetrics().map((m) => m.projectSlug))
  );
  const relatedProjects = PROJECTS.filter((p) => relatedSlugs.includes(p.slug));

  return (
    <>
      <PageHeader
        eyebrow="Interactive Data Lab"
        title="Explore a real-world data problem"
        description="Every outcome below is a documented, verified result from Felix's projects. Filter by project, category, or direction and watch the chart, KPIs, and insights update."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <DataLab />
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Methodology" title="How this dataset was built" />
          <div className="mt-8">
            <Methodology />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="About This Data" title="Source, scope, and limitations" />
          <div className="mt-8">
            <AboutThisData />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Related Work" title="Read the full case studies" />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {relatedProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex flex-col justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <div>
                  <p className="text-xs text-muted-foreground">{project.category}</p>
                  <p className="mt-1 font-medium">{project.title}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  View case study
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-medium">
            Want analysis like this for your own data?
          </h2>
          <Button asChild size="lg">
            <Link href="/contact">
              Work With Felix
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
