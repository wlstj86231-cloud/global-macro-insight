import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Crown, ExternalLink } from "lucide-react";
export interface ArticleCardProps {
  id:number; title:string; is_premium:boolean; published_at:string; raw_url:string; content?:string;
}
function getSourceTag(url:string) {
  if(!url) return {label:"Other",color:"bg-muted text-muted-foreground"};
  if(url.includes("wsj.com")||url.includes("a.dj.com")) return {label:"WSJ",color:"bg-blue-50 text-blue-700"};
  if(url.includes("bloomberg.com")) return {label:"Bloomberg",color:"bg-purple-50 text-purple-700"};
  return {label:"Other",color:"bg-muted text-muted-foreground"};
}
export function ArticleCard({id,title,is_premium,published_at,raw_url,content}:ArticleCardProps) {
  const formattedDate=published_at?format(new Date(published_at),"MM/dd HH:mm",{locale:ko}):"NoDate";
  const source=getSourceTag(raw_url);
  const preview=content?content.substring(0,90)+"...":null;
  return(<Link href={`/article/${id}`} className="block group"><article className="h-full bg-card border rounded-lg overflow-hidden flex flex-col transition-all group-hover:border-[var(--gold)]/40"><div className="p-4 flex flex-col gap-3 flex-1"><div className="flex items-center gap-2"><span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${source.color}`}>{source.label}</span>{is_premium&&(<span className="flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[var(--gold-muted)] text-[var(--gold)]"><Crown size={9}/>PRO</span>)}<span className="text-xs text-muted-foreground ml-auto font-mono">{formattedDate}</span></div><h2 className="text-sm font-semibold leading-snug line-clamp-3 group-hover:text-[var(--gold)]">{title}</h2>{preview&&(<p className="text-xs text-muted-foreground line-clamp-2">{preview}</p>)}<div className="mt-auto pt-3 border-t flex items-center justify-between"><span className="text-xs text-[var(--gold)] group-hover:underline">{is_premium?"Read Insights":"Read More"}</span><a href={raw_url} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}><ExternalLink size={12}/></a></div></div></article></Link>);
}
