const { hashSync } = require("bcrypt");
const { prisma } = require("./prisma-client");
const { coachs } = require("../constants/coachs");

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Coach" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Achievement" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "GaleryItem" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "NavLink" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ServiceItem" RESTART IDENTITY CASCADE`;
}

async function up() {
	// Создаём пользователей
	await prisma.user.createMany({
		data: [
			{
				name: "Test User",
				email: "user@example.com",
				password: hashSync("123456", 10),
			},
			{
				name: "Admin User",
				email: "admin@example.com",
				password: hashSync("123456", 10),
				role: "ADMIN",
			},
		],
	});

	for (const coach of coachs) {
		const createdCoach = await prisma.coach.create({
			data: {
				fullName: coach.fullName,
				description: coach.description,
				experience: coach.experience,
				schedule: coach.schedule,
				about: coach.about,
				src: coach.src,
				phone: coach.contacts.phone,
				email: coach.contacts.email,
				achievements: {
					create: coach.achievements.map((text: string) => ({ text })),
				},
			},
		});
	}

	await prisma.galeryItem.createMany({
		data: [
			{ src: "/galery/img0.svg", alt: "galery" },
			{ src: "/galery/img-1.svg", alt: "galery" },
			{ src: "/galery/img-2.svg", alt: "galery" },
			{ src: "/galery/img-3.svg", alt: "galery" },
			{ src: "/galery/img-4.svg", alt: "galery" },
			{ src: "/galery/img-5.svg", alt: "galery" },
		],
	});

	await prisma.navLink.createMany({
		data: [
			{ name: "О клубе", href: "#about" },
			{ name: "Галерея", href: "#gallery" },
			{ name: "Клубная карта", href: "#clubcard" },
			{ name: "Услуги", href: "#services" },
			{ name: "Тренера и записи", href: "#coachs" },
		],
	});

	await prisma.cardItem.createMany({
		data: [
			{ src: "/card/card-0.svg" },
			{ src: "/card/card-1.svg" },
			{ src: "/card/card-2.svg" },
			{ src: "/card/card-3.svg" },
			{ src: "/card/card-4.svg" },
		],
	});

	await prisma.serviceItem.createMany({
		data: [
			{
				src: "services-image/services-1.svg",
				title: "Тренажерный зал",
			},
			{
				src: "services-image/services-2.svg",
				title: "Танцы",
			},

			{
				src: "services-image/services-4.svg",
				title: "Силовые и функциональные тренировки",
			},
			{
				src: "services-image/services-5.svg",
				title: "Водные программы",
			},
			{
				src: "services-image/services-6.svg",
				title: "Персональный тренинг",
			},
			{
				src: "services-image/services-7.svg",
				title: "Кардиограммы и аэробика",
			},
			{
				src: "services-image/services-8.svg",
				title: "Единоборства",
			},
			{
				src: "services-image/services-9.svg",
				title: "Йога",
			},
			{
				src: "services-image/services-10.svg",
				title: "Mind Body",
			},
		],
	});
}

async function main() {
	try {
		await down();
		await up();
	} catch (e) {
		console.error(e);
	} finally {
		await prisma.$disconnect();
	}
}

main();
