// OPTIMIZING WEBPACK FOR FASTER BUILDS
// ------------------------------------------
// See: http://engineering.invisionapp.com/post/optimizing-webpack/
// See: https://medium.com/@soederpop/webpack-plugins-been-we-been-keepin-on-the-dll-cdfdd6cb8cd7#.wxanbfcq8
// See: https://robertknight.github.io/posts/webpack-dll-plugins/
// See: http://odetocode.com/blogs/scott/archive/2016/12/01/building-vendor-and-feature-bundles-with-webpack.aspx

require('babel-register');
const webpack = require('webpack');
const path = require('path');
const dist = path.resolve(process.cwd(), 'dist');

module.exports = {
  context: process.cwd(),
  devtool: 'eval',
  target: 'web', // Make web variables accessible to webpack, e.g. window
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
  },
  entry: {
    vendor: [
      './src/polyfill.js',
      './src/vendor.js'
    ],
  },
  output: {
    filename: '[name].dll.js',
    path: dist,

    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true
    }),
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: path.join(dist, '[name].json'),

      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]',
    }),
  ],
  performance: {
    hints: false
  },
};
