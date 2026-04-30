"use server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function getArticleBySlug(slug: string) {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();
    if (!error && data) return data;
    const id = parseInt(slug, 10);
    if (!isNaN(id)) {
      const { data: d2 } = await getSupabaseAdmin()
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();
      return d2 || null;
    }
    return null;
  } catch (e) {
    console.error("getArticleBySlug:", e);
    return null;
  }
}
