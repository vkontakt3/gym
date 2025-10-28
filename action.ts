"use server";

import { prisma } from "@/prisma/prisma-client";
import { getUserSession } from "./lib/get-user-session";
import { hash } from "bcrypt";

interface UpdateProfileData {
	name: string;
	email: string;
	password?: string;
}

export async function updateProfileAction(body: UpdateProfileData) {
	try {
		const currentUser = await getUserSession();

		if (!currentUser) {
			throw new Error("User not found");
		}

		if (!currentUser?.id) {
			throw new Error("User not found");
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				email: body.email,
				name: body.name,
				password: body.password ? await hash(body.password, 10) : undefined,
			},
		});

		return updatedUser;
	} catch (error) {
		console.error(error);
	}
}

export async function deleteBooking(bookingId: number) {
	try {
		const currentUser = await getUserSession();

		if (!currentUser || !currentUser.id) {
			throw new Error("User not found");
		}

		// Удаляем запись только если она принадлежит текущему пользователю
		const deletedBooking = await prisma.booking.deleteMany({
			where: {
				id: bookingId,
				userId: Number(currentUser.id),
			},
		});

		return { success: true, deletedBooking };
	} catch (error) {
		console.error("Error deleting booking:", error);
		return { success: false, message: "Failed to delete booking" };
	}
}
