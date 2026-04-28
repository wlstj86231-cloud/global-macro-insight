import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const authOptions: NextAuthOptions = {
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
  })],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const { data: existing } = await getSupabaseAdmin().from("users").select("email").eq("email", user.email).single();
        if (!existing) await getSupabaseAdmin().from("users").insert([{ email: user.email, role: "free" }]);
      }
      return true;
    },
    async session({ session }) {
      if (session?.user?.email) {
        const { data: dbUser } = await getSupabaseAdmin().from("users").select("role").eq("email", session.user.email).single();
        (session.user as any).role = dbUser?.role ?? "free";
      }
      return session;
    }
  },
  pages: { signIn: "/" },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
