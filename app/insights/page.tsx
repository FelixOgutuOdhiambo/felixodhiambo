import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { BlogCard } from "@/components/blog-card";
import { getPublishedPosts } from "@/lib/supabase/blog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Articles and technical writing on aviation, data, and analytics by Felix Ogutu Odhiambo.",
};

export default async function InsightsPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Writing on data, aviation, and analytics"
        description="Long-form articles on the analytics work behind the projects, published as they're written, not on a schedule."
      />

      <section>
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border py-20 text-center">
              <Newspaper className="size-8 text-muted-foreground" />
              <p className="font-serif text-lg font-medium">
                First articles coming soon
              </p>
              <p className="max-w-sm text-sm text-muted-foreground">
                Long-form writing on aviation and analytics is in progress.
                Check back shortly.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
