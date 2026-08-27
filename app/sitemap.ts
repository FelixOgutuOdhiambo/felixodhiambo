import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";
import { PROJECTS } from "@/lib/content/projects";
import { getPublishedPosts } from "@/lib/supabase/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/projects",
    "/services",
    "/research",
    "/insights",
    "/cv",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  const posts = await getPublishedPosts();
  const postRoutes = posts.map((post) => ({
    url: `${SITE_URL}/insights/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
