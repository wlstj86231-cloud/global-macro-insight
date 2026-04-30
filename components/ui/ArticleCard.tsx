"use client";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

function getSource(url: string) {
  if (!url) return { label: "기타", color: "text-muted-foreground" };
  if (url.includes("wsj.com") || url.includes("a.dj.com")) return { label: "WSJ", color: "text-blue-600" };
  if (url.includes("bloomberg.com")) return { label: "Bloomberg", color: "text-purple-600" };
  if (url.includes("reuters.com")) return { label: "Reuters", color: "text-orange-600" };
  if (url.includes("ft.com")) return { label: "FT", color: "text-pink-600" };
  return { label: "기타", color: "text-muted-foreground" };
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  return `${Math.floor(h / 24)}일 전`;
}

export function ArticleCard({ article }: { article: any }) {
  const source = getSource(article.raw_url);
  const href = article.slug ? `/article/${article.slug}` : `/article/${article.id}`;
  const title = article.title_ko || article.title;
  const preview = (article.content_ko || article.content || "").substring(0, 100);

  return (
    <Link href={href} className="block group h-full">
      <article className="h-full bg-card border rounded-xl overflow-hidden flex flex-col transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5">
        <div className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold tracking-wide ${source.color}`}>{source.label}</span>
            <span className="text-xs text-muted-foreground">{article.published_at ? timeAgo(article.published_at) : ""}</span>
          </div>
          <h2 className="text-sm font-semibold leading-snug line-clamp-3 group-hover:text-[var(--gold)] transition-colors">{title}</h2>
          {preview && <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{preview}...</p>}
          <div className="mt-auto pt-3 border-t flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--gold)]">자세히 보기 →</span>
            {article.raw_url && (
              <a href={article.raw_url} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink size={12}/>
              </a>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
