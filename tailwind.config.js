/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#20beb8",
        secondary: "#94a3b8",
      },
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        "poppins-bold": ["Poppins_700Bold"],
        "poppins-medium": ["Poppins_500Medium"],
      },
    },
  },
  plugins: [],
};
