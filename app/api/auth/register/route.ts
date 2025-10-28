import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/prisma/prisma-client";

export async function POST(req: NextRequest) {
	try {
		const { name, email, password } = await req.json();

		// Проверка, существует ли уже пользователь
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return NextResponse.json(
				{ error: "Пользователь уже существует" },
				{ status: 400 }
			);
		}

		// Хэшируем пароль
		const hashedPassword = await bcrypt.hash(password, 12);

		// Создаём пользователя
		const user = await prisma.user.create({
			data: { name, email, password: hashedPassword },
		});

		return NextResponse.json({ message: "Пользователь создан", user });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Ошибка регистрации" }, { status: 500 });
	}
}
