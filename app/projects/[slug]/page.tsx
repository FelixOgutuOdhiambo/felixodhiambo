import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";
import { getProjectBySlug, PROJECTS } from "@/lib/content/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
  };
}

function CaseStudySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default async function ProjectCaseStudyPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              All projects
            </Link>

            <Badge
              variant="secondary"
              className="mt-6 bg-muted text-muted-foreground font-normal"
            >
              {project.category}
            </Badge>
            <h1 className="mt-4 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-pretty text-muted-foreground">
              {project.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.githubUrl && (
                <Button asChild variant="outline" size="sm">
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon className="size-4" />
                    View on GitHub
                  </Link>
                </Button>
              )}
              {project.liveUrl && (
                <Button asChild size="sm">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live demo
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-4xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_260px] lg:px-8">
          <FadeIn className="space-y-12">
            <CaseStudySection title="Problem">
              <p className="text-pretty text-foreground/90">
                {project.problem}
              </p>
            </CaseStudySection>

            <CaseStudySection title="Context">
              <p className="text-pretty text-foreground/90">
                {project.context}
              </p>
            </CaseStudySection>

            <CaseStudySection title="Data">
              <p className="text-pretty text-foreground/90">
                {project.dataDescription}
              </p>
            </CaseStudySection>

            <CaseStudySection title="Approach">
              <ul className="space-y-2.5">
                {project.methodology.map((step) => (
                  <li key={step} className="flex items-start gap-2.5 text-foreground/90">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/60" />
                    {step}
                  </li>
                ))}
              </ul>
            </CaseStudySection>

            {project.pipeline && (
              <CaseStudySection title="Pipeline">
                <div className="flex flex-wrap items-center gap-2">
                  {project.pipeline.map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-xs">
                        {step}
                      </span>
                      {i < project.pipeline!.length - 1 && (
                        <ArrowUpRight className="size-3 rotate-45 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </CaseStudySection>
            )}

            <CaseStudySection title="Results">
              <ul className="space-y-2.5">
                {project.results.map((result) => (
                  <li
                    key={result}
                    className="rounded-md bg-muted/60 px-4 py-3 text-sm font-medium text-foreground"
                  >
                    {result}
                  </li>
                ))}
              </ul>
            </CaseStudySection>

            <CaseStudySection title="Impact">
              <p className="text-pretty text-foreground/90">{project.impact}</p>
            </CaseStudySection>

            <CaseStudySection title="Limitations">
              <p className="text-pretty text-sm text-muted-foreground">
                {project.limitations}
              </p>
            </CaseStudySection>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="sticky top-24 rounded-lg border border-border bg-card p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Technologies
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
