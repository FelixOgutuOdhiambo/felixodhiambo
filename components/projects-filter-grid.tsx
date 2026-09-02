"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { PROJECT_CATEGORIES, type Project } from "@/lib/content/projects";

export function ProjectsFilterGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active),
    [active, projects]
  );

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        {["All", ...PROJECT_CATEGORIES].map((category) => (
          <Button
            key={category}
            size="sm"
            variant={active === category ? "default" : "outline"}
            aria-pressed={active === category}
            onClick={() => setActive(category)}
            className="cursor-pointer rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-sm text-muted-foreground">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
