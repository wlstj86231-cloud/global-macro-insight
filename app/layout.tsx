import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GlobalMacro | Global Economic News",
  description: "Premium global macro economic news and insights",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={inter.className + " antialiased"}>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
          <div className="container flex h-14 items-center justify-between px-4 max-w-7xl mx-auto">
            <Link href="/" className="font-bold text-lg">
              Global<span className="text-[var(--gold)]">Macro</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/">Headlines</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/login" className="px-3 py-1 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)]">Login</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
        <footer className="border-t bg-[var(--primary)] text-[var(--primary-foreground)] mt-auto">
          <div className="container max-w-7xl mx-auto px-4 py-6 text-sm">
            <p className="font-bold">Global<span className="text-[var(--gold)]">Macro</span></p>
            <p className="text-xs mt-1 opacity-60">&copy; {new Date().getFullYear()} GlobalMacro. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}