"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deletePost, togglePublish } from "@/app/admin/actions";

export function PostRowActions({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={() => startTransition(() => togglePublish(id, !published))}
      >
        {isPending && <Loader2 className="size-3.5 animate-spin" />}
        {published ? "Unpublish" : "Publish"}
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/posts/${id}`} aria-label="Edit post">
          <Pencil className="size-4" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        disabled={isPending}
        aria-label="Delete post"
        onClick={() => {
          if (confirm("Delete this post? This cannot be undone.")) {
            startTransition(() => deletePost(id));
          }
        }}
      >
        <Trash2 className="size-4 text-destructive" />
      </Button>
    </div>
  );
}
