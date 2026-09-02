import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import type { Certification } from "@/lib/content/experience";

export function CertificationsGrid({ items }: { items: Certification[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((cert) => (
        <li
          key={cert.name}
          className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
        >
          <BadgeCheck className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            {cert.url ? (
              <Link
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-primary hover:underline"
              >
                {cert.name}
              </Link>
            ) : (
              <p className="text-sm font-medium">{cert.name}</p>
            )}
            <p className="text-xs text-muted-foreground">{cert.provider}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
