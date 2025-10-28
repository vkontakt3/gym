import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const links = await prisma.navLink.findMany();
		return NextResponse.json(links);
	} catch (error) {
		console.error("Ошибка получения ссылок:", error);
		return NextResponse.json(
			{ error: "Ошибка получения данных" },
			{ status: 500 }
		);
	}
}
