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
    console.error("기사 불러오기 실패:", e);
  }
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">글로벌 매크로 헤드라인</h1>
        <p className="text-muted-foreground text-sm">세계 경제 핵심 뉴스를 한눈에</p>
      </div>
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Link href="/" className="text-sm px-4 py-1.5 rounded-full border border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)] font-medium">전체</Link>
        <Link href="/?category=market" className="text-sm px-4 py-1.5 rounded-full border hover:border-[var(--primary)] transition-colors">시장</Link>
        <Link href="/?category=macro" className="text-sm px-4 py-1.5 rounded-full border hover:border-[var(--primary)] transition-colors">거시경제</Link>
        <Link href="/?category=korea" className="text-sm px-4 py-1.5 rounded-full border hover:border-[var(--primary)] transition-colors">한국</Link>
      </div>
      {articles.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg font-medium">아직 기사가 없습니다.</p>
          <p className="text-sm mt-2">곧 새로운 글로벌 매크로 뉴스가 올라옵니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a: any) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
