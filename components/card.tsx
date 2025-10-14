import { cn } from "@/lib/cn";

interface Props {
	title?: string;
	text?: string;
	width?: number;
	heidht?: number;
	className?: string;
}

export default function Card({ title, text, width, heidht, className }: Props) {
	return (
		<div
			className={cn(
				`bg-white/20 backdrop-blur-[30px] rounded-3xl p-4 text-center w-[${width}px] h-${heidht} font-montserrat flex flex-col justify-center items-center`,
				className
			)}
		>
			<h1 className="font-bold text-2xl flex-1 flex items-center justify-center">
				{title}
			</h1>
			<p className="text-lg flex-1 flex items-center justify-center whitespace-pre-line">
				{text}
			</p>
		</div>
	);
}
// 128
