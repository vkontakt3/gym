"use client";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/cn";
import EditProfileForm from "@/components/edit-profile-form";
import { useEffect, useState } from "react";
import { User, Booking, Coach } from "@prisma/client";
import toast from "react-hot-toast";
import { deleteBooking } from "@/action";
import { useRouter } from "next/navigation";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
	user: User & {
		bookings?: (Booking & { coach: Coach })[];
	};
	className?: string;
}

export default function ProfileForm({ user, className }: Props) {
	const [editMode, setEditMode] = useState(false);
	const [bookingToDelete, setBookingToDelete] = useState<number | null>(null);
	const router = useRouter();

	useEffect(() => {
		bookingToDelete;
	}, [bookingToDelete]);

	async function handleDeleteBooking(bookingId: number) {
		const res = await deleteBooking(bookingId);

		if (res.success) {
			toast.success("Запись успешно удалена ✅");
			router.refresh();
		} else {
			toast.error("Ошибка при удалении записи ❌");
		}
		setBookingToDelete(null);
	}

	return (
		<div className={cn("py-10 font-montserrat text-white", className)}>
			<Container>
				<h1 className="text-3xl font-bold mb-8">Профиль</h1>

				{!editMode ? (
					<>
						<Avatar className="w-24 h-24 mb-4">
							<AvatarImage alt={user?.name || "User"} />
							<AvatarFallback className="text-black">
								{user?.name?.[0]?.toUpperCase() ?? "U"}
							</AvatarFallback>
						</Avatar>

						<h2 className="text-4xl font-bold">{user?.name ?? "User"}</h2>
						<p className="text-lg text-muted-foreground mt-1">
							{user?.email ?? "No email provided"}
						</p>

						<div className="flex gap-3 mt-6">
							<Button variant="outline" onClick={() => setEditMode(true)}>
								Редактировать профиль
							</Button>
							<Button
								variant="destructive"
								onClick={() => signOut({ callbackUrl: "/" })}
							>
								Выйти
							</Button>
						</div>
					</>
				) : (
					<EditProfileForm
						defaultValues={{
							name: user?.name || "",
							email: user?.email || "",
							password: "",
							confirmPassword: "",
						}}
						onCancel={() => setEditMode(false)}
						onSuccess={() => setEditMode(false)}
					/>
				)}

				<Separator className="my-8" />

				<h2 className="text-2xl font-bold mb-4">Ваши записи</h2>

				{!user.bookings || user.bookings.length === 0 ? (
					<p className="text-gray-400">У вас пока нет записей.</p>
				) : (
					<ul className="space-y-4">
						{user.bookings.map((b) => (
							<li
								key={b.id}
								className="border border-white/20 p-4 rounded-md flex flex-col sm:flex-row sm:justify-between sm:items-center transition-transform duration-200 hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(42,181,174,0.3)]"
							>
								<div>
									<p className="font-bold text-lg">
										Тренер: {b.coach.fullName}
									</p>
									<p className="text-gray-400 text-sm">
										Дата:{" "}
										{new Date(b.date).toLocaleString("ru-RU", {
											day: "2-digit",
											month: "long",
											year: "numeric",
											hour: "2-digit",
											minute: "2-digit",
										})}
									</p>
								</div>

								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											variant="outline"
											className="mt-2 sm:mt-0 border border-white/30 text-white hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-200 rounded-lg px-4 py-2 shadow-md hover:shadow-lg"
										>
											Отменить
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent className="bg-[#04706b]  text-white border-none rounded-xl shadow-2xl p-6 sm:max-w-md mx-auto">
										<AlertDialogHeader>
											<AlertDialogTitle className="text-xl font-bold mb-2">
												Подтвердите действие
											</AlertDialogTitle>
											<AlertDialogDescription className="text-white/90 text-sm">
												Вы уверены, что хотите удалить запись к тренеру{" "}
												<strong>{b.coach.fullName}</strong>?
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter className="mt-6 flex justify-end gap-3">
											<AlertDialogCancel className="px-4 py-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all">
												Отмена
											</AlertDialogCancel>
											<AlertDialogAction
												className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all"
												onClick={() => handleDeleteBooking(b.id)}
											>
												Удалить
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</li>
						))}
					</ul>
				)}
			</Container>
		</div>
	);
}
