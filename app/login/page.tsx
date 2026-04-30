"use client";
import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"loading"|"sent"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/auth/magic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    }).catch(() => null);
    setStatus(res?.ok ? "sent" : "error");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block font-bold text-2xl mb-4">글로벌<span className="text-[var(--gold)]">매크로</span></Link>
          <h1 className="text-xl font-bold">로그인</h1>
          <p className="text-muted-foreground text-sm mt-1">이메일로 로그인 링크를 보내드립니다</p>
        </div>
        {status === "sent" ? (
          <div className="text-center p-8 bg-card border rounded-xl">
            <CheckCircle size={36} className="text-[var(--gold)] mx-auto mb-3"/>
            <h2 className="font-bold mb-1">이메일을 확인하세요!</h2>
            <p className="text-sm text-muted-foreground"><strong>{email}</strong>으로<br/>로그인 링크를 발송했습니다.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">이메일</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                required placeholder="your@email.com"
                className="w-full h-10 px-3 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/30"
              />
            </div>
            {status === "error" && <p className="text-red-500 text-sm">오류가 발생했습니다. 다시 시도해 주세요.</p>}
            <button type="submit" disabled={status === "loading"} className="w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
              <Mail size={15}/>
              {status === "loading" ? "전송 중..." : "로그인 링크 받기"}
            </button>
          </form>
        )}
        <p className="text-center text-xs text-muted-foreground mt-4">
          <Link href="/" className="hover:underline">← 헤드라인으로 돌아가기</Link>
        </p>
      </div>
    </div>
  );
}
