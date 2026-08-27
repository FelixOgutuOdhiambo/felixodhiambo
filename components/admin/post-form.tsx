"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPost, updatePost, type PostInput } from "@/app/admin/actions";
import type { BlogPost } from "@/lib/supabase/types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function PostForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState<PostInput>({
    slug: post?.slug ?? "",
    title: post?.title ?? "",
    excerpt: post?.excerpt ?? "",
    category: post?.category ?? "",
    tags: post?.tags?.join(", ") ?? "",
    reading_time_minutes: post?.reading_time_minutes ?? null,
    cover_image_url: post?.cover_image_url ?? "",
    content: post?.content ?? "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        if (post) {
          await updatePost(post.id, values);
        } else {
          await createPost(values);
        }
        toast.success("Saved.");
        router.push("/admin/posts");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to save.");
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-5">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          required
          value={values.title}
          onChange={(e) => {
            const title = e.target.value;
            setValues((v) => ({
              ...v,
              title,
              slug: post ? v.slug : slugify(title),
            }));
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          required
          value={values.slug}
          onChange={(e) => setValues((v) => ({ ...v, slug: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          rows={2}
          required
          value={values.excerpt}
          onChange={(e) =>
            setValues((v) => ({ ...v, excerpt: e.target.value }))
          }
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={values.category}
            onChange={(e) =>
              setValues((v) => ({ ...v, category: e.target.value }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={values.tags}
            onChange={(e) => setValues((v) => ({ ...v, tags: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="reading_time">Reading time (minutes)</Label>
          <Input
            id="reading_time"
            type="number"
            min={1}
            value={values.reading_time_minutes ?? ""}
            onChange={(e) =>
              setValues((v) => ({
                ...v,
                reading_time_minutes: e.target.value
                  ? Number(e.target.value)
                  : null,
              }))
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cover_image_url">Cover image URL</Label>
          <Input
            id="cover_image_url"
            value={values.cover_image_url}
            onChange={(e) =>
              setValues((v) => ({ ...v, cover_image_url: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          rows={16}
          required
          value={values.content}
          onChange={(e) =>
            setValues((v) => ({ ...v, content: e.target.value }))
          }
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2 className="size-4 animate-spin" />}
        {post ? "Save changes" : "Create post"}
      </Button>
    </form>
  );
}
