import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Введите корректный email"),
	password: z
		.string()
		.min(6, "Пароль должен содержать минимум 6 символов")
		.max(32, "Пароль не должен превышать 32 символа"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(2, "Имя должно содержать минимум 2 символа")
			.max(20, "Имя слишком длинное"),
		email: z.string().email("Введите корректный email"),
		password: z
			.string()
			.min(6, "Пароль должен содержать минимум 6 символов")
			.max(32, "Пароль не должен превышать 32 символа"),
		confirmPassword: z
			.string()
			.min(6, "Пароль должен содержать минимум 6 символов")
			.max(32, "Пароль не должен превышать 32 символа"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Пароли не совпадают",
		path: ["confirmPassword"],
	});

export type RegisterData = z.infer<typeof registerSchema>;

export const editProfileSchema = z
	.object({
		name: z.string().min(2, "Имя должно содержать минимум 2 символа").max(20),
		email: z.string().email("Введите корректный email"),
		password: z
			.string()
			.min(6, "Пароль должен содержать минимум 6 символов")
			.max(32, "Пароль не должен превышать 32 символа")
			.optional(),
		confirmPassword: z.string().optional(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Пароли не совпадают",
		path: ["confirmPassword"],
	});

export type EditProfileData = z.infer<typeof editProfileSchema>;
