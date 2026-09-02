import { FadeIn } from "@/components/fade-in";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight text-balance sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-xl text-base text-pretty text-muted-foreground">
              {description}
            </p>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
