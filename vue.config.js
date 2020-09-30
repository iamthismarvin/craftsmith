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
  pwa: {
    name: 'Craftsmith',
    themeColor: '#44337a',
    backgroundColor: '#000000',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png',
    },
  },
};
