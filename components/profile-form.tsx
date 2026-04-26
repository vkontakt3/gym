import { Container } from "@/components/container";
import { cn } from "@/lib/cn";
import { User, Booking, Coach } from "@prisma/client";
import ProfileUserCard from "./profile-user-card";
import ProfileBookingSection from "./profile-booking-section";

interface Props {
	user: User & {
		bookings?: (Booking & { coach: Coach })[];
	};
	className?: string;
}

export default function ProfileForm({ user, className }: Props) {
	return (
		<div
			className={cn("min-h-screen py-12 font-montserrat text-white", className)}
		>
			<Container>
				{/* ── user CARD ── */}
				<ProfileUserCard user={user} />
				{/* ── BOOKINGS SECTION ── */}
				<ProfileBookingSection user={user} />
			</Container>
		</div>
	);
}
