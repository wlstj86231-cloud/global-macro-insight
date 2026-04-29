import { createClient } from "@supabase/supabase-js";
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!url || !key) {
    console.warn("Supabase env vars missing");
    return createClient("https://placeholder.supabase.co", "placeholder");
  }
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}