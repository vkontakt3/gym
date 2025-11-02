import { cn } from "@/lib/cn";
import Card from "./card";
import { Container } from "./container";
import SliderHome from "./slider/slider-home";
import Link from "next/link";

interface Props {
	className?: string;
}

export default function HomeSection({ className }: Props) {
	const items = [
		"Гибкая клубная карта",
		"Персональные тренировки",
		"Все самые продвинутые программы 2025 года",
	];

	return (
		<section
			id="home"
			className={cn(
				"relative w-full min-h-[745px] overflow-hidden text-white",
				"md:h-[745px] h-auto pb-10",
				className
			)}
		>
			{/* Фон */}
			<div className="absolute inset-0 -z-0">
				<SliderHome />
			</div>
			<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10 md:bg-gradient-to-r bg-black/70" />

			<Container>
				{/* Контент */}
				<div className="relative z-10 flex w-full justify-between items-center mt-16 md:flex-row flex-col gap-10">
					{/* Левая колонка */}
					<div className="flex flex-col md:max-w-[50%] w-full text-center md:text-left">
						<h1 className="font-dela md:text-6xl text-4xl font-bold leading-[150%] [text-shadow:_0_4px_10px_rgba(0,0,0,0.6)]">
							Создай тело <br className="hidden md:block" />
							мечты вместе <br className="hidden md:block" />
							<span className="text-[#04706b]">с Moreon Fitness</span>
						</h1>

						<div className="mt-6 space-y-3">
							{items.map((item, i) => (
								<p
									key={i}
									className="font-montserrat text-[18px] md:text-[20px] leading-[140%] border-l-4 border-[#04706b] pl-2 mx-auto md:mx-0 w-fit"
								>
									{item}
								</p>
							))}
						</div>

						<Link
							href="#coachs"
							className="btn mt-8 md:mt-10 md:max-w-[240px] mx-auto md:mx-0"
						>
							Записаться
						</Link>
					</div>

					{/* Правая колонка */}
					<div className="flex md:flex-col flex-row flex-wrap items-center justify-center gap-4 md:gap-5">
						<Card
							title={"500 000 м²"}
							text={"Площадь зала"}
							width={220}
							height={120}
							className="max-w-[300px]"
						/>
						<Card
							title={"100"}
							text="Тренажеров VIP уровня"
							width={220}
							height={120}
							className="max-w-[300px]"
						/>
						<Card
							title={"Бассейны "}
							text={`и СПА центр`}
							width={220}
							height={120}
							className="max-w-[300px]"
						/>
					</div>
				</div>
			</Container>
		</section>
	);
}
