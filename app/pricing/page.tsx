"use client";
import { useSession, signIn } from "next-auth/react";
import { CheckCircle, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
const PLANS = [
  { id: "monthly", label: "Monthly PRO", price: 29000, priceLabel: "29,000 KRW", period: "/month",
    features: ["Full article access", "Premium insights", "PRO newsletter"] },
  { id: "yearly", label: "Annual PRO", price: 249000, priceLabel: "249,000 KRW", period: "/year",
    discount: "29%", features: ["Full article access", "PRO Vault", "PRO newsletter"] }
];
export default function PricingPage() {
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role;
  const isPremium = userRole === "premium";
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Unlock GlobalMacro PRO</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {PLANS.map((plan, i) => (
          <div key={plan.id} className={i === 1 ? "rounded-xl p-6 bg-[var(--primary)] text-[var(--primary-foreground)]" : "rounded-xl p-6 bg-card border"}>
            <p className="text-sm font-semibold mb-1"><Crown size={13}/>{plan.label}</p>
            {plan.discount && <span className="text-xs bg-[var(--gold)] text-white px-2 py-0.5 rounded-full">Save {plan.discount}</span>}
            <p className="text-3xl font-bold my-2">{plan.priceLabel}<span className="text-sm">{plan.period}</span></p>
            <div className="space-y-2 mb-4">
              {plan.features.map(f => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <CheckCircle size={13}/>{f}
                </div>
              ))}
            </div>
            {isPremium ? (
              <Button disabled>Already PRO</Button>
            ) : (
              <Button onClick={() => session ? alert("Payment integration coming soon!") : signIn("google")} className="bg-[var(--gold)] text-white w-full">
                <Crown size={13}/>{session ? "Go PRO" : "Sign in to Subscribe"}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
