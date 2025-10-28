import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { signIn } from "next-auth/react";
import { LoginFormData, loginSchema } from "./form/zod";
import { Input } from "./ui/input";
import toast from "react-hot-toast";

interface Props {
	onSwitch?: () => void;
	className?: string;
}

export default function EnterAccount({ onSwitch, className }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			const res = await signIn("credentials", {
				redirect: false,
				email: data.email,
				password: data.password,
			});

			if (res?.ok) {
				toast.success("Вы успешно вошли в аккаунт ✅ ");
			} else {
				toast.error("Неправильный логин или пароль ❌");
			}
		} catch (error) {
			console.error("Ошибка входа:", error);
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
						Войдите в аккаунт
					</h2>
					<p className="text-gray-500 text-sm font-montserrat">
						Введите свои данные, чтобы получить доступ к вашему аккаунту
					</p>
				</div>

				{/* Email */}
				<div>
					<Input
						type="email"
						placeholder="Email"
						{...register("email")}
						className="w-full p-3 rounded-xl border text-black font-montserrat border-gray-300 focus:ring-2 focus:border-[#47d6cf] transition-all"
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
						className="w-full p-3 rounded-xl border text-black font-montserrat border-gray-300 focus:ring-2 focus:border-[#47d6cf] transition-all"
					/>
					{errors.password && (
						<p className="text-red-500 text-sm mt-1">
							{errors.password.message}
						</p>
					)}
				</div>

				<button
					type="submit"
					className="bg-[#04706b] hover:bg-[#035853] text-white font-semibold py-3 rounded-xl transition-all duration-300"
				>
					Войти
				</button>

				<p className="text-gray-400 text-sm text-center mt-4">
					Ещё нет аккаунта?{" "}
					<span
						onClick={onSwitch}
						className="text-[#04706b] font-semibold cursor-pointer hover:underline transition-all duration-300"
					>
						Зарегистрироваться
					</span>
				</p>
			</form>
		</div>
	);
}
