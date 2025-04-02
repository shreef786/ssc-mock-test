module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1D4ED8', // Blue Color
          secondary: '#10B981', // Green Color
          accent: '#F59E0B', // Orange Color
          background: '#F3F4F6', // Light Grey for background
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'], // Font for the website
        },
        spacing: {
          128: '32rem', // Custom spacing size
        },
      },
    },
    plugins: [],
  }
  