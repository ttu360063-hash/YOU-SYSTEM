import { getServerSession } from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Email from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt" as const,
  },
  providers: [
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT || 587),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.passwordHash) return null;
        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) return null;
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { defaultTenantId: true },
        });
        token.tenantId = dbUser?.defaultTenantId || null;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.sub || "";
        session.user.tenantId = token.tenantId || null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export async function getSession() {
  return getServerSession(authOptions);
}
