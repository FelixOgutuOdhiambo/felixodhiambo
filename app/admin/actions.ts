"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";

/**
 * Every admin Server Action re-checks the session itself. The proxy
 * (proxy.ts) already blocks unauthenticated page loads, but Server
 * Actions are independently callable endpoints and must not rely on that
 * alone — see Next.js's forms guide on verifying auth inside each action.
 */
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export type PostInput = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string;
  reading_time_minutes: number | null;
  cover_image_url: string;
  content: string;
};

export async function createPost(input: PostInput) {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const { error } = await supabase.from("blog_posts").insert({
    slug: input.slug,
    title: input.title,
    excerpt: input.excerpt,
    category: input.category || null,
    tags: input.tags
      ? input.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    reading_time_minutes: input.reading_time_minutes,
    cover_image_url: input.cover_image_url || null,
    content: input.content,
    published: false,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/posts");
}

export async function updatePost(id: string, input: PostInput) {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const { error } = await supabase
    .from("blog_posts")
    .update({
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      category: input.category || null,
      tags: input.tags
        ? input.tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      reading_time_minutes: input.reading_time_minutes,
      cover_image_url: input.cover_image_url || null,
      content: input.content,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/posts");
  revalidatePath(`/insights/${input.slug}`);
}

export async function togglePublish(id: string, published: boolean) {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const { error } = await supabase
    .from("blog_posts")
    .update({
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/posts");
  revalidatePath("/insights");
}

export async function deletePost(id: string) {
  await requireAdmin();
  const supabase = createServiceRoleClient();

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/posts");
  revalidatePath("/insights");
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export async function uploadBlogCoverImage(formData: FormData) {
  await requireAdmin();

  const file = formData.get("file");
  if (!(file instanceof File)) throw new Error("No file provided.");
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Unsupported file type. Use PNG, JPEG, WebP, or GIF.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image is too large (max 5MB).");
  }

  const supabase = createServiceRoleClient();
  const ext = file.name.split(".").pop() || "png";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("blog-images")
    .upload(path, file, { contentType: file.type });

  if (error) throw new Error(error.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from("blog-images").getPublicUrl(path);

  return publicUrl;
}
