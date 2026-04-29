export default function PricingPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Unlock GlobalMacro PRO</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl p-6 bg-card border">
          <p className="text-sm font-semibold mb-1">Monthly PRO</p>
          <p className="text-3xl font-bold my-2">29,000 KRW<span className="text-sm">/month</span></p>
          <ul className="space-y-2 mb-4 text-sm">
            <li>Full article access</li>
            <li>Premium insights</li>
            <li>PRO newsletter</li>
          </ul>
          <a href="/login" className="block text-center px-4 py-2 rounded-lg bg-[var(--gold)] text-white font-semibold">
            Sign in to Subscribe
          </a>
        </div>
        <div className="rounded-xl p-6 bg-[var(--primary)] text-[var(--primary-foreground)]">
          <p className="text-sm font-semibold mb-1">Annual PRO</p>
          <span className="text-xs bg-[var(--gold)] text-white px-2 py-0.5 rounded-full">Save 29%</span>
          <p className="text-3xl font-bold my-2">249,000 KRW<span className="text-sm">/year</span></p>
          <ul className="space-y-2 mb-4 text-sm">
            <li>Full article access</li>
            <li>PRO Vault</li>
            <li>PRO newsletter</li>
          </ul>
          <a href="/login" className="block text-center px-4 py-2 rounded-lg bg-[var(--gold)] text-white font-semibold">
            Sign in to Subscribe
          </a>
        </div>
      </div>
    </div>
  );
}
