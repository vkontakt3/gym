"use client";

import Link from "next/link";
import Navigation from "./navigation";
import { Container } from "./container";
import { cn } from "@/lib/cn";
import { useState } from "react";
import RegisterModal from "./form/register-modal";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

interface Props {
	className?: string;
}

export default function TopBar({ className }: Props) {
	const [loginOpen, setLoginOpen] = useState(false);
	const { data: session, status } = useSession();
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);

	const isProfilePage = pathname === "/profile";

	return (
		<div className={cn("sticky top-0 bg-black py-5 shadow-lg z-50", className)}>
			<Container className="flex items-center justify-between">
				<Link href={"/"}>
					<Image
						src="/logo.svg"
						alt="logo"
						style={{ width: "200px", height: "50px" }}
						width={200}
						height={50}
					/>
				</Link>

				{!isProfilePage && <Navigation className="hidden lg:flex" />}

				{status === "loading" ? (
					<span className="px-8 py-2 bg-gray-600 rounded-xl text-white hidden lg:flex ">
						Loading...
					</span>
				) : !session ? (
					<div
						onClick={() => setLoginOpen(true)}
						className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#04706b] via-[#22b8a0] to-[#6ee7c5] p-[2px] transition-all duration-300 ease-out hover:from-[#6ee7c5] hover:via-[#22b8a0] hover:to-[#04706b] hidden lg:flex"
					>
						<span className="relative rounded-xl cursor-pointer bg-white px-8 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 ease-out group-hover:bg-transparent group-hover:text-white">
							Login
						</span>
					</div>
				) : (
					<Link
						href="/profile"
						className="group relative  items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#04706b] via-[#22b8a0] to-[#6ee7c5] p-[2px] transition-all duration-300 ease-out hover:from-[#6ee7c5] hover:via-[#22b8a0] hover:to-[#04706b] hidden lg:flex"
					>
						<span className="relative rounded-xl cursor-pointer bg-white px-8 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 ease-out group-hover:bg-transparent group-hover:text-white hidden lg:flex">
							Profile
						</span>
					</Link>
				)}

				<button
					onClick={() => setMenuOpen(!menuOpen)}
					className="lg:hidden text-white"
				>
					{menuOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</Container>

			{menuOpen && (
				<div className="fixed top-0 right-0 w-[300px] border-l-2 border-l-[#04706b] h-screen bg-black z-50 flex flex-col items-center pt-16 pl-6 gap-8 lg:hidden">
					<button
						onClick={() => setMenuOpen(!menuOpen)}
						className="lg:hidden text-white "
					>
						{menuOpen ? <X size={28} /> : <Menu size={28} />}
					</button>
					<Navigation className="flex flex-col gap-6 text-white text-2xl" />
					{!session ? (
						<button
							onClick={() => setLoginOpen(true)}
							className="px-8 py-3 bg-gradient-to-r from-[#04706b] via-[#22b8a0] to-[#6ee7c5] rounded-xl text-white font-semibold"
						>
							Login
						</button>
					) : (
						<Link
							href="/profile"
							className="px-8 py-3 bg-gradient-to-r from-[#04706b] via-[#22b8a0] to-[#6ee7c5] rounded-xl text-white font-semibold"
						>
							Profile
						</Link>
					)}
				</div>
			)}

			<RegisterModal loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
		</div>
	);
}
