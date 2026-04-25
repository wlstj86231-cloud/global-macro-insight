import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Crown, Lock } from "lucide-react";
import { getArticleById } from "@/actions/getArticleById";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
export default async function ArticleDetailPage({params}:{{params:Promise<{id:string}>}) {
  const {id}=await params;
  const articleId=parseInt(id,10);
  if(isNaN(articleId)) notFound();
  const article=await getArticleById(articleId);
  if(!article) notFound();
  const session=await getServerSession(authOptions);
  const isPremiumUser=(session?.user as any)?.role==="premium";
  const isGated=article.is_premium&&!isPremiumUser;
  const content=article.content||"";
  const visible=isGated?content.substring(0,400)+"...":content;
  return(<div className="container mx-auto px-4 py-8 max-w-3xl"><div className="mb-6"><Link href="/"><Button variant="ghost"><ArrowLeft/>목록</Button></Link></div><h1>{article.title}</h1><div className={article.is_premium?"premium-blur":""}><p>{visible}</p></div>{isGated&&(<div className="text-center p-6"><Lock size={18}/><h3>프리미엄 기사작니다</h3><Link href="/mypage"><Button><Crown/>PRO 구독</Button></Link></div>)}{article.insight_memo&&!isGated&&(<div className="insight-card p-6 mt-8"><h3>읲제를 할널리스튼</h3><p>{article.insight_memo}</p></div>)}</div>);
}
