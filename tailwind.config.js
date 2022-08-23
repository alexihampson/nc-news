/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        comments: "2rem auto auto 1fr",
      },
    },
  },
  plugins: [],
};
