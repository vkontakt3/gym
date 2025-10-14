import { cn } from "@/lib/cn";
import { FaFacebook, FaInstagram, FaTelegramPlane, FaVk } from "react-icons/fa";

interface Props {
	className?: string;
}

export default function SocialMedia({ className }: Props) {
	return (
		<div className={cn("flex items-center gap-4 mt-3", className)}>
			{[
				{ icon: FaTelegramPlane, href: "#" },
				{ icon: FaInstagram, href: "#" },
				{ icon: FaFacebook, href: "#" },
				{ icon: FaVk, href: "#" },
			].map(({ icon: Icon, href }, i) => (
				<a
					key={i}
					href={href}
					className="p-2 rounded-full hover:bg-white hover:text-black transition-colors duration-200"
				>
					<Icon size={25} />
				</a>
			))}
		</div>
	);
}
