import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isInApp =
        nextUrl.pathname.startsWith('/dashboard') ||
        nextUrl.pathname.startsWith('/register');
      if (isInApp) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl).toString());
      }
      return true;
    },
    async session({ session, token }) {
      return {
        ...session,
        ...token,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  providers: [],
} satisfies NextAuthConfig;
