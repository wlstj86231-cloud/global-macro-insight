import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "글로벌매크로 | 해외 경제 뉴스 한국어 번역",
  description: "월스트리트저널, 블룸버그, 로이터 등 주요 해외 경제 뉴스를 빠르게 한국어로 제공합니다.",
  keywords: ["글로벌 경제", "매크로", "환율", "금리", "주식", "채권", "원자재"],
  openGraph: {
    title: "글로벌매크로",
    description: "해외 경제 뉴스 한국어 번역",
    locale: "ko_KR",
    type: "website",
  },
};

const TICKER = [
  { sym: "S&P500", val: "5,612", chg: "+0.4%", up: true },
  { sym: "나스닥", val: "17,820", chg: "+0.62%", up: true },
  { sym: "다우존스", val: "41,288", chg: "+0.18%", up: true },
  { sym: "달러/원", val: "1,382", chg: "-0.23%", up: false },
  { sym: "WTI", val: "78.42", chg: "+1.15%", up: true },
  { sym: "금", val: "2,412", chg: "+0.38%", up: true },
  { sym: "비트코인", val: "101,240", chg: "+2.1%", up: true },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className + " antialiased min-h-screen flex flex-col"}>
        {/* 시세 티커 */}
        <div className="bg-[var(--primary)] text-[var(--primary-foreground)] text-[11px] font-mono overflow-hidden">
          <div className="flex ticker-animate w-max py-1.5">
            {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-5 border-r border-white/10">
                <span className="text-[var(--gold)] font-semibold">{t.sym}</span>
                <span>{t.val}</span>
                <span className={t.up ? "text-green-400" : "text-red-400"}>{t.chg}</span>
              </span>
            ))}
          </div>
        </div>
        {/* 헤더 */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-1">
              <span className="font-bold text-xl tracking-tight">글로벌<span className="text-[var(--gold)]">매크로</span></span>
            </Link>
            <nav className="flex items-center gap-1">
              <Link href="/" className="text-sm px-3 py-1.5 rounded-lg hover:bg-muted transition-colors">헤드라인</Link>
              <Link href="/about" className="text-sm px-3 py-1.5 rounded-lg hover:bg-muted transition-colors">소개</Link>
              <Link href="/login" className="text-sm px-4 py-1.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity ml-1">로그인</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <p className="font-bold">글로벌<span className="text-[var(--gold)]">매크로</span></p>
                <p className="text-xs text-muted-foreground mt-1">해외 주요 경제 뉴스를 한국어로 빠르게 전달합니다.</p>
              </div>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <Link href="/about" className="hover:text-foreground">소개</Link>
                <Link href="/login" className="hover:text-foreground">로그인</Link>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-6">&copy; 2026 글로벌매크로. 본 사이트의 기사는 해외 뉴스를 번역한 것입니다.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
