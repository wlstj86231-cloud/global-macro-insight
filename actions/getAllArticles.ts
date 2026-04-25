"use server";

import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function getAllArticles() {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("articles")
      .select("id, title, raw_url, is_premium, published_at")
      .order("id", { ascending: false });
    if (error) { console.error(error); return []; }
    return data || [];
  } catch (err) { return []; }
}
