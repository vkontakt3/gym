import Header from "@/components/header";
import TopBar from "@/components/top-bar";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "IronFit",
	description: "IronFit - the best gym in the world",
};

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main>
			<Header />
			<TopBar />
			{children}
		</main>
	);
}
