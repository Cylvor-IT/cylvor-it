import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // This tells Tailwind to look inside the src folder
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6", 
        secondary: "#8b5cf6", 
        dark: "#020617", 
      },
    },
  },
  plugins: [],
};
export default config;