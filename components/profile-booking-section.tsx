"use client";

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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteBooking } from "@/action";
import { useRouter } from "next/navigation";
import { Booking, Coach, User } from "@prisma/client";
import Image from "next/image";
import CoachModal from "@/components/coach-modal";
import { Coach as SliderCoach } from "@/components/slider/slider-coach";

interface Props {
	user: User & {
		bookings?: (Booking & {
			coach: Coach;
		})[];
	};
	className?: string;
}

export default function ProfileBookingSection({ user }: Props) {
	const [bookingToDelete, setBookingToDelete] = useState<number | null>(null);
	const [selectedCoach, setSelectedCoach] = useState<SliderCoach | null>(null);
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
		<div>
			<div className="flex items-center  gap-3 mb-5">
				<h2 className="text-xl font-bold tracking-tight">Ваши записи</h2>
				{user.bookings && user.bookings.length > 0 && (
					<span
						className="px-2.5 mb-1 py-0.5 rounded-full text-xs font-semibold"
						style={{
							background: "rgba(42,181,174,0.15)",
							color: "#2ab5ae",
							border: "1px solid rgba(42,181,174,0.3)",
						}}
					>
						{user.bookings.length}
					</span>
				)}
			</div>

			{!user.bookings || user.bookings.length === 0 ? (
				<div
					className="rounded-2xl border border-white/10 p-10 text-center"
					style={{ background: "rgba(255,255,255,0.03)" }}
				>
					<div
						className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
						style={{
							background: "rgba(42,181,174,0.1)",
							border: "1px solid rgba(42,181,174,0.2)",
						}}
					>
						<svg
							width="22"
							height="22"
							fill="none"
							stroke="#2ab5ae"
							strokeWidth="1.8"
							viewBox="0 0 24 24"
						>
							<rect x="3" y="4" width="18" height="18" rx="2" />
							<path d="M16 2v4M8 2v4M3 10h18" />
						</svg>
					</div>
					<p className="text-white/40 text-sm">У вас пока нет записей</p>
				</div>
			) : (
				<ul className="flex flex-col gap-3">
					{user.bookings.map((b) => (
						<li
							key={b.id}
							className="group rounded-2xl border border-white/10 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-200 hover:border-[#2ab5ae]/30 hover:shadow-[0_0_20px_rgba(42,181,174,0.08)]"
							style={{ background: "rgba(255,255,255,0.03)" }}
						>
							<div className="flex items-center gap-4">
								{/* Coach initial circle */}
								<button
									onClick={() =>
										setSelectedCoach(b.coach as unknown as SliderCoach)
									}
									className="flex items-center gap-4 text-left hover:opacity-80 transition-opacity"
								>
									<div
										className="w-17 h-17 rounded-xl shrink-0 flex items-center justify-center font-bold text-sm"
										style={{
											background: "rgba(42,181,174,0.15)",
											color: "#2ab5ae",
											border: "1px solid rgba(42,181,174,0.2)",
										}}
									>
										<div className="w-17 h-17 rounded-xl shrink-0 overflow-hidden border border-white/20">
											<Image
												src={b.coach.src}
												alt={b.coach.fullName}
												width={40}
												height={40}
												sizes="80px"
												className="w-full h-full object-cover"
											/>
										</div>
									</div>

									<div>
										<p className="font-semibold text-sm">{b.coach.fullName}</p>
										<p className="text-white/40 text-xs mt-0.5">
											{new Date(b.date).toLocaleString("ru-RU", {
												day: "2-digit",
												month: "long",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit",
											})}
										</p>
									</div>
								</button>
							</div>

							<AlertDialog>
								<AlertDialogTrigger asChild>
									<button className="shrink-0 px-4 py-2 rounded-xl text-xs font-semibold border border-white/15 text-white/50 hover:border-red-500/50 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 sm:opacity-0 sm:group-hover:opacity-100">
										Отменить запись
									</button>
								</AlertDialogTrigger>
								<AlertDialogContent
									className="text-white border border-white/10 rounded-2xl shadow-2xl p-6 sm:max-w-md backdrop-blur-md"
									style={{
										background:
											"linear-gradient(135deg, rgba(4,112,107,0.55) 0%, rgba(4,32,28,0.75) 100%)",
									}}
								>
									<AlertDialogHeader>
										<AlertDialogTitle
											className="text-2xl font-extrabold tracking-tight"
											style={{
												background:
													"linear-gradient(90deg, #fff 60%, #2ab5ae 100%)",
												WebkitBackgroundClip: "text",
												WebkitTextFillColor: "transparent",
											}}
										>
											Отменить запись?
										</AlertDialogTitle>
										<AlertDialogDescription className="text-white/60 text-sm leading-relaxed mt-2">
											Вы уверены, что хотите удалить запись к тренеру{" "}
											<span className="text-white font-semibold">
												{b.coach.fullName}
											</span>
											?
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter className="mt-6 flex gap-2 justify-end">
										<AlertDialogCancel className="px-4 py-2 rounded-xl text-sm border border-white/20 text-white/70 hover:bg-white/10 transition-all bg-transparent">
											Отмена
										</AlertDialogCancel>
										<AlertDialogAction
											className="px-4 py-2 rounded-xl text-sm bg-red-600 hover:bg-red-700 text-white transition-all"
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
			<CoachModal
				selectedCoach={selectedCoach}
				setSelectedCoach={setSelectedCoach}
				readOnly
			/>
		</div>
	);
}
