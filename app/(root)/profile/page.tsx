import ProfileForm from "@/components/profile-form";
import { getUserSession } from "@/lib/get-user-session";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma/prisma-client";

export default async function Profile({}) {
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
