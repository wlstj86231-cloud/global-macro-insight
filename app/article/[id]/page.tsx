import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Crown, Lock, ExternalLink } from "lucide-react";
import { getArticleById } from "@/actions/getArticleById";

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const articleId = parseInt(id, 10);
  if (isNaN(articleId)) notFound();
  let article: any = null;
  try { article = await getArticleById(articleId); } catch {}
  if (!article) notFound();
  const isGated = article.is_premium;
  const content = article.content || "";
  const visible = isGated ? content.substring(0, 500) + "..." : content;
  const date = article.published_at ? new Date(article.published_at).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "";
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14}/> Back to Headlines
        </Link>
      </div>
      <div className="mb-4 flex items-center gap-2">
        {article.is_premium && (
          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-[var(--gold-muted)] text-[var(--gold)]">
            <Crown size={10}/>PRO
          </span>
        )}
        <span className="text-xs text-muted-foreground font-mono">{date}</span>
        {article.raw_url && (
          <a href={article.raw_url} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ExternalLink size={12}/> Original
          </a>
        )}
      </div>
      <h1 className="text-2xl font-bold mb-6 leading-tight">{article.title}</h1>
      <div className={article.is_premium ? "relative" : ""}>
        <p className="article-body leading-relaxed whitespace-pre-wrap">{visible}</p>
        {isGated && (
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent"/>
        )}
      </div>
      {isGated && (
        <div className="text-center p-8 border rounded-xl mt-6 bg-card">
          <Lock size={24} className="mx-auto mb-3 text-muted-foreground"/>
          <h3 className="font-bold mb-2 text-lg">PRO Content</h3>
          <p className="text-sm text-muted-foreground mb-4">Subscribe to GlobalMacro PRO to read the full article and exclusive insights.</p>
          <Link href="/pricing" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--gold)] text-white font-semibold text-sm">
            <Crown size={14}/> View Plans
          </Link>
        </div>
      )}
      {article.insight_memo && !isGated && (
        <div className="insight-card p-6 mt-8 rounded-xl">
          <h3 className="font-bold mb-2 text-sm uppercase tracking-wide text-[var(--gold)]">Editor Insight</h3>
          <p className="text-sm leading-relaxed">{article.insight_memo}</p>
        </div>
      )}
    </div>
  );
}