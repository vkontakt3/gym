"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Coach } from "./slider/slider-coach";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import toast from "react-hot-toast";
import DateInputPicker from "./ui/date-picker";

interface Props {
	selectedCoach: Coach | null;
	setSelectedCoach: React.Dispatch<React.SetStateAction<Coach | null>>;
}

export default function CoachModal({ selectedCoach, setSelectedCoach }: Props) {
	const { data: session } = useSession();
	const [date, setDate] = useState("");

	useEffect(() => {
		setDate("");
	}, [selectedCoach]);

	if (!selectedCoach) return null;

	async function handleBooking() {
		if (!session) {
			toast.error("Пожалуйста, авторизуйтесь. ❌");
			return;
		}

		const selectedDate = new Date(date);
		const now = new Date();

		if (selectedDate < now) {
			toast.error("Вы не можете выбрать прошедшую дату. ⏰");
			return;
		}

		const res = await fetch("/api/bookings", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ coachId: selectedCoach?.id, date }),
		});

		if (res.ok) {
			toast.success("Вы успешно записались! ✅");
			setSelectedCoach(null);
		} else {
			toast.error("Ошибка при записи. ❌");
		}
	}

	return (
		<Dialog open={!!selectedCoach} onOpenChange={() => setSelectedCoach(null)}>
			<DialogContent className="max-w-4xl h-[600px] p-0 rounded-xl overflow-hidden">
				<div className="flex flex-col md:flex-row">
					{/* Левая часть — Фото */}
					<div className="md:w-1/2 w-full h-80 md:h-auto relative">
						<img
							src={selectedCoach.src}
							alt={selectedCoach.fullName}
							className="object-cover w-full h-full"
						/>
					</div>

					{/* Правая часть — Информация */}
					<div className="md:w-1/2 w-full p-6  ">
						<DialogHeader>
							<DialogTitle className="font-montserrat text-4xl mb-4  font-extrabold">
								{selectedCoach.fullName}
							</DialogTitle>
						</DialogHeader>

						<p className="font-montserrat font-normal opactity-70 mb-1">
							{selectedCoach.description}
						</p>

						<p className="font-montserrat font-normal opactity-70 mb-1">
							Стаж работы: {selectedCoach.experience}
						</p>

						<div className="mb-2">
							<strong className="font-dela text-lg font-normal">
								Достижения:
							</strong>
							<ul className="font-montserrat opacity-90 list-none mb-5">
								{selectedCoach.achievements.map((ach, idx) => (
									<li
										key={idx}
										className="relative pl-6 mb-2 before:absolute before:left-2 before:top-1/2 before:h-[1px] before:w-2 before:bg-white before:-translate-y-1/2"
									>
										{ach.text}
									</li>
								))}
							</ul>
						</div>

						<div className="mb-2 font-montserrat mb-5 opacity-90">
							<strong>Контакты:</strong>
							<div>Телефон: {selectedCoach.phone}</div>
							<div>Email: {selectedCoach.email}</div>
						</div>

						<div className="mt-2 font-montserrat mb-5 opacity-90">
							<strong>О тренере:</strong>
							<p>{selectedCoach.about}</p>
						</div>

						{/* 🔹 Кнопка появляется только если дата выбрана */}
						{!date ? (
							<div className="mt-4 mb-3">
								<label className="font-montserrat mb-1 block">
									Выберите дату тренировки:
								</label>
								<DateInputPicker onChange={setDate} />
							</div>
						) : (
							<div className="flex items-center gap-4 mt-6">
								<button
									onClick={handleBooking}
									className="px-6 py-2.5 bg-gradient-to-r from-[rgba(42,181,174,0.8)] to-[rgba(42,181,174,0.6)] text-white font-semibold rounded-lg shadow-md hover:from-[rgba(42,181,174,1)] hover:to-[rgba(42,181,174,0.8)] hover:shadow-[0_0_10px_rgba(42,181,174,0.6)] transition-all duration-200"
								>
									Записаться на{" "}
									{new Date(date).toLocaleString("ru-RU", {
										day: "2-digit",
										month: "long",
										year: "numeric",
										hour: "2-digit",
										minute: "2-digit",
									})}
								</button>

								<button
									onClick={() => setDate("")}
									className="px-6 py-2.5 border border-[rgba(42,181,174,0.5)] text-[rgba(42,181,174,0.9)] rounded-lg font-medium hover:bg-[rgba(42,181,174,0.1)] hover:border-[rgba(42,181,174,0.8)] transition-all duration-400"
								>
									Выбрать другую дату
								</button>
							</div>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
