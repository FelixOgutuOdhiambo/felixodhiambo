import Link from "next/link";
import { ExternalLink, FileText, Database } from "lucide-react";
import { GithubIcon } from "@/components/icons/brand-icons";
import type { Publication } from "@/lib/supabase/types";

export function PublicationCard({ publication }: { publication: Publication }) {
  const date = publication.published_date
    ? new Date(publication.published_date).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <article className="rounded-lg border border-border bg-card p-6 sm:p-8">
      <h3 className="font-serif text-xl font-medium text-balance">
        {publication.title}
      </h3>

      {publication.authors.length > 0 && (
        <p className="mt-2 text-sm text-muted-foreground">
          {publication.authors.join(", ")}
        </p>
      )}

      <p className="mt-1 text-xs text-muted-foreground">
        {[publication.venue, date].filter(Boolean).join(" · ")}
      </p>

      {publication.abstract && (
        <p className="mt-4 text-sm text-pretty text-foreground/90">
          {publication.abstract}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-4">
        {publication.doi && (
          <Link
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ExternalLink className="size-3.5" />
            DOI
          </Link>
        )}
        {publication.external_url && (
          <Link
            href={publication.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <ExternalLink className="size-3.5" />
            View
          </Link>
        )}
        {publication.pdf_url && (
          <Link
            href={publication.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <FileText className="size-3.5" />
            PDF
          </Link>
        )}
        {publication.code_url && (
          <Link
            href={publication.code_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <GithubIcon className="size-3.5" />
            Code
          </Link>
        )}
        {publication.dataset_url && (
          <Link
            href={publication.dataset_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <Database className="size-3.5" />
            Dataset
          </Link>
        )}
      </div>
    </article>
  );
}
