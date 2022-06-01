module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "0",
      },
      center: true,
    },
    extend: {
      colors: {
        "light-gray": "hsl(0, 0%, 98%)",
        "dark-gray": "hsl(0, 0%, 52%)",
        "dark-blue-text": "hsl(200, 15%, 8%)",
        "dark-bg": "hsl(207, 26%, 17%)",
        "dark-blue": "hsl(209, 23%, 22%)",
        "modal-bg": "rgba(0,0,0,0.5)",
      },
      fontSize: {
        14: "14px",
        16: "16px",
        20: "20px",
        18: "18px",
        22: "22px",
        24: "24px",
      },
      fontFamily: {
        sora: ["Nunito Sans", "sans-serif"],
      },
      boxShadow: {
        sm: "0px 0px 10px 0 rgb(0 0 0 / 0.05)",
        md: "0 2px 8px 1px rgb(0 0 0 / 0.1)",
        hover: "0px 2px 12px 2px rgb(0 0 0 / 0.2)",
        "light-hover": "0px 2px 12px 2px rgb(255 255 255 / 0.2)",
      },
      aspectRatio: {
        "3/2": "3/2",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
