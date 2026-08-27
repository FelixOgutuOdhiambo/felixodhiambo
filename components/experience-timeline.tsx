import Link from "next/link";
import type { ExperienceItem } from "@/lib/content/experience";

export function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="space-y-10">
      {items.map((item) => (
        <li
          key={`${item.company}-${item.role}`}
          className="relative border-l border-border pl-6"
        >
          <span
            className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-primary"
            aria-hidden="true"
          />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-serif text-lg font-medium">{item.role}</h3>
            <span className="font-mono text-xs text-muted-foreground">
              {item.start} – {item.end}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            <Link
              href={item.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary hover:underline"
            >
              {item.company}
            </Link>{" "}
            · {item.location}
          </p>
          <ul className="mt-3 space-y-2">
            {item.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-sm text-foreground/90"
              >
                <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/50" />
                {highlight}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
