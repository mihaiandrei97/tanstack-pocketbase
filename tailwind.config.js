module.exports = {
  theme: {
    extend: {
      animation: {
        "fadeIn": "fadeIn 0.5s ease-in",
        "bounce-slow": "bounce 3s infinite",
        "slowPulse": "pulse 10s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
