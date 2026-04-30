import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "서비스 소개",
  description: "글로벌매크로는 WSJ, Bloomberg, Reuters 등 세계 주요 경제 매체의 핵심 뉴스를 한국어로 번역해 전달하는 서비스입니다.",
  alternates: { canonical: "https://global-macro-insight.vercel.app/about" },
  openGraph: { title: "서비스 소개 | 글로벌매크로", description: "해외 경제 뉴스 한국어 번역 서비스", locale: "ko_KR" },
};
export default function AboutPage() {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">글로벌매크로 소개</h1>
      <div className="space-y-4 text-foreground/80 leading-relaxed">
        <p>글로벌매크로는 WSJ, Bloomberg, Reuters 등 세계 주요 경제 매체의 핵심 뉴스를 한국어로 빠르게 전달하는 경제 뉴스 서비스입니다.</p>
        <p>복잡한 글로벌 매크로 환경 속에서 투자자와 경제 전문가들이 핵심 정보를 놓치지 않도록, 중요한 경제 지표 발표, 중앙은행 결정, 시장 동향을 요약해 제공합니다.</p>
        <h2 className="text-xl font-bold mt-8 mb-3">다루는 주제</h2>
        <ul className="space-y-2">
          <li>· 미국 연준(Fed) 및 주요국 중앙은행 통화정책</li>
          <li>· 글로벌 주식 · 채권 · 외환 · 원자재 시장</li>
          <li>· 한국 경제 및 원화 관련 이슈</li>
          <li>· GDP, 물가, 고용 등 거시경제 지표</li>
          <li>· 지정학 리스크와 글로벌 무역 동향</li>
        </ul>
        <p className="mt-8 text-xs text-muted-foreground border-t pt-4">본 사이트의 모든 콘텐츠는 정보 제공 목적이며, 투자 권유 또는 금융 조언이 아닙니다.</p>
      </div>
    </div>
  );
}