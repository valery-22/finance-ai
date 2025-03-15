/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
        center: true,
        padding: "2rem",
        screens: {
        "2xl": "1400px",
        },
    },
    extend: {
        colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
        },
        card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
        },
          // Custom vibrant colors
        finance: {
            purple: "#8B5CF6",
            blue: "#3B82F6",
            teal: "#14B8A6",
            green: "#10B981",
            yellow: "#FBBF24",
            orange: "#F97316",
            red: "#EF4444",
            pink: "#EC4899",
        },
        },
        borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
        "accordion-down": {
            from: { height: 0 },
            to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: 0 },
        },
        "pulse-slow": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.8 },
        },
        float: {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
        },
        "bounce-small": {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-4px)" },
        },
        },
        animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse-slow 3s infinite ease-in-out",
        float: "float 6s infinite ease-in-out",
        "spin-slow": "spin-slow 12s linear infinite",
        "bounce-small": "bounce-small 2s infinite ease-in-out",
        },
        backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        },
    },
    },
    plugins: [("tailwindcss-animate")],
}

