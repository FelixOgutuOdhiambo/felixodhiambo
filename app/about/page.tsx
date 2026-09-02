import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { SectionHeader } from "@/components/section-header";
import { FadeIn } from "@/components/fade-in";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { CertificationsGrid } from "@/components/certifications-grid";
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
} from "@/lib/content/experience";
import { PERSON } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, experience, and education behind Felix Ogutu Odhiambo's work in aviation analytics.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Analytics grounded in operations, not just spreadsheets"
        description="Five-plus years turning aviation data into decisions, from a Nairobi-based analytics internship to network planning for a regional airline."
      />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          <FadeIn>
            <div className="overflow-hidden rounded-lg border border-border">
              <Image
                src="/images/people/felix-odhiambo.png"
                alt="Portrait of Felix Ogutu Odhiambo"
                width={497}
                height={502}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-4 text-pretty">
            <p className="text-lg text-foreground/90">
              I&apos;m an aviation analytics professional based in{" "}
              {PERSON.location}, with {PERSON.yearsExperience}+ years working
              across data analysis, safety performance, and network planning
              in East African aviation.
            </p>
            <p className="text-muted-foreground">
              I hold a Bachelor of Applied Science in Statistics from{" "}
              {EDUCATION[0].institution} and began my career as a Data
              Analyst Intern at Astral Aviation, building an Excel-based error
              detection system that cut data inaccuracies by half. I moved
              into a full Data Analyst role, where I spent two years turning
              Safety Management System data into dashboards and automating
              manual reporting processes.
            </p>
            <p className="text-muted-foreground">
              Since December 2023, I&apos;ve worked as a Network Analyst at
              JamboJet, monitoring market trends, reporting on-time
              performance, and coordinating multi-month flight schedules on
              Azure. Alongside my employed work, I built an independent
              research pipeline analysing CO₂ emissions across European
              aviation using public Eurocontrol data. See the{" "}
              <Link
                href="/projects/european-aviation-emissions"
                className="text-primary hover:underline"
              >
                full case study
              </Link>
              .
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Career" title="Professional experience" />
          <div className="mt-10 max-w-3xl">
            <ExperienceTimeline items={EXPERIENCE} />
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Education" title="Academic background" />
          <div className="mt-8 max-w-2xl space-y-3">
            {EDUCATION.map((ed) => (
              <div
                key={ed.qualification}
                className="rounded-lg border border-border bg-card p-5"
              >
                <p className="font-serif text-lg font-medium">
                  {ed.qualification}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {ed.institution} · {ed.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Certifications"
            title="Professional credentials"
          />
          <div className="mt-8">
            <CertificationsGrid items={CERTIFICATIONS} />
          </div>
        </div>
      </section>
    </>
  );
}
