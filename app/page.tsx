import { getArticles } from "@/actions/getArticles";
import { ArticleCard } from "@/components/ui/ArticleCard";
import Link from "next/link";

export default async function Home({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  let articles: any[] = [];
  try {
    const { filter } = await searchParams;
    articles = await getArticles(filter);
  } catch (e) {
    console.error("Failed to fetch articles:", e);
  }
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/" className={`text-sm px-3 py-1 rounded-full border ${!new URLSearchParams().has("filter") ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : ""}`}>All</Link>
        <Link href="/?filter=premium" className="text-sm px-3 py-1 rounded-full border">PRO</Link>
        <Link href="/?filter=free" className="text-sm px-3 py-1 rounded-full border">Free</Link>
      </div>
      {articles.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No articles yet.</p>
          <p className="text-sm mt-2">Check back soon for the latest global macro news.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((a: any) => (
            <ArticleCard key={a.id} id={a.id} title={a.title} is_premium={a.is_premium} published_at={a.published_at} raw_url={a.raw_url} content={a.content}/>
          ))}
        </div>
      )}
    </div>
  );
}