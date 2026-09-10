import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/post-form";
import { SupabaseNotConfigured } from "@/components/admin/supabase-not-configured";
import { createServiceRoleClient, isServiceRoleConfigured } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/supabase/types";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isServiceRoleConfigured()) {
    return (
      <div>
        <h1 className="font-serif text-2xl font-medium">Edit post</h1>
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
    .eq("id", id)
    .maybeSingle();

  const post = data as BlogPost | null;
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium">Edit post</h1>
      <div className="mt-8">
        <PostForm post={post} />
      </div>
    </div>
  );
}
