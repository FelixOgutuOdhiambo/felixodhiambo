"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MetricFilters } from "@/lib/analytics/metrics";

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div
        className="mt-2 flex flex-wrap gap-2"
        role="group"
        aria-label={`Filter by ${label.toLowerCase()}`}
      >
        {options.map((option) => (
          <Button
            key={option.value}
            type="button"
            size="sm"
            variant={value === option.value ? "default" : "outline"}
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className="cursor-pointer rounded-full"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function DataLabFilters({
  filters,
  onChange,
  onReset,
  projectOptions,
  categoryOptions,
  isFiltered,
}: {
  filters: MetricFilters;
  onChange: (filters: MetricFilters) => void;
  onReset: () => void;
  projectOptions: { slug: string; title: string }[];
  categoryOptions: string[];
  isFiltered: boolean;
}) {
  return (
    <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <FilterGroup
          label="Project"
          value={filters.projectSlug}
          onChange={(projectSlug) =>
            onChange({ ...filters, projectSlug, category: "all" })
          }
          options={[
            { value: "all", label: "All projects" },
            ...projectOptions.map((p) => ({ value: p.slug, label: p.title })),
          ]}
        />

        {isFiltered && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="cursor-pointer shrink-0 text-muted-foreground"
          >
            <RotateCcw className="size-3.5" />
            Reset filters
          </Button>
        )}
      </div>

      <FilterGroup
        label="Category"
        value={filters.category}
        onChange={(category) =>
          onChange({ ...filters, category, projectSlug: "all" })
        }
        options={[
          { value: "all", label: "All categories" },
          ...categoryOptions.map((c) => ({ value: c, label: c })),
        ]}
      />

      <FilterGroup
        label="Direction"
        value={filters.direction}
        onChange={(direction) =>
          onChange({ ...filters, direction: direction as MetricFilters["direction"] })
        }
        options={[
          { value: "all", label: "All" },
          { value: "up", label: "Increased" },
          { value: "down", label: "Reduced" },
        ]}
      />
    </div>
  );
}
