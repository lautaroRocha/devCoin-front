/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                300: '300px',
                350: '350px',
                400: '400px',
                500: '500px',
                1150: '1150px',
                1700: '1700px',
            },
            colors: {
                primary: '#121111',
                secondary: '#4F46E5',
                black: '#161616',
                white: '#f6f6f6',
                alternative: '#ffb300',
            },
        },
    },
    plugins: [],
};
