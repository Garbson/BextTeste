/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", // Azul
        secondary: "#FAF3E0", // Creme
        textPrimary: "#000000", // Preto para texto principal
        textSecondary: "#4A4A4A", // Cinza escuro para subtítulos
        background: "#FFFFFF", // Fundo branco
        borderPrimary: "#D1D5DB", // Cinza claro para bordas
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"], // Fontes personalizadas
      },
    },
  },
  plugins: [],
};
