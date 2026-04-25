import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSupabaseAdmin } from "@/lib/supabase-server";
export async function POST(request:Request) {
  try {
    const session=await getServerSession(authOptions);
    if(!session?.user?.email) return NextResponse.json({message:"unauthorized"},{status:401});
    const {imp_uid,merchant_uid,plan,amount}=await request.json();
    if(!imp_uid||!merchant_uid||!plan||!amount) return NextResponse.json({message:"invalid"},{status:400});
    const supabase=getSupabaseAdmin();
    await supabase.from("users").update({role:"premium"}).eq("email",session.user.email);
    const now=new Date();
    const expiresAt=new Date(now);
    if(plan==="yearly") expiresAt.setFullYear(expiresAt.getFullYear()+1);
    else expiresAt.setMonth(expiresAt.getMonth()+1);
    await supabase.from("subscriptions").insert([{email:session.user.email,imp_uid,merchant_uid,plan,amount,started_at:now.toISOString(),expires_at:expiresAt.toISOString(),status:"active"}]);
    return NextResponse.json({message:"Success",expires_at:expiresAt.toISOString()},{status:200});
  }catch(err){return NextResponse.json({message:"error"},{status:500});}
}
