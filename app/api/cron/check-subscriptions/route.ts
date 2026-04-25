import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";
export async function GET(request:Request) {
  const authHeader=request.headers.get("authorization");
  const cronSecret=process.env.CRON_SECRET;
  if(!cronSecret||authHeader!==`Bearer ${cronSecret}`)
    return NextResponse.json({message:"Unauthorized"},{status:401});
  try{
    const supabase=getSupabaseAdmin();
    const now=new Date().toISOString();
    const {data:expired}=await supabase.from("subscriptions").select("email,id").eq("status","active").lt("expires_at",now);
    if(!expired||expired.length===0) return NextResponse.json({message:"no one",count:0});
    const emails=[...new Set(expired.map(s=>s.email))];
    await supabase.from("users").update({role:"free"}).in("name",emails);
    await supabase.from("subscriptions").update({status:"expired"}).in("id",expired.map(s=>s.id));
    return NextResponse.json({message:"ok",count:emails.length});
  }catch(err){return NextResponse.json({message:"error"},{status:500});}
}
