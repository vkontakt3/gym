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

	const [isMobile, setIsMobile] = React.useState(false);

	React.useEffect(() => {
		function handleResize() {
			setIsMobile(window.innerWidth < 768); // < 768px = мобилка/планшет
		}
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	React.useEffect(() => {
		async function getCoachs() {
			setLoading(true);
			const res = await fetch("/api/coachs");
			if (!res.ok) throw new Error("Failed to fetch data");
			const data = await res.json();
			setCoachs(data);
			setLoading(false);
		}
		getCoachs();
	}, []);

	return (
		<div className={`relative z-30 ${className}`}>
			{/* Стрелки */}
			<div className="absolute top-1/2 left-2 sm:left-[-15px] z-30 transform -translate-y-1/2">
				<button className="slider-prev w-10 h-10 flex items-center justify-center rounded-full border text-white shadow-md hover:border-[#28B0A9] active:opacity-60 transition group">
					<ArrowLeftIcon className="group-hover:text-[#28B0A9]" />
				</button>
			</div>
			<div className="absolute top-1/2 right-2 sm:right-[-15px] z-30 transform -translate-y-1/2">
				<button className="slider-next w-10 h-10 flex items-center justify-center rounded-full border text-white shadow-md hover:border-[#28B0A9] active:opacity-60 transition group">
					<ArrowRightIcon className="group-hover:text-[#28B0A9]" />
				</button>
			</div>

			<Swiper
				modules={[Autoplay, Navigation]}
				loop
				autoplay={{ delay: 5000 }}
				navigation={{ prevEl: ".slider-prev", nextEl: ".slider-next" }}
				centeredSlides={isMobile}
				slidesPerView="auto"
				spaceBetween={20}
				breakpoints={{
					320: { slidesPerView: 1.2, spaceBetween: 12 }, // мобильный
					480: { slidesPerView: 1.6, spaceBetween: 14 },
					640: { slidesPerView: 2.2, spaceBetween: 16 }, // планшет маленький
					768: { slidesPerView: 2.6, spaceBetween: 18 },
					1024: { slidesPerView: 3.2, spaceBetween: 18 }, // ноутбук
					1280: { slidesPerView: 4, spaceBetween: 20 }, // десктоп
				}}
				className="w-full h-auto overflow-visible z-40"
			>
				{loading || coachs.length === 0
					? [...Array(4)].map((_, index) => (
							<SwiperSlide key={index} className="overflow-visible scale-90">
								<CoachsSkeleton />
							</SwiperSlide>
					  ))
					: coachs.map((coach) => (
							<SwiperSlide
								key={coach.id}
								className="transition-all duration-300 ease-in-out scale-90 swiper-slide-active:scale-100 "
							>
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
