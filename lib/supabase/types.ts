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
