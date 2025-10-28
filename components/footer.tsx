import { cn } from "@/lib/cn";
import { Container } from "./container";
import Title from "./title";

interface Props {
	className?: string;
}

export default function Footer({ className }: Props) {
	return (
		<div className={cn(" mb-10", className)}>
			<Container className="flex justify-between items-start gap-10">
				<div className="max-w-[500px]">
					<Title title="Контакты" titleWhite="клуба" disableMarginTop />
					<div className="font-montserrat">
						<p className="text-sm opacity-50 mb-2.5">Адрес:</p>
						<p className="text-xl mb-5">
							г. Москва м. Ясенево, ул. Голубинская, д. 16
						</p>
						<p className="text-sm opacity-50 mb-2.5">Телефон:</p>
						<p className="text-xl mb-5">+7 (495) 481-60-60</p>
						<p className="text-sm opacity-50 mb-2.5">Email:</p>
						<p className="text-xl  mb-5 ">moreon@more-on.ru</p>
						<p className="text-sm opacity-50 mb-2.5">Время работы:</p>
						<p className="text-xl mb-2.5">Будни: 07:00 - 23:00 </p>
						<p className="text-xl ">Выходные: 09:00 - 23:00 </p>
					</div>
				</div>

				{/* Карта */}
				<div className="w-[650px] h-[400px] rounded-xl overflow-hidden shadow-lg">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1294.7410517456942!2d37.52746574421349!3d55.597225333676334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0LMuINCc0L7RgdC60LLQsCwg0LwuINCv0YHQtdC90LXQstC-LCDRg9C7LiDQk9C-0LvRg9Cx0LjQvdGB0LrQsNGPLCDQtC4gMTY!5e0!3m2!1sru!2spl!4v1760776181780!5m2!1sru!2spl"
						width="100%"
						height="100%"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>
				</div>
			</Container>
		</div>
	);
}
