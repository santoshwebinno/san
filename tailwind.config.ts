import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        black: {
          DEFAULT: "#000000",
          text: "#444444",
        },
        white: {
          DEFAULT: "#FFFFFF",
          text: "#FFFFFF",
        },
        indigo: {
          DEFAULT: "#6528F7",
          light: "#8A6DF9",
          lightest: "#EDE4FF",
        },
        purple: {
          DEFAULT: "#A076F9",
          medium: "#A076F9",
          light: "#D7BBF5",
          gradient: {
            start: "#5850EC",
            end: "#807BDE",
          },
        },
        gray: {
          50: "#F7F7F7",
          100: "#F2F2F2",
          200: "#EAEAEA",
          500: "#6C6C6C",
          600: "#4B5563",
          light: "#BDBDBD",
          text: "#666668",
        },
        green: "#00CB65",
        "dark-blue": "#111928",
      },
    },
  },
  plugins: [],
};

export default config;
