/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {
    screens: {
      sm: "640px", // Overrides default 640px
      md: "768px", // Overrides default 768px
      // Optionally keep others or override them too
      lg: "1024px",
      // xl: "1280px",
      // 2xl: "1536px",
    },
  } },
  plugins: [],
};