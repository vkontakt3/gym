import { cn } from "@/lib/cn";
import React from "react";

interface Props {
	className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
	className,
	children,
}) => {
	return (
		<div className={cn(" max-w-[1400px] mx-auto px-4", className)}>
			{children}
		</div>
	);
};
