interface Props {
	title?: string;
	titleWhite?: string;
	className?: string;
	disableMarginTop?: boolean;
}

export default function Title({
	title,
	titleWhite,
	className,
	disableMarginTop,
}: Props) {
	return (
		<div className={className}>
			<div className={`${disableMarginTop ? "mb-10" : "mt-34 mb-10"}`}>
				<h1 className="text-5xl text-[#0ab9b1] font-dela text-shadow-2xs">
					{title} <span className="text-white">{titleWhite}</span>
				</h1>
			</div>
		</div>
	);
}
