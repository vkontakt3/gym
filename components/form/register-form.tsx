"use client";

import { useState } from "react";
import EnterAccount from "../enter-account";
import RegisterAccount from "../register-account";

interface Props {
	className?: string;
}

export default function RegisterForm({ className }: Props) {
	const [isRegister, setIsRegister] = useState(false);

	return (
		<div className={className}>
			{!isRegister ? (
				<EnterAccount onSwitch={() => setIsRegister(true)} />
			) : (
				<RegisterAccount onSwitch={() => setIsRegister(false)} />
			)}
		</div>
	);
}
