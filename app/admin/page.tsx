import { getAllArticles } from "@/actions/getAllArticles";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Crown } from "lucide-react";
export default async function AdminDashboard() {
  const articles=await getAllArticles();
  return(<div className="max-w-6xl mx-auto"><h1>기사 관리 대시보드</h1><div className="bg-card rounded-xl border overflow-hidden"><Table><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>기사 제목</TableHead><TableHead>등급</TableHead><TableHead>관리</TableHead></TableRow></TableHeader><TableBody>{articles.map((a:any) =>(<TableRow key={a.id}><TableCell>{a.id}</TableCell><TableCell>{a.title}</TableCell><TableCell>{a.is_premium?<span>PRO</span>:<span>FREE</span>}</TableCell><TableCell><Link href={`/admin/edit/${a.id}`}><Button variant="outline" size="sm">수정</Button></Link></TableCell></TableRow>))}</TableBody></Table></div></div>);
}
