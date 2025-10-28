import { cn } from "@/lib/cn";
import Image from "next/image";

interface Props {
	src: string;
	fullName: string;
	description: string;
	className?: string;
}

export default function CoachCard({
	src,
	fullName,
	description,
	className,
}: Props) {
	return (
		<div
			className={cn(
				"group relative w-[320px] h-[400px] rounded-xl overflow-hidden mb-10 cursor-pointer transition-transform duration-500 ease-out hover:scale-[1.03]",
				className
			)}
		>
			<Image
				src={src}
				alt="coach"
				width={800}
				height={400}
				className="w-full h-full object-cover"
			/>

			{/* Голубая плашка */}
			<div
				className="absolute bottom-[-8px] left-0 w-full h-[130px]
        rounded-tl-[40px] rounded-tr-[10px]
        bg-[rgba(42,181,174,0.5)]
        backdrop-blur-[60px]
        rotate-[7deg] origin-bottom-right
        flex items-center justify-center
        -ml-1 opacity-95
        transition-all duration-500 ease-out
        group-hover:h-[135px] group-hover:translate-y-[-10px]"
				style={{
					transformOrigin: "bottom left",
				}}
			></div>

			{/* Имя и описание */}
			<div className="absolute bottom-1 left-4 z-20 transition-all duration-500 ease-out group-hover:translate-y-[-15px]">
				<h2 className="text-[#28B0A9] uppercase tracking-wide font-dela text-lg">
					{fullName}
				</h2>
				<p className="text-white text-sm font-montserrat opacity-70 font-normal">
					{description}
				</p>
			</div>

			{/* Надпись при наведении */}
			<div className="absolute bottom-3 w-full left-4  z-30 text-white text-sm font-montserrat opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-60">
				Нажмите, чтобы записаться
			</div>
		</div>
	);
}
