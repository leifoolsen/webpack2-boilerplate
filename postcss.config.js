/*
 * See: https://github.com/postcss/postcss-loader#usage
 *
 * TODO: configure/use css-nano
 */

const isDev = process.env.NODE_ENV !== 'production';
const isProd = process.env.NODE_ENV === 'production';

plugins = () => {
  let result = [
    //require('precss')({ /* ...options */ }),                    // Allows you to use Sass-like markup in your CSS files. (not used at the moment)
    //require('autoprefixer')({ /* ...options */ }),              // Add this if you do not use "postcss-cssnext"
    //require('postcss-custom-properties')({ /* ...options */ }), // Add this if you do not use "postcss-cssnext"
    //require('postcss-calc')({ /* ...options */ }),              // Add this if you do not use "postcss-cssnext"
    //require('postcss-nested-props')({ /* ...options */ }),      // Unwrap nested properties (not used at the moment).

    require('postcss-import')({ /* ...options */ }),              // CSS import
    require('postcss-url')({ /* ...options */ }),                 // Rebase, inline or copy on url()
    require('postcss-mixins')({ /* ...options */ }),              // PostCSS plugin for mixins
    require('postcss-cssnext')({                                  // Use tomorrow's CSS syntax, today :-)
      features: {
        customProperties: false,                                  // Use 'postcss-css-variables' insted of 'postcss-custom-properties',
        rem: false,                                               // Disable px fallback for rem/em
      }                                                           // See: http://cssnext.io/usage/
    }),                                                           // Require 'postcss-cssnext' AFTER "postcss-import"
    //                                                            // This is the difference between cssnext working or not
    //                                                            // See: https://medium.com/written-with-envy/webpack-2-postcss-cssnext-fdcd2fd7d0bd
    require('postcss-css-variables')({ /* ...options */ }),       // Transform CSS Custom Properties(CSS variables) syntax into a static representation
    //                                                            // The 'postcss-custom-properties' plugin does not support CSS variables inside media queries and the like
    //                                                            // This plugin is required until the 'postcss-custom-properties' supports this feature
  ];

  if (isDev) {
    result.concat([
      require('postcss-reporter')(),
      require('postcss-browser-reporter')(),                      // Error reporting when the build fails
    ]);
  }

  if (isProd) {
    result.concat([
      require("cssnano")({ autoprefixer: false }),
    ]);
  }

  return result;
};

module.exports = {
  plugins: plugins()
};
