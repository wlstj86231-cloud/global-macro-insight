"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default function AuthCallback() {
  const router = useRouter();
  const [msg, setMsg] = useState('Verifying...');

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setMsg('Logged in! Redirecting...');
        setTimeout(() => router.push('/'), 1000);
      } else {
        setMsg('Login failed. Please try again.');
        setTimeout(() => router.push('/login'), 2000);
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">{msg}</p>
    </div>
  );
}
