import type { DefaultSession } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			id: string; // добавляем id
			name?: string | null;
			email?: string | null;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		id: string; // сохраняем id в JWT
	}
}
