import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bevietnam: ['"Be Vietnam Pro"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        caprasimo: ['Caprasimo', 'cursive'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          green: '#2D5016',
          'green-light': '#4A7C2C',
          brown: '#5C4033',
          'brown-light': '#8B6F47',
          beige: '#D4C5B9',
          'beige-light': '#E8DDD3',
          black: '#1A1A1A',
          grey: '#6B7280',
          'grey-light': '#9CA3AF',
        },
        port: {
          /* hero dark palette */
          'navy-deep':  '#060D1F',
          'navy':       '#0B1629',
          'navy-mid':   '#0E1B38',
          'navy-light': '#1A2C50',
          'gold':       '#C9A227',
          'gold-light': '#E2C46A',
          'silver':     '#A8B4CF',
          'star':       '#E8EEF9',
          'muted':      '#4A5568',
          /* fairy-tale section palette */
          'tale-bg':      '#FFFDF5',
          'tale-bg2':     '#FFF8EE',
          'tale-bg3':     '#F6F8FF',
          'tale-bg4':     '#FFF5F8',
          'tale-card':    '#FFFFFF',
          'tale-border':  '#EFE4C8',
          'tale-border2': '#E8E0F5',
          'tale-border3': '#F0D8E0',
          'tale-text':    '#2C1A0E',
          'tale-sub':     '#5C3D1A',
          'tale-muted':   '#9A7A58',
          'tale-gold':    '#D4920A',
          'tale-gold2':   '#F2B824',
          'tale-rose':    '#C0607A',
          'tale-lavender':'#7A5CB8',
          'tale-mint':    '#2A9078',
          'tale-sky':     '#4A80CC',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
