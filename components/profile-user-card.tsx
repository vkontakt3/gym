"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import EditProfileForm from "@/components/edit-profile-form";
import { useState } from "react";
import { User } from "@prisma/client";

interface Props {
	user: User;
	className?: string;
}

export default function ProfileUserCard({ user, className }: Props) {
	const [editMode, setEditMode] = useState(false);
	return (
		<div
			className="relative rounded-2xl overflow-hidden mb-8 border border-white/10"
			style={{
				background:
					"linear-gradient(135deg, rgba(4,112,107,0.35) 0%, rgba(4,52,44,0.6) 100%)",
			}}
		>
			{/* decorative teal glow */}
			<div
				className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-20 pointer-events-none"
				style={{
					background: "radial-gradient(circle, #2ab5ae 0%, transparent 70%)",
				}}
			/>

			<div className="relative p-8 sm:p-10">
				{!editMode ? (
					<div className="flex flex-col sm:flex-row sm:items-center gap-6">
						{/* Avatar with teal ring */}
						<div className="relative shrink-0 self-start sm:self-auto">
							<div
								className="absolute inset-0 rounded-full"
								style={{
									background: "conic-gradient(#2ab5ae, #04706b, #2ab5ae)",
									padding: "2px",
									borderRadius: "9999px",
								}}
							/>
							<Avatar className="relative w-24 h-24 ring-2 ring-[#2ab5ae]/60 ring-offset-2 ring-offset-transparent">
								<AvatarImage alt={user?.name || "User"} />
								<AvatarFallback
									className="text-2xl font-bold"
									style={{ background: "#04706b", color: "#fff" }}
								>
									{user?.name?.[0]?.toUpperCase() ?? "U"}
								</AvatarFallback>
							</Avatar>
						</div>

						{/* Name / email */}
						<div className="flex-1 min-w-0">
							<p className="text-xs font-semibold uppercase tracking-widest text-[#2ab5ae] mb-1">
								Профиль пользователя
							</p>
							<h1 className="text-3xl sm:text-4xl font-bold truncate">
								{user?.name ?? "User"}
							</h1>
							<p className="text-white/50 mt-1 text-sm truncate">
								{user?.email ?? "No email provided"}
							</p>
						</div>

						{/* Actions */}
						<div className="flex flex-col sm:flex-row gap-2 shrink-0">
							<button
								onClick={() => setEditMode(true)}
								className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-[#2ab5ae]/60 text-[#2ab5ae] hover:bg-[#2ab5ae]/10 transition-all duration-200"
							>
								Редактировать
							</button>
							<button
								onClick={() => signOut({ callbackUrl: "/" })}
								className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-all duration-200"
							>
								Выйти
							</button>
						</div>
					</div>
				) : (
					<EditProfileForm
						defaultValues={{
							name: user?.name || "",
							email: user?.email || "",
							password: "",
							confirmPassword: "",
						}}
						onCancel={() => setEditMode(false)}
						onSuccess={() => setEditMode(false)}
					/>
				)}
			</div>
		</div>
	);
}
