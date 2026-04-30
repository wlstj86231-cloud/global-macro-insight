import { getArticles } from "@/actions/getArticles";
import { ArticleCard } from "@/components/ui/ArticleCard";
import Link from "next/link";

export const revalidate = 60;

export default async function Home({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  let articles: any[] = [];
  try {
    const { category } = await searchParams;
    articles = await getArticles(category);
  } catch (e) {
    console.error("articles fetch error:", e);
  }
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <Link href="/" className="text-sm font-medium px-3 py-1.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)]">전체</Link>
        <Link href="/?category=market" className="text-sm font-medium px-3 py-1.5 rounded-full border hover:bg-muted">시장</Link>
        <Link href="/?category=macro" className="text-sm font-medium px-3 py-1.5 rounded-full border hover:bg-muted">거시경제</Link>
        <Link href="/?category=korea" className="text-sm font-medium px-3 py-1.5 rounded-full border hover:bg-muted">한국</Link>
      </div>
      {articles.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p>최신 기사를 불러오는 중입니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a: any) => (
            <ArticleCard key={a.id} id={a.id} slug={a.slug} title={a.title_ko || a.title} is_premium={false} published_at={a.published_at} raw_url={a.raw_url} content={a.content_ko || a.content}/>
          ))}
        </div>
      )}
    </div>
  );
}
