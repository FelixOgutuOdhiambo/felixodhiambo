import { createPublicClient } from "./public";
import type { BlogPost } from "./types";

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  } catch (error) {
    // Supabase not configured yet, or the table is empty — treat both as
    // "no posts", not a crash. The insights page renders an honest empty
    // state either way.
    console.error("Failed to load blog posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Failed to load blog post:", error);
    return null;
  }
}
