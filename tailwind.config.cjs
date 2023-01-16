/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                1700: '1700px',
            },
            colors: {
                primary: '#f5061d',
                secondary: '#c0012a',
                black: '#161616',
                white: '#f6f6f6',
                alternative: '#ffb300',
            },
        },
    },
    plugins: [],
};
