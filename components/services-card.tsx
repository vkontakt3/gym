import { cn } from "@/lib/cn";
import Image from "next/image";

interface Props {
	src: string;
	title: string;
	className?: string;
}

export default function ServicesCard({ src, title, className }: Props) {
	return (
		<div
			className={cn(
				"relative w-[420px] h-[400px] rounded-xl overflow-hidden mb-10",
				className
			)}
		>
			<Image src={src} alt="services" width={800} height={300} />

			<div
				className="absolute bottom-0 left-0 w-full h-[125px] 
		rounded-tl-[40px] rounded-tr-[10px]
		bg-[rgba(42,181,174,0.5)] 
		backdrop-blur-[30px]
		rotate-[7deg] origin-bottom-right
		flex items-center pl-6 -ml-1 opacity-90"
				style={{
					transformOrigin: "bottom left",
				}}
			></div>
			<p className="text-white text- uppercase tracking-wide absolute bottom-8 left-4 font-dela">
				{title}
			</p>
		</div>
	);
}
