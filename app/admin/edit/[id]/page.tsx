import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticleById } from "@/actions/getArticleById";
import { EditArticleForm } from "./EditArticleForm";
import { Button } from "@/components/ui/button";
export default async function AdminEditPage({params}:{params:Promise<{id:string}>}) {
  const {id}=await params;
  const articleId=parseInt(id,10);
  if(isNaN(articleId)) notFound();
  const article=await getArticleById(articleId);
  if(!article) notFound();
  return(<div><Link href="/admin"><Button variant="ghost"><ArrowLeft/>관릤</Button></Link><EditArticleForm article={article}/></div>);
}
