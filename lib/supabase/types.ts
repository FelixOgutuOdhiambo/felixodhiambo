export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string | null;
  tags: string[];
  reading_time_minutes: number | null;
  cover_image_url: string | null;
  content: string;
  author: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  abstract: string | null;
  published_date: string | null;
  venue: string | null;
  doi: string | null;
  external_url: string | null;
  pdf_url: string | null;
  code_url: string | null;
  dataset_url: string | null;
  published: boolean;
  created_at: string;
};
