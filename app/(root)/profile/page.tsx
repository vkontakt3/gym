import ProfileForm from "@/components/profile-form";
import { getUserSession } from "@/lib/get-user-session";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
interface Props {
	className?: string;
}

export default async function Profile({ className }: Props) {
	const session = await getUserSession();

	if (!session?.id) {
		return redirect("/not-auth");
	}

	const user = await prisma.user.findFirst({
		where: { id: Number(session.id) },
		include: {
			bookings: {
				include: {
					coach: true,
				},
				orderBy: { date: "desc" },
			},
		},
	});

	if (!user) {
		return redirect("/not-auth");
	}

	return <ProfileForm user={user} />;
}
