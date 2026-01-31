import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // This tells Tailwind to look inside the src folder
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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