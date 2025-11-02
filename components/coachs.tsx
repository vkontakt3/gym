import { cn } from "@/lib/cn";
import { Container } from "./container";
import SliderCoach from "./slider/slider-coach";
import Title from "./title";
import Image from "next/image";

interface Props {
	className?: string;
}

export default function Coachs({ className }: Props) {
	return (
		<section
			id="coachs"
			className={cn("relative overflow-hidden mb-30 z-10", className)}
		>
			<Container>
				<Image
					className="absolute w-full h-full inset-0 object-cover z-0 opacity-15 "
					src={"/bg.jpg"}
					alt="bg"
					width={1920}
					height={1045}
				/>
				<Title
					className="relative z-10"
					title="Тренеры"
					titleWhite="направления"
				/>

				<SliderCoach className="mb-20 z-30" />
			</Container>
		</section>
	);
}
