import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { getPostBySlug, getPublishedPosts } from "@/lib/supabase/blog";

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function InsightArticlePage({
  params,
}: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <article>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <FadeIn>
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              All insights
            </Link>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
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
            <h1 className="mt-3 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              By {post.author}
            </p>
          </FadeIn>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <FadeIn
            className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-serif prose-a:text-primary"
          >
            <div style={{ whiteSpace: "pre-wrap" }}>{post.content}</div>
          </FadeIn>
        </div>
      </section>
    </article>
  );
}
