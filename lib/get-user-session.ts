import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function getUserSession() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) return null;

	return session.user;
}
