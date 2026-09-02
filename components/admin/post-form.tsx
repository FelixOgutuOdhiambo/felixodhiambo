"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createPost,
  updatePost,
  uploadBlogCoverImage,
  type PostInput,
} from "@/app/admin/actions";
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
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

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.set("file", file);

    startTransition(async () => {
      try {
        const url = await uploadBlogCoverImage(formData);
        setValues((v) => ({ ...v, cover_image_url: url }));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Upload failed.");
      } finally {
        setIsUploading(false);
      }
    });
  };

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

      <div className="space-y-2">
        <Label htmlFor="reading_time">Reading time (minutes)</Label>
        <Input
          id="reading_time"
          type="number"
          min={1}
          className="max-w-40"
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
        <Label>Cover image</Label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          onChange={onFileSelected}
        />

        {values.cover_image_url ? (
          <div className="relative w-full max-w-sm overflow-hidden rounded-lg border border-border">
            <Image
              src={values.cover_image_url}
              alt="Cover"
              width={640}
              height={360}
              className="aspect-video w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity hover:opacity-100">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
              >
                Replace
              </Button>
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() => setValues((v) => ({ ...v, cover_image_url: "" }))}
                aria-label="Remove cover image"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full max-w-sm cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-10 text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <ImagePlus className="size-5" />
            )}
            {isUploading ? "Uploading..." : "Click to upload an image"}
          </button>
        )}
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

      <Button type="submit" disabled={isPending || isUploading}>
        {isPending && <Loader2 className="size-4 animate-spin" />}
        {post ? "Save changes" : "Create post"}
      </Button>
    </form>
  );
}
