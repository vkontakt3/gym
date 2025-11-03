import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { signIn } from "next-auth/react";
import { RegisterData, registerSchema } from "./form/zod";
import { Input } from "./ui/input";
import toast from "react-hot-toast";

interface Props {
	onSwitch?: () => void;
	className?: string;
}

export default function RegisterAccount({ onSwitch, className }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit = async (data: RegisterData) => {
		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const result = await res.json();

			if (res.ok) {
				toast.success("Вы успешно зарегистрированы ✅ ");

				// Можно сразу залогинить
				await signIn("credentials", {
					redirect: true,
					email: data.email,
					password: data.password,
				});
			} else {
				toast.error(result.error || "Ошибка регистрации ❌");
			}
		} catch (error) {
			console.error(error);
			toast.error("Ошибка регистрации ❌");
		}
	};

	return (
		<div className={className}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-6 p-8 max-w-md mx-auto"
			>
				<div className="text-center mb-6">
					<div className="flex justify-center mb-2">
						<span className="w-12 h-12 flex items-center justify-center bg-[#04706b] rounded-full text-white text-2xl font-bold">
							<User />
						</span>
					</div>
					<h2 className="text-xl font-semibold font-montserrat mb-1">
						Зарегистрируйтесь
					</h2>
					<p className="text-gray-500 text-sm font-montserrat">
						Добро пожаловать! Пожалуйста, зарегистрируйтесь, чтобы продолжить
					</p>
				</div>

				<div>
					<Input
						type="text"
						placeholder="Имя"
						{...register("name")}
						className="w-full p-3 rounded-xl border text-black bg-white font-montserrat border-gray-300 focus:ring-2 focus:border-[#47d6cf] transition-all"
					/>
					{errors.name && (
						<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
					)}
				</div>

				<div>
					<Input
						type="email"
						placeholder="Email"
						{...register("email")}
						className="w-full p-3 rounded-xl border text-black bg-white font-montserrat border-gray-300 focus:ring-2 focus:border-[#47d6cf] transition-all"
					/>
					{errors.email && (
						<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
					)}
				</div>

				{/* Password */}
				<div>
					<Input
						type="password"
						placeholder="Пароль"
						{...register("password")}
						className="w-full p-3 rounded-xl border text-black bg-white font-montserrat border-gray-300 focus:ring-2 focus:border-[#47d6cf] transition-all"
					/>
					{errors.password && (
						<p className="text-red-500 text-sm mt-1">
							{errors.password.message}
						</p>
					)}
				</div>

				<div>
					<Input
						type="password"
						placeholder="Подтвердите пароль"
						{...register("confirmPassword")}
						className="w-full p-3 rounded-xl border text-black bg-white font-montserrat border-gray-300 focus:ring-2 focus:border-[#47d6cf] transition-all"
					/>
					{errors.confirmPassword && (
						<p className="text-red-500 text-sm mt-1">
							{errors.confirmPassword.message}
						</p>
					)}
				</div>

				<button
					type="submit"
					className="bg-[#04706b] hover:bg-[#035853] text-white font-semibold py-3 rounded-xl transition-all duration-300"
				>
					Зарегистрироваться
				</button>

				<p className="text-gray-400 text-sm text-center mt-4">
					Уже есть аккаунт?{" "}
					<span
						onClick={onSwitch}
						className="text-[#04706b] font-semibold cursor-pointer hover:underline transition-all duration-300"
					>
						Войти
					</span>
				</p>
			</form>
		</div>
	);
}
