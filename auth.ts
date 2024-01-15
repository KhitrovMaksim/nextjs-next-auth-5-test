import type { NextAuthConfig } from 'next-auth';
import type { DefaultSession } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail, Role, User, users } from '@/shared/api/users';

declare module 'next-auth' {
  interface Session {
    user: {
      roles: Role[]
    } & DefaultSession["user"]
  }
}

const authConfig = {
  providers: [Credentials({
    authorize(credentials) {
      const formFields: User = {
        email: credentials.email as string,
        password: credentials.password as string,
      };
      if (users.some((user) => user.email === formFields.email && user.password === formFields.password)) {
        const user = getUserByEmail(formFields.email);
        // console.log('Auth config, user: ', user);
        return user;
      }
      return null;
    },
  })],
  session: { strategy: 'jwt', maxAge: 86400},
  callbacks: {
    async signIn({ user }) {
      console.log(user);
      return true;
    },
    async session({ token, session }) {
      if (session.user && token.roles) {
        // console.log('token.user.roles', token.roles);
        session.user.roles = token.roles as Role[]
      }
      // console.log('Auth config -> callbacks -> session -> session: ', session);
      return session
    },
    async jwt({ token }) {
      if (token.email) {
        const user = getUserByEmail(token.email);
        token.roles = user?.roles
      }
      // console.log('Auth config -> callbacks -> jwt -> token: ', token);
      return token;
    }
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
