import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { FadeIn } from "@/components/fade-in";
import { TESTIMONIALS } from "@/lib/content/testimonials";

export function Testimonials() {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Recommendations"
          title="What colleagues say"
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-lg border border-border bg-card p-8">
                <Quote className="size-6 text-primary/40" />
                <blockquote className="mt-4 flex-1 text-sm text-pretty text-foreground/90">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="size-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.title},{" "}
                      <Link
                        href={t.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary hover:underline"
                      >
                        {t.company}
                      </Link>
                    </p>
                  </div>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
