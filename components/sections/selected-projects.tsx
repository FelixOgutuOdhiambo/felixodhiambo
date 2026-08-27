import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { ProjectCard } from "@/components/project-card";
import { FadeIn } from "@/components/fade-in";
import { PROJECTS } from "@/lib/content/projects";

export function SelectedProjects() {
  const featured = PROJECTS.filter((p) => p.featured);

  return (
    <section id="projects" className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Selected Work"
            title="Analytics that changed operational outcomes"
            description="Each project below is grounded in real data, a defined problem, and a measured result, not a portfolio filler piece."
          />
          <Link
            href="/projects"
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View all projects
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.08}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
