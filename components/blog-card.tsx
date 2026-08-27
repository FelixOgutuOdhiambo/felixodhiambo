import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/lib/supabase/types";

export function BlogCard({ post }: { post: BlogPost }) {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50"
    >
      {post.cover_image_url && (
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={post.cover_image_url}
            alt=""
            width={640}
            height={360}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {post.category && <span>{post.category}</span>}
          {post.category && date && <span aria-hidden="true">·</span>}
          {date && <span>{date}</span>}
          {post.reading_time_minutes && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.reading_time_minutes} min read</span>
            </>
          )}
        </div>
        <h3 className="mt-3 font-serif text-lg font-medium text-balance">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-pretty text-muted-foreground">
          {post.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          Read article
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
