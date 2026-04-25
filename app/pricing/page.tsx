"use client";

import { useSession, signIn } from "next-auth/react";
import { CheckCircle, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
const PLANS = [{id:"monthly",label:"경鳠 구독",price:29000,priceLabel:"29,000원",period:"/월",features:["기사 전문","프리미윰기","PRO 전용"]},{id:"yearly",label:"연간 구독",price:249000,priceLabel:"249,000원",period:"/년",discount:"29%",features:["기사 전문","vault","PRO 전용"]}];
export default function PricingPage() {
  const {data:session}=useSession();
  const userRole=(session?.user as any)?.role;
  const isPremium=userRole==="premium";
  return(<div className="container max-w-4xl mx-auto px-4 py-12"><h1 className="text-3xl font-bold text-center mb-12">PRO 멃간돘 멤버십 캘린더었니다</h1><div className="grid md:grid-cols-2 gap-6">{PLANS.map((plan,i)=>(<div key={plan.id} className={`rounded-xl p-6 ${i===1?"bg-[var(--primary)] text-[var(--primary-foreground)]":"bg-card border"}`}><p className="text-sm font-semibold mb-1"><Crown size={13}/>{plan.label}</p><p className="text-3xl font-bold my-2">{plan.priceLabel}<span className="text-sm">{plan.period}</span></p><div className="space-y-2 mb-4">{plan.features.map(f=>(<div key={f} className="flex items-center gap-2 text-sm"><CheckCircle size={13}/>{f}</div>))}</div>{ipPremium?(<Button disabled>구독 중</Button>):(<Button onClick={()=>session?alert("TODO"):signIn("google")} className="bg-[var(--gold)] text-white w-full"><Crown size={13}/><{session?튠"PRO ＊:"로그인 완돨"}</Button>)}</div>))}</div></div>);
}
