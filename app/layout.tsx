import { Dela_Gothic_One, Montserrat } from "next/font/google";
import "./globals.css";

const dela = Dela_Gothic_One({
	subsets: ["latin", "cyrillic"],
	variable: "--font-dela",
	weight: ["400"],
});

const montserrat = Montserrat({
	subsets: ["latin", "cyrillic"],
	variable: "--font-montserrat",
	weight: ["400", "600", "700"],
});

export const metadata = {
	title: "IronFit",
	description: "IronFit - the best gym in the world",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${dela.variable} ${montserrat.variable}`}>
			<body className="font-[var(--font-montserrat)] bg-[#04140c] text-white">
				{children}
			</body>
		</html>
	);
}
