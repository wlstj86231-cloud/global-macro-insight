import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";
export async function POST(request:Request) {
  try{
    const {email}=await request.json();
    if(!email||typeof email!=="string") return NextResponse.json({message:"invalid"},{status:400});
    const {error}=await getSupabaseAdmin().from("newsletters").insert([{email:email.toLowerCase().trim()}]);
    if(error&&error.code==="23505") return NextResponse.json({message:"already",code:"23505"},{status:400});
    if(error) return NextResponse.json({message:"error"},{status:500});
    return NextResponse.json({message:"Success"},{status:200});
  }catch(err){return NextResponse.json({message:"error"},{status:500});}
}
