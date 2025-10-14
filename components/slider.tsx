"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function Slider() {
	return (
		<Swiper
			modules={[Autoplay]}
			slidesPerView={1}
			loop
			autoplay={{ delay: 4000 }}
			className="relative w-full h-[745px]"
		>
			{["/bg-home1.svg", "/bg-home2.png", "/bg-home3.jpg", "/bg-home4.jpg"].map(
				(src) => (
					<SwiperSlide key={src}>
						<div className="relative w-full h-full">
							<img
								src={src}
								alt="slide"
								className="absolute inset-0 w-full h-[800px] object-cover object-top"
								width={1920}
								height={1045}
							/>
						</div>
					</SwiperSlide>
				)
			)}
		</Swiper>
	);
}
