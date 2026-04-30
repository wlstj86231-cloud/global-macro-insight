import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "소개 | 글로벌매크로",
  description: "글로벌매크로 서비스 소개",
};

export default function AboutPage() {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">글로벌매크로 소개</h1>
      <div className="space-y-5 text-muted-foreground leading-relaxed">
        <p className="text-base text-foreground font-medium">
          글로벌매크로는 월스트리트저널(WSJ), 블룸버그, 로이터 등 해외 주요 경제 매체의 기사를 빠르게 한국어로 번역해 제공하는 서비스입니다.
        </p>
        <p>
          환율, 금리, 주식, 채권, 원자재 등 글로벌 거시경제 흐름을 한국어로 빠르게 파악할 수 있도록 도와드립니다.
        </p>
        <p>
          번역 기사는 원문의 핵심 내용을 충실히 반영하며, 에디터의 시각도 함께 제공합니다.
        </p>
        <div className="pt-4 border-t">
          <p className="text-sm">문의: <a href="mailto:contact@globalmacro.kr" className="text-[var(--gold)] hover:underline">contact@globalmacro.kr</a></p>
        </div>
      </div>
      <Link href="/" className="inline-flex items-center gap-1.5 mt-8 text-sm text-muted-foreground hover:text-foreground">← 헤드라인으로 돌아가기</Link>
    </div>
  );
}
