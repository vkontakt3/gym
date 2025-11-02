import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { coachId, date } = await req.json();

		const selectedDate = new Date(date);

		if (!coachId || !date) {
			return NextResponse.json({ error: "Missing data" }, { status: 400 });
		}

		const existingBooking = await prisma.booking.findFirst({
			where: {
				coachId: Number(coachId),
				date: selectedDate,
			},
		});

		if (existingBooking) {
			return NextResponse.json(
				{ error: "Booking already exists" },
				{ status: 409 }
			);
		}

		const booking = await prisma.booking.create({
			data: {
				userId: Number(session.user.id),
				coachId: Number(coachId),
				date: selectedDate,
			},
		});

		return NextResponse.json(booking);
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
