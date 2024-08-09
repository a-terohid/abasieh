import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './public/svgs/*.{js,ts,jsx,tsx,mdx,svg}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
     colors: {
      "background" : {
          "dark-1" : "#131316",
          "dark-2" : "#1c1c21",
          "dark-3" : "#26262c",
          "dark-5" : "#393a41",
          "dark-6" : "#4b4c52",
          "light-1" : "#f8f9fa",
          "light-2" : "#e9ecef",
      },
      "primary": {
          "red-1" : "#5c0000",
          "red-2" : "#751717",
          "red-3" : "#ba0c0c",
          "red-4" : "#ff0000",
          "green-1" : "#005c00",
          "green-2" : "#2d661b",
          "green-3" : "#2a850e",
          "green-4" : "#27a300",
      },
      "secondary" : {
          "red-1" : "#901b22",
          "red-2" : "#c2242d",
          "green-1" : "#778b3b",
          "green-2" : "#a3bf50",
      },
      "text": {
        "dark" : "#dee2e6",
        "light" : "#212529"
      }
     },
     keyframes: {
      'scale-up-ver-top': {
        '0%': {
          transform: 'scaleY(0.4)',
          'transform-origin': '100% 0%',
        },
        '100%': {
          transform: 'scaleY(1)',
          'transform-origin': '100% 0%',
        },
      },
    },
    animation: {
      'scale-up-ver-top': 'scale-up-ver-top 0.7s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
    },
    },
    fontFamily: {
      Peyda:   [ 'var(--font-Peyda)' ],
    },
    container : {
      center : true,
      padding: "2rem"
    },
  },
  plugins: [],
}
export default config;