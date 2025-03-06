module.exports = {
    content: [
      './src/**/*.{html,js,ts,jsx,tsx}', // Add your path here
    ],
    theme: {
      extend: {
        colors: {
          'color-1': '#FAF3DD',
          'color-2': '#C8D5B9',
          'color-3': '#8FC0A9',
          'color-4': '#68B0AB',
          'color-5': '#4A7C59',
        },
        animation: {
          'color-transition': 'colorTransition 6s ease infinite',
        },
        keyframes: {
          colorTransition: {
            '0%': { color: '#FAF3DD' },
            '25%': { color: '#C8D5B9' },
            '50%': { color: '#8FC0A9' },
            '75%': { color: '#68B0AB' },
            '100%': { color: '#4A7C59' },
          },
        },
      },
    },
    plugins: [],
  };