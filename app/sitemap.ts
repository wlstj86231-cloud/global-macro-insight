import { MetadataRoute } from "next";
import { getSupabaseAdmin } from "@/lib/supabase-server";
export default async function sitemap():Promise<MetadataRoute.Sitemap> {
  const SITE_URL=process.env.NEXT_PUBLIC_SITE_URL||"https://your-domain.com";
  let entries:MetadataRoute.Sitemap=[];
  try{const {data}=await getSupabaseAdmin().from("articles").select("id,published_at").eq("is_premium",false).limit(100);
  if(data) entries=data.map(a=>({url:`${SITE_URL}/article/${a.id}`,lastModified:a.published_at?new Date(a.published_at):new Date()}));}catch{}
  return [{url:SITE_URL,lastModified:new Date(),changeFrequency:"hourly",priority:1},...entries];
}
