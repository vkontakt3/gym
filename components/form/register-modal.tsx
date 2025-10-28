"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import RegisterForm from "./register-form";

interface Props {
	loginOpen: boolean;
	setLoginOpen: (value: boolean) => void;
}

export default function RegisterModal({ loginOpen, setLoginOpen }: Props) {
	return (
		<Dialog open={loginOpen} onOpenChange={setLoginOpen}>
			<DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-full p-6 rounded-xl bg-[#063836] shadow-2xl z-50">
				<DialogHeader>
					<DialogTitle className="text-xl font-bold mb-4 text-center">
						Войдите или зарегистрируйтесь
					</DialogTitle>
				</DialogHeader>

				<RegisterForm className="flex flex-col gap-4" />
			</DialogContent>
		</Dialog>
	);
}
