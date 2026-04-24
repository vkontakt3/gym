import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

function createPrismaClient() {
	const pool = new Pool({ connectionString: process.env.DATABASE_URL });
	const adapter = new PrismaNeon(pool as any);
	return new PrismaClient({ adapter });
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
	prisma = createPrismaClient();
} else {
	if (!(global as any).prisma) {
		(global as any).prisma = createPrismaClient();
	}
	prisma = (global as any).prisma;
}

export { prisma };
