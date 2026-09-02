import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PostRowActions } from "@/components/admin/post-row-actions";
import { SupabaseNotConfigured } from "@/components/admin/supabase-not-configured";
import { createServiceRoleClient, isServiceRoleConfigured } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  if (!isServiceRoleConfigured()) {
    return (
      <div>
        <h1 className="font-serif text-2xl font-medium">Posts</h1>
        <div className="mt-8">
          <SupabaseNotConfigured />
        </div>
      </div>
    );
  }

  const supabase = createServiceRoleClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  const posts = (data ?? []) as BlogPost[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-medium">Posts</h1>
        <Button asChild size="sm">
          <Link href="/admin/posts/new">
            <Plus className="size-4" />
            New post
          </Link>
        </Button>
      </div>

      {posts.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          No posts yet. Create the first one.
        </p>
      )}

      <div className="mt-6 space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{post.title}</p>
                <Badge variant={post.published ? "default" : "secondary"}>
                  {post.published ? "Published" : "Draft"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">/{post.slug}</p>
            </div>
            <PostRowActions id={post.id} published={post.published} />
          </div>
        ))}
      </div>
    </div>
  );
}
