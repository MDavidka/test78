/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1e1f22",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#10b981", // Emerald Green
          foreground: "#1e1f22",
        },
        secondary: {
          DEFAULT: "#27272a", // Zinc 800
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#27272a",
          foreground: "#a1a1aa",
        },
        card: {
          DEFAULT: "#141517", // Deeper dark card
          foreground: "#ffffff",
        },
        border: "#2d2f34", // Subtle border
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};