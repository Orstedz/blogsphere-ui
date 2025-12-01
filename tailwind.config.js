/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0f1419",
        "bg-secondary": "#1a1f28",
        "bg-tertiary": "#252d3a",
        "text-primary": "#e4e6eb",
        "text-secondary": "#b0b3b9",
        accent: "#4a90e2",
        success: "#52c41a",
        warning: "#faad14",
        danger: "#f5222d",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
