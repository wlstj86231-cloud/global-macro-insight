import { getArticles } from "@/actions/getArticles";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Crown } from "lucide-react";
import Link from "next/link";
export default async function Home({searchParams}:{searchParams:Promise<{filter?:string}>}) {
  const {filter}=await searchParams;
  const articles=await getArticles(filter);
  return(<div className="container max-w-7xl mx-auto px-4 py-8"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{articles.map((a:any)=><ArticleCard key={a.id} id={a.id} title={a.title} is_premium={a.is_premium} published_at={a.published_at} raw_url={a.raw_url} content={a.content}/>)}</div></div>);
}
