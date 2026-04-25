"use server";

import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function getArticles(filter?: string) {
  try {
    let query = getSupabaseAdmin().from("articles").select("id,title,raw_url,is_premium,published_at,content").order("published_at",{ascending:false}).limit(20);
    if (filter==="premium") query=query.eq("is_premium",true);
    else if (filter==="free") query=query.eq("is_premium",false);
    const {data,error}=await query;
    if (error) return [];
    return data||[];
  } catch {return [];}
}
