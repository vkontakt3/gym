import AboutClub from "@/components/about-club";
import HomeSection from "@/components/home-section";
import Image from "next/image";

interface Props {
	className?: string;
}

export default function Home({ className }: Props) {
	return (
		<div className={className}>
			<HomeSection />
			<AboutClub />
		</div>
	);
}
