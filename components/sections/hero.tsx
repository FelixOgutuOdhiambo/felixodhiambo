import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroReveal } from "@/components/hero-reveal";
import { PERSON } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_40%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <HeroReveal>
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span className="inline-block size-1.5 rounded-full bg-primary" />
              {PERSON.location} · NBO
            </p>

            <h1 className="mt-6 text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Felix Ogutu Odhiambo
            </h1>

            <p className="mt-6 max-w-xl text-xl text-pretty text-foreground/90 sm:text-2xl">
              {PERSON.positioning}
            </p>

            <p className="mt-4 max-w-xl text-base text-pretty text-muted-foreground">
              {PERSON.supportingCopy}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href="/projects">
                  Explore My Work
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Work With Me</Link>
              </Button>
            </div>
          </HeroReveal>

          <HeroReveal delay={0.15} className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 -z-10 rounded-lg border border-primary/20" />
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <Image
                src="/images/people/felix-odhiambo.png"
                alt="Portrait of Felix Ogutu Odhiambo"
                width={497}
                height={502}
                priority
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 rounded-md border border-border bg-card px-4 py-3 shadow-sm">
              <p className="font-serif text-2xl font-medium leading-none">
                {PERSON.yearsExperience}+
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Years in aviation analytics
              </p>
            </div>
          </HeroReveal>
        </div>
      </div>
    </section>
  );
}
