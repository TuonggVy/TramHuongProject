/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				brand: {
					black: '#0a0a0a',
					white: '#fafafa',
					gray: '#a3a3a3',
				},
			},
		}
	},
	plugins: [],
} 