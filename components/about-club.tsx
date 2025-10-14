import { cn } from "@/lib/cn";
import Image from "next/image";
import { Container } from "./container";
import Card from "./card";
import Link from "next/link";

interface Props {
	className?: string;
}

export default function AboutClub({ className }: Props) {
	return (
		<div className={cn("relative", className)}>
			<Image
				className="absolute w-full h-[900px] object-cover z-0 opacity-15"
				src={"/bg.jpg"}
				alt="bg"
				width={1920}
				height={1045}
			/>
			<Container>
				<div className="relative z-20 flex flex-col ">
					<h1 className="text-5xl  text-[#0ab9b1] font-dela text-shadow-2xs mt-34 mb-10">
						Moreon Fitness <span className="text-white">Яснево</span>
					</h1>

					<Card
						width={1000}
						className="text-start font-montserrat text-sm opacity-90"
						text={`Добро пожаловать в Moreon Fitness – премиум фитнес-клуб, где спорт становится образом жизни! 

У нас вы найдёте:
• Современный тренажёрный зал с оборудованием Technogym мирового уровня.

• Профессиональные тренировки с сертифицированными инструкторами и призёрами международных соревнований.

• Разнообразные абонементы, подходящие как для новичков, так и для опытных спортсменов.

• Групповые программы для взрослых и детей, включая единоборства, плавание, йогу и функциональный тренинг.

• Комфортные зоны отдыха: бассейн, SPA, релакс-зоны, индивидуальные шкафчики, халаты и полотенца.

В Moreon Fitness вы создаёте своё тело мечты, тренируетесь эффективно и безопасно, а занятия спортом становятся не только полезными, но и приятными.
Мы находимся рядом с метро «Ясенево», с удобным подъездом со стороны МКАДа и ТТК. Для членов клуба действует бесплатная парковка. `}
					/>
				</div>
				<div className="flex justify-center mt-6">
					<Link
						className="relative z-20 btn-secondary w-[400px] "
						href={"/galery"}
					>
						Перейти к галерее
					</Link>
				</div>
			</Container>
		</div>
	);
}
