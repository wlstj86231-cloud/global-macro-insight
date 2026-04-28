"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, User, Crown } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const TICKER = [{sym:"S&P500",val:"5,612",chg:"+0.4%"},{sym:"NASDAQ",val:"17,820",chg:"+0.62%"},{sym:"DOW",val:"41,288",chg:"+0.18%"},{sym:"USD/KRW",val:"1,382",chg:"-0.23%"},{sym:"WTI",val:"78.42",chg:"+1.15%"},{sym:"Gold",val:"2,412",chg:"+0.38%"}];
export function Header() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();
  const isPremium = (session?.user as any)?.role === "premium";
  return (
    <>
      <div className="bg-[var(--primary)] text-[var(--primary-foreground)] text-[11px] font-mono overflow-hidden whitespace-nowrap">
        <div className="flex ticker-animate w-max">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-6 py-1.5 border-r border-white/10">
              <span className="text-[var(--gold)]">{t.sym}</span>
              <span>{t.val}</span>
              <span className={t.chg.startsWith("+") ? "text-green-400" : "text-red-400"}>{t.chg}</span>
            </span>
          ))}
        </div>
      </div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-lg">Global<span className="text-[var(--gold)]">Macro</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/">Headlines</Link>
            <Link href="/?filter=premium"><Crown size={13} className="text-[var(--gold)]"/>Premium</Link>
            <Link href="/pricing">Pricing</Link>
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse"/>
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={session.user?.image||""} />
                    <AvatarFallback><User size={14}/></AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem onClick={()=>window.location.href="/mypage"}>My Page</DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>signOut({callbackUrl:"/"})}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button size="sm" onClick={()=>signIn("google")}>Login</Button>
            )}
          </nav>
          <button className="md:hidden p-2" onClick={()=>setOpen(!open)}>
            {open ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
      </header>
    </>
  );
}
