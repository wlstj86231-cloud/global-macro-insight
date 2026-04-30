import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
const BASE = "https://global-macro-insight.vercel.app";
export const metadata: Metadata = {
  title: { default: "글로벌매크로 | 해외 경제 뉴스 한국어 번역", template: "%s | 글로벌매크로" },
  description: "WSJ, Bloomberg, Reuters 등 세계 주요 경제 매체의 핵심 뉴스를 한국어로 빠르게 전달합니다. 금리, 환율, 주식시장, 연준, 한국은행, 글로벌 매크로 분석.",
  keywords: ["글로벌매크로","해외경제뉴스","금리","환율","주식시장","연준","한국은행","Bloomberg한국어","WSJ한국어","경제분석","매크로경제","투자뉴스"],
  metadataBase: new URL(BASE),
  alternates: { canonical: BASE, languages: { "ko-KR": BASE } },
  openGraph: { type: "website", locale: "ko_KR", url: BASE, siteName: "글로벌매크로", title: "글로벌매크로 | 해외 경제 뉴스 한국어 번역", description: "세계 주요 경제 뉴스를 한국어로 빠르게 전달합니다." },
  twitter: { card: "summary_large_image", title: "글로벌매크로", description: "해외 경제 뉴스 한국어 번역 서비스" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};
const TICKERS = [
  {sym:"S&P500",val:"5,612",chg:"+0.4%"},{sym:"나스닥",val:"17,820",chg:"+0.62%"},
  {sym:"다우존스",val:"41,288",chg:"+0.18%"},{sym:"달러/원",val:"1,382",chg:"-0.23%"},
  {sym:"금",val:"2,412",chg:"+0.38%"},{sym:"비트코인",val:"101,240",chg:"+2.1%"},
  {sym:"WTI",val:"78.42",chg:"+1.15%"},{sym:"국채10년",val:"4.52%",chg:"+0.04"},
];
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={inter.className + " antialiased min-h-screen flex flex-col"}>
        <div className="bg-[var(--primary)] text-[var(--primary-foreground)] text-[11px] font-mono overflow-hidden whitespace-nowrap select-none">
          <div className="flex ticker-animate w-max py-1.5">
            {[...TICKERS,...TICKERS].map((t,i)=>(
              <span key={i} className="inline-flex items-center gap-1.5 px-5 border-r border-white/10">
                <span className="text-[var(--gold)] font-semibold">{t.sym}</span>
                <span>{t.val}</span>
                <span className={t.chg.startsWith("+")?"text-green-400":"text-red-400"}>{t.chg}</span>
              </span>
            ))}
          </div>
        </div>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
          <div className="container flex h-14 items-center justify-between px-4 max-w-7xl mx-auto">
            <Link href="/" className="font-bold text-lg tracking-tight">글로벌<span className="text-[var(--gold)]">매크로</span></Link>
            <nav className="flex items-center gap-5 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">헤드라인</Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">소개</Link>
              <Link href="/login" className="px-4 py-1.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium hover:opacity-90 transition-opacity">로그인</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 w-full">{children}</main>
        <footer className="border-t bg-[var(--primary)] text-[var(--primary-foreground)]">
          <div className="container max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <p className="font-bold text-lg">글로벌<span className="text-[var(--gold)]">매크로</span></p>
                <p className="text-xs mt-1 opacity-60">해외 경제 뉴스를 한국어로 빠르게</p>
              </div>
              <div className="text-xs opacity-60 md:text-right space-y-1">
                <p>© {new Date().getFullYear()} 글로벌매크로. All rights reserved.</p>
                <p>본 사이트의 기사는 해외 뉴스를 번역한 것입니다.</p>
                <p>투자 조언이 아니며 정보 제공 목적입니다.</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}