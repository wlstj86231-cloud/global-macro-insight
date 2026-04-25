import React from "react";
import Link from "next/link";
export function Footer() {
  return(<footer className="border-t bg-[var(--primary)] text-[var(--primary-foreground)] mt-auto"><div className="container py-8"><span className="font-bold">Global<span className="text-[var(--gold)]">Macro</span></span><p className="text-xs mt-2">© {new Date().getFullYear()} GlobalMacro. All rights reserved.</p></div></footer>);
}
