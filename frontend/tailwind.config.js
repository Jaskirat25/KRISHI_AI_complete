/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      animation: {
        "bounce-dot":
          "bounceDot 1s infinite",

        "slide-up":
          "slideUp 0.3s ease-out",

        "pulse-ring":
          "pulseRing 2s infinite",
      },

      keyframes: {
        bounceDot: {
          "0%, 80%, 100%": {
            transform:
              "translateY(0)",
            opacity: "0.5",
          },

          "40%": {
            transform:
              "translateY(-6px)",
            opacity: "1",
          },
        },

        slideUp: {
          from: {
            opacity: "0",
            transform:
              "translateY(12px)",
          },

          to: {
            opacity: "1",
            transform:
              "translateY(0)",
          },
        },

        pulseRing: {
          "0%": {
            boxShadow:
              "0 0 0 0 rgba(34,197,94,0.4)",
          },

          "70%": {
            boxShadow:
              "0 0 0 18px rgba(34,197,94,0)",
          },

          "100%": {
            boxShadow:
              "0 0 0 0 rgba(34,197,94,0)",
          },
        },
      },
    },
  },

  plugins: [],
};