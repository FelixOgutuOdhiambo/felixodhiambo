import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50"
    >
      <div className="flex items-start justify-between gap-4">
        <Badge
          variant="secondary"
          className="bg-muted text-muted-foreground font-normal"
        >
          {project.category}
        </Badge>
        <div className="flex items-center gap-2 text-muted-foreground">
          {project.githubUrl && <GithubIcon className="size-4" />}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      <h3 className="mt-4 font-serif text-xl font-medium tracking-tight text-balance">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground text-pretty">
        {project.summary}
      </p>

      <div className="mt-5 rounded-md bg-muted/60 px-3 py-2 text-sm">
        <span className="font-medium text-foreground">
          {project.results[0]}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5 pt-1">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
