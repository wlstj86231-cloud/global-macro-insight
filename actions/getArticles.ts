"use server";
import { getSupabaseAdmin } from "@/lib/supabase-server";
export async function getArticles(filter?: string) {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("articles")
      .select("id,title,title_ko,content,content_ko,raw_url,is_premium,published_at,slug")
      .order("published_at", { ascending: false })
      .limit(20);
    if (error) { console.error("getArticles:", error); return []; }
    return data || [];
  } catch (e) {
    console.error("getArticles exception:", e);
    return [];
  }
}