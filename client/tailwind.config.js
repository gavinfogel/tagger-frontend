/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				'cursor-blink': {
					'0%': {
						opacity: '0',
					},
				},
			},
			animation: {
				'cursor-blink': 'cursor-blink 1.5s steps(2) infinite',
			},
		},
	},
	plugins: [],
};
