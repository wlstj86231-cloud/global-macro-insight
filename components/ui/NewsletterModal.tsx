"use client";
import React, { useState, useEffect } from "react";
import { X, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
export function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  useEffect(() => {
    const d = localStorage.getItem("nl_dismissed");
    if (d) return;
    const t = setTimeout(() => setOpen(true), 8000);
    return () => clearTimeout(t);
  }, []);
  const handleDismiss = () => { setOpen(false); localStorage.setItem("nl_dismissed", "1"); };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    }).catch(() => null);
    setStatus(res?.ok ? "success" : "error");
    if (res?.ok) setEmail("");
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/40">
      <div className="bg-[var(--primary)] text-[var(--primary-foreground)] rounded-xl max-w-sm w-full p-6 relative">
        <button onClick={handleDismiss} className="absolute top-4 right-4"><X size={16}/></button>
        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-[var(--gold)]/20">
          <Mail size={18} className="text-[var(--gold)]"/>
        </div>
        {status === "success" ? (
          <div className="text-center py-4">
            <CheckCircle size={32} className="text-[var(--gold)] mx-auto mb-3"/>
            <p>Subscribed successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <h3 className="font-bold mb-1">Global Macro Newsletter</h3>
            <p className="text-xs mb-3">Get the latest economic news delivered to your inbox.</p>
            <input
              type="email" value={email} onChange={e=>setEmail(e.target.value)}
              required className="h-9 px-3 text-sm rounded-md border bg-[var(--primary-foreground)]/10 border-[var(--primary-foreground)]/20 text-[var(--primary-foreground)]"
              placeholder="your@email.com"
            />
            <Button type="submit" disabled={status === "loading"} className="bg-[var(--gold)] text-white h-9">
              {status === "loading" ? "..." : "Subscribe"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
