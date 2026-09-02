import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { FadeIn } from "@/components/fade-in";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Aviation network, safety, data quality, and sustainability analytics services offered by Felix Ogutu Odhiambo.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Analytics support for aviation and data-driven teams"
        description="Engagements built directly on the same work delivered inside Astral Aviation, JamboJet, and independent research, not a generic service menu."
      />

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {SERVICES.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-lg border border-border bg-card p-7">
                  <service.icon className="size-6 text-primary" />
                  <h2 className="mt-4 font-serif text-xl font-medium">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm text-pretty text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-foreground/90"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
                    Ideal for: {service.idealFor}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-16 flex flex-col items-center gap-4 rounded-lg border border-border bg-muted/40 p-10 text-center">
            <h2 className="font-serif text-2xl font-medium">
              Have a different analytics problem?
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              If it involves aviation, operations, or data quality, it&apos;s
              probably a good fit. Reach out and describe what you&apos;re
              working on.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">
                Start a conversation
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
