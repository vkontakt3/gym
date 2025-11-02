"use client";

import React from "react";
import { Container } from "./container";
import Title from "./title";
import { cn } from "@/lib/cn";
import ServicesCard from "./services-card";
import dynamic from "next/dynamic";

interface Props {
	className?: string;
}

interface Service {
	src: string;
	title: string;
}

const ServicesCardSkeleton = dynamic(
	() => import("./loading/skeleton-services"),
	{
		ssr: false,
	}
);

export default function Services({ className }: Props) {
	const [services, setServices] = React.useState<Service[]>([]);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		async function getServices() {
			setLoading(true);
			const res = await fetch("/api/services");
			if (!res.ok) throw new Error("Failed to fetch data");
			const data = await res.json();
			setServices(data);
			setLoading(false);
		}
		getServices();
	}, []);

	return (
		<section
			id="services"
			className={cn("relative overflow-hidden py-10 md:py-20", className)}
		>
			<Container>
				{" "}
				<div className="relative flex gap-3 z-10">
					{" "}
					<Title titleWhite="Направления" /> <Title title="занятий" />{" "}
				</div>
				{/* Сетки карточек */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
					{loading || services.length === 0
						? Array.from({ length: 9 }).map((_, index) => (
								<ServicesCardSkeleton key={index} />
						  ))
						: services.map((item, index) => (
								<ServicesCard key={index} src={item.src} title={item.title} />
						  ))}
				</div>
			</Container>
		</section>
	);
}
