import { TAccountRow } from '@/types/account';
import { sql } from '@vercel/postgres';
import { compare } from 'bcrypt';
import { AuthOptions, User } from 'next-auth';
import Provider from 'next-auth/providers/credentials';

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
  providers: [
    Provider({
      name: 'Credentials',
      credentials: {
        id: {},
        name: {},
        password: {},
      },
      async authorize(credentails) {
        const {
          rows: [account],
        } = await sql`
          SELECT * FROM rv_account WHERE name = ${credentails?.name}
        `;

        if (await compare(credentails?.password || '', account.password))
          return {
            id: account.id,
            name: account.name,
            role: account.role,
            thumbnail_url: account.thumbnail_url,
          };

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        const { id, role, thumbnail_url } = user as User & TAccountRow;

        token.id = id;
        token.role = role;
        token.thumbnailUrl = thumbnail_url;
      }

      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        const { id, name, role, thumbnailUrl } = token;

        return { ...session, user: { id, name, role, thumbnailUrl } };
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};

export default authOptions;
