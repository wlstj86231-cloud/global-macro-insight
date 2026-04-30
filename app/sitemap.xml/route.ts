import { getSupabaseAdmin } from "@/lib/supabase-server";
export async function GET() {
  const base = "https://global-macro-insight.vercel.app";
  let articles: any[] = [];
  try {
    const { data } = await getSupabaseAdmin()
      .from("articles").select("slug,published_at")
      .order("published_at", { ascending: false });
    articles = data || [];
  } catch {}
  const pages = [
    `<url><loc>${base}/</loc><changefreq>hourly</changefreq><priority>1.0</priority></url>`,
    `<url><loc>${base}/about</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`,
    ...articles.filter(a => a.slug).map(a =>
      `<url><loc>${base}/article/${a.slug}</loc><lastmod>${(a.published_at||"").split("T")[0]}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`
    )
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml", "Cache-Control": "s-maxage=3600" } }
  );
}