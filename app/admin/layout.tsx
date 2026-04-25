import React from "react";
import Link from "next/link";
import { LayoutDashboard, LogOut, Crown } from "lucide-react";
export default function AdminLayout({children}:{children:React.ReactNode}) {
  return(<div className="flex min-h-screen"><aside className="w56 bg-[var(--primary)] text-[var(--primary-foreground)] hidden md:flex flex-col"><div className="h-12 flex items-center px-5"><Crown size={14}/><span className="ml-2 font-bold">Admin</span></div><nav className="flex-1 py-3 px-2"><Link href="/admin" className="flex items-center gap-2 px-3 py-2 rounded-md"><LayoutDashboard size={15}/>관리</Link></nav><div className="p-3"><Link href="/"><LogOut size={15}/>이</Link></div></aside><main className="flex-1 p-5 md:p-8">{children}</main></div>);
}
