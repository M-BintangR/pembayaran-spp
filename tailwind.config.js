const defaultTheme = require('tailwindcss/defaultTheme');


/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', 'Poppins', ...defaultTheme.fontFamily.sans],
            },
            backgroundColor: {
                purpleT: `rgb(126, 34, 206, 60%)`
            }
        },
    },
    plugins: [
        require('tailwind-scrollbar-hide'),
        require('@tailwindcss/forms'),
    ],
};
