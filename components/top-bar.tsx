"use client";

import Link from "next/link";
import Navigation from "./navigation";
import { Container } from "./container";
import { cn } from "@/lib/cn";
import { useState } from "react";
import RegisterModal from "./form/register-modal";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface Props {
	className?: string;
}

export default function TopBar({ className }: Props) {
	const [loginOpen, setLoginOpen] = useState(false);
	const { data: session, status } = useSession();
	const pathname = usePathname();

	const isProfilePage = pathname === "/profile";

	return (
		<div className={cn("sticky top-0 bg-black py-5 shadow-lg z-50", className)}>
			<Container className="flex items-center justify-between">
				<Link href={"/"}>
					<img
						src="/logo.svg"
						alt="logo"
						style={{ width: "200px", height: "50px" }}
					/>
				</Link>

				{!isProfilePage && <Navigation />}

				{status === "loading" ? (
					<span className="px-8 py-2 bg-gray-600 rounded-xl text-white">
						Loading...
					</span>
				) : !session ? (
					<div
						onClick={() => setLoginOpen(true)}
						className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#04706b] via-[#22b8a0] to-[#6ee7c5] p-[2px] transition-all duration-300 ease-out hover:from-[#6ee7c5] hover:via-[#22b8a0] hover:to-[#04706b]"
					>
						<span className="relative rounded-xl cursor-pointer bg-white px-8 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 ease-out group-hover:bg-transparent group-hover:text-white">
							Login
						</span>
					</div>
				) : (
					<Link
						href="/profile"
						className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#04706b] via-[#22b8a0] to-[#6ee7c5] p-[2px] transition-all duration-300 ease-out hover:from-[#6ee7c5] hover:via-[#22b8a0] hover:to-[#04706b]"
					>
						<span className="relative rounded-xl cursor-pointer bg-white px-8 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 ease-out group-hover:bg-transparent group-hover:text-white">
							Profile
						</span>
					</Link>
				)}
			</Container>
			<RegisterModal loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
		</div>
	);
}
