import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#e8edf4",
          100: "#c5d1e4",
          200: "#9fb2d0",
          300: "#7893bc",
          400: "#5b7aad",
          500: "#3d619e",
          600: "#355990",
          700: "#2a4e7f",
          800: "#1e3a5f",
          900: "#132640",
        },
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        concrete: {
          50: "#f9f8f6",
          100: "#f1ede6",
          200: "#e3ddd5",
          300: "#c8bfb4",
          400: "#a89d90",
          500: "#8b7d6f",
          600: "#6b5f53",
          700: "#524940",
          800: "#3a332c",
          900: "#221e19",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-montserrat)"],
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(135deg, rgba(30,58,95,0.92) 0%, rgba(30,58,95,0.75) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
