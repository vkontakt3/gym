"use client";

import AboutClub from "@/components/about-club";
import CardClubSection from "@/components/card-club-section";
import Coachs from "@/components/coachs";
import Footer from "@/components/footer";
import Galery from "@/components/galery";
import HomeSection from "@/components/home-section";
import Services from "@/components/services";

interface Props {
	className?: string;
}

export default function Home({ className }: Props) {
	return (
		<div className={className}>
			<HomeSection />
			<AboutClub />
			<Galery />
			<CardClubSection />
			<Services />
			<Coachs className="mt-30" />
			<Footer />
		</div>
	);
}
