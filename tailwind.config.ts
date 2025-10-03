import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ["var(--font-cute)"],
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-6px)" },
                },
                pulseSoft: {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.05)" },
                },
            },
            animation: {
                float: "float 3s ease-in-out infinite",
                pulseSoft: "pulseSoft 2.2s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
export default config;
