import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectsFilterGrid } from "@/components/projects-filter-grid";
import { PROJECTS } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Aviation and data analytics projects by Felix Ogutu Odhiambo: network analytics, safety performance, and sustainability research.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Analytics work, grounded in real data"
        description="Every project here documents a real problem, real data, and a measured result. Filter by category to explore."
      />
      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <ProjectsFilterGrid projects={PROJECTS} />
        </div>
      </section>
    </>
  );
}
