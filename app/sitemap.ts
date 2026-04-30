import { getSupabaseAdmin } from "@/lib/supabase-server";
import type { MetadataRoute } from "next";
const BASE = "https://global-macro-insight.vercel.app";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles: any[] = [];
  try {
    const { data } = await getSupabaseAdmin()
      .from("articles").select("slug,published_at")
      .not("slug","is",null)
      .order("published_at", { ascending: false });
    articles = data || [];
  } catch {}
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
  const articlePages: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${BASE}/article/${a.slug}`,
    lastModified: a.published_at ? new Date(a.published_at) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));
  return [...staticPages, ...articlePages];
}