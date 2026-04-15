/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px", // wider for dashboards
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Brand colors
        primary: {
          DEFAULT: "#2563eb", // finance blue
          light: "#3b82f6",
          dark: "#1e40af",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#10b981", // teal for trust
          light: "#34d399",
          dark: "#047857",
          foreground: "hsl(var(--secondary-foreground))",
        },

        // Extra palettes for dashboards
        neutral: {
          light: "#f9fafb",
          DEFAULT: "#6b7280",
          dark: "#111827",
        },
        success: {
          DEFAULT: "#22c55e",
          dark: "#15803d",
        },
        warning: {
          DEFAULT: "#f59e0b",
          dark: "#b45309",
        },
        destructive: {
          DEFAULT: "#ef4444",
          dark: "#991b1b",
          foreground: "hsl(var(--destructive-foreground))",
        },

        // UI surfaces
        card: {
          DEFAULT: "#ffffff",
          dark: "#1f2937",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },

      // Rounded corners
      borderRadius: {
        "2xl": "1.5rem",
        xl: "1rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // Shadows for cards & widgets
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.05)",
        card: "0 8px 20px rgba(0,0,0,0.08)",
        "glow-blue": "0 0 15px rgba(37,99,235,0.5)",
      },

      // Animations
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "fade-up": "fade-up 0.6s ease-out",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
}
