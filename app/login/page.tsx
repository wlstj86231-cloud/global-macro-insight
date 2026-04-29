"use client";
import { useState } from 'react';
import { Crown, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'sent'|'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const res = await fetch('/api/auth/magic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }).catch(() => null);
    setStatus(res?.ok ? 'sent' : 'error');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Crown size={20} className="text-[var(--gold)]"/>
            <span className="font-bold text-xl">GlobalMacro</span>
          </div>
          <h1 className="text-2xl font-bold">Sign In</h1>
          <p className="text-muted-foreground text-sm mt-1">We will send a magic link to your email</p>
        </div>
        {status === 'sent' ? (
          <div className="text-center p-8 bg-card border rounded-xl">
            <CheckCircle size={40} className="text-[var(--gold)] mx-auto mb-3"/>
            <h2 className="font-bold mb-1">Check your email!</h2>
            <p className="text-sm text-muted-foreground">We sent a magic link to <strong>{email}</strong></p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                required placeholder="you@email.com"
                className="w-full h-10 px-3 rounded-lg border bg-background text-sm"
              />
            </div>
            {status === 'error' && <p className="text-red-500 text-sm">Something went wrong. Try again.</p>}
            <Button type="submit" disabled={status === 'loading'} className="w-full">
              <Mail size={15}/>
              {status === 'loading' ? 'Sending...' : 'Send Magic Link'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
