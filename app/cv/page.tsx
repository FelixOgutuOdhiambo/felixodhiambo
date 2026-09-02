import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionHeader } from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { CertificationsGrid } from "@/components/certifications-grid";
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
} from "@/lib/content/experience";
import { PROJECTS } from "@/lib/content/projects";
import { CV_DOWNLOAD_URL, PERSON } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "CV",
  description: "Online CV and downloadable résumé for Felix Ogutu Odhiambo.",
};

export default function CvPage() {
  return (
    <>
      <PageHeader
        eyebrow="CV"
        title="Curriculum Vitae"
        description="An online, always-current version of my résumé. Download the PDF below for the offline copy."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card p-6">
            <div>
              <p className="font-serif text-lg font-medium">{PERSON.name}</p>
              <p className="text-sm text-muted-foreground">
                {PERSON.role} · {PERSON.location}
              </p>
              <p className="text-sm text-muted-foreground">{PERSON.email}</p>
            </div>
            <Button asChild>
              <Link href={CV_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
                <Download className="size-4" />
                Download CV
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-pretty text-foreground/90">
            {PERSON.positioning} {PERSON.supportingCopy}
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Experience" title="Professional experience" />
          <div className="mt-8">
            <ExperienceTimeline items={EXPERIENCE} />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Education" title="Education" />
          <div className="mt-6 space-y-3">
            {EDUCATION.map((ed) => (
              <div key={ed.qualification}>
                <p className="font-medium">{ed.qualification}</p>
                <p className="text-sm text-muted-foreground">
                  {ed.institution} · {ed.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Certifications" title="Certifications" />
          <div className="mt-6">
            <CertificationsGrid items={CERTIFICATIONS} />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Projects" title="Selected projects" />
          <ul className="mt-6 space-y-4">
            {PROJECTS.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-medium hover:text-primary hover:underline"
                >
                  {project.title}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {project.summary}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
