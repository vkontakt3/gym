import { cn } from "@/lib/cn";
import Slider from "./slider";
import Card from "./card";
import { Container } from "./container";

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
			className={cn(
				"relative w-full h-[745px] overflow-hidden text-white",
				className
			)}
		>
			{/* Фон */}
			<div className="absolute inset-0 -z-0">
				<Slider />
			</div>
			<div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10 " />

			<Container>
				{/* Контент */}
				<div className="relative z-10 flex w-full justify-between items-center mt-16">
					{/* Левая колонка: текст и кнопка */}
					<div className="flex flex-col ">
						<h1 className="font-dela text-6xl font-bold leading-[160%] [text-shadow:_0_4px_10px_rgba(0,0,0,0.6)]">
							Создай тело <br />
							мечты вместе <br />
							<span className="text-[#04706b]">с Moreon Fitness</span>
						</h1>

						<div className="mt-6">
							{items.map((item, i) => (
								<p
									key={i}
									className="mt-4 font-montserrat text-[20px] leading-[140%] border-l-4 border-[#04706b] pl-2"
								>
									{item}
								</p>
							))}
						</div>

						<button className="btn mt-10 max-w-[240px]">Записаться</button>
					</div>

					{/* Правая колонка: только карточка */}
					<div className="flex flex-col items-center justify-end gap-5">
						<Card
							title={"500 000 м²"}
							text={"Площадь зала"}
							width={220}
							heidht={32}
							className="max-w-[300px]"
						/>
						<Card
							title={"100"}
							text="Тренажеров VIP уровня"
							width={220}
							heidht={32}
							className="max-w-[300px]"
						/>
						<Card
							title={"Бассейны "}
							text={`и 
                            СПА центр`}
							width={220}
							heidht={32}
							className="max-w-[300px]"
						/>
					</div>
				</div>
			</Container>
		</section>
	);
}
