import { createPublicClient } from "./public";
import type { Publication } from "./types";

export async function getPublishedPublications(): Promise<Publication[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .eq("published", true)
      .order("published_date", { ascending: false, nullsFirst: false });

    if (error) throw error;
    return data ?? [];
  } catch (error) {
    // Supabase not configured yet, or the table is empty — treat both as
    // "no publications", not a crash.
    console.error("Failed to load publications:", error);
    return [];
  }
}
