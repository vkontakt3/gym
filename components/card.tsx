import { cn } from "@/lib/cn";

interface Props {
	title?: string;
	text?: string;
	width?: number;
	height?: number;
	className?: string;
}

export default function Card({ title, text, width, height, className }: Props) {
	return (
		<div
			className={cn(
				`bg-white/20 backdrop-blur-[30px] rounded-3xl p-4 text-center font-montserrat flex flex-col justify-center items-center`,
				className
			)}
			style={{
				width: width ? `${width}px` : undefined,
				height: height ? `${height}px` : undefined,
			}}
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
