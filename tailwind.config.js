/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        // => @media (min-width: 475px) { ... }
      },
      colors: {
        'holiday-red': '#FF0000',
        'holiday-gold': '#FFD700',
        'dark-navy': '#0A1128',
        'warm-white': '#F5F5DC',
        'holiday-green': '#00FF00',
        'holiday-red-light': '#FF6B6B',
        'holiday-gold-light': '#FFE066',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      }
      ,
      animation: {
        'twinkle': 'twinkle 1s ease-in-out infinite',
        'tree-float': 'treeFloat 3s ease-in-out infinite',
        'light-travel': 'lightTravel 3s linear infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        treeFloat: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        lightTravel: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(50%)' },
        }
      }
    },
  },
  plugins: [],
}