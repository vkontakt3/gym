"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "./container";
import Title from "./title";
import { cn } from "@/lib/cn";
import React from "react";
import dynamic from "next/dynamic";
const CardGalerySkeleton = dynamic(
	() => import("./loading/skeleton-card-galery"),
	{
		ssr: false,
	}
);
interface Props {
	className?: string;
}

interface GaleryProps {
	src: string;
	alt: string;
}

export default function Galery({ className }: Props) {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [loading, setLoading] = React.useState(true);
	const [galery, setGalery] = React.useState<GaleryProps[]>([]);

	React.useEffect(() => {
		async function getGalery() {
			setLoading(true);
			const res = await fetch("/api/galery");
			if (!res.ok) {
				throw new Error("Failed to fetch data");
			}
			const data = await res.json();
			setGalery(data);
			setLoading(false);
		}
		getGalery();
	}, []);

	return (
		<section id="gallery" className={cn("relative overflow-hidden", className)}>
			<Container>
				<Title titleWhite="Фотогалерея" />
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
					{loading || galery.length === 0
						? [...Array.from({ length: 6 })].map((_, index) => (
								<CardGalerySkeleton key={index} />
						  ))
						: galery.map((item, index) => (
								<Image
									key={index}
									src={item.src}
									alt={item.alt}
									width={500}
									height={300}
									onClick={() => setSelectedImage(item.src)}
									className="cursor-pointer transition-transform duration-300 hover:scale-105 rounded-lg"
								/>
						  ))}
				</div>

				<div className="flex justify-center mt-10 mb-10">
					<Link href="" className="btn-secondary">
						Смотреть все фото
					</Link>
				</div>
			</Container>

			{/* Модалка */}
			{selectedImage && (
				<div
					className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 opacity-100"
					onClick={() => setSelectedImage(null)}
				>
					<div
						className="relative animate-pop"
						onClick={(e) => e.stopPropagation()}
					>
						<Image
							src={selectedImage}
							alt="full image"
							width={1000}
							height={600}
							className="rounded-lg shadow-lg"
						/>
						<button
							onClick={() => setSelectedImage(null)}
							className="absolute top-2 right-2 text-white text-3xl leading-none"
						>
							×
						</button>
					</div>
				</div>
			)}
		</section>
	);
}
