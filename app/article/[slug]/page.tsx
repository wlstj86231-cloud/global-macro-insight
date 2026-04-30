import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getArticleBySlug } from "@/actions/getArticleBySlug";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let article: any = null;
  try { article = await getArticleBySlug(slug); } catch {}
  if (!article) return { title: "기사를 찾을 수 없습니다" };
  return {
    title: (article.title_ko || article.title) + " | 글로벌매크로",
    description: (article.content_ko || article.content || "").substring(0, 160),
  };
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function getSource(url: string) {
  if (!url) return "기타";
  if (url.includes("wsj.com") || url.includes("a.dj.com")) return "WSJ";
  if (url.includes("bloomberg.com")) return "Bloomberg";
  if (url.includes("reuters.com")) return "Reuters";
  return "기타";
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let article: any = null;
  try { article = await getArticleBySlug(slug); } catch {}
  if (!article) notFound();

  const title = article.title_ko || article.title;
  const content = article.content_ko || article.content || "";
  const source = getSource(article.raw_url);

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14}/> 헤드라인으로 돌아가기
        </Link>
      </div>
      <div className="mb-4 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{source}</span>
        <span>·</span>
        <span>{formatDate(article.published_at)}</span>
        {article.raw_url && (
          <>
            <span>·</span>
            <a href={article.raw_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
              원문 보기 <ExternalLink size={11}/>
            </a>
          </>
        )}
      </div>
      <h1 className="text-2xl font-bold mb-6 leading-tight tracking-tight">{title}</h1>
      <div className="prose prose-sm max-w-none">
        <p className="text-base leading-loose text-foreground/90 whitespace-pre-wrap">{content}</p>
      </div>
      {article.insight_memo && (
        <div className="mt-8 p-5 rounded-xl bg-[var(--gold-muted)] border-l-4 border-[var(--gold)]">
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--gold)] mb-2">에디터 인사이트</p>
          <p className="text-sm leading-relaxed">{article.insight_memo}</p>
        </div>
      )}
    </div>
  );
}
