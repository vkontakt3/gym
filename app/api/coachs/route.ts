import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const coachs = await prisma.coach.findMany({
			include: {
				achievements: true,
			},
		});
		return NextResponse.json(coachs);
	} catch (error) {
		console.error("Ошибка получения тренеров:", error);
		return NextResponse.json(
			{ error: "Ошибка получения данных" },
			{ status: 500 }
		);
	}
}
