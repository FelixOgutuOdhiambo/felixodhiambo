import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionHeader } from "@/components/section-header";
import { FadeIn } from "@/components/fade-in";
import { getProjectBySlug } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Independent research and analytics pipelines by Felix Ogutu Odhiambo, including a Eurocontrol-based European aviation emissions study.",
};

export default function ResearchPage() {
  const emissionsProject = getProjectBySlug("european-aviation-emissions")!;

  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Independent research & analytics pipelines"
        description="Self-directed work built on public aviation datasets, structured with the same rigour as production analytics."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Research Project" title="Current work" />

          <FadeIn className="mt-10 max-w-3xl">
            <div className="rounded-lg border border-border bg-card p-8">
              <FlaskConical className="size-6 text-primary" />
              <h3 className="mt-4 font-serif text-xl font-medium">
                {emissionsProject.title}
              </h3>
              <p className="mt-2 text-sm text-pretty text-muted-foreground">
                {emissionsProject.summary}
              </p>
              <Link
                href={`/projects/${emissionsProject.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Read the full case study
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Publications"
            title="Papers & formal publications"
          />
          <p className="mt-6 max-w-xl text-sm text-muted-foreground">
            No formal papers or peer-reviewed publications yet. This section
            will be updated as research work is published.
          </p>
        </div>
      </section>
    </>
  );
}
