/*
 * See: https://github.com/postcss/postcss-loader#usage
 */

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  plugins: [
    require('precss')({ /* ...options */ }),
    require('autoprefixer')({
      browsers: [
        'last 2 versions',
        'ie >= 11',
      ],
    })
  ].concat(isDev ? [
    require('postcss-reporter')(),
    require('postcss-browser-reporter')(),
  ] : []),
};
