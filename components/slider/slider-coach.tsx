"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import React from "react";
import dynamic from "next/dynamic";
import CoachCard from "../coach-card";
import CoachModal from "../coach-modal";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

interface Props {
	className?: string;
}

export interface Achievement {
	id: number;
	text: string;
	coachId: number;
	createdAt: string;
	updatedAt: string;
}

export interface Coach {
	id: number;
	src: string;
	fullName: string;
	description: string;
	experience: string;
	achievements: Achievement[];
	specializations: string[];
	schedule: string;
	phone: string;
	email: string;
	about: string;
}

const CoachsSkeleton = dynamic(() => import("../loading/skeleton-coach"), {
	ssr: false,
});

export default function SliderCoach({ className }: Props) {
	const [loading, setLoading] = React.useState(true);
	const [coachs, setCoachs] = React.useState<Coach[]>([]);
	const [selectedCoach, setSelectedCoach] = React.useState<Coach | null>(null);

	React.useEffect(() => {
		async function getCoachs() {
			setLoading(true);
			const res = await fetch("/api/coachs");
			if (!res.ok) {
				throw new Error("Failed to fetch data");
			}
			const data = await res.json();
			console.log(data);

			setCoachs(data);
			setLoading(false);
		}
		getCoachs();
	}, []);

	return (
		<div className={`relative ${className}`}>
			{/* Стрелки */}
			<div className="absolute top-1/2 -left-15 z-30 transform -translate-y-1/2">
				<button className="slider-prev w-10 h-10 flex items-center justify-center rounded-full border text-white shadow-md hover:border-[#28B0A9] active:opacity-60 transition group">
					<ArrowLeftIcon className="group-hover:text-[#28B0A9]" />
				</button>
			</div>
			<div className="absolute top-1/2 -right-15 z-30 transform -translate-y-1/2">
				<button className="slider-next w-10 h-10 flex items-center justify-center rounded-full border text-white shadow-md hover:border-[#28B0A9] active:opacity-60 transition group">
					<ArrowRightIcon className="group-hover:text-[#28B0A9]" />
				</button>
			</div>

			<Swiper
				modules={[Autoplay, Navigation]}
				slidesPerView={4}
				spaceBetween={20}
				loop
				autoplay={{ delay: 5000 }}
				navigation={{
					prevEl: ".slider-prev",
					nextEl: ".slider-next",
				}}
				className="w-full h-full overflow-visible"
			>
				{loading || coachs.length === 0
					? [...Array(4)].map((_, index) => (
							<SwiperSlide key={index}>
								<CoachsSkeleton />
							</SwiperSlide>
					  ))
					: coachs.map((coach) => (
							<SwiperSlide key={coach.src}>
								<div onClick={() => setSelectedCoach(coach)}>
									<CoachCard
										src={coach.src}
										fullName={coach.fullName}
										description={coach.description}
									/>
								</div>
							</SwiperSlide>
					  ))}
			</Swiper>

			{/* 🔹 Модалка */}
			<CoachModal
				selectedCoach={selectedCoach}
				setSelectedCoach={setSelectedCoach}
			/>
		</div>
	);
}
