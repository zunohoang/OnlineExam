/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      padding: {
        '20%': '20%',
      },
      colors: {
        'myclassbr': 'white',
      },
      spacing: {
        '5%': '5%',
      },
      width: {
        '90%': '90%',
        '95%': '95%'
      }
    },
    plugins: [
      require('flowbite/plugin')
    ]
  },
}

