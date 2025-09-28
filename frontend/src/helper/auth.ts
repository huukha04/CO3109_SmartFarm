import NextAuth, { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';
import { LoginResponse } from "@/types/auth";

const providers: Provider[] = [
  GitHub({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  }),
  Credentials({
    credentials: {
      username: { label: 'Username', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: async (c) => {
      if (!c?.username || !c?.password) {
        return null;
      }

      try {
        if (c?.username === 'toolpad-demo' && c?.password === '@demo1') {
          return {
            id: 'demo-id',
            name: 'Toolpad Demo',
            email: 'toolpad-demo@mui.com',
            accessToken: 'test-access-token',
            image: null,
            provider: 'credentials',
          };
        }

        const response = await fetch(`${process.env.BACKEND_URL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: c.username,
            password: c.password,
          }),
        });

        if (!response.ok) {
          const errText = await response.text(); 
          console.error('Login failed:', errText);
          return null;
        }

        const data = await response.json();
        const { user, accessToken } = data;

        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: accessToken,
            image: user.image || null,
            provider: 'credentials',
          };
        }

        return null;
      } catch (error) {
        console.error('Authorize error:', error);
        return null;
      }
    }
  }),
];



export const authConfig = {
  providers,
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1 hour
  },

  jwt: {
    maxAge: 60 * 60, // 1 hour
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === 'github') {
          // OAuth provider (GitHub)
          token.id = user.id ?? '';
          token.name = user.name ?? '';
          token.email = user.email ?? '';
          token.image = user.image ?? null;
          token.accessToken = account.access_token ?? '';
          token.provider = 'github';
        } else {
          // Credentials provider
          const currentUser = user as LoginResponse & { provider: string };
          token.id = currentUser.id ?? '';
          token.name = currentUser.name ?? '';
          token.email = currentUser.email ?? '';
          token.image = currentUser.image ?? null;
          token.accessToken = currentUser.accessToken ?? '';
          token.provider = currentUser.provider ?? 'credentials';
        }
      }
      return token;
    },
    async session({ session, token}) {
      if (token) {
				session.user = {
					...session.user,
					email: token.email,
					id: token.id,
					name: token.name,
					image: token.image,
					accessToken: token.accessToken,
          provider: token.provider ?? 'credentials',
				};
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return baseUrl;
      return url;
    },
    authorized({ auth: session, request: { nextUrl } }) {
      const isLoggedIn = !!session?.user;
      const isPublicPage = nextUrl.pathname.startsWith('/public');
      return isPublicPage || isLoggedIn;
    },
  },


} satisfies NextAuthConfig

export const {
	handlers,
	signIn,
	signOut,
	auth
} = NextAuth({
	...authConfig
})

