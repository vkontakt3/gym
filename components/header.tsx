import Link from "next/link";
import { Container } from "./container";
import { cn } from "@/lib/cn";
import { Phone } from "lucide-react";
import SocialMedia from "./social-media";
import Navigation from "./navigation";

interface Props {
	className?: string;
}

export default function Header({ className }: Props) {
	return (
		<header className={cn("bg-[#04706b]", className)}>
			<Container>
				<div className="flex justify-end">
					<div className="flex gap-1.5 items-center mr-12 mt-3">
						<Phone />
						<p className="">+7 (495) 859-03-72 </p>
					</div>

					<SocialMedia />
				</div>
			</Container>
			<div className="bg-black mt-2 ">
				<Container className="flex items-center justify-between py-8">
					<Link href={"/"}>
						<img
							style={{ width: "200px", height: "50px" }}
							src="/logo.svg"
							alt="logo"
						/>
					</Link>

					<Navigation />

					<div className="bg-white rounded-2xl text-black p-2 w-30 text-center font-montserrat mt-1 cursor-pointer hover:opacity-90 active:opacity-70 transition-all duration-200">
						Login
					</div>
				</Container>
			</div>
		</header>
	);
}
