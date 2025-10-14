import Link from "next/link";
import { cn } from "@/lib/cn";

interface Props {
	className?: string;
}

export default function Navigation({ className }: Props) {
	const links = [
		{ name: "О клубе", href: "/about" },
		{ name: "Галерея", href: "/gallery" },
		{ name: "Услуги", href: "/services" },
		{ name: "Клубная карта", href: "/club-card" },
		{ name: "Тренера и записи", href: "/trainers" },
	];

	return (
		<div
			className={cn(
				"flex items-center justify-around mt-3 w-full ml-8",
				className
			)}
		>
			{links.map(({ name, href }, i) => (
				<Link key={i} href={href} className="relative pb-1 group">
					<p className="font-montserrat opacity-90 text-[16px] leading-[140%] tracking-[0%]">
						{name}
					</p>
					<span className="absolute left-0 bottom-0 h-[1px] w-0 bg-[#ffffff] transition-all duration-300 group-hover:w-full"></span>
				</Link>
			))}
		</div>
	);
}
