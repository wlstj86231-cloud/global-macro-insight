"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { updateArticle } from "@/actions/updateArticle";
import { Crown } from "lucide-react";
export function EditArticleForm({article}: {article:any}) {
  const [title,setTitle]=useState(article.title||"");
  const [content,setContent]=useState(article.content||"");
  const [insightMemo,setInsightMemo]=useState(article.insight_memo||"");
  const [isPremium,setIsPremium]=useState(article.is_premium||false);
  const handleSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    await updateArticle(article.id,{title,content,insight_memo:insightMemo,is_premium:isPremium});
  };
  return(<form onSubmit={handleSubmit} className="space-y-6 max-w-4xl"><div><Label>기사 제목</Label><Input value={title} onChange={e=>setTitle(e.target.value)} required/></div><div className="flex items-center gap-2"><Checkbox checked={isPremium} onCheckedChange={v=>setIsPremium(!!v)}/><Label><Crown size={14}/>프리미엄 PRO</Label></div><div><Label>기사 본문</Label><textarea className="w-full h-64 border rounded p-2" value={content} onChange={e=>setContent(e.target.value)}/></div><div><Label>할널리스트 뉴스</Label><textarea className="w-full h-48 border rounded p-2" value={insightMemo} onChange={e=>setInsightMemo(e.target.value)}/></div><Button type="submit">수정 완냌</Button></form>);
}
