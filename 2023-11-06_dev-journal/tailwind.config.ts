import type { Config } from "tailwindcss";

export default {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
                pixelify: ["Pixelify", "sans-serif"],
            },
        },
    },
    plugins: [],
} satisfies Config;
