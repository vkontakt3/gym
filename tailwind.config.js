/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ['"Poppins"', "sans-serif"],
				delagothic: ['"Dela Gothic One"', "sans-serif"],
			},
			colors: {
				primary: "#32DDD4",
				secondary: "#1A746F",
				accent: "#28B0A9",
				darkbg: "#04140c",
			},
			borderRadius: {
				lg: "0.75rem",
			},
		},
	},
	plugins: [],
};
