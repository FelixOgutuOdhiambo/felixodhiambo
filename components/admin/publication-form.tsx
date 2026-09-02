"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileText, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  createPublication,
  updatePublication,
  uploadPublicationFile,
  type PublicationInput,
} from "@/app/admin/actions";
import type { Publication } from "@/lib/supabase/types";

export function PublicationForm({ publication }: { publication?: Publication }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [values, setValues] = useState<PublicationInput>({
    title: publication?.title ?? "",
    authors: publication?.authors?.join(", ") ?? "",
    abstract: publication?.abstract ?? "",
    published_date: publication?.published_date ?? "",
    venue: publication?.venue ?? "",
    doi: publication?.doi ?? "",
    external_url: publication?.external_url ?? "",
    pdf_url: publication?.pdf_url ?? "",
    code_url: publication?.code_url ?? "",
    dataset_url: publication?.dataset_url ?? "",
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
        const url = await uploadPublicationFile(formData);
        setValues((v) => ({ ...v, pdf_url: url }));
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
        if (publication) {
          await updatePublication(publication.id, values);
        } else {
          await createPublication(values);
        }
        toast.success("Saved.");
        router.push("/admin/publications");
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
          onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="authors">Authors (comma-separated)</Label>
        <Input
          id="authors"
          placeholder="Felix Ogutu Odhiambo, ..."
          value={values.authors}
          onChange={(e) => setValues((v) => ({ ...v, authors: e.target.value }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="abstract">Abstract</Label>
        <Textarea
          id="abstract"
          rows={4}
          value={values.abstract}
          onChange={(e) => setValues((v) => ({ ...v, abstract: e.target.value }))}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="venue">Venue</Label>
          <Input
            id="venue"
            placeholder="Journal, conference, or publisher"
            value={values.venue}
            onChange={(e) => setValues((v) => ({ ...v, venue: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="published_date">Published date</Label>
          <Input
            id="published_date"
            type="date"
            value={values.published_date}
            onChange={(e) =>
              setValues((v) => ({ ...v, published_date: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="doi">DOI</Label>
          <Input
            id="doi"
            placeholder="10.xxxx/xxxxx"
            value={values.doi}
            onChange={(e) => setValues((v) => ({ ...v, doi: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="external_url">External URL</Label>
          <Input
            id="external_url"
            type="url"
            value={values.external_url}
            onChange={(e) =>
              setValues((v) => ({ ...v, external_url: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="code_url">Code URL</Label>
          <Input
            id="code_url"
            type="url"
            value={values.code_url}
            onChange={(e) => setValues((v) => ({ ...v, code_url: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dataset_url">Dataset URL</Label>
          <Input
            id="dataset_url"
            type="url"
            value={values.dataset_url}
            onChange={(e) =>
              setValues((v) => ({ ...v, dataset_url: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>PDF</Label>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={onFileSelected}
        />

        {values.pdf_url ? (
          <div className="flex max-w-sm items-center justify-between gap-3 rounded-lg border border-border p-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <FileText className="size-4 shrink-0 text-primary" />
              <a
                href={values.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-sm text-primary hover:underline"
              >
                View uploaded PDF
              </a>
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => setValues((v) => ({ ...v, pdf_url: "" }))}
              aria-label="Remove PDF"
            >
              <X className="size-4" />
            </Button>
          </div>
        ) : (
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full max-w-sm cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border py-6 text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground disabled:cursor-not-allowed"
          >
            {isUploading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Upload className="size-4" />
            )}
            {isUploading ? "Uploading..." : "Click to upload a PDF"}
          </button>
        )}
      </div>

      <Button type="submit" disabled={isPending || isUploading}>
        {isPending && <Loader2 className="size-4 animate-spin" />}
        {publication ? "Save changes" : "Create publication"}
      </Button>
    </form>
  );
}
