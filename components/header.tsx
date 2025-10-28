"use client";

import { Container } from "./container";
import { cn } from "@/lib/cn";
import { Phone } from "lucide-react";
import SocialMedia from "./social-media";

interface Props {
	className?: string;
}

export default function Header({ className }: Props) {
	return (
		<header className={cn("bg-[#04706b] py-3", className)}>
			<Container>
				<div className="flex justify-end items-center">
					<div className="flex items-center gap-2 mr-3.5">
						<Phone className="w-5 h-5 text-[#6ee7c5]" />
						<p className="text-sm font-medium tracking-wide">
							+7 (495) 859-03-72
						</p>
					</div>

					<SocialMedia />
				</div>
			</Container>
		</header>
	);
}
