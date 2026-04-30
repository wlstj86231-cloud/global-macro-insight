"use client";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface ArticleCardProps {
  id: number;
  slug?: string;
  title: string;
  is_premium: boolean;
  published_at: string;
  raw_url: string;
  content?: string;
}

function getSource(url: string) {
  if (!url) return { label: "기타", color: "bg-muted text-muted-foreground" };
  if (url.includes("wsj.com") || url.includes("a.dj.com")) return { label: "WSJ", color: "bg-blue-50 text-blue-700" };
  if (url.includes("bloomberg.com")) return { label: "Bloomberg", color: "bg-purple-50 text-purple-700" };
  if (url.includes("reuters.com")) return { label: "Reuters", color: "bg-orange-50 text-orange-700" };
  return { label: "기타", color: "bg-muted text-muted-foreground" };
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 60000);
  if (diff < 60) return diff + "분 전";
  if (diff < 1440) return Math.floor(diff / 60) + "시간 전";
  return d.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
}

export function ArticleCard({ id, slug, title, published_at, raw_url, content }: ArticleCardProps) {
  const source = getSource(raw_url);
  const preview = content ? content.substring(0, 100) + "..." : null;
  const href = slug ? "/article/" + slug : "/article/" + id;

  return (
    <Link href={href} className="block group">
      <article className="h-full bg-card border rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md hover:border-[var(--gold)]/40">
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex items-center justify-between">
            <span className={"text-[10px] font-bold uppercase px-2 py-0.5 rounded-md " + source.color}>{source.label}</span>
            <span className="text-xs text-muted-foreground">{formatDate(published_at)}</span>
          </div>
          <h2 className="text-sm font-bold leading-snug line-clamp-3 group-hover:text-[var(--gold)] transition-colors">{title}</h2>
          {preview && <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{preview}</p>}
          <div className="mt-auto pt-3 border-t flex items-center justify-between">
            <span className="text-xs text-[var(--gold)] font-medium group-hover:underline">자세히 보기 →</span>
            <a href={raw_url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-muted-foreground hover:text-foreground p-1">
              <ExternalLink size={12}/>
            </a>
          </div>
        </div>
      </article>
    </Link>
  );
}
