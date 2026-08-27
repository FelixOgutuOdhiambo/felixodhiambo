"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DataLabFilters } from "@/components/data-lab/data-lab-filters";
import { DataLabMetrics } from "@/components/data-lab/data-lab-metrics";
import { DataLabGauge } from "@/components/data-lab/data-lab-gauge";
import { DataLabPrimaryChart } from "@/components/data-lab/data-lab-primary-chart";
import { DataLabCategoryChart } from "@/components/data-lab/data-lab-category-chart";
import { DataLabCategoryDonut } from "@/components/data-lab/data-lab-category-donut";
import { DataLabTable } from "@/components/data-lab/data-lab-table";
import { DataLabInsights } from "@/components/data-lab/data-lab-insights";
import {
  DEFAULT_FILTERS,
  averageByCategory,
  filterMetrics,
  getEnrichedMetrics,
  getFilterOptions,
  summariseMetrics,
  type MetricFilters,
} from "@/lib/analytics/metrics";
import { generateInsights } from "@/lib/analytics/insights";

const ALL_METRICS = getEnrichedMetrics();
const FILTER_OPTIONS = getFilterOptions(ALL_METRICS);
const CATEGORY_AVERAGES = averageByCategory(ALL_METRICS);

export function DataLab() {
  const [filters, setFilters] = useState<MetricFilters>(DEFAULT_FILTERS);

  const filtered = useMemo(() => filterMetrics(ALL_METRICS, filters), [filters]);
  const summary = useMemo(() => summariseMetrics(filtered), [filtered]);
  const insights = useMemo(
    () => generateInsights(filtered, summary, filters, ALL_METRICS.length),
    [filtered, summary, filters]
  );
  const filteredCategoryAverages = useMemo(
    () => averageByCategory(filtered),
    [filtered]
  );

  const isFiltered =
    filters.projectSlug !== "all" ||
    filters.category !== "all" ||
    filters.direction !== "all";

  return (
    <div className="space-y-10">
      <DataLabFilters
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(DEFAULT_FILTERS)}
        projectOptions={FILTER_OPTIONS.projects}
        categoryOptions={FILTER_OPTIONS.categories}
        isFiltered={isFiltered}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={JSON.stringify(filters)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            <DataLabMetrics summary={summary} />
            <DataLabGauge
              value={summary.averageValue}
              label="Average change (filtered)"
            />
          </div>

          <div>
            <h3 className="font-serif text-lg font-medium">Measured outcomes</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Click a bar to filter by its project.
            </p>
            <div className="mt-4 rounded-lg border border-border bg-card p-6">
              <DataLabPrimaryChart
                metrics={filtered}
                selectedProjectSlug={filters.projectSlug}
                onSelectProject={(projectSlug) =>
                  setFilters((f) => ({
                    ...f,
                    projectSlug: f.projectSlug === projectSlug ? "all" : projectSlug,
                  }))
                }
              />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-serif text-lg font-medium">
                Average change by category
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Full dataset, for context.
              </p>
              <div className="mt-4 rounded-lg border border-border bg-card p-6">
                <DataLabCategoryChart data={CATEGORY_AVERAGES} />
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg font-medium">
                Share of outcomes by category
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {isFiltered ? "Within the current filter." : "Full dataset."}
              </p>
              <div className="mt-4 rounded-lg border border-border bg-card p-6">
                {filteredCategoryAverages.length > 0 ? (
                  <DataLabCategoryDonut data={filteredCategoryAverages} />
                ) : (
                  <p className="py-10 text-center text-sm text-muted-foreground">
                    No records match the selected filters.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-medium">Detail view</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Every outcome behind the charts above.
            </p>
            <div className="mt-4">
              <DataLabTable metrics={filtered} />
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-medium">What the data shows</h3>
            <div className="mt-4">
              <DataLabInsights insights={insights} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
