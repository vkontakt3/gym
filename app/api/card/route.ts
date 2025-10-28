import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const cards = await prisma.cardItem.findMany();
		return NextResponse.json(cards);
	} catch (error) {
		console.error("Ошибка получения карточек:", error);
		return NextResponse.json(
			{ error: "Ошибка получения данных" },
			{ status: 500 }
		);
	}
}
