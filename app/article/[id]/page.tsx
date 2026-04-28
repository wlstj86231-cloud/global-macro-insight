import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Crown, Lock } from "lucide-react";
import { getArticleById } from "@/actions/getArticleById";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const articleId = parseInt(id, 10);
  if (isNaN(articleId)) notFound();
  const article = await getArticleById(articleId);
  if (!article) notFound();
  const session = await getServerSession(authOptions);
  const isPremiumUser = (session?.user as any)?.role === "premium";
  const isGated = article.is_premium && !isPremiumUser;
  const content = article.content || "";
  const visible = isGated ? content.substring(0, 400) + "..." : content;
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost"><ArrowLeft/>Back</Button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">{article.title}</h1>
      <div className={article.is_premium ? "relative premium-blur" : ""}>
        <p className="article-body">{visible}</p>
      </div>
      {isGated && (
        <div className="text-center p-6 border rounded-xl mt-8">
          <Lock size={18} className="mx-auto mb-3"/>
          <h3 className="font-bold mb-2">Premium Content</h3>
          <p className="text-sm text-muted-foreground mb-4">Subscribe to PRO to read the full article.</p>
          <Link href="/mypage">
            <Button><Crown/>Go PRO</Button>
          </Link>
        </div>
      )}
      {article.insight_memo && !isGated && (
        <div className="insight-card p-6 mt-8 rounded-xl">
          <h3 className="font-bold mb-2">Editor Insight</h3>
          <p>{article.insight_memo}</p>
        </div>
      )}
    </div>
  );
}
