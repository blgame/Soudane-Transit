import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#0B6B3A",
          dark: "#063B24",
          light: "#DDF4E8",
          orange: "#F47B20",
          gray: "#F4F7F5"
        }
      },
      boxShadow: {
        premium: "0 24px 70px rgba(6, 59, 36, 0.14)",
        soft: "0 18px 45px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
