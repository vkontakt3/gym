"use client";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/ru"; // для русской локали
import locale from "antd/locale/ru_RU";
import { ConfigProvider } from "antd";

interface Props {
	onChange: (date: any) => void;
}

export default function DateInputPicker({ onChange }: Props) {
	return (
		<ConfigProvider locale={locale}>
			<DatePicker
				showTime
				format="DD.MM.YYYY HH:mm"
				placeholder="Выберите дату"
				disabledDate={(current) => {
					const today = dayjs().startOf("day");
					const tooFar = dayjs().add(30, "day");
					return current && (current < today || current > tooFar);
				}}
				minDate={dayjs()}
				onChange={(value) => {
					if (value) {
						onChange(value.toISOString()); // передаём в ISO-формате (удобно для бэка)
					}
				}}
				className="rounded-md "
			/>
		</ConfigProvider>
	);
}
