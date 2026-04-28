/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { NextRequest } from 'next/server';

const nextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === 'google' && user.email) {
        const { data: existing } = await getSupabaseAdmin()
          .from('users').select('email').eq('email', user.email).single();
        if (!existing) {
          await getSupabaseAdmin().from('users').insert([{ email: user.email, role: 'free' }]);
        }
      }
      return true;
    },
    async session({ session }: any) {
      if (session?.user?.email) {
        const { data: dbUser } = await getSupabaseAdmin()
          .from('users').select('role').eq('email', session.user.email).single();
        session.user.role = dbUser?.role ?? 'free';
      }
      return session;
    },
  },
  pages: { signIn: '/' },
  secret: process.env.NEXTAUTH_SECRET,
};

export { nextAuthOptions as authOptions };

const handler = NextAuth(nextAuthOptions);

export async function GET(req: NextRequest) {
  return handler(req as any, {} as any);
}

export async function POST(req: NextRequest) {
  return handler(req as any, {} as any);
}
