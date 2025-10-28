"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
const CardGalerySkeleton = dynamic(
	() => import("../loading/skeleton-card-galery"),
	{
		ssr: false,
	}
);

interface Props {
	className?: string;
}

interface CardProps {
	src: string;
}

export default function SliderCard({ className }: Props) {
	const [loading, setLoading] = React.useState(true);
	const [card, setCard] = React.useState<CardProps[]>([]);

	React.useEffect(() => {
		async function getGalery() {
			setLoading(true);
			const res = await fetch("/api/card");
			if (!res.ok) {
				throw new Error("Failed to fetch data");
			}
			const data = await res.json();
			setCard(data);
			setLoading(false);
		}
		getGalery();
	}, []);

	return (
		<div className={`relative ${className}`}>
			{/* Стрелки */}
			<div className="absolute top-1/2 -left-15 z-40 transform -translate-y-1/2">
				<button className="slider-prev w-10 h-10 flex items-center justify-center rounded-full border text-white shadow-md hover:border-[#28B0A9] active:opacity-60 transition group">
					<ArrowLeftIcon className="group-hover:text-[#28B0A9]" />
				</button>
			</div>
			<div className="absolute top-1/2 -right-15 z-40 transform -translate-y-1/2">
				<button className="slider-next  w-10 h-10 flex items-center justify-center rounded-full border  text-white shadow-md hover:border-[#28B0A9] active:opacity-60 transition group">
					<ArrowRightIcon className="group-hover:text-[#28B0A9]" />
				</button>
			</div>

			<Swiper
				modules={[Autoplay, Navigation]}
				slidesPerView={3}
				spaceBetween={20}
				loop
				autoplay={{ delay: 5000 }}
				navigation={{
					prevEl: ".slider-prev", // селектор кнопки
					nextEl: ".slider-next",
				}}
				className="w-full h-[300px]"
			>
				{loading || card.length === 0
					? [...Array.from({ length: 3 })].map((_, index) => (
							<SwiperSlide key={index} className="overflow-visible">
								<CardGalerySkeleton />
							</SwiperSlide>
					  ))
					: card.map((item, i) => (
							<SwiperSlide key={i} className="overflow-visible">
								<div className="p-1 relative w-full h-full">
									<Image
										src={item.src}
										alt="slide"
										className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-103"
										width={400}
										height={300}
									/>
								</div>
							</SwiperSlide>
					  ))}
			</Swiper>
		</div>
	);
}
