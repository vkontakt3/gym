import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { prisma } from "@/prisma/prisma-client";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user) return null;

				const isValid = await compare(credentials.password, user.password);
				if (!isValid) return null;

				return {
					id: String(user.id),
					name: user.name,
					email: user.email,
				};
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id; // сохраняем id в JWT
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id; // добавляем id в session.user
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};
