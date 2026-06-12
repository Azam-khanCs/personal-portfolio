/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "var(--shadow-soft)",
        glow: "var(--shadow-glow)",
      },
      borderRadius: {
        app: "var(--radius)",
      },
    },
  },
  plugins: [],
};
