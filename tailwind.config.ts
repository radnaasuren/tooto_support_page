import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    extend: {
      screens: {
        phone: "440px",
        laptop: "1440px",
        desktop: "1980px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      white: "#FFFFFF",
      sec: "#91B669",
      gray: "#D9D9D9",
      field: "#8D8D8D",
      err: "#FF0000",
      primary: "#08005E",
      sec_gray: "#D3D3D3",
      sec_white: "#F8F8F8",
      skeleton_gray: "#EEEEEE",
      description: "#808080",
    },
  },
};
export default config;
