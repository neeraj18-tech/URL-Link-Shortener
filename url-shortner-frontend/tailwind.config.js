/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
     keyframes: {
  marquee: {
    "0%": { transform: "translateX(0%)" },
    "100%": { transform: "translateX(-50%)" },
  },
},
animation: {
  marquee: "marquee 45s linear infinite",
},

      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #3b82f6, #9333ea)',
        'custom-gradient-2': 'linear-gradient(to left, #3b82f6, #f43f5e)',
        'card-gradient': 'linear-gradient(to right, #3b82f6, #4299e1)',
      },
      colors: {
        navbarColor: '#ffffff',
        btnColor: '#3643f7',
        linkColor: '#2a5bd7',
      },
      boxShadow: {
        custom: '0 0 15px rgba(0, 0, 0, 0.3)',
        right: '10px 0 10px -5px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat'],
      },
    },
  },
  plugins: [],
};
