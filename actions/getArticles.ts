"use server";
import { getSupabaseAdmin } from "@/lib/supabase-server";
export async function getArticles(category?: string) {
  try {
    let query = getSupabaseAdmin()
      .from("articles")
      .select("id,title,title_ko,content,content_ko,raw_url,is_premium,published_at,slug,insight_memo")
      .order("published_at", { ascending: false })
      .limit(20);
    if (category === "market") query = query.in("raw_url", [""]).or("raw_url.ilike.%bloomberg%,raw_url.ilike.%wsj%");
    const { data, error } = await query;
    if (error) { console.error("getArticles error:", error); return []; }
    return data || [];
  } catch (e) {
    console.error("getArticles exception:", e);
    return [];
  }
}
