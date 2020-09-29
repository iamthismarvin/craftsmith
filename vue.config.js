const autoprefixer = require('autoprefixer');
const tailwind = require('tailwindcss');
const tailwindConfig = require('./tailwind.config.js');

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: () => [autoprefixer, tailwind, tailwindConfig],
      },
    },
  },
};
