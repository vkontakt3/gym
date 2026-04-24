"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";

export default function SliderHome() {
	return (
		<Swiper
			modules={[Autoplay, EffectFade]}
			slidesPerView={1}
			loop
			effect="fade"
			fadeEffect={{ crossFade: true }}
			autoplay={{ delay: 4000 }}
			className="relative w-full h-[745px]"
		>
			{[
				"/bg-home/bg-home1.svg",
				"/bg-home/bg-home2.png",
				"/bg-home/bg-home3.jpg",
				"/bg-home/bg-home4.jpg",
			].map((src) => (
				<SwiperSlide key={src}>
					<div className="relative w-full h-full">
						<Image
							src={src}
							alt="slide"
							className="absolute inset-0 w-full h-[800px] object-cover object-top"
							width={1920}
							height={1045}
						/>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
