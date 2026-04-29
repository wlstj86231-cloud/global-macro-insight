"use client";
import Link from "next/link";
import { Crown } from "lucide-react";
const TICKER = [{sym:"S&P500",val:"5,612",chg:"+0.4%"},{sym:"NASDAQ",val:"17,820",chg:"+0.62%"},{sym:"DOW",val:"41,288",chg:"+0.18%"},{sym:"USD/KRW",val:"1,382",chg:"-0.23%"}];
export function Header() {
  return (
    <>
      <div className="bg-[var(--primary)] text-[var(--primary-foreground)] text-[11px] font-mono overflow-hidden whitespace-nowrap">
        <div className="flex ticker-animate w-max">
          {[...TICKER,...TICKER].map((t,i)=>(
            <span key={i} className="inline-flex items-center gap-1 px-6 py-1.5">
              <span className="text-[var(--gold)]">{t.sym}</span>
              <span>{t.val}</span>
              <span className={t.chg.startsWith("+")?"text-green-400":"text-red-400"}>{t.chg}</span>
            </span>
          ))}
        </div>
      </div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between px-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-lg">Global<span className="text-[var(--gold)]">Macro</span></span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/">Headlines</Link>
            <Link href="/?filter=premium" className="flex items-center gap-1"><Crown size={13} className="text-[var(--gold)]"/>Premium</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/login" className="px-3 py-1 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm">Login</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
