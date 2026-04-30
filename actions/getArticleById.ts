"use server";
import { getSupabaseAdmin } from "@/lib/supabase-server";
export async function getArticleById(id: number) {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("articles")
      .select("*")
      .eq("id", id)
      .single();
    if (error) { console.error("getArticleById:", error); return null; }
    return data;
  } catch (e) {
    console.error("getArticleById exception:", e);
    return null;
  }
}