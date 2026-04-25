"use server";

import { getSupabaseAdmin } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateArticle(id:number,data:{title:string,content:string,insight_memo:string,is_premium:boolean}) {
  const {error}=await getSupabaseAdmin().from("articles").update({title:data.title,content:data.content,insight_memo:data.insight_memo,is_premium:data.is_premium}).eq("id",id);
  if (error) return {success:false,error:error.message};
  revalidatePath("/admin");revalidatePath(`/article/${id}`);revalidatePath("/");redirect("/admin");
}
