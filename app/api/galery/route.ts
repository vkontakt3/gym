import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const galery = await prisma.galeryItem.findMany();
		return NextResponse.json(galery);
	} catch (error) {
		console.error("Ошибка получения галереи:", error);
		return NextResponse.json(
			{ error: "Ошибка получения данных" },
			{ status: 500 }
		);
	}
}
