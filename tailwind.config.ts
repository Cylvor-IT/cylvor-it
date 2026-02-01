import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Sets Inter as the default 'font-sans'
        sans: ["var(--font-inter)", "sans-serif"],
        // Adds 'font-oswald' utility
        oswald: ["var(--font-oswald)", "sans-serif"],
      },
      colors: {
        primary: "#ffffff",
        secondary: "#ef4444",
        dark: "#000000",
      },
    },
  },
  plugins: [],
};
export default config;