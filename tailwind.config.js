/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5EEE1',
        offwhite: '#FFFCF6',
        espresso: '#2B1B12',
        coffee: '#5C3A25',
        clay: '#B5652F',
        clayDark: '#965023',
        sage: '#707B57',
        sageLight: '#8E9A72',
        gold: '#D7A24A',
        line: '#E4D9C4',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        blob: '42% 58% 65% 35% / 45% 40% 60% 55%',
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(43, 27, 18, 0.35)',
        card: '0 12px 30px -14px rgba(43, 27, 18, 0.28)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        steam: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)', opacity: '0.5' },
          '50%': { transform: 'translateY(-10px) scaleY(1.15)', opacity: '0.9' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(2deg)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        steam: 'steam 3.2s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
