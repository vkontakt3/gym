"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import React, { useEffect, useState } from "react";

interface Props {
	className?: string;
}

interface Links {
	name: string;
	href: string;
}

export default function Navigation({ className }: Props) {
	const [links, setLinks] = useState<Links[]>([]);
	const [activeHref, setActiveHref] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	// Получаем данные навигации
	useEffect(() => {
		async function getNavigation() {
			try {
				setLoading(true);
				const res = await fetch("/api/navigation");
				if (!res.ok) throw new Error("Failed to fetch data");
				const data = await res.json();
				setLinks(data);
			} catch (error) {
				console.error(error);
				setLinks([]); // пустой массив при ошибке
			} finally {
				setLoading(false);
			}
		}
		getNavigation();
	}, []);

	// Отслеживаем скролл, чтобы менять активный href
	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + window.innerHeight / 3;

			let current = "";
			links.forEach(({ href }) => {
				const section = document.querySelector(href);
				if (
					section &&
					scrollPosition >= section.getBoundingClientRect().top + window.scrollY
				) {
					current = href;
				}
			});
			setActiveHref(current);
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // чтобы сразу выставить активный пункт
		return () => window.removeEventListener("scroll", handleScroll);
	}, [links]);

	if (loading) {
		return (
			<div
				className={cn(
					"flex items-center justify-around mt-3 w-full lg:ml-8",
					className
				)}
			>
				{[...Array(4)].map((_, i) => (
					<div
						key={i}
						className="h-5 w-30 bg-gray-400 rounded animate-pulse"
					></div>
				))}
			</div>
		);
	}

	return (
		<div
			className={cn(
				"flex items-center justify-around mt-3 w-full lg:ml-8",
				className
			)}
		>
			{links.map(({ name, href }, i) => (
				<Link key={i} href={href} className="relative pb-1 group">
					<p className="font-montserrat opacity-90 text-[16px] leading-[140%] tracking-[0%]">
						{name}
					</p>
					<span
						className={cn(
							"absolute left-0 bottom-0 h-[1px] bg-[#ffffff] transition-all duration-300",
							activeHref === href ? "w-full" : "w-0 group-hover:w-full"
						)}
					></span>
				</Link>
			))}
		</div>
	);
}
