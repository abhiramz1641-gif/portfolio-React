module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        striped:
          "repeating-linear-gradient(45deg, #3B3A3D, #3B3A3D 5px, transparent 5px, transparent 20px)",
      },
      keyframes: {
        "blink-red": {
          "0%, 100%": {
            backgroundColor: "rgba(239, 68, 68, 0.7)",
            boxShadow: "0 0 30px 10px rgba(239, 68, 68, 0.5)",
          },
          "50%": {
            backgroundColor: "rgba(239, 68, 68, 0.5)",
            boxShadow: "0 0 30px 10px rgba(239, 68, 68, 1)",
          },
        },
      },
      animation: {
        "blink-red": "blink-red 2s infinite linear",
      },
    },
  },
  theme: {
    extend: {
      keyframes: {
         "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-y": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "marquee-horizontal": "marquee-x var(--duration) infinite linear",
        "marquee-vertical": "marquee-y var(--duration) linear infinite",
        },
    },
  },

};
