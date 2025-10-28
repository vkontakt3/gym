import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const services = await prisma.serviceItem.findMany();
		return NextResponse.json(services);
	} catch (error) {
		console.error("Ошибка получения ссылок:", error);
		return NextResponse.json(
			{ error: "Ошибка получения данных" },
			{ status: 500 }
		);
	}
}
