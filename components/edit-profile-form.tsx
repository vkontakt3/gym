"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { EditProfileData, editProfileSchema } from "./form/zod";
import { updateProfileAction } from "@/action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
	defaultValues: EditProfileData;
	onCancel?: () => void;
	onSuccess?: () => void;
}

export default function EditProfileForm({
	defaultValues,
	onCancel,
	onSuccess,
}: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EditProfileData>({
		resolver: zodResolver(editProfileSchema),
		defaultValues,
	});

	const router = useRouter();

	const { data: session, update } = useSession();

	console.log("Current session:", session);

	const onSubmit = async (body: EditProfileData) => {
		try {
			await updateProfileAction(body);
			await update();
			toast.success("Профиль обновлён ✅");
			router.refresh();
			onSuccess?.();
		} catch (error) {
			console.error(error);
			toast.error("Ошибка обновления профиля ❌");
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-4 max-w-md"
		>
			<Input {...register("name")} placeholder="Имя" />
			{errors.name && <p className="text-red-500">{errors.name.message}</p>}

			<Input {...register("email")} placeholder="Email" />
			{errors.email && <p className="text-red-500">{errors.email.message}</p>}

			<Input {...register("password")} placeholder="Пароль" type="password" />
			{errors.password && (
				<p className="text-red-500">{errors.password.message}</p>
			)}

			<Input
				{...register("confirmPassword")}
				placeholder="Подтвердите пароль"
				type="password"
			/>
			{errors.confirmPassword && (
				<p className="text-red-500">{errors.confirmPassword.message}</p>
			)}

			<div className="flex gap-3 mt-4">
				<Button type="submit">Сохранить</Button>
				<Button type="button" variant="outline" onClick={onCancel}>
					Отмена
				</Button>
			</div>
		</form>
	);
}
