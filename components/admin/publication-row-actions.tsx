"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deletePublication, togglePublishPublication } from "@/app/admin/actions";

export function PublicationRowActions({
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
        onClick={() =>
          startTransition(() => togglePublishPublication(id, !published))
        }
      >
        {isPending && <Loader2 className="size-3.5 animate-spin" />}
        {published ? "Unpublish" : "Publish"}
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/publications/${id}`} aria-label="Edit publication">
          <Pencil className="size-4" />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        disabled={isPending}
        aria-label="Delete publication"
        onClick={() => {
          if (confirm("Delete this publication? This cannot be undone.")) {
            startTransition(() => deletePublication(id));
          }
        }}
      >
        <Trash2 className="size-4 text-destructive" />
      </Button>
    </div>
  );
}
