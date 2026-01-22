// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient({
		log: ["query"],
	});
} else {
	// В dev используем globalThis, чтобы PrismaClient не создавался при каждом hot reload
	if (!(global as any).prisma) {
		(global as any).prisma = new PrismaClient({
			log: ["query"],
		});
	}
	prisma = (global as any).prisma;
}

export { prisma };
