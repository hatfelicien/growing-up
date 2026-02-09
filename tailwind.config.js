
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                "primary-light": "var(--primary-light)",
                "primary-dark": "var(--primary-dark)",
                secondary: "var(--secondary)",
                "secondary-light": "var(--secondary-light)",
                background: "var(--background)",
                surface: "var(--surface)",
                "surface-muted": "var(--surface-muted)",
                "text-main": "var(--text-main)",
                "text-muted": "var(--text-muted)",
                "text-inverse": "var(--text-inverse)",
            }
        },
    },
    plugins: [],
}
