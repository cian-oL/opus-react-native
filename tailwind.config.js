/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-serif"],
        "rubik-bold": ["Rubik-Bold", "sans-serif"],
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"],
        "rubik-medium": ["Rubik-Medium", "sans-serif"],
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"],
        "rubik-light": ["Rubik-Light", "sans-serif"],
      },
    },
  },
  plugins: [
    ({ addComponents }) =>
      addComponents({
        ".code-field-root": {
          marginTop: "20px",
          marginBottom: "20px",
          marginRight: "auto",
          gap: "12px",
        },
        ".cell-root": {
          width: "45px",
          height: "60px",
          marginTop: "auto",
          marginBottom: "auto",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F7F7F7",
          borderWidth: "2px",
          borderRadius: "8px",
        },
        ".cell-text": {
          fontSize: "36px",
          textAlign: "center",
        },
        ".separator": {
          height: "4px",
          width: "10px",
          backgroundColor: "black",
          alignSelf: "center",
        },
      }),
  ],
};
