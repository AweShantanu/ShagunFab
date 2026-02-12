/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#e11d48', // Red-600
                secondary: '#facc15', // Yellow-400
            }
        },
    },
    plugins: [],
}
