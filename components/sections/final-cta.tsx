import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-espresso text-oat">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,var(--oat)_1px,transparent_1px),linear-gradient(to_bottom,var(--oat)_1px,transparent_1px)] [background-size:56px_56px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            Let&apos;s work together
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            Have data that should be driving better decisions?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-oat/70">
            Open to consulting engagements, analytics roles, and
            collaboration on aviation, network, and sustainability data
            projects.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Work With Me
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-oat/30 bg-transparent text-oat hover:bg-oat/10 hover:text-oat"
            >
              <Link href="/cv">View CV</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
