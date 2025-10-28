import { cn } from "@/lib/cn";
import { Container } from "./container";
import Title from "./title";
import Image from "next/image";
import SliderCard from "./slider/slider-card";
import React from "react";

interface Props {
	className?: string;
}

export default function CardClubSection({ className }: Props) {
	return (
		<section
			id="clubcard"
			className={cn("relative overflow-hidden", className)}
		>
			<Container>
				<Image
					className="absolute w-full h-full inset-0 object-cover z-0 opacity-15"
					src={"/bg.jpg"}
					alt="bg"
					width={1920}
					height={1045}
				/>
				<div className="relative flex gap-3 z-10">
					<Title titleWhite="Выбери свою" />
					<Title title="карту" />
				</div>

				<SliderCard className="mb-40" />
			</Container>
		</section>
	);
}
