import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getArticleBySlug } from "@/actions/getArticleBySlug";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "기사를 찾을 수 없습니다 | GlobalMacro" };
  const title = article.title_ko || article.title;
  return {
    title: `${title} | GlobalMacro`,
    description: (article.content_ko || article.content || "").substring(0, 155),
  };
}

export default async function ArticleSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let article: any = null;
  try { article = await getArticleBySlug(slug); } catch {}
  if (!article) notFound();

  const title = article.title_ko || article.title;
  const content = article.content_ko || article.content || "";
  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : "";

  function getSource(url: string) {
    if (!url) return "기타";
    if (url.includes("wsj.com") || url.includes("a.dj.com")) return "WSJ";
    if (url.includes("bloomberg.com")) return "Bloomberg";
    if (url.includes("reuters.com")) return "Reuters";
    return "기타";
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14}/> 헤드라인으로 돌아가기
        </Link>
      </div>
      <div className="mb-3 flex items-center gap-3">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{getSource(article.raw_url)}</span>
        <span className="text-xs text-muted-foreground">·</span>
        <span className="text-xs text-muted-foreground">{date}</span>
        {article.raw_url && (
          <a href={article.raw_url} target="_blank" rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ExternalLink size={12}/> 원문 보기
          </a>
        )}
      </div>
      <h1 className="text-2xl font-bold leading-tight mb-8">{title}</h1>
      <div className="prose prose-sm max-w-none">
        <p className="text-base leading-relaxed whitespace-pre-wrap text-foreground/90">{content}</p>
      </div>
      {article.insight_memo && (
        <div className="mt-10 p-5 rounded-xl bg-[var(--gold-muted)] border-l-4 border-[var(--gold)]">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--gold)] mb-2">에디터 인사이트</p>
          <p className="text-sm leading-relaxed">{article.insight_memo}</p>
        </div>
      )}
    </div>
  );
}
