import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/modal.js"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryDarkBg: "#192126",
        primaryGreen: "#BBF246",
        yellow: "#FCC46F",
        red: "#ED4747",
        white: {
          fff: "#FFF",
          f5: "#F5F5F5",
        },
        gray: {
          light: "#8B8F92",
          medium: "#5E6468",
          dark: "#384046",
        },
      },
    },
  },
  plugins: [nextui()],
};
export default config;
